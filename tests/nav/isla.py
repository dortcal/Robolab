import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
from playwright.sync_api import sync_playwright
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for nom,(w,h) in {'pc':(1280,900),'movil':(390,800)}.items():
        p=b.new_page(viewport={'width':w,'height':h}); e=[]
        p.on('pageerror',lambda x:e.append(str(x))); p.on('console',lambda m: e.append(m.text) if m.type in('error','warning') else None)
        p.goto('file://'+RAIZ+'/index.html'); c=lambda s:p.click(s,timeout=3000,force=True)
        c('[data-id="z5p1"]')
        for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
        p.wait_for_timeout(400); p.screenshot(path=f'/tmp/shots/isla_aviso_{nom}.png',full_page=True)
        c('[data-p="disena"]')
        for k,i in [('mov','ruedas'),('ene','solar'),('sen','camara'),('her','pinza')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
        c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        c('[data-act="hasta"]');c('[data-o="A"]');c('[data-act="salir"]');c('[data-o="GD"]');c('[data-act="hasta"]');c('[data-o="A"]')
        c('[data-act="probar"]'); p.wait_for_timeout(1200); p.screenshot(path=f'/tmp/shots/isla_mid_{nom}.png',full_page=True)
        p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=30000)
        print(nom,p.evaluate('({meta:RL.App._E.res.meta,coste:RL.App._E.res.coste,f:RL.App._E.res.fallo})'))
        p.screenshot(path=f'/tmp/shots/isla_fin_{nom}.png',full_page=True)
        c('[data-p="bitacora"]'); ok=p.evaluate('RL.App._E.m.bitacora.findIndex(b=>b.ok)')
        c(f'[data-act="frase"][data-i="{ok}"]');c('[data-e="c"]');c('[data-act="terminar"]')
        print(nom,p.evaluate('RL.Guardado.datos.estrellas'),e); p.close()
