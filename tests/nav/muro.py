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
        c('[data-id="z5m2"]')
        for i in p.evaluate('Array.from(document.querySelectorAll("[data-act=dato]")).map(e=>e.dataset.id)'): c(f'[data-act="dato"][data-id="{i}"]')
        c('[data-p="disena"]')
        for k,i in [('mov','ruedas'),('ene','solar'),('sen','camara'),('her','pinza')]: c(f'[data-act="pieza"][data-k="{k}"][data-id="{i}"]')
        c('[data-act="pred"][data-id="ok"]'); c('[data-p="programa"]')
        c('[data-act="hasta"][data-cond="meta"]'); c('[data-act="si"][data-cond="roca"]')
        c('.tira [data-o="GD"], .pal [data-o="GD"]')
        c('.tira .slot[data-c="0.body.0.sino"][data-i="0"]'); c('.pal [data-o="A"]')
        P=lambda:json.loads(p.evaluate('JSON.stringify(RL.App._E.prog)'))
        chk(P()==[{'hasta':'meta','body':[{'si':'roca','alto':[{'o':'GD'}],'sino':[{'o':'A'}]}]}],nom+': si…si no dentro de «repetir hasta»')
        c('[data-act="salir"]');c('[data-act="salir"]');c('.pal [data-o="A"]')
        chk(P()[1]=={'o':'A'} and len(P())==2,nom+': salir dos veces y seguir al nivel superior')
        chk(p.evaluate('RL.Interprete.coste(RL.App._E.prog)')==5,nom+': coste 5')
        # profundidad 2: dentro del bucle cabe un «si»; dentro de una rama del «si» ya no
        chk(p.evaluate('document.querySelector(\'.pal [data-act="si"]\').disabled')==False,nom+': en el nivel superior se puede añadir si')
        c('.tira .slot[data-c="0.body.0.sino"][data-i="1"]')
        chk(p.evaluate('document.querySelector(\'.pal [data-act="si"]\').disabled')==True,nom+': dentro de la rama del si ya no cabe otro nivel')
        c('.tira .slot[data-c="0.body"][data-i="0"]')
        chk(p.evaluate('document.querySelector(\'.pal [data-act="si"]\').disabled')==False,nom+': dentro del bucle sí cabe un si')
        p.screenshot(path=f'/tmp/shots/muro_prog_{nom}.png',full_page=True)
        c('[data-act="probar"]'); p.wait_for_function('RL.App._E.ejecutando===false&&RL.App._E.res',timeout=30000)
        r=p.evaluate('({meta:RL.App._E.res.meta,f:RL.App._E.res.fallo&&RL.App._E.res.fallo.tipo})')
        print(nom,r)
        chk(r['meta'] and r['f'] is None,nom+': el programa llega a la meta')
        p.screenshot(path=f'/tmp/shots/muro_fin_{nom}.png',full_page=True)
        # mover el «si» entero fuera del bucle con dos toques, y comprobar que no se puede meter en sí mismo
        c('.tira .blk[data-c="0.body"][data-i="0"]'); c('.tira .slot[data-c="0.body.0.alto"][data-i="0"]')
        chk(P()[0]['body'][0].get('si')=='roca',nom+': un «si» no se mueve dentro de sí mismo')
        c('.tira .blk[data-c="0.body"][data-i="0"]'); c('.tira .slot[data-c=""][data-i="0"]')
        chk('si' in P()[0] and P()[1].get('hasta')=='meta' and P()[1]['body']==[],nom+': el «si» sale del bucle y queda arriba')
        p.close(); print(nom,'consola',e)
print('TODO OK' if ok else 'HAY FALLOS')
