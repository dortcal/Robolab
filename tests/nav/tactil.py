import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
from playwright.sync_api import sync_playwright
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox']); ctx=b.new_context(viewport={'width':820,'height':1100},has_touch=True,is_mobile=True); p=ctx.new_page(); errs=[]
    p.on('pageerror',lambda e:errs.append(str(e)))
    p.goto('file://'+RAIZ+'/index.html'); c=lambda s:p.tap(s,timeout=3000,force=True)
    c('[data-id="z3m1"]')
    for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
    c('[data-p="disena"]')
    for k,i in [('mov','patas'),('ene','bateria'),('sen','camara'),('her','regadera')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
    c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]'); p.wait_for_timeout(400)
    for o in 'NN': c(f'[data-act="ord"][data-o="{o}"]')
    cdp=ctx.new_cdp_session(p)
    def cen(sel):
        b=p.query_selector(sel).bounding_box(); return b['x']+b['width']/2,b['y']+b['height']/2
    x,y=cen('.pal [data-o="E"]'); x2,y2=cen('.tira .slot[data-i="1"][data-p=""]')
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    for k in range(1,11): cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+(x2-x)*k/10,'y':y+(y2-y)*k/10}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]}); p.wait_for_timeout(200)
    print('programa tras arrastre táctil:',p.evaluate('JSON.stringify(RL.App._E.prog)'),'scrollY',p.evaluate('scrollY'),errs)
