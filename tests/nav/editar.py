import os,pathlib
RAIZ=str(pathlib.Path(__file__).resolve().parents[2]);os.makedirs('/tmp/shots',exist_ok=True)
from playwright.sync_api import sync_playwright
import json
def prog(p): return p.evaluate('JSON.stringify(RL.App._E.prog)')
def flat(p):
    pr=json.loads(prog(p)); f=lambda it:(it['o'] if 'o' in it else (('R%s'%it.get('rep',it.get('hasta')))+'['+''.join(it['body'])+']'))
    return ' '.join(f(i) for i in pr)
def centro(p,sel):
    b=p.query_selector(sel).bounding_box(); return b['x']+b['width']/2,b['y']+b['height']/2
def arrastrar(p,origen,destino):
    x,y=centro(p,origen); p.mouse.move(x,y); p.mouse.down()
    x2,y2=centro(p,destino); p.mouse.move(x+20,y+10,steps=2); p.mouse.move(x2,y2,steps=8); p.mouse.up(); p.wait_for_timeout(150)
errs=[]; ok=True
def chk(p,esp,nom):
    global ok; g=flat(p); r=(g==esp); ok&=r; print(('ok  ' if r else 'FALLA'),nom,'->',g,'' if r else '(esperado %s)'%esp)
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox']); p=b.new_page(viewport={'width':1100,'height':1000})
    p.on('pageerror',lambda e:errs.append(str(e))); p.on('console',lambda m: errs.append(m.text) if m.type in('error','warning') else None)
    p.goto('file://'+RAIZ+'/index.html'); c=lambda s:p.click(s,timeout=3000,force=True)
    c('[data-id="z3m1"]')
    for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
    c('[data-p="disena"]')
    for k,i in [('mov','patas'),('ene','bateria'),('sen','camara'),('her','regadera')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
    c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]'); p.wait_for_timeout(400)
    for o in 'NNN': c(f'[data-act="ord"][data-o="{o}"]')
    chk(p,'N N N','añadir al final')
    c('.tira .slot[data-i="1"][data-p=""]'); c('[data-act="ord"][data-o="E"]'); chk(p,'N E N N','insertar en medio (toca hueco + orden)')
    c('[data-act="ord"][data-o="S"]'); chk(p,'N E S N N','el cursor avanza tras insertar')
    arrastrar(p,'.pal [data-o="O"]','.tira .slot[data-i="0"][data-p=""]'); chk(p,'O N E S N N','arrastrar de la paleta al principio')
    arrastrar(p,'.tira .blk[data-i="0"][data-p=""]','.tira .slot[data-i="6"][data-p=""]'); chk(p,'N E S N N O','arrastrar un bloque al final')
    arrastrar(p,'.tira .blk[data-i="5"][data-p=""]','.tira .slot[data-i="2"][data-p=""]'); chk(p,'N E O S N N','arrastrar un bloque hacia atrás')
    c('.tira .blk[data-i="2"][data-p=""]'); c('[data-act="borrar"]'); chk(p,'N E S N N','marcar + borrar quita solo ese bloque')
    c('[data-act="ord"][data-o="O"]'); chk(p,'N E O S N N','tras borrar, el nuevo entra en su sitio')
    c('.tira .blk[data-i="2"][data-p=""]'); c('.tira .slot[data-i="0"][data-p=""]'); chk(p,'O N E S N N','dos toques: marcar bloque y tocar hueco lo mueve')
    arrastrar(p,'.tira .blk[data-i="0"][data-p=""]','.pal [data-act="borrar"]'); chk(p,'N E S N N','arrastrar un bloque a la paleta lo quita')
    # vaciar y programar la solución editando
    c('.tira .slot[data-i="5"][data-p=""]')
    for _ in range(5): c('[data-act="borrar"]')
    chk(p,'','borrar sin marcar quita el anterior al hueco')
    c('[data-act="rep"][data-n="4"]'); c('[data-act="ord"][data-o="N"]'); c('[data-act="salir"]'); c('[data-act="rep"][data-n="2"]'); c('[data-act="ord"][data-o="E"]')
    chk(p,'R4[N] R2[E]','bucles: crear, salir y crear otro')
    c('.tira .slot[data-i="0"][data-p="0"]'); c('[data-act="ord"][data-o="N"]'); chk(p,'R4[NN] R2[E]','insertar dentro de un bucle existente')
    c('.tira .blk[data-i="1"][data-p="0"]'); c('[data-act="borrar"]'); chk(p,'R4[N] R2[E]','borrar dentro de un bucle')
    arrastrar(p,'.pal [data-act="rep"][data-n="3"]','.tira .slot[data-i="0"][data-p="1"]'); chk(p,'R4[N] R2[E]','un bucle no se puede soltar dentro de otro')
    arrastrar(p,'.tira .blk[data-i="0"][data-p="1"]','.tira .slot[data-i="1"][data-p="0"]'); chk(p,'R4[NE] R2[]','mover una orden de un bucle a otro')
    arrastrar(p,'.tira .blk[data-i="1"][data-p="0"]','.tira .slot[data-i="2"][data-p="1"]') if False else None
    # teclado: marcar con Espacio
    p.focus('.tira .blk[data-i="1"][data-p="0"]'); p.keyboard.press(' '); c('[data-act="borrar"]'); chk(p,'R4[N] R2[]','teclado: Espacio marca y borrar quita')
    c('.tira .slot[data-i="0"][data-p="1"]'); c('[data-act="ord"][data-o="E"]'); chk(p,'R4[N] R2[E]','volver a rellenar')
    c('[data-act="probar"]'); p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=25000)
    r=p.evaluate('({meta:RL.App._E.res.meta,f:RL.App._E.res.fallo&&RL.App._E.res.fallo.tipo})'); print('prueba tras editar:',r); ok&=bool(r['meta'])
    p.screenshot(path='/tmp/shots/editar.png',full_page=True)
    b.close()
print('errores consola:',errs); print('TODO OK' if ok and not errs else 'HAY FALLOS')
