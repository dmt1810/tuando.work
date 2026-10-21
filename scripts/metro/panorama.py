"""Approved panorama: CSS controls and skyline; optional continuous branch motion."""
from pathlib import Path
import math, html, random, re, json, xml.etree.ElementTree as ET
SRC=Path(__file__).parent
E=lambda x:html.escape(str(x),quote=True)
KEYS=['perf','crm','data','b2b']
COLORS=['#C8361A','#2347D6','#17794A','#E0A100']
MOBILE=[[12,160],[46,160],[88,118],[113,118],[155,160],[180,160],[222,118],[247,118],[289,160],[328,160]]
POINTS=[(40,160),(104,118),(171,160),(238,118),(305,160),(290,230)]
def rounded(pts,radius=14,off=0,base=None):
 def unit(a,b):
  x,y=b[0]-a[0],b[1]-a[1]; d=math.hypot(x,y);return x/d,y/d
 d=f'M{pts[0][0]:.2f} {pts[0][1]:.2f}'
 for i in range(1,len(pts)-1):
  a,p,b=pts[i-1:i+2];u,v=unit(a,p),unit(p,b)
  angle=math.acos(max(-1,min(1,sum(x*y for x,y in zip(u,v)))))
  inside=base is not None and sum((p[k]-base[i][k])*(v[k]-u[k]) for k in range(2))>0
  r=radius-abs(off) if inside else radius+abs(off); t=r*math.tan(angle/2)
  d+=f' L{p[0]-u[0]*t:.2f} {p[1]-u[1]*t:.2f} Q{p[0]:.2f} {p[1]:.2f} {p[0]+v[0]*t:.2f} {p[1]+v[1]*t:.2f}'
 return d+f' L{pts[-1][0]:.2f} {pts[-1][1]:.2f}'
def parallel(pts,off):
 normals=[]
 for a,b in zip(pts,pts[1:]):
  dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy);normals.append((dy/length,-dx/length))
 out=[]
 for i,p in enumerate(pts):
  if i==0:n=normals[0]
  elif i==len(pts)-1:n=normals[-1]
  else:
   a,b=normals[i-1:i+1];k=1/(1+sum(x*y for x,y in zip(a,b)));n=[(a[j]+b[j])*k for j in range(2)]
  out.append([p[j]+n[j]*off for j in range(2)])
 return out
def train(mobile=False):
 svg=(SRC/'train.svg').read_text(encoding='utf-8')
 if mobile:
  shapes=svg[svg.index('>')+1:svg.rindex('</svg>')]
  return '<g class="metro-vehicle" aria-hidden="true"><g transform="translate(-45 -7.5) scale(.75)">'+shapes+'</g></g>'
 return svg.replace('<svg ','<svg class="train metro-vehicle" ',1)
def wrap_sky(svg,geom):
 # Preserve all reference rails/zones; group each building with its own windows.
 ET.register_namespace('','http://www.w3.org/2000/svg');root=ET.fromstring(svg)

 for line in geom['lines']:
  for path in root.iter():
   if path.tag.endswith('path') and 'l'+str(line['n']) in path.get('class','').split():path.set('d',line['d'])
 children=list(root);start=next(i for i,c in enumerate(children) if c.tag.endswith('rect') and c.get('fill') in ['#E4DAC2','#DCD1B6'])
 end=next(i for i in range(start,len(children)) if children[i].tag.endswith('line'))
 group=None;result=[]
 for c in children[start:end]:
  if c.tag.endswith('rect') and c.get('fill') in ['#E4DAC2','#DCD1B6'] and float(c.get('height','0'))>30:
   group=ET.Element('g',{'class':f'city-building building-{len(result)%7}'});result.append(group)
  group.append(c)
 for c in children[start:end]:root.remove(c)
 for i,g in enumerate(result):root.insert(start+i,g)
 return ET.tostring(root,encoding='unicode')
def mobile_art(data):
 paths=[]
 # End each skill at its actual final station, retaining concentric bends.
 subsets=[MOBILE,MOBILE[:6],MOBILE[2:],MOBILE[6:]]
 for n,(off,points) in enumerate(zip([16.5,5.5,-5.5,-16.5],subsets)):
  points=[p[:] for p in points]
  if n==1:points[-1]=[178,160]
  if n==2:points[0]=[92,118]
  if n==3:points[0]=[224,118]
  paths.append(f'<path class="l l{n+1}" d="{rounded(parallel(points,off),23,off,points)}" fill="none" stroke="{COLORS[n]}" stroke-width="4" stroke-linecap="round"/>')
 rng=random.Random(13);city='';x=-5;i=0
 while x<330:
  width=rng.randint(14,25);height=rng.randint(50,120);y=290-height
  city+=f'<g class="city-building building-{i%7}"><rect x="{x}" y="{y}" width="{width}" height="{height}" fill="{"#E4DAC2" if i%2 else "#DCD1B6"}"/>'
  for wy in range(y+8,285,13):
   for wx in range(x+4,x+width-3,8):
    if rng.random()>.25:city+=f'<rect x="{wx}" y="{wy}" width="3" height="5" fill="#EFE7D2"/>'
  city+='</g>';x+=width+3;i+=1
 branch='M265 136 Q265 144 265 153 V210 Q265 230 280 230 H290'
 svg=f'<svg class="mobile-art" viewBox="0 0 330 290" preserveAspectRatio="none" width="330" height="290" aria-hidden="true">{city}{"".join(paths)}<path class="branch-rail" d="{branch}" fill="none" stroke="#0E7C86" stroke-width="4"/><circle cx="265" cy="136" r="3.5" fill="#F5F0E4" stroke="#17140F" stroke-width="1.5"/><path d="M310 160 Q321 160 321 135 V110" fill="none" stroke="#17140F" stroke-width="3" stroke-dasharray=".1 8" stroke-linecap="round"/><circle cx="321" cy="100" r="7" fill="#F5F0E4" stroke="#17140F" stroke-width="2" stroke-dasharray="3 3"/><path class="motion-main" d="{rounded(MOBILE)}" fill="none"/><path class="motion-branch" d="{branch}" fill="none"/>{train(True)}</svg>'
 return svg
def capsule(s,pt,mobile=False):
 nums=[KEYS.index(k)+1 for k in s['skills']];classes=' '.join('k'+str(n) for n in nums)
 width,height=(19,52) if mobile else (28,76); x,y=pt
 style=f'left:{x/330*100:.3f}%;top:{y}px' if mobile else f'left:{x}px;top:{y}px'
 svg=f'<svg width="{width}" height="{height}" viewBox="0 0 28 76" aria-hidden="true"><rect class="cr" x="1.5" y="1.5" width="25" height="73" rx="12.5" fill="rgba(255,255,255,.9)" stroke="#17140F" stroke-width="3"/>'
 for n in nums:svg+=f'<circle class="l l{n}" cx="14" cy="{14+(n-1)*16}" r="5.5" fill="#F5F0E4" stroke="#17140F" stroke-width="2.5"/>'
 years='' if mobile else f'<small>{E(s["years"])}</small>'
 return f'<label class="{"mobile-stop" if mobile else "st"} {classes} {"project-stop" if s["id"]=="f" else ""}" for="{s["id"]}" style="{style}">{svg}</svg><span class="nm">{E(s["short"])}{years}</span></label>'
def project(lang):
 vi=lang=='vi'
 return dict(id='f',slug='',short='Projects',years='Freelance',skills=['perf','crm','data'],name='Consulting & freelance',period='Projects · Freelance',role='CATSA · Cenhomes · Dichung · Hanoi Community College',summary='Các dự án quảng cáo và email marketing cho doanh nghiệp tại Việt Nam.' if vi else 'Paid advertising and email marketing for businesses in Vietnam.',how='',headline={'value':'4','dir':None,'caption':'Dự án freelance và tư vấn' if vi else 'Consulting and freelance projects'})
def generate(data,lang,geom,panel,ui):
 t=ui[lang];stations=data['stations']+[project(lang)]
 radios=''.join(f'<input class="rd" type="radio" name="station" id="{s["id"]}" aria-label="{E(s["short"]+", "+s["years"])}" {"checked" if s["id"]=="e" else ""}>' for s in stations)
 radios+=''.join(f'<input class="rd" type="radio" name="skill" id="k{n}" aria-label="{E(t["all"] if n==0 else data["skills"][KEYS[n-1]]["label"])}" {"checked" if n==0 else ""}>' for n in range(5))
 radios+='<input class="rd" type="checkbox" id="collapse" aria-label="'+('Thu gọn nội dung ga' if lang=='vi' else 'Collapse station details')+'">'
 bar=f'<div class="bar"><label class="chip" for="k0"><span class="full-skill">{t["all"]}</span><span class="short-skill">'+('Tất cả' if lang=='vi' else 'All')+'</span></label>'+''.join(f'<label class="chip" for="k{i+1}" style="--line:{COLORS[i]}"><i class="sw" aria-hidden="true"></i><span class="full-skill">{E(data["skills"][key]["label"])}</span><span class="short-skill">{["PPC","CRM","Data","B2B"][i]}</span></label>' for i,key in enumerate(KEYS))+'</div>'
 strips='<div class="skills">'
 for i,key in enumerate(KEYS):
  skill=data['skills'][key];strips+=f'<div class="sk s{i+1}"><div class="tool-list">'+''.join(f'<span class="tool">{E(tool)}</span>' for tool in skill.get('tools',skill.get('proof',[])))+'</div></div>'
 strips+='</div>'
 svg=wrap_sky((SRC/'reference-map.svg').read_text(encoding='utf-8').replace('sc-camel-path-length','pathLength'),geom)
 if lang=='vi':
  for original,zone in zip(['Zone 1, Travel','Zone 2, Agency','Zone 3, Fintech and insurtech','Zone 4, Travel tech'],data['zones']):svg=svg.replace(original,E(zone['label']))
 branch='M805 230 Q825 250 825 278 V344 Q825 366 845 366 H865'
 svg=svg.replace('</svg>',f'<path class="branch-rail" d="{branch}" fill="none" stroke="#0E7C86" stroke-width="7"/><circle cx="805" cy="230" r="5" fill="#F5F0E4" stroke="#17140F" stroke-width="2"/><path class="motion-main" d="{geom["trunk"]}" fill="none"/><path class="motion-branch" d="{branch}" fill="none"/></svg>')
 labels=''.join(capsule(s,(pt['x'],pt['y'])) for s,pt in zip(stations,geom['stations']+[{'x':865,'y':366}]))
 future='<div class="future" style="left:1085px;top:190px" aria-hidden="true"><span class="nm">...</span><svg width="30" height="30"><circle cx="15" cy="15" r="12" fill="#F5F0E4" stroke="#17140F" stroke-width="3" stroke-dasharray="4 4"/></svg></div>'
 desktop_positions=percentages(geom['trunk'],[(p['x'],p['y']) for p in geom['stations']])+[100]
 desktop_junction=percentages(geom['trunk'],[(805,230)])[0]
 desktop=f'<div class="map" tabindex="0" role="region" aria-label="{t["map_label"]}"><div class="cv" data-panorama="desktop" data-positions="{E(json.dumps(desktop_positions))}" data-junction="{desktop_junction}" data-stops="{E(str([[p["x"],p["y"]] for p in geom["stations"]]+[[865,366]]))}">{svg}{labels}{train()}{future}</div></div>'
 mobile_positions=percentages(rounded(MOBILE),POINTS[:5])+[100]
 mobile_junction=percentages(rounded(MOBILE),[(265,136)])[0]
 mobile='<div class="mobile-panorama" role="group" aria-label="'+t['map_label']+'"><div class="mobile-map" data-panorama="mobile" data-positions="'+E(json.dumps(mobile_positions))+'" data-junction="'+str(mobile_junction)+'" data-stops="'+E(str([list(p) for p in POINTS]))+'">'+mobile_art(data)+''.join(capsule(s,pt,True) for s,pt in zip(stations,POINTS))+'</div></div>'
 company_data=[{'name':s.get('tooltip_name',s['short']),'description':s.get('company_intro',s['summary'])} for s in stations]
 companies='<script type="application/json" data-company-intros>'+json.dumps(company_data,ensure_ascii=False).replace('<','\\u003c')+'</script>'
 tooltip='<div class="station-tooltip" role="tooltip" id="station-tooltip" hidden><strong></strong><p></p></div>'
 desktop=desktop[:-12]+tooltip+desktop[-12:]
 panels=''.join(panel(s,data,lang) for s in data['stations'])
 projects_title='Xem các projects' if lang=='vi' else 'Explore projects'
 cards=''.join(f'<a class="project-link" href="{"/vi" if lang=="vi" else ""}/projects/{slug}/">{label}<span>↗</span></a>' for slug,label in [('catsa','CATSA'),('cenhomes','Cenhomes.vn'),('dichung','Dichung.vn'),('hanoicc','Hanoi Community College')])
 panels+=f'<article class="pn pf"><div><div class="g big-stat">4</div><p class="stat-caption">{E(stations[-1]["headline"]["caption"])}</p></div><div><div class="m muted">Freelance</div><h2>Projects.</h2><p class="summary">{E(stations[-1]["summary"])}</p><div class="project-links">{cards}</div></div></article>'
 return f'<section id="map" class="metro" aria-label="{t["map_label"]}">{radios}<h2 class="metro-heading">{E(data["map_title"])}</h2>{companies}{bar}{strips}{desktop}{mobile}<div class="panels">{panels}</div><label class="collapse-control btn" for="collapse"><span class="collapse-text">'+('Thu gọn' if lang=='vi' else 'Collapse details')+'</span><span class="expand-text">'+('Mở nội dung ga' if lang=='vi' else 'Show station details')+'</span></label></section>'

def percentages(path,points):
 tokens=re.findall(r'[MLQ]|-?\d+(?:\.\d+)?',path);i=0;cur=(0,0);samples=[];lengths=[];total=0
 def add(p):
  nonlocal total
  if samples:total+=math.dist(samples[-1],p)
  samples.append(p);lengths.append(total)
 while i<len(tokens):
  command=tokens[i];i+=1
  if command=='M':cur=(float(tokens[i]),float(tokens[i+1]));i+=2;add(cur)
  else:
   count=4 if command=='Q' else 2;v=list(map(float,tokens[i:i+count]));i+=count;target=tuple(v[-2:]);n=max(1,math.ceil(math.dist(cur,target)*4));start=cur
   for j in range(1,n+1):
    t=j/n;p=tuple((1-t)**2*start[k]+2*(1-t)*t*v[k]+t*t*target[k] for k in range(2)) if command=='Q' else tuple(start[k]+(target[k]-start[k])*t for k in range(2));add(p)
   cur=target
 return [100*lengths[min(range(len(samples)),key=lambda j:math.dist(samples[j],p))]/total for p in points]

def state_css(geom):
 mobile_path=rounded(MOBILE);desktop_dist=percentages(geom['trunk'],[(p['x'],p['y']) for p in geom['stations']]);mobile_dist=percentages(mobile_path,POINTS[:5]);css=''
 for i,id in enumerate('abcdef'):
  selected=f'#{id}:checked'
  css+=f'{selected}~.panels .p{id}{{display:grid}}{selected}~.mobile-panorama [for={id}] .cr{{fill:#FFD84A}}{selected}~.mobile-panorama [for={id}] .nm{{background:#17140F;color:#F5F0E4}}{selected}:focus-visible~.mobile-panorama [for={id}]{{outline:3px solid #17140F;outline-offset:8px}}'
  if i<5:
   css+=f'{selected}~.map .train{{offset-distance:calc({desktop_dist[i]:.5f}% - 12px);offset-path:path("{geom["trunk"]}")}}{selected}~.mobile-panorama .metro-vehicle{{offset-distance:calc({mobile_dist[i]:.5f}% - 6px);offset-path:path("{mobile_path}")}}'
  else:
   css+=f'{selected}~.map [for=f] .cr{{fill:#FFD84A}}{selected}~.map [for=f] .nm{{background:#17140F;color:#F5F0E4}}{selected}~.map .train{{offset-path:path("M805 230 Q825 250 825 278 V344 Q825 366 845 366 H865");offset-distance:calc(100% - 12px)}}{selected}~.mobile-panorama .metro-vehicle{{offset-path:path("M265 136 Q265 144 265 153 V210 Q265 230 280 230 H290");offset-distance:calc(100% - 6px)}}'
  for j in range(7):
   scale=.82+((j*11+i*17)%35)/100
   css+=f'{selected}~.map .building-{j},{selected}~.mobile-panorama .building-{j}{{transform:scaleY({scale:.2f})}}'
 for n in range(1,5):css+=f'#k{n}:checked~.mobile-panorama .l:not(.l{n}){{opacity:.12}}#k{n}:checked~.mobile-panorama .mobile-stop:not(.k{n}){{filter:opacity(.2)}}'
 css+='@media(prefers-reduced-motion:no-preference){'+''.join(f'#{id}:checked~.map [for={id}]::after{{animation:arrival 1s ease-out 1}}' for id in 'abcdef')+'}@keyframes arrival{from{transform:scale(1);opacity:.8}to{transform:scale(1.4);opacity:0}}'
 return css
