from pathlib import Path
import json, html, random, hashlib, shutil, sys, re
sys.path.insert(0,str(Path(__file__).parent))
import panorama, projects

ROOT=Path(__file__).resolve().parents[2]/'.metro-build'
SRC=Path(__file__).parent
GEOM=json.loads((SRC/'geometry.json').read_text())
E=lambda value:html.escape(str(value),quote=True)
COLORS=['#C8361A','#2347D6','#17794A','#E0A100']
KEYS=['perf','crm','data','b2b']
STATIONS=GEOM['stations']
UI={
 'en':dict(about='About',career='Career',contact='Contact',download='Download CV',heading='A career, station by station.',sub='Growth, performance marketing and CRM, across Southeast Asia.',about_title='A little about me',all='All lines',legend='Each colored line is a skill, and a white dot means I worked on it at that station. The background zones show the industry.',pick='Pick a line to see where I used the skill, and with which tools.',details='View details',short_details='Details ↗',how='How',back='Back',next='Next stop',backmap='Back to the map',achievements='Key achievements',owned='What I owned',first='Start of the line',last='The line continues...',footer='Where does your growth get stuck?',footer_text='Leads that go cold, disconnected tools, or reporting that arrives too late. Bring the problem — we’ll map out the next move.',updated='Last updated',skip='Skip to content',map_label='Career metro map',station='Station',also='also',current='Current role'),
 'vi':dict(about='Giới thiệu',career='Sự nghiệp',contact='Liên hệ',download='Tải CV',heading='Sự nghiệp, qua từng trạm.',sub='Growth, performance marketing và CRM, tại Đông Nam Á.',about_title='Một chút về tôi',all='Tất cả tuyến',legend='Mỗi tuyến màu là một kỹ năng. Chấm trắng cho biết tôi đã sử dụng kỹ năng đó tại trạm. Các vùng nền thể hiện ngành.',pick='Chọn một tuyến để xem nơi tôi đã sử dụng kỹ năng và các công cụ đi kèm.',details='Xem chi tiết',short_details='Chi tiết ↗',how='Cách làm',back='Trạm trước',next='Trạm tiếp theo',backmap='Về bản đồ sự nghiệp',achievements='Kết quả nổi bật',owned='Phạm vi phụ trách',first='Điểm bắt đầu',last='Hành trình tiếp tục...',footer='Tăng trưởng của bạn đang vướng ở đâu?',footer_text='Lead chưa được chăm sóc, công cụ rời rạc hay báo cáo đến quá muộn. Cùng xác định vấn đề và bước tiếp theo phù hợp.',updated='Cập nhật',skip='Đến nội dung chính',map_label='Bản đồ sự nghiệp',station='Trạm',also='cùng với',current='Vai trò hiện tại')}

def route(lang,slug=None):
 return ('/vi' if lang=='vi' else '')+('/career/'+slug+'/' if slug else '/')

def arrow(direction,small=False):
 if not direction:return ''
 path='M12 27 V6 M5 13 L12 5 L19 13' if direction=='up' else 'M12 3 V24 M5 17 L12 25 L19 17'
 return f'<svg width="{26 if small else 42}" height="{34 if small else 54}" viewBox="0 0 24 30" role="img" aria-label="{"Up" if direction=="up" else "Down"}"><path d="{path}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def tags(station,data):
 return ''.join(f'<span class="tag">{E(data["skills"][key]["label"])}</span>' for key in station['skills'])

def footer(lang,data):
 t=UI[lang]
 return f'<footer id="contact" class="contact"><div class="w contact-inner"><h2>{t["footer"]}</h2><div><div class="contact-links"><a href="mailto:{data["person"]["email"]}">{data["person"]["email"]}</a><a href="{data["person"]["linkedin"]}">LinkedIn</a><a href="/cv.pdf" download>{t["download"]} (PDF)</a></div><p class="m contact-date">{t["updated"]}: 2026-10-21</p></div></div></footer>'

def shell(lang,data,title,body,slug=None,page_path=None,page_description=None):
 t=UI[lang]; home=route(lang); other='vi' if lang=='en' else 'en'
 path=page_path or route(lang,slug); base=data['person']['site']
 en_path=path.removeprefix('/vi') if lang=='vi' else path
 vi_path='/vi'+en_path
 other_path=vi_path if other=='vi' else en_path
 person={'@context':'https://schema.org','@type':'Person','name':data['person']['name'],'url':base,'jobTitle':'Marketing Manager','worksFor':{'@type':'Organization','name':'Tastech PTE. Ltd (FindTourGo)'},'alumniOf':{'@type':'CollegeOrUniversity','name':'University of Languages and International Studies, VNU'},'knowsAbout':['Performance marketing','CRM and marketing automation','Lifecycle marketing','Data analytics and A/B testing','B2B partnerships','Southeast Asia markets'],'sameAs':[data['person']['linkedin']]}
 if slug:
  station=next(s for s in data['stations'] if s['slug']==slug)
  person['hasOccupation']={'@type':'Occupation','name':station['role'],'description':station['name']+' · '+station['period']+'. '+station['summary']}
 description=page_description or (data['about'] if not slug else station['context'])
 header=f'<a class="skip" href="#main">{t["skip"]}</a><div class="w"><header class="header"><a class="brand g" href="{home}">tuan do</a><nav aria-label="{"Main navigation" if lang=="en" else "Điều hướng chính"}"><a href="{home}#about">{t["about"]}</a><a href="{home}#map">{t["career"]}</a><a href="#contact">{t["contact"]}</a></nav><div class="header-actions"><a class="btn pri" href="/cv.pdf" download>{t["download"]}</a><a class="lang" href="{other_path}" lang="{other}" hreflang="{other}" aria-label="{"Tiếng Việt" if other=="vi" else "English"}">{"VI" if other=="vi" else "EN"}</a></div></header></div>'
 head=f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><link rel="icon" href="/favicon.png" type="image/png"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{E(title)} — Tuan Do</title><meta name="description" content="{E(description)}"><link rel="canonical" href="{base+path}"><link rel="alternate" hreflang="en" href="{base+en_path}"><link rel="alternate" hreflang="vi" href="{base+vi_path}"><link rel="alternate" hreflang="x-default" href="{base+en_path}"><meta property="og:title" content="{E(title)} — Tuan Do"><meta property="og:description" content="{E(description)}"><meta property="og:type" content="website"><meta property="og:url" content="{base+path}"><meta property="og:image" content="{base}/assets/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="preload" href="/assets/fonts/bricolage-grotesque-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/be-vietnam-pro-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/ibm-plex-mono-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/assets/metro-v2.css"><script type="application/ld+json">{json.dumps(person,ensure_ascii=False).replace("<","\\u003c")}</script></head><body>'
 header=header.replace(f'<a href="#contact">',f'<a href="{projects.route(lang)}">{"Dự án" if lang=="vi" else "Projects"}</a><a href="#contact">')
 enhancement='<script src="/assets/metro-motion.js" defer></script>' if slug is None and page_path is None else ''
 return head+header+body+footer(lang,data)+enhancement+'</body></html>'

def skyline():
 rng=random.Random(11); svg=''; x=0
 while x<1152:
  width=rng.randint(28,64);height=rng.randint(70,210);y=450-height
  color=rng.choice(['#E4DAC2','#DCD1B6'])
  svg+=f'<rect x="{x}" y="{y}" width="{width}" height="{height}" fill="{color}"/>'
  if rng.random()<.3:svg+=f'<path d="M{x+width/2} {y} v-18" stroke="{color}" stroke-width="3"/>'
  for xx in range(x+8,x+width-7,12):
   for yy in range(y+12,440,16):
    if rng.random()>.3:svg+=f'<rect x="{xx}" y="{yy}" width="5" height="7" fill="#EFE7D2"/>'
  x+=width+rng.randint(4,12)
 return svg

SKY=skyline()

def panel(station,data,lang,mobile=False):
 t=UI[lang]; index=ord(station['id'])-ord('a');h=station['headline'];nav=''
 if index:nav+=f'<label class="btn" for="{data["stations"][index-1]["id"]}">{t["back"]}: {E(data["stations"][index-1]["short"])}</label>'
 if index<4:nav+=f'<label class="btn" for="{data["stations"][index+1]["id"]}">{t["next"]}: {E(data["stations"][index+1]["short"])}</label>'
 details=f'<div class="m muted">{E(station["period"])}</div><div class="station-heading"><h2>{E(station["name"])}</h2><details class="company-info"><summary aria-label="{'Giới thiệu công ty' if lang=='vi' else 'About this company'}">ⓘ</summary><p>{E(station["company_intro"])}</p></details></div><p class="role">{E(station["role"])}</p><div>{tags(station,data)}</div><p class="summary">{E(station["summary"])}</p><p class="how"><span class="m muted">{t["how"].lower()} </span>{E(station["how"])}</p><div class="panel-actions"><a class="btn pri" href="{route(lang,station["slug"])}">{t["details"]}</a><div class="panel-steps">{nav}</div></div>'
 if mobile:return f'<article class="mobile-panel"><p class="stat-caption">{E(h["caption"])}</p>{details}</article>'
 return f'<article class="pn p{station["id"]}" aria-label="{E(station["name"])}"><div><div class="g big-stat">{E(h["value"])}{arrow(h["dir"])}</div><p class="stat-caption">{E(h["caption"])}</p></div><div>{details}</div></article>'

def map_html(data,lang):
 return panorama.generate(data,lang,GEOM,panel,UI)

def home(data,lang):
 t=UI[lang]
 stats=''
 for metric in data['impact_metrics']:
  value=f'{metric["number"]:,}'
  if lang=='vi':value=value.replace(',','.')
  value=metric['prefix']+value+metric['suffix']
  stats+=f'<div class="stat impact-card"><p class="impact-tag m">{E(metric["tag"])}</p><div class="g"><span class="sr-only">{E(value)}</span><span aria-hidden="true" data-count-to="{metric["number"]}" data-prefix="{E(metric["prefix"])}" data-suffix="{E(metric["suffix"])}">{E(value)}</span></div><p class="impact-label">{E(metric["label"])}</p><p class="impact-context">{E(metric["context"])}</p><span class="impact-mark" aria-hidden="true"></span></div>'
 about=''.join('<p>'+E(p)+'</p>' for p in data['about_paragraphs'])
 return f'<main id="main" class="w"><section class="hero"><p class="eyebrow">{E(data["hero"]["eyebrow"])}</p><h1>{E(data["hero"]["title"])}</h1><p>{E(data["hero"]["sub"])}</p></section><section id="about" class="about"><img class="portrait" src="/assets/portrait.webp" alt="Do Manh Tuan" width="440" height="531"><div class="about-copy"><h2>{E(data["about_title"])}</h2>{about}</div><div class="stats">{stats}</div></section>{map_html(data,lang)}</main>'

def detail(station,data,lang):
 t=UI[lang];index=ord(station['id'])-ord('a');achievements=''
 for a in station['achievements']:
  lead=f'<div class="g">{E(a["value"])}{arrow(a["dir"],True)}</div>' if a['value'] else f'<div class="m muted">{t["also"]}</div>'
  achievements+=f'<div class="achievement">{lead}<p>{E(a["text"])}</p></div>'
 previous=f'<a class="btn" href="{route(lang,data["stations"][index-1]["slug"])}">{t["back"]}: {E(data["stations"][index-1]["short"])}</a>' if index else f'<span class="muted">{t["first"]}</span>'
 following=f'<a class="btn" href="{route(lang,data["stations"][index+1]["slug"])}">{t["next"]}: {E(data["stations"][index+1]["short"])} →</a>' if index<4 else f'<span class="muted">{t["last"]}</span>'
 return f'<main id="main" class="w"><nav class="m breadcrumb" aria-label="Breadcrumb"><a class="btn" href="{route(lang)}#map">{t["backmap"]}</a></nav><article class="detail"><div class="detail-intro"><div class="detail-tags">{tags(station,data)}</div><h1>{E(station["name"])}</h1><div class="m muted">{t["station"]} {index+1}/5 · {E(station["period"])} · {E(station["role"])}</div><p class="context">{E(station["context"])}</p></div><h2>{t["achievements"]}</h2><div class="achievements" style="--columns:{len(station["achievements"])}">{achievements}</div><h2>{t["owned"]}</h2>'+''.join(f'<div class="owned"><span class="m muted">{E(label)}</span><span>{E(text)}</span></div>' for label,text in station['owned'])+f'<nav class="page-steps" aria-label="Career stops">{previous}<a class="btn" href="{route(lang)}#map">{t["backmap"]}</a>{following}</nav></article></main>'

def generated_css(data):
 css=(SRC/'site.css').read_text(encoding='utf-8')
 css+='\n'+(SRC/'refinement.css').read_text(encoding='utf-8')
 css+=f'\n.train{{offset-path:path("{GEOM["trunk"]}");offset-distance:{GEOM["distances"]["e"]}%}}\n'
 for s in data['stations']:
  x=s['id'];css+=f'#{x}:checked~.map [for={x}] .cr{{fill:rgba(255,216,75,.8);stroke-width:4}}#{x}:checked~.map [for={x}] .nm{{background:#17140F;color:#F5F0E4}}#{x}:checked~.map [for={x}] .nm small{{color:#D9D2C0}}#{x}:checked~.map [for={x}]::after{{opacity:.9}}#{x}:checked~.map .train{{offset-distance:{GEOM["distances"][x]}%}}#{x}:checked~.panels .p{x}{{display:grid}}#{x}:focus-visible~.map [for={x}]{{outline:3px solid #17140F;outline-offset:10px}}#{x}:checked~.mobile-list .item-{x} .mobile-panel{{display:block}}#{x}:checked~.mobile-list .item-{x} .mobile-station{{background:#FFE9A0}}#{x}:focus-visible~.mobile-list [for={x}]{{outline:3px solid #17140F;outline-offset:3px}}@media(prefers-reduced-motion:no-preference){{#{x}:checked~.map [for={x}]::after{{animation:pulse 1.8s infinite}}}}\n'
 for n in range(5):
  color=COLORS[n-1] if n else '#17140F';ink='#17140F' if n==4 else '#FFFFFF'
  css+=f'#k{n}:checked~.bar [for=k{n}]{{background:{color};border-color:{color};color:{ink}}}#k{n}:focus-visible~.bar [for=k{n}]{{outline:3px solid #17140F;outline-offset:3px}}#k{n}:checked~.skills .s{n}{{display:flex}}\n'
  if n:css+=f'#k{n}:checked~.bar [for=k{n}] .sw{{background:{ink}}}#k{n}:checked~.map .l:not(.l{n}),#k{n}:checked~.mobile-list .l:not(.l{n}){{opacity:.12}}#k{n}:checked~.map .st:not(.k{n}),#k{n}:checked~.mobile-list .mobile-item:not(.k{n}){{filter:opacity(.2)}}\n'
 return css+'\n'+(SRC/'panorama.css').read_text(encoding='utf-8')+'\n'+panorama.state_css(GEOM)+'\n'+(SRC/'editorial.css').read_text(encoding='utf-8')+'\n'+(SRC/'arrival.css').read_text(encoding='utf-8')

def write(path,content):
 target=ROOT/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(content,encoding='utf-8')

if __name__=='__main__':
 en=json.loads((SRC/'content.en.json').read_text(encoding='utf-8'))
 if '--production' in sys.argv:
  for lang in ['en','vi']:
   source=(SRC/f'content.{lang}.json').read_text(encoding='utf-8')
   if re.search(r'\[placeholder\]',source,re.I):raise SystemExit('Production blocked: unresolved placeholder')
  project_source=(SRC/'projects.json').read_text(encoding='utf-8')
  if re.search(r'\[(?:YEAR|RESULT|BUDGET|CHANNEL|PLACEHOLDER)',project_source,re.I):raise SystemExit('Production blocked: incomplete project content')
 urls=[]
 for lang in ['en','vi']:
  data=json.loads((SRC/f'content.{lang}.json').read_text(encoding='utf-8'))
  document=shell(lang,data,data['hero']['title'],home(data,lang))
  write(('vi/' if lang=='vi' else '')+'index.html',document);urls.append(route(lang))
  if lang=='en':write('Main.dc.html',document)
  listing=shell(lang,data,'Dự án' if lang=='vi' else 'Projects',projects.listing(lang),page_path=projects.route(lang),page_description='Các dự án marketing freelance của Đỗ Mạnh Tuấn.' if lang=='vi' else 'Freelance marketing projects by Tuan Do.')
  write(projects.route(lang).strip('/')+'/index.html',listing);urls.append(projects.route(lang))
  if lang=='en':write('Side-projects.dc.html',listing)
  for project in projects.DATA:
   page=shell(lang,data,projects.text(project['title'],lang),projects.detail(project,lang),page_path=projects.route(lang,project['slug']),page_description=projects.text(project['summary'],lang))
   write(projects.route(lang,project['slug']).strip('/')+'/index.html',page);urls.append(projects.route(lang,project['slug']))
   if lang=='en':write('Project-'+project['slug']+'.dc.html',page)
  for station in data['stations']:
   document=shell(lang,data,station['name'],detail(station,data,lang),station['slug'])
   write(route(lang,station['slug']).strip('/')+'/index.html',document);urls.append(route(lang,station['slug']))
   if lang=='en':write(f'Case-{station["slug"]}.dc.html',document)
 write('assets/metro-v2.css',generated_css(en))
 write('assets/metro-motion.js',(SRC/'metro-motion.js').read_text(encoding='utf-8'))
 write('llms.txt','# Do Manh Tuan — Growth & Digital Marketing\n\n'+en['about']+'\n\n## Career\n'+''.join(f'- [{s["name"]}]({en["person"]["site"]+route("en",s["slug"])}): {s["period"]}, {s["role"]}. {s["headline"]["value"]} {s["headline"]["caption"]}.\n' for s in en['stations'])+'\n## Vietnamese\n- https://tuando.work/vi/\n\n## Contact\n- hello@tuando.work\n- https://www.linkedin.com/in/dmt1810\n')
 write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>https://tuando.work{url}</loc><lastmod>2026-10-21</lastmod></url>' for url in urls)+'</urlset>')
 write('robots.txt','User-agent: *\nAllow: /\nSitemap: https://tuando.work/sitemap.xml\n')
 projects_text='\n## Projects\n'+''.join(f'- [{p["name"]}]({en["person"]["site"]+projects.route("en",p["slug"])}): {projects.text(p["summary"],"en")}\n' for p in projects.DATA)
 write('llms.txt',(ROOT/'llms.txt').read_text(encoding='utf-8')+projects_text)
 print('Built 22 EN/VI routes, updated project pages, metro and legacy aliases.')
