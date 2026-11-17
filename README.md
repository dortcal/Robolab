# RoboLab · Misión Archipiélago

Juego web de Conocimiento del Medio para Primaria (1.º a 6.º) en el que el alumnado **diseña, programa y prueba un robot** para resolver problemas reales de Canarias. No hay combates, vidas ni preguntas de cuatro opciones: se aprende decidiendo, viendo qué le pasa al robot y corrigiendo.

> **Estado: prototipo (fase 5 de 12).** Hay 5 misiones jugables: tres de 3.º (El Monteverde) y dos de 5.º (La Isla Sostenible), con bloques `si… si no` y bucles que se pueden anidar. El resto se construye por fases; ver `proyecto/estado.md`.

## Cómo se juega

1. **Aviso:** una persona del lugar pide ayuda; se toca la escena para reunir datos.
2. **Diseña:** se eligen cuatro piezas (movimiento, energía, sensor, herramienta) y se predice qué pasará.
3. **Programa:** se ordenan las órdenes del robot en un tablero; los bloques se arrastran o se mueven con dos toques.
4. **Prueba:** el robot actúa; si falla, se ve dónde y por qué, con pistas en tres escalones.
5. **Bitácora:** una frase sobre qué funcionó y cómo se ha sentido. Hasta tres estrellas (misión, programa eficiente, diseño sostenible).

Funciona con **ratón, pantalla táctil, teclado (flechas, Espacio, Esc, M) y Makey Makey**, sin instalación, sin cuentas y sin recoger datos personales. El progreso se guarda solo en el navegador. Hay informe imprimible para el alumnado.

## Probarlo

Abre `index.html` en un navegador (también sin conexión). Para publicarlo en GitHub Pages: *Settings → Pages → Deploy from a branch → `main` / raíz*. El repositorio incluye `.nojekyll`.

## Desarrollo

HTML, CSS y JavaScript sin dependencias. El código está en `src/` y `build.py` genera el único `index.html` con las fuentes incrustadas.

```
python3 build.py                   # genera index.html
node tests/interprete.test.js      # motor: intérprete y buscador de soluciones
node tests/misiones.test.js        # cada misión tiene solución en su límite y cita códigos que existen
python3 tests/nav/jugar.py         # recorrido por clic en Chrome (requiere playwright)
python3 tests/nav/editar.py        # edición y arrastre del programa
```

`tests/nav/*.py` usan Playwright con Chrome (`/usr/bin/google-chrome` en algunos scripts: ajusta la ruta si hace falta).

Las misiones son datos (`src/datos/misiones.js`): añadir una no obliga a tocar el motor, y el validador (`src/motor/validador.js`) comprueba que se puede resolver y que sus criterios y saberes existen en `src/datos/curriculo.js`.

## Currículo

Se apoya en el **Decreto 211/2022** (Primaria, Canarias): competencia específica 3 (proyectos de diseño y pensamiento computacional) y el resto como contenido de las misiones. Los códigos de `curriculo.js` se copian del texto del decreto con fecha de consulta; **la vigencia no está comprobada** ni se han verificado todos los espacios del texto de los ciclos 1 y 3 contra el BOC. El juego trabaja una **selección de saberes** y no sustituye la programación del área. El informe es orientativo y no sustituye la evaluación docente. Detalle en `proyecto/anclaje.md`.

## Documentación del proyecto

- `proyecto/diseno.md`: diseño detallado (mecánicas, lenguaje de órdenes por ciclo, 42 misiones previstas).
- `proyecto/anclaje.md`: anclaje curricular literal por ciclo.
- `proyecto/estado.md`: qué está hecho, qué se probó de verdad y qué falta.

## Licencia

CC BY-NC-ND 4.0 · © David OZC. Ver `LICENSE.md`.
