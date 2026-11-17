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
        S=lambda:json.loads(p.evaluate('JSON.stringify({p:RL.App._E.prog,f:RL.App._E.fn})'))
        c('[data-id="z6p1"]')
        for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
        c('[data-p="disena"]')
        chk(p.evaluate('!!document.querySelector(\'[data-act="pieza"][data-id="telescopio"]\')'),nom+': el telescopio se ofrece en la cumbre')
        for k,i in [('mov','ruedas'),('ene','bateria'),('sen','telescopio'),('her','pinza')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
        c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        chk(p.evaluate('document.querySelector(\'.pal [data-o="llamar"]\').disabled'),nom+': «Mi rutina» no se puede llamar si está vacía')
        c('.tira .slot[data-c="F"][data-i="0"]')
        chk(p.evaluate('document.querySelector(\'.pal [data-o="llamar"]\').disabled'),nom+': dentro de la rutina no hay llamada')
        for o in ['A','A','contar']: c(f'.pal [data-o="{o}"]')
        chk(S()['f']==[{'o':'A'},{'o':'A'},{'o':'contar'}],nom+': la rutina queda definida')
        c('.tira .slot[data-c=""][data-i="0"]')
        for o in ['llamar','GD','A','llamar','GI','llamar','GD','A','llamar']: c(f'.pal [data-o="{o}"]')
        chk(len(S()['p'])==9 and S()['p'][0]=={'llama':1},nom+': programa con 4 llamadas')
        chk(p.evaluate('RL.Interprete.coste(RL.App._E.prog,RL.App._E.fn)')==13,nom+': coste 13 (definición 4 + 9)')
        # una llamada no se arrastra a la rutina; límite 14
        c('.tira .blk[data-c=""][data-i="0"]'); c('.tira .slot[data-c="F"][data-i="0"]')
        chk(S()['f']==[{'o':'A'},{'o':'A'},{'o':'contar'}] and S()['p'][0]=={'llama':1},nom+': una llamada no cabe dentro de la rutina')
        c('.tira .slot[data-c=""][data-i="9"]'); c('.pal [data-o="A"]')
        chk(len(S()['p'])==10,nom+': 14 es el límite y cabe')
        c('.pal [data-o="A"]')
        chk(len(S()['p'])==10,nom+': por encima del límite no se añade')
        c('[data-act="borrar"]')
        p.screenshot(path=f'/tmp/shots/cup_prog_{nom}.png',full_page=True)
        c('[data-act="probar"]'); p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=40000)
        r=p.evaluate('({meta:RL.App._E.res.meta,f:RL.App._E.res.fallo&&RL.App._E.res.fallo.tipo,cuenta:RL.App._E.res.cuenta,txt:document.querySelector("#cnt").textContent})')
        print(nom,r); chk(r['meta'] and r['cuenta']==4,nom+': cuenta las 4 cúpulas y llega a la meta'); chk(r['txt']=='4',nom+': el contador se ve en pantalla')
        p.screenshot(path=f'/tmp/shots/cup_fin_{nom}.png',full_page=True)
        p.close(); chk(not e,nom+': sin errores de consola '+str(e))
print('TODO OK' if ok else 'HAY FALLOS')
