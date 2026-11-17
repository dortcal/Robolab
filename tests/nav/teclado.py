import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
import random
random.seed(7)
from playwright.sync_api import sync_playwright
URL='file://'+RAIZ+'/index.html'
def ir_a(p,sel):
    for n in range(300):
        if p.evaluate('(s)=>document.activeElement.matches(s)',sel): return n
        p.keyboard.press(random.choice(['ArrowRight','ArrowRight','ArrowDown','ArrowDown','ArrowLeft','ArrowUp']))
    raise Exception('no alcanzado '+sel)
def pulsar(p,sel): ir_a(p,sel); p.keyboard.press(' '); p.wait_for_timeout(150)
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox']); p=b.new_page(viewport={'width':820,'height':1100}); errs=[]
    p.on('pageerror',lambda e:errs.append(str(e))); p.goto(URL); p.wait_for_selector('.card.mis'); p.wait_for_timeout(400)
    pulsar(p,'[data-id="z3m3"]')
    for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): pulsar(p,f'[data-act="dato"][data-id="{i}"]')
    pulsar(p,'[data-act="ir"][data-p="disena"]')
    for k,i in [('mov','patas'),('ene','solar'),('sen','camara'),('her','pinza')]: pulsar(p,f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
    pulsar(p,'[data-act="pred"][data-id="ok"]'); pulsar(p,'[data-act="ir"][data-p="programa"]')
    pulsar(p,'[data-act="rep"][data-n="5"]'); pulsar(p,'[data-act="ord"][data-o="N"]'); pulsar(p,'[data-act="ord"][data-o="E"]')
    pulsar(p,'[data-act="probar"]'); p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=20000)
    print('meta por teclado:',p.evaluate('RL.App._E.res.meta'))
    ok=p.evaluate('RL.App._E.m.bitacora.findIndex(b=>b.ok)')
    pulsar(p,'[data-act="ir"][data-p="bitacora"]'); pulsar(p,f'[data-act="frase"][data-i="{ok}"]'); pulsar(p,'[data-act="emo"][data-e="c"]'); pulsar(p,'[data-act="terminar"]')
    print('estrellas:',p.evaluate('RL.Guardado.datos.estrellas'),'errores:',errs)
    p.keyboard.press('Escape'); print('pantalla tras Esc:',p.evaluate('RL.App._E.pantalla'))
