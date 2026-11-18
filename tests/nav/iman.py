import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
from playwright.sync_api import sync_playwright
ok=True
def chk(c,nom):
    global ok; ok&=bool(c); print('ok  ' if c else 'FALLA',nom)
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for nom,(w,h) in {'pc':(1280,900),'movil':(390,800)}.items():
        p=b.new_page(viewport={'width':w,'height':h}); e=[]
        p.on('pageerror',lambda x:e.append(str(x))); p.on('console',lambda m: e.append(m.text) if m.type in('error','warning') else None)
        p.goto('file://'+RAIZ+'/index.html'); c=lambda s:p.click(s,timeout=3000,force=True)
        c('[data-id="z4m3"]')
        for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
        c('[data-p="disena"]')
        chk(p.evaluate('!!document.querySelector(\'[data-act="pieza"][data-id="iman"]\')'),nom+': el imán se ofrece')
        for k,i in [('mov','ruedas'),('ene','solar'),('sen','camara'),('her','pinza')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
        c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        c('.pal [data-act="rep"][data-n="5"]'); c('.pal [data-o="E"]'); c('[data-act="salir"]'); c('.pal [data-act="rep"][data-n="5"]'); c('.pal [data-o="N"]')
        run=lambda:(c('[data-act="probar"]'),p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=40000))
        run(); f=p.evaluate('RL.App._E.res.fallo&&RL.App._E.res.fallo.tipo')
        chk(f=='herramienta',nom+': con la pinza no sirve ('+str(f)+')')
        c('[data-act="ir"][data-p="disena"]'); c('[data-act="pieza"][data-k="her"][data-id="iman"]'); c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        run(); r=p.evaluate('({m:RL.App._E.res.meta,c:RL.App._E.res.coste})')
        chk(r['m'] and r['c']==4,nom+': con el imán llega con 4 órdenes')
        p.screenshot(path=f'/tmp/shots/iman_{nom}.png',full_page=True)
        chk(not e,nom+': sin errores de consola '+str(e)); p.close()
print('TODO OK' if ok else 'HAY FALLOS')
