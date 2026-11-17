#!/usr/bin/env python3
"""Une src/ en un único index.html con las fuentes incrustadas."""
import base64, pathlib, sys
R = pathlib.Path(__file__).parent
S = R / 'src'
FONTS = S / 'fonts'
ORDEN = ['nucleo/estado.js','nucleo/guardado.js','nucleo/audio.js','nucleo/entrada.js',
 'datos/curriculo.js','datos/piezas.js','datos/misiones.js','motor/interprete.js','motor/validador.js',
 'arte/robot.js','arte/casillas.js','arte/fondos.js','escenas/app.js']
def face(fam, peso, ruta):
    b = base64.b64encode((FONTS/ruta).read_bytes()).decode()
    return "@font-face{font-family:%s;font-weight:%s;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}" % (fam, peso, b)
fonts = '\n'.join([face('Fredoka',600,'fredoka-latin-600-normal.woff2'),
  face('Nunito',700,'nunito-latin-700-normal.woff2')])
js = '\n'.join((S/f).read_text(encoding='utf-8') for f in ORDEN)
html = (S/'index.tpl.html').read_text(encoding='utf-8')
html = html.replace('/*FONTS*/', fonts).replace('/*CSS*/', (S/'style.css').read_text(encoding='utf-8')).replace('/*JS*/', js.replace('</script>','<\\/script>'))
(R/'index.html').write_text(html, encoding='utf-8')
print('index.html', len(html.encode())//1024, 'KB')
