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
        c('[data-id="z4m2"]')
        for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
        c('[data-p="linea"]')
        chk(p.evaluate('E=RL.App._E,E.pantalla')=='linea',nom+': se abre la línea del tiempo')
        chk(p.evaluate('document.querySelector(\'[data-p="disena"]\').disabled'),nom+': no se puede seguir sin ordenar')
        orden=['magma','enfria','asoma','vida']
        # colocar al revés: error
        for i in reversed(orden): c(f'[data-act="lpon"][data-id="{i}"]')
        c('[data-act="lcomp"]')
        t=p.inner_text('#ficha'); chk('Pista 1' in t,nom+': tras el primer fallo sale la pista 1: '+t[:60])
        # quitar todas y colocar con un error al final
        for i in reversed(orden): c(f'[data-act="lquita"][data-id="{i}"]')
        for i in ['magma','enfria','vida','asoma']: c(f'[data-act="lpon"][data-id="{i}"]')
        c('[data-act="lcomp"]'); t=p.inner_text('#ficha'); chk('Pista 2' in t,nom+': segundo fallo, pista 2: '+t[:80])
        c('[data-act="lpista"]'); t=p.inner_text('#ficha'); chk('Pista 3' in t and p.evaluate('RL.App._E.lin.pos.length')==3,nom+': la pista 3 coloca la tarjeta: '+t[:60])
        # arreglar
        for i in ['magma','enfria','asoma','vida']:
            if p.evaluate(f'RL.App._E.lin.pos.indexOf("{i}")')>=0 and p.evaluate(f'RL.App._E.lin.pos.indexOf("{i}")')!=orden.index(i): c(f'[data-act="lquita"][data-id="{i}"]')
        p.screenshot(path=f'/tmp/shots/linea_{nom}.png',full_page=True)
        pos=p.evaluate('RL.App._E.lin.pos'); 
        for i in orden:
            if i not in pos and p.evaluate(f'RL.App._E.lin.pos.length')==orden.index(i): c(f'[data-act="lpon"][data-id="{i}"]')
        c('[data-act="lcomp"]'); chk(p.evaluate('RL.App._E.lin.ok'),nom+': orden correcta')
        c('[data-p="disena"]')
        for k,i in [('mov','orugas'),('ene','solar'),('sen','camara'),('her','pinza')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
        c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        c('.pal [data-act="rep"][data-n="5"]'); c('.pal [data-o="N"]'); c('[data-act="salir"]'); c('.pal [data-o="E"]')
        c('[data-act="probar"]'); p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=40000)
        r=p.evaluate('({m:RL.App._E.res.meta,c:RL.App._E.res.coste})'); chk(r['m'] and r['c']==3,nom+': llega con 3 órdenes')
        chk(not e,nom+': sin errores de consola '+str(e)); p.close()
print('TODO OK' if ok else 'HAY FALLOS')
