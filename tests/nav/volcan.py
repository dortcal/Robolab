import os,pathlib,json
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
        c('[data-id="z4m1"]')
        for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
        c('[data-p="disena"]')
        chk(p.evaluate('!!document.querySelector(\'[data-act="pieza"][data-id="orugas"]\')'),nom+': las orugas se ofrecen en el volcán')
        for k,i in [('mov','ruedas'),('ene','solar'),('sen','camara'),('her','pinza')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
        c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        c('.pal [data-act="rep"][data-n="5"]'); c('.pal [data-o="N"]'); c('[data-act="salir"]'); c('.pal [data-act="rep"][data-n="4"]'); c('.pal [data-o="E"]')
        run=lambda:(c('[data-act="probar"]'),p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=40000))
        run(); f=p.evaluate('RL.App._E.res.fallo&&RL.App._E.res.fallo.tipo')
        chk(f=='hunde',nom+': con ruedas el robot se hunde en el picón ('+str(f)+')')
        c('[data-act="ir"][data-p="disena"]'); c('[data-act="pieza"][data-k="mov"][data-id="orugas"]'); c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        chk(p.evaluate('RL.App._E.prog.length')==2,nom+': el programa se conserva al cambiar el robot')
        run(); r=p.evaluate('({m:RL.App._E.res.meta,c:RL.App._E.res.coste})')
        chk(r['m'] and r['c']==4,nom+': con orugas llega con 4 órdenes')
        p.screenshot(path=f'/tmp/shots/volcan_{nom}.png',full_page=True)
        chk(not e,nom+': sin errores de consola '+str(e)); p.close()
print('TODO OK' if ok else 'HAY FALLOS')
