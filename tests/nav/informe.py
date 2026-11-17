import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
from playwright.sync_api import sync_playwright
import sys; sys.path.insert(0,'tests/nav')
URL='file://'+RAIZ+'/index.html'
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox']); p=b.new_page(viewport={'width':820,'height':1000}); errs=[]
    p.on('pageerror',lambda e:errs.append(str(e))); p.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    p.goto(URL); p.wait_for_selector('.card.mis')
    c=lambda s:p.click(s,timeout=3000,force=True)
    c('[data-id="z3m1"]')
    for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
    c('[data-p="disena"]')
    for k,i in [('mov','ruedas'),('ene','bateria'),('sen','camara'),('her','regadera')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
    c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
    c('[data-n="4"]');c('[data-o="N"]');c('[data-act="salir"]');c('[data-n="2"]');c('[data-o="E"]');c('[data-act="probar"]')
    p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=20000)
    c('[data-p="disena"]');c('[data-act="pieza"][data-k="mov"][data-id="patas"]');c('[data-p="programa"]');c('[data-act="probar"]')
    p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res&&RL.App._E.res.meta',timeout=20000)
    c('[data-p="bitacora"]'); ok=p.evaluate('RL.App._E.m.bitacora.findIndex(b=>b.ok)')
    c(f'[data-act="frase"][data-i="{ok}"]');c('[data-e="c"]');c('[data-act="terminar"]')
    c('[data-p="informe"]'); p.wait_for_timeout(500); p.screenshot(path='/tmp/shots/informe.png',full_page=True)
    p.pdf(path='/tmp/shots/informe.pdf',format='A4'); print('errores',errs)
