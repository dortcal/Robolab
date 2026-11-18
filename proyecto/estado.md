# RoboLab · Misión Archipiélago · Estado del proyecto

**Última actualización:** 17/11/2026 (conversación 1, decimocuarta tanda)
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
Misiones de 3.º: z3m1 «El helecho que se seca», z3m2 «La lluvia que no cae», z3m3 «El mirador del sendero». (z3m3 pasó a llamarse z3p3 en la décima tanda: ya no choca con el diseño.)

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

## Decimoséptima tanda (18/11): pistas de diseño
- **Petición de David:** tareas sencillas y buenas pistas para quien se bloquea.
- **Cambio:** cuando el fallo es de una pieza (se hunde, patina, sin energía, sensor o herramienta que no sirve), las pistas dejan de hablar del «paso N» del programa. Escalón 1: qué pasó. Escalón 2: «el programa no es el problema; el fallo está en el diseño del robot; vuelve a Diseña y lee los datos del lugar y la ficha de cada pieza». Escalón 3: qué ranura cambiar («Movimiento», «Energía», «Sensor» o «Herramienta») y la explicación de la misión. Los fallos de programa siguen igual (qué pasó, en qué paso, primeros pasos de la solución).
- **Ejecutado:** pruebas de Node (intérprete actualizado, misiones); Chrome real `volcan.py` e `iman.py`, sin errores.
- **No verificado:** cómo se leen las pistas nuevas en pantalla con alumnado; el resto de pruebas de navegador no se repitieron.

## Decimosexta tanda (18/11): segunda misión de 4.º
- **Misión z4m3 «La roca que no se mueve»** (4.º, Tierra de Volcanes): hay que llegar hasta un trozo de hierro entre la lava enfriada. Solo sirve el **imán** (la pinza y la regadera fallan con `herramienta`); programa óptimo con dos bucles (`repetir 5 E`, `repetir 5 N`), 4 órdenes, límite 8 (sin bucles harían falta 10). Saber `I.3.3`, criterios `2.1` y `3.2`: **propuesta**, pendiente de contrastar con el BOC.
- **Diferencia con `diseno.md`:** allí z4m3 incluye un banco de pruebas de fuerzas a distancia y elegir piezas; lo implementado es solo la decisión de herramienta y la ruta. El banco de pruebas queda pendiente (mecánica sin crear).
- **Nuevo:** pieza `imán` (solo en la zona de volcanes) con su dibujo en el robot.
- **Ejecutado:** pruebas de Node (intérprete y misiones, con el validador); en Chrome real `iman.py` (pc y móvil: se ofrece el imán, la pinza falla, el imán llega con 4 órdenes, sin errores de consola), `volcan.py` y `docentes.py`; captura vista.
- **No verificado:** el resto de pruebas de navegador tras este cambio (solo cambian datos y una pieza); z4m3 con alumnado.

## Decimoquinta tanda (18/11): primera misión de 4.º (Tierra de Volcanes)
- **Misión z4m1 «Piedras del volcán»** (4.º): una ladera con una franja de picón; hay que llegar a la roca con la pinza. Orugas obligatorias (ruedas y patas se hunden: fallo `hunde`, con pista que explica por qué). Programa óptimo: dos bucles (`repetir 5 N`, `repetir 4 E`) en 4 órdenes, límite 12. Saber `I.2.5`, criterios `3.2` y `5.1`: **propuesta**, pendiente de contrastar con el BOC.
- **Diferencia con `diseno.md`:** allí z4m1 incluye un «clasificador de rocas»; lo implementado es solo la ruta con la decisión de diseño. El clasificador queda pendiente.
- **Nuevo:** pieza `orugas` (solo en la zona de volcanes), casilla de picón, fondo volcánico, casillas de ceniza.
- **Ciclo:** en 4.º (segundo ciclo) no se usan condiciones; la misión solo usa bucles.
- **Ejecutado:** pruebas de Node (intérprete y misiones, validador: z4m1 resoluble, óptimo 4); en Chrome real `volcan.py` (pc y móvil) y regresión de `jugar`, `teclado`, `teclado_si`, `isla`, `muro`, `cupulas`, `editar`, `tactil`, `informe` y `docentes`, sin errores de consola.
- **No verificado:** z4m1 con alumnado de 4.º; táctil real; la ficha de saber `I.2.5` contra el texto del BOC.

## Decimocuarta tanda (18/11): alcance
- **Decisión de David:** sin Infantil ni 1.º y 2.º de momento (no los considera un juego interesante para esas edades). Alcance: **3.º a 6.º**, cuatro zonas, 28 misiones previstas. Anotado en `diseno.md`, sección 10. Nivel Semilla descartado; las zonas de 1.º y 2.º quedan aparcadas.
- **Corrijo un error mío anterior:** en `diseno.md` la fase 11 incluía el Nivel Semilla como opcional; queda sin efecto.

## Decimotercera tanda (18/11): ventana «Para docentes»
- **Pantalla «Para docentes»** (botón en el inicio, imprimible o PDF): aviso de que es una selección de saberes y orientativa, fuente curricular con fecha y estado («vigencia sin confirmar»), sugerencias de uso (individual, pareja, gran grupo, Makey Makey) y una ficha por misión con aviso, órdenes, saberes y criterios **con su texto literal** tomado de `curriculo.js`, y una pregunta para conversar después de jugar (campo `conversa` de cada misión).
- **Ejecutado:** `tests/nav/docentes.py` (pc y móvil): 6 fichas, avisos, vigencia declarada sin comprobar, ningún saber o criterio sin texto, PDF generado, volver al inicio, sin errores de consola; captura vista.
- **No verificado:** el PDF visto página a página; que las preguntas de conversación sirvan en el aula (las he redactado yo); la duración por misión sigue sin medir.
- **Falta de la fase 8:** tabla de anclaje por ciclo completa (hoy solo las misiones existentes), propuesta por misión de duración y niveles de evidencia.

## Duodécima tanda (17/11): funciones y contadores implementados
- **Motor:** `ejecutar(m,d,prog,fn)` y `coste(prog,fn)` con «Mi rutina» (`{llama}`), la orden `contar` (solo sobre una cúpula `C`, con telescopio), condiciones `cont=N` y meta `contar`. Casilla `C`, clima `noche` (el panel solar no carga) y batería por misión (`bateria`). `expandir()` sustituye las llamadas por la rutina para comparar costes.
- **Validador:** con rutina comprueba la referencia, el coste óptimo y que sin la función no cabe; no busca exhaustivamente (ver `diseno.md`, sección 9).
- **Interfaz:** zona «Mi rutina» bajo el programa (huecos, arrastrar, marcar y mover como el resto; una llamada no se puede meter en la rutina), botón «Mi rutina», orden «+1 contar», contador a la vista y animado; pieza **Telescopio** (solo en la cumbre, con dibujo en el robot); escena de la cumbre (noche violeta, estrellas, casillas violeta) y cúpulas.
- **Misión z6p1 «Las cúpulas del observatorio»:** óptimo 13, límite 14, el mismo programa sin rutina cuesta 17. Saberes `III.1.1`, `II.2.3`; criterio `3.2`. **Mi propuesta**, no figura en `diseno.md` como misión numerada (es un extra).
- **Ejecutado:** `interprete.test.js` y `misiones.test.js`; en Chrome real `cupulas.py` (pc y móvil, 13 comprobaciones cada uno, con capturas vistas). Regresión de las pruebas anteriores: ver el informe de la entrega.
- **No verificado:** que el alumnado de 6.º entienda la rutina; Makey Makey (el teclado se probó con `si`, no con la rutina); las condiciones `cont=N` solo están probadas en el motor, no en pantalla; el óptimo con rutina no es una búsqueda exhaustiva.

## Undécima tanda (17/11): decisión y pistas
- **Decisión de David:** z3p3, z5p1 y z5p2 **se conservan como retos extra** (Reto rápido). Anotado en `diseno.md`, sección 8.
- **Pistas con condiciones:** el escalón 2 dice qué había delante del robot cuando el programa usa `si`/`hasta`. Prueba en `interprete.test.js`.
- **Diseño de funciones y contadores (6.º):** propuesta en `diseno.md`, sección 9, con la misión z6p1 «Las cúpulas del observatorio». **Sin implementar** y fuera del decreto.
- **Sin verificar:** las pistas nuevas en pantalla con alumnado.

## Décima tanda (17/11): diseño y teclado
- **Códigos:** las misiones del prototipo que no están en `diseno.md` pasan a llevar «p»: z3m3→**z3p3**, z5m1→**z5p1**, z5m2→**z5p2**. z3m1 y z3m2 coinciden con el diseño. Así z3m3, z5m1 y z5m2 quedan libres para las misiones de la sección 6. Resuelve el desajuste z3m3/z3m6 anotado antes. Correspondencia en `diseno.md`, sección 8. Cualquier progreso guardado con los códigos antiguos queda huérfano (solo prototipo).
- **Teclado:** `tests/nav/teclado_si.py` arma z5p2 solo con flechas y Espacio (incluida la rama «si no», «salir» y mover el «si» marcado): llega a la meta con 5 órdenes, sin errores de consola. **Sin verificar:** Makey Makey físico.
- Decisión sobre z3p3, z5p1 y z5p2: resuelta en la undécima tanda (se conservan).

## Novena tanda (17/11): dificultad de 3.º
- David: la prueba de 3.º fue buena, «quizás» bajar ligeramente la dificultad. Sin más detalle de dónde costó.
- **Cambio mínimo, reversible:** límite de órdenes z3m1 10→12, z3m2 8→10, z3m3 10→12. El óptimo no cambia (la estrella de eficiencia sigue pidiendo el bucle). Las pistas ya suben un escalón tras dos fallos seguidos.
- **Ejecutado:** pruebas de Node y `jugar.py` (3 misiones, 3 estrellas). **No verificado:** que con alumnado resulte más fácil.
- **Si sigue costando:** probar a que la 1.ª pista salga sin pedirla tras el primer fallo, o a reducir las piezas distractoras.

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
bucles dentro de bucles en una misión de 4.º (el motor y la interfaz lo permiten con `profundidad:2`); más misiones de 5.º y 6.º; sonido real; pistas afinadas para condiciones; el robot no gira su dibujo (solo la flecha).

## No verificado (global)
Makey Makey físico y táctil real; 60 fps en tableta; sonido, tecla M, modo sin movimiento y texto grande a la vista; lista de pruebas manuales; PDF del informe visto página a página; z5m1 con alumnado de 5.º; qué parte de las misiones de 3.º resultó difícil.

## Falta (David)
Decirme qué costó en la prueba de 3.º; probar la edición con arrastre en la tableta o el móvil del aula; comprobar la vigencia en Juriscan y un par de criterios contra el BOC; revisar z5m1; decir si se activa GitHub Pages.

## Siguiente paso
Subir cada versión estable al repositorio. Después, probar el armado de `si` por teclado, pistas para condiciones, funciones y contadores para 6.º y el sonido real. Si los huecos resultan pequeños en táctil, ampliarlos.
