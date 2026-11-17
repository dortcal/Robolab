# RoboLab · Misión Archipiélago · Estado del proyecto

**Última actualización:** 17/11/2026 (conversación 1, octava tanda)
**Fase 4 (prototipo de El Monteverde):** probada por David con alumnado de 3.º: **salió bien, algo difícil para el nivel**. Se da por superada la condición de salida con esa salvedad; no hay detalle de dónde costó.
**Fase actual:** 5 · Motor completo (en curso). Hay motor, interfaz, una misión de 5.º y edición del programa en cualquier punto.
**Dirección de arte:** A · Guagua (confirmada el 15/11 junto con Infantil en la fase 11). **No se tomó como confirmación de la vigencia del decreto ni de los criterios contra el BOC**, que siguen pendientes.
**Adelantado de la fase 8:** informe imprimible del alumnado (versión mínima).
**Repositorio:** https://github.com/dortcal/Robolab (público). El 17/11 David pidió ir subiendo las versiones; primera subida en esa fecha.

## Decisiones
- Nombre: RoboLab · Misión Archipiélago. Licencia CC BY-NC-ND 4.0, «David OZC».
- Dirección A confirmada; Infantil opcional en la fase 11.
- **Repositorio (17/11):** David autoriza subir versiones a `dortcal/Robolab` (commit y push a `main`) a medida que avance el proyecto. Se mantiene sin activar GitHub Pages hasta que lo pida.
- Cambios y propuestas de programación del 12–13/11: aprobados y aplicados en `diseno.md`.
- **Dificultad (decisión mía):** el límite de órdenes ya no obliga a usar bucles en 3.º (10, 8 y 10); el bucle es el objetivo de la estrella de eficiencia. Reversible; falta saber dónde costó.
- **Edición del programa (petición de David, 15/11):** huecos, arrastrar y soltar, dos toques, marcar y borrar.

## Material
- Decreto 211/2022 y anclaje Código Escuela 4.0: leídos. Decreto 196/2022: **no leído**.
- `anclaje.md`, `diseno.md`, `estado.md`: en el proyecto y en el repositorio (`proyecto/`).
- Código del prototipo: en el repositorio (`src/`, `tests/`, `build.py`, `index.html` generado de 154 KB). Las fuentes (Fredoka y Nunito, latín) están en `src/fonts/` para que `build.py` sea reproducible; comprobado: regenerar da el mismo `index.html`.

## Probado en fases 1–3
Criterios y saberes del segundo ciclo literales contra el PDF; ciclos 1 y 3 extraídos (abrir un par contra el BOC por los espacios restituidos); `diseno.md` validado por script (42 misiones); lámina vista en 3 tamaños. Vigencia del decreto **sin confirmar** en Juriscan/BOC.

## Hallazgos curriculares
1. Bucles en segundo ciclo (Matemáticas IV.4.1); anidados y condiciones solo en tercer ciclo. Funciones y contadores: ampliación no recogida en el decreto.
2. Sin saber de energía en segundo ciclo: z3m3 cita solo el criterio 6.1.
3. Los criterios 3.1–3.3 piden trabajo en equipo.

## Fase 4 (resumen)
Intérprete con traza y pistas de 3 escalones; validador; 3 misiones de 3.º con el bucle completo; guardado local sin datos personales; ajustes; informe imprimible.
Misiones de 3.º: z3m1 «El helecho que se seca», z3m2 «La lluvia que no cae», z3m3 «El mirador del sendero». **z3m3 no coincide con z3m6 de diseno.md**: actualizar uno de los dos.

## Fase 5: qué se hizo
- **Intérprete recursivo:** `A`, `GI`/`GD`, bucles anidados, `si … si no` y `repetir hasta` con condiciones del sensor (`roca`, `barro`, `libre`, `meta`; necesitan la cámara). Corte de seguridad para bucles que no terminan.
- **Validador:** el buscador de la solución más corta incluye giros, anidados, `si` y `hasta`.
- **Currículo del tercer ciclo** (24 criterios y 52 saberes) en `curriculo.js`; origen: extracción del PDF con **espacios restituidos**.
- **Misión z5m1 «Energía para el cuadro eléctrico»** (5.º, La Isla Sostenible): avanzar, girar y «repetir hasta roca»; cámara, pinza y energía solar. Saberes `I.3.2`, `II.2.3`; criterios `3.2`, `6.1`. **Es mi propuesta**, no figura así en `diseno.md`.
- **Interfaz:** paleta de órdenes, flecha de rumbo, fondo de la isla con molinos, tablero 7×7 y las animaciones SVG que faltaban.

## Edición del programa
- **Huecos entre bloques** (también dentro de los bucles): tocar un hueco marca dónde se inserta lo siguiente. Pulsar una orden la inserta ahí y el cursor avanza.
- **Arrastrar y soltar** con ratón o dedo: de la paleta a un hueco; de un bloque a otro hueco (incluso a otro bucle); de un bloque a la paleta para quitarlo. Un bucle no se puede soltar dentro de otro (límite de la interfaz: un nivel).
- **Alternativa sin arrastrar** (también teclado y Makey Makey): Espacio o toque sobre un bloque lo marca; tocar un hueco lo mueve allí; «borrar» quita solo ese bloque. Sin bloque marcado, «borrar» quita el anterior al cursor.
- **Ejecutado:** `tests/nav/editar.py` (21 comprobaciones) con ratón en Chrome real; arrastre táctil emulado; regresión de las 3 misiones de 3.º, z5m1 e informe sin errores de consola; validador estático de la skill, 0 errores.
- **No verificado:** táctil en móvil o tableta reales; Makey Makey físico; los huecos miden unos 30 px de ancho (menos de 44 px); no se ha probado con alumnado.

## Octava tanda (17/11): `si … si no` y bloques anidados en la interfaz
- **Modelo de programa:** el programa es un árbol; un hueco se identifica por una ruta (`0.body.0.sino`). Cada misión fija la **profundidad** (`profundidad`, por defecto 1; en z5m2, 2). Un bloque no se puede soltar dentro de sí mismo ni superar la profundidad.
- **Interfaz:** bloque «Si roca» con dos ramas rotuladas («entonces», «si no»); paleta con «si roca / si meta» y «hasta …»; «salir» sube un nivel; «borrar» quita un bloque vacío; marcar y mover o arrastrar un bloque entero (con lo que contiene).
- **Misión z5m2 «El muro de piedra seca»** (5.º, La Isla Sostenible): seguir el muro con `repetir hasta meta [ si roca [girar der.] si no [avanzar] ]` y un paso final; óptimo 5, límite 8 (la solución sin «si» cuesta 8: el «si» es el objetivo de la estrella de eficiencia). Saberes `I.3.2`, `II.2.3`; criterios `3.2`, `6.1`: **mi propuesta**, no figura en `diseno.md`. La batería llega (14 órdenes) pero pierde la estrella sostenible.
- **Validador:** el buscador genera `si … si no` dentro de `repetir`/`hasta` (marca `siEnBucle`) y confirma el óptimo 5.
- **Ejecutado:** pruebas de Node (intérprete, misiones); en Chrome real `editar.py` (21), `muro.py` (pc y móvil: construir, límites de profundidad, mover el «si» entero, probar y llegar), `jugar`, `teclado`, `informe`, `isla`, `tactil`; sin errores de consola; validador estático 0 errores.
- **No verificado:** táctil real; no hay prueba de teclado/Makey para armar un «si» (solo ratón y emulación); z5m2 con alumnado; las pistas no explican aún las condiciones.

## Primera subida al repositorio (17/11)
- **Ejecutado antes de subir:** `node --check` de todos los JS; pruebas de Node del intérprete y de misiones; `build.py` desde el repositorio reproduce el mismo `index.html`; `tests/nav/editar.py` ejecutado desde la copia del repositorio.
- **Añadido:** README, LICENSE.md (resumen con enlace al texto legal de CC BY-NC-ND 4.0; **no incluye el texto legal completo**), `.nojekyll`, `.gitignore`, fuentes con su licencia y `proyecto/`.
- **No hecho:** activar GitHub Pages; imagen para compartir (`og-image.jpg`); abrir el enlace publicado y completar una misión en él (no se da nada por publicado).

## No hecho aún
funciones y contadores; bucles dentro de bucles en una misión de 4.º (el motor y la interfaz lo permiten con `profundidad:2`); más misiones de 5.º y 6.º; sonido real; pistas afinadas para condiciones; el robot no gira su dibujo (solo la flecha).

## No verificado (global)
Makey Makey físico y táctil real; 60 fps en tableta; sonido, tecla M, modo sin movimiento y texto grande a la vista; lista de pruebas manuales; PDF del informe visto página a página; z5m1 con alumnado de 5.º; qué parte de las misiones de 3.º resultó difícil.

## Falta (David)
Decirme qué costó en la prueba de 3.º; probar la edición con arrastre en la tableta o el móvil del aula; comprobar la vigencia en Juriscan y un par de criterios contra el BOC; revisar z5m1; decir si se activa GitHub Pages.

## Siguiente paso
Subir cada versión estable al repositorio. Después, probar el armado de `si` por teclado, pistas para condiciones, funciones y contadores para 6.º y el sonido real. Si los huecos resultan pequeños en táctil, ampliarlos.
