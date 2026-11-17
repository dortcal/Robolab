import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
import sys, asyncio
from playwright.sync_api import sync_playwright
URL='file://'+RAIZ+'/index.html'
errs=[]
def click(p,sel):
    p.click(sel,timeout=3000)
def pieza(p,k,i): click(p,f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
def ord_(p,o): click(p,f'[data-act="ord"][data-o="{o}"]')
def rep(p,n): click(p,f'[data-act="rep"][data-n="{n}"]')
def esperar(p):
    p.wait_for_function('RL.App._E.ejecutando===false && RL.App._E.res!==null',timeout=20000); p.wait_for_timeout(300)
def montar(p,id,diseno,pred='ok'):
    click(p,f'[data-act="mision"][data-id="{id}"]')
    for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): p.click(f'[data-act="dato"][data-id="{i}"]',force=True)
    click(p,'[data-act="ir"][data-p="disena"]')
    for k,i in diseno: pieza(p,k,i)
    click(p,f'[data-act="pred"][data-id="{pred}"]')
    click(p,'[data-act="ir"][data-p="programa"]')
def final(p,frase_ok):
    for sel in ['[data-act="frase"][data-i="%d"]'%frase_ok,'[data-act="emo"][data-e="c"]','[data-act="terminar"]']: click(p,sel)
def sesion(p,tam,shot):
    p.on('console',lambda m: errs.append(m.text) if m.type in('error','warning') else None)
    p.on('pageerror',lambda e: errs.append(str(e)))
    p.goto(URL); p.wait_for_selector('.card.mis'); p.screenshot(path=f'/tmp/shots/{shot}_inicio.png')
    # z3m1 con fallo primero (ruedas)
    montar(p,'z3m1',[('mov','ruedas'),('ene','bateria'),('sen','camara'),('her','regadera')],'ok')
    p.wait_for_timeout(500);p.screenshot(path=f'/tmp/shots/{shot}_prog1.png',full_page=True)
    rep(p,4);ord_(p,'N');click(p,'[data-act="salir"]');rep(p,2);ord_(p,'E')
    click(p,'[data-act="probar"]'); esperar(p); p.screenshot(path=f'/tmp/shots/{shot}_fallo.png',full_page=True)
    st=p.evaluate('({f:RL.App._E.res.fallo&&RL.App._E.res.fallo.tipo,h:RL.App._E.hint})'); print(tam,'fallo1',st)
    assert st['f']=='patina'
    click(p,'[data-act="ir"][data-p="disena"]'); pieza(p,'mov','patas'); click(p,'[data-act="ir"][data-p="programa"]')
    click(p,'[data-act="probar"]'); esperar(p); p.screenshot(path=f'/tmp/shots/{shot}_exito.png',full_page=True)
    assert p.evaluate('RL.App._E.res.meta===true'); print(tam,'z3m1 ok')
    click(p,'[data-act="ir"][data-p="bitacora"]'); p.screenshot(path=f'/tmp/shots/{shot}_bitacora.png')
    ok=p.evaluate('RL.App._E.m.bitacora.findIndex(b=>b.ok)'); final(p,ok)
    p.wait_for_selector('.card.mis')
    # z3m2
    montar(p,'z3m2',[('mov','patas'),('ene','bateria'),('sen','humedad'),('her','pinza')])
    rep(p,4);ord_(p,'N');ord_(p,'medir')
    click(p,'[data-act="probar"]'); esperar(p)
    click(p,'[data-act="ir"][data-p="lectura"]'); 
    ms=p.evaluate('RL.App._E.res.medidas.map(x=>x.v)'); i=ms.index(max(ms)); p.screenshot(path=f'/tmp/shots/{shot}_lectura.png')
    click(p,f'[data-act="barra"][data-i="{i}"]'); click(p,'[data-act="ir"][data-p="bitacora"]')
    ok=p.evaluate('RL.App._E.m.bitacora.findIndex(b=>b.ok)'); final(p,ok); print(tam,'z3m2 ok',ms)
    # z3p3
    montar(p,'z3p3',[('mov','patas'),('ene','solar'),('sen','camara'),('her','pinza')])
    rep(p,5);ord_(p,'N');ord_(p,'E')
    click(p,'[data-act="probar"]'); esperar(p); assert p.evaluate('RL.App._E.res.meta===true')
    click(p,'[data-act="ir"][data-p="bitacora"]'); ok=p.evaluate('RL.App._E.m.bitacora.findIndex(b=>b.ok)'); final(p,ok)
    print(tam,'z3p3 ok', p.evaluate('JSON.parse(localStorage.getItem("robolab.proto.v1")).estrellas'))
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for tam,(w,h) in {'movil':(390,800),'tableta':(820,1100),'pc':(1280,800)}.items():
        pg=b.new_page(viewport={'width':w,'height':h}); sesion(pg,tam,tam); pg.close()
    b.close()
print('errores consola:',errs)
