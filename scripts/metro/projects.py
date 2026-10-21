"""Public project content. Source workbooks and reconciliation remain outside dist."""
from pathlib import Path
import json,html
SRC=Path(__file__).parent
DATA=json.loads((SRC/'projects.json').read_text(encoding='utf-8'))
E=lambda v:html.escape(str(v),quote=True)
def text(value,lang):return value.get(lang,'') if isinstance(value,dict) else value
def route(lang,slug=''):return ('/vi' if lang=='vi' else '')+'/projects/'+(slug+'/' if slug else '')
def number(metric,lang):
 value=metric['value'];kind=metric['format'];decimals=metric.get('decimals',0)
 if kind=='range-thousand':return f'{value[0]//1000}–{value[1]//1000}K'
 if kind=='million':value/=1000000
 if kind=='percent':value*=100
 result=f'{value:,.{decimals}f}'
 if lang=='vi':result=result.replace(',','@').replace('.',',').replace('@','.')
 return result+('M' if lang=='en' else ' triệu') if kind=='million' else result+('%' if kind=='percent' else '')
def channels(project):return ''.join('<span class="channel">'+E(c)+'</span>' for c in project['channels'])
def logo(project):
 bounds={'catsa':('33 0 236 80',300,80),'cenhomes':('65 205 1082 184',1280,542),'hanoicc':('65 191 370 117',500,500)}
 if project['slug'] not in bounds:return f'<img class="project-logo" src="{project["logo"]}" alt="{E(project["name"])}" width="180" height="72">'
 box,w,h=bounds[project['slug']]
 return f'<svg class="project-logo" viewBox="{box}" width="180" height="72" role="img" aria-label="{E(project["name"])}" preserveAspectRatio="xMinYMid meet"><image href="{project["logo"]}" width="{w}" height="{h}"/></svg>'
def breadcrumb(lang,name=None):
 home='/vi/' if lang=='vi' else '/';label='Dự án' if lang=='vi' else 'Projects'
 return f'<nav class="m breadcrumb project-crumb" aria-label="Breadcrumb"><a href="{home}#map">'+('Sự nghiệp' if lang=='vi' else 'Career')+f'</a><span aria-hidden="true">/</span><a href="{route(lang)}">{label}</a>'+(f'<span aria-hidden="true">/</span><span>{E(name)}</span>' if name else '')+'</nav>'
def listing(lang):
 vi=lang=='vi';cards=''
 for p in DATA:
  meta=text(p['industry'],lang)+((' · '+text(p['period'],lang)) if 'period' in p else '')
  cards+=f'<article class="project-card">{logo(p)}<p class="m muted">{E(meta)}</p><h2><a href="{route(lang,p["slug"])}">{E(text(p["title"],lang))}</a></h2><p>{E(text(p["summary"],lang))}</p><div class="channels">{channels(p)}</div><a class="project-more" href="{route(lang,p["slug"])}">'+('Xem dự án' if vi else 'View project')+' <span aria-hidden="true">↗</span></a></article>'
 return '<main id="main" class="w project-page">'+breadcrumb(lang)+'<section class="project-list-intro"><p class="m muted">Freelance</p><h1>'+('Dự án.' if vi else 'Projects.')+'</h1><p>'+('Các dự án quảng cáo và tuyển sinh tôi trực tiếp triển khai.' if vi else 'Freelance projects in paid advertising and enrollment campaigns.')+'</p></section><div class="project-grid">'+cards+'</div></main>'
def detail(p,lang):
 vi=lang=='vi';cards=''
 for m in p['metrics']:
  value=E(number(m,lang))
  if vi and m['format']=='million':value='<span>'+value.removesuffix(' triệu')+'</span><span class="metric-scale">triệu</span>'
  cards+=f'<div class="metric-card"><dt>{E(text(m["label"],lang))}</dt><dd class="g">{value}</dd><dd class="metric-unit">{E(text(m["unit"],lang))}</dd></div>'
 meta=('Tư vấn marketing freelance' if vi else 'Freelance marketing consultant')+' · '+text(p['industry'],lang)
 if 'period' in p:meta+=' · '+text(p['period'],lang)
 index=DATA.index(p);following=DATA[(index+1)%len(DATA)]
 return '<main id="main" class="w project-page">'+breadcrumb(lang,p['name'])+f'<article class="project-detail"><header class="project-intro">{logo(p)}<p class="m muted">{E(meta)}</p><h1>{E(text(p["title"],lang))}</h1><p class="project-summary">{E(text(p["summary"],lang))}</p></header><section class="project-channels"><h2>'+('Kênh triển khai' if vi else 'Channels')+'</h2><div class="channels">'+channels(p)+'</div></section><section class="project-results"><div class="results-heading"><h2>'+('Kết quả' if vi else 'Results')+'</h2><p class="m muted">'+E(text(p['results_scope'],lang))+f'</p></div><dl class="metrics-grid" style="--metric-columns:{min(4,len(p["metrics"]))}">{cards}</dl></section><nav class="page-steps" aria-label="'+('Điều hướng dự án' if vi else 'Project navigation')+f'"><a class="btn" href="{route(lang)}">'+('Tất cả dự án' if vi else 'All projects')+f'</a><a class="btn" href="{route(lang,following["slug"])}">{E(following["name"])} →</a></nav></article></main>'
