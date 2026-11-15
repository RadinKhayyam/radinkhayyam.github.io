"""Import the approved copy without paraphrasing. Editorial notes are not rendered."""
from pathlib import Path
import re, json
raw = Path('content/site-copy.md').read_text()
def clean(t):
    t = re.sub(r'\[(?:Photo|DESIGN NOTE|CONFIRM)[^\]]*\]', '', t)
    t = re.sub(r'\*Note for the build:.*?\*', '', t, flags=re.S)
    return t.strip().strip('-').strip()
def between(t, a, b=None):
    t=t.split(a,1)[1]
    return clean(t.split(b,1)[0] if b else t)
pages = [between(raw, f'## {i}. ', f'## {i+1}. ') for i in range(1,6)]
home,research,experience,sport,blog=pages
chapters=[]
story=between(home,'### My story so far (scroll chapters)','### What I work on')
for part in re.split(r'(?=\*\*\d\. )',story)[1:]:
    head,body=part.split('\n',1)
    title,date=re.match(r'\*\*\d\. (.*?)\*\* · (.*)',head).groups()
    chapters.append(dict(title=title,date=date,body=clean(body)))
def entries(t):
    result=[]
    for p in re.split(r'\n\n(?=\*\*)',t):
        head,body=p.split('\n',1)
        m=re.match(r'\*\*(.*?)\*\*(.*)',head)
        result.append(dict(title=m[1],meta=m[2].strip(' ·'),body=body.strip()))
    return result
projecttext=between(experience,'Filter: **All** · **Personal** · **Course** · **Sharif** · **Koç**')
projects=entries(projecttext)
for p in projects:
    p['tags']=re.findall(r'`(.*?)`',p['meta'])
    p['meta']=re.sub(r'`.*?`','',p['meta']).strip(' ·')
copy={
'hero':between(home,'# Radin Khayyam','### About').split('\n\n')[:2],
'about':between(home,'### About','### My story'),
'chapters':chapters,
'work':between(home,'### What I work on','### Teasers'),
'contact':between(home,'### Contact').split('\n\n')[0],
'research':{
'intro':between(research,'### Intro','### Track 1'),
 'theory':between(research,'### Track 1: Theory of learning (main focus)','### Track 2'),
 'applied':between(research,'### Track 2: Applied AI','#### Research experience'),
 'experience':entries(between(research,'#### Research experience','### Publications')),
 'publications':between(research,'### Publications')},
'experience':{'intro':between(experience,'### Intro','### A.'),'entries':entries(between(experience,'### A. Experience','### B. Projects')),'projects':projects},
'sport':{'intro':between(sport,'### Intro','### Table tennis'), 'chapters':[], 'honors':between(sport,'#### Selected honors','### Running'),'running':between(sport,'### Running')},
'blog':{'intro':between(blog,'**Intro:**','**Empty state:**'),'empty':between(blog,'**Empty state:**')},
'seo':{'title':between(raw,'**SEO title:**','**Meta description:**'),'description':between(raw,'**Meta description:**','**Footer:**')}
}
for p in re.split(r'\n\n(?=\*\*)',between(sport,'### Table tennis','#### Selected honors')):
    m=re.match(r'\*\*(.*?)\*\* (.*)',p,re.S)
    copy['sport']['chapters'].append(dict(title=m[1],body=m[2]))
Path('src/data/copy.json').write_text(json.dumps(copy,ensure_ascii=False,indent=2)+'\n')
