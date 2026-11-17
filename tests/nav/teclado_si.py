import os,pathlib,json,random
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
random.seed(11)
from playwright.sync_api import sync_playwright
def ir_a(p,sel):
    for n in range(600):
        if p.evaluate('(s)=>document.activeElement.matches(s)',sel): return n
        p.keyboard.press(random.choice(['ArrowRight','ArrowRight','ArrowDown','ArrowDown','ArrowLeft','ArrowUp']))
    raise Exception('no alcanzado '+sel)
def pulsar(p,sel): ir_a(p,sel); p.keyboard.press(' '); p.wait_for_timeout(150)
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox']); p=b.new_page(viewport={'width':820,'height':1100}); errs=[]
    p.on('pageerror',lambda e:errs.append(str(e))); p.goto('file://'+RAIZ+'/index.html'); p.wait_for_selector('.card.mis'); p.wait_for_timeout(400)
    pulsar(p,'[data-id="z5p2"]')
    for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): pulsar(p,f'[data-act="dato"][data-id="{i}"]')
    pulsar(p,'[data-act="ir"][data-p="disena"]')
    for k,i in [('mov','ruedas'),('ene','solar'),('sen','camara'),('her','pinza')]: pulsar(p,f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
    pulsar(p,'[data-act="pred"][data-id="ok"]'); pulsar(p,'[data-act="ir"][data-p="programa"]')
    pulsar(p,'[data-act="hasta"][data-cond="meta"]'); pulsar(p,'[data-act="si"][data-cond="roca"]'); pulsar(p,'[data-act="ord"][data-o="GD"]')
    pulsar(p,'.tira .slot[data-c="0.body.0.sino"][data-i="0"]'); pulsar(p,'[data-act="ord"][data-o="A"]')
    pulsar(p,'[data-act="salir"]'); pulsar(p,'[data-act="salir"]'); pulsar(p,'[data-act="ord"][data-o="A"]')
    print('programa:',p.evaluate('JSON.stringify(RL.App._E.prog)'))
    pulsar(p,'[data-act="probar"]'); p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=30000)
    r=p.evaluate('({meta:RL.App._E.res.meta,coste:RL.App._E.res.coste})'); print('meta por teclado:',r,'errores:',errs)
    # marcar el «si» con Espacio y moverlo a otro hueco con el teclado
    pulsar(p,'.tira .blk[data-c="0.body"][data-i="0"]'); pulsar(p,'.tira .slot[data-c=""][data-i="0"]')
    print('tras mover:',p.evaluate('JSON.stringify(RL.App._E.prog)')[:80])
    print('TODO OK' if r['meta'] and r['coste']==5 and not errs else 'FALLA')
