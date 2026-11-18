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
        p.goto('file://'+RAIZ+'/index.html'); p.click('[data-p="docentes"]',timeout=3000)
        t=p.inner_text('.v-docentes')
        n=p.evaluate('RL.misiones.length')
        chk(p.locator('.ficha').count()==n,f'{nom}: una ficha por misión ({n})')
        chk('orientativa' in t and 'no sustituye' in t,nom+': avisos de uso orientativo')
        chk('sin confirmar' in t or 'No se ha comprobado' in t,nom+': la vigencia se declara sin comprobar')
        vac=p.evaluate('Array.from(document.querySelectorAll(".ficha li")).filter(l=>l.textContent.trim().split(" ").length<3).length')
        chk(vac==0,nom+': todos los saberes y criterios llevan su texto literal')
        chk(all(p.evaluate('RL.misiones.map(m=>m.conversa&&m.conversa.length>20)')),nom+': cada misión tiene pregunta para conversar')
        p.screenshot(path=f'/tmp/shots/doc_{nom}.png',full_page=True)
        if nom=='pc': p.pdf(path='/tmp/shots/docentes.pdf'); chk(os.path.getsize('/tmp/shots/docentes.pdf')>5000,'pc: se genera el PDF')
        p.click('[data-act="inicio"]'); chk(p.locator('.card.mis').count()==n,nom+': volver al inicio')
        chk(not e,nom+': sin errores de consola '+str(e)); p.close()
print('TODO OK' if ok else 'HAY FALLOS')
