# RoboLab · Diseño detallado

**Fase 2 · Diseño detallado.** Versión 0.1, 13/11/2026, pendiente de tu aprobación.
Fuente curricular: `proyecto/anclaje.md` (Decreto 211/2022, verificado en el PDF el 12 y 13/11/2026; vigencia sin confirmar en Juriscan o BOC). Código Escuela 4.0 es un programa, no un currículo.

## 0. Qué cambia respecto al diseño original (todo aprobado el 13/11)

| Cambio | Aplicado en |
|---|---|
| Programación por ciclo alineada con el decreto: los bucles anidados y las condiciones empiezan en 5.º, no en 4.º | Sección 2 y mecánicas 5 y 6 |
| En 2.º se evalúa encontrar el error; corregirlo es ayuda guiada | Mecánica 4 |
| Funciones y contadores (6.º) no están en el decreto: son una ampliación declarada y opcional | Sección 2 |
| Flotadores en 2.º sin densidad (flota según el material); densidad y flotabilidad en 5.º | z2m1, z5m3 |
| Piezas de inicio (unas 8) para poder elegir desde la primera misión | Sección 4 |
| El informe indica el nivel de evidencia de cada criterio: completa, parcial o solo en pareja | Sección 5 |
| El modo en pareja es el modo de evaluación de los criterios cooperativos (3.1, 3.3 y 3.4) | Secciones 5 y 6 |
| Cada ficha del cuaderno lleva fuente y estado (verificada o pendiente); unas 12 para el prototipo | Sección 4 |
| Las duraciones de 4 a 7 minutos por misión son una hipótesis que se mide en la fase 4 | Sección 6 |
| Nivel Semilla de Infantil: opcional, en la fase 11 | Estado del proyecto |

**Reglas que no cambian:** sin vidas ni «game over»; pistas en tres escalones; sin tiempo límite; tres estrellas (cumplida, eficiente, sostenible); retos que se resuelven manipulando.

## 1. El bucle de una misión

Aviso → Diseña → Programa → Prueba → Bitácora, tal como describe el diseño original. Cada misión combina tres o cuatro de las doce mecánicas de la sección 3, y en la fase Programa siempre hay una mecánica de programación (Ruta programada, Caza del error, Patrón y bucle, Sensor y condición o Circuito); las demás aportan el contenido del área. En el modo Historia, la ruta es siempre la misma; en Reto rápido se juega una sola mecánica durante unos 3 minutos.

## 2. Lenguaje de órdenes por ciclo

El área de Conocimiento del Medio solo habla de «iniciación a la programación». Los constructos concretos los nombra Matemáticas, saber IV.4.1 (ver `anclaje.md`, sección 8): en el primer ciclo, reconocimiento de algoritmos sencillos; en el segundo, reconocimiento y modificación con bucles y patrones; las instrucciones anidadas y los condicionales, solo en el tercero.

| Curso | Órdenes | Ideas nuevas | Tablero | Qué se evalúa |
|---|---|---|---|---|
| 1.º | ↑ ↓ ← → · coger · soltar | Secuencia de 3 a 6 pasos | 4×4 | Ordenar y predecir. Sin leer. |
| 2.º | Las mismas | Secuencias de 5 a 8 pasos; encontrar el error | 5×5 | Encontrar el error (corregirlo es ayuda guiada). |
| 3.º | N S E O con rosa de los vientos · medir · repetir | Bucle simple; modificar un programa | 6×6 | Convertir lo que se repite en un bucle. |
| 4.º | Las mismas | Patrones más largos; modificar y crear programas con bucles | 6×6 | Reconocer patrones y acortar. Sin bucles anidados ni condiciones. |
| 5.º | Avanzar · girar · si el sensor detecta… si no… · repetir | Bucles anidados; primera condición | 7×7 | Programa con una condición y una lectura de sensor. |
| 6.º | Las anteriores · repetir hasta | Varias condiciones; ampliación opcional con funciones y contadores | 8×8 | Condiciones combinadas. Funciones y contadores: ampliación, no vienen en el decreto. |

La secuencia usar → modificar → crear se aplica dentro de cada zona: primero se ejecuta y se explica un programa hecho, después se cambia, y al final se crea uno nuevo.

## 3. Las doce mecánicas

Cada una se describe con objetivo, acciones, reglas, progresión, pista, éxito, rejugabilidad y destreza de pensamiento computacional. Las pistas siguen los tres escalones del diseño.

### 1. Elegir piezas

- **Objetivo.** Relacionar propiedades de materiales, energía y adaptación al medio con lo que pide el lugar.
- **Acciones.** Arrastrar (o dos toques) una pieza a cada una de las cuatro ranuras; consultar su ficha; predecir antes de probar.
- **Reglas.** Cada pieza tiene propiedades (datos) y cada lugar tiene condiciones (datos del aviso). Hay una o varias combinaciones válidas; alguna pieza «parece» buena y falla por un dato del lugar.
- **Progresión.** 1.º: dos opciones por ranura y una pista visible en la escena. 3.º: tres opciones y un dato que descarta una. 5.º: compromiso entre producción e impacto (estrella sostenible).
- **Pista.** 1) Qué pasó en la prueba. 2) Qué dato del lugar lo explica. 3) Qué pieza se descarta.
- **Éxito.** El robot completa el tablero con piezas coherentes; la estrella de diseño sostenible premia la combinación adecuada al lugar.
- **Rejugabilidad.** Los datos del lugar salen de un banco por curso y se barajan; las piezas tienen variantes.
- **Destreza.** Abstracción: quedarse con los datos relevantes y dejar los que no sirven.

### 2. Banco de pruebas

- **Objetivo.** Practicar el método: predecir, comprobar cambiando una sola variable y concluir.
- **Acciones.** Elegir qué objeto o material probar, predecir con un icono, lanzar la prueba y comparar el resultado con la predicción.
- **Reglas.** Solo se cambia una variable cada vez. Hay una tabla de registro que se rellena sola con cada prueba. La conclusión se compone con piezas de frase.
- **Progresión.** Desde ¿pasa la luz? (1.º) hasta densidad y flotabilidad (5.º) o cargas del dron (6.º), con más variables que controlar.
- **Pista.** 1) Qué pasó frente a lo que esperabas. 2) Qué variable cambiaste a la vez. 3) Qué prueba falta.
- **Éxito.** La conclusión coincide con los datos registrados; se premia la predicción razonada, no solo acertar.
- **Rejugabilidad.** Materiales y objetos aleatorios dentro de un conjunto del curso.
- **Destreza.** Abstracción y depuración; criterios 2.1, 2.3 y 2.4 del área.

### 3. Ruta programada

- **Objetivo.** Crear algoritmos: ordenar las órdenes para que el robot cumpla el objetivo del tablero.
- **Acciones.** Añadir órdenes a la tira (tocar, arrastrar o teclado), lanzar y ver cómo se ilumina cada paso.
- **Reglas.** El tablero tiene obstáculos y objetos del contenido del área. Hay un límite de órdenes por misión y más de una solución válida. Cada prueba gasta batería, sin límite de intentos.
- **Progresión.** Ver la sección «Lenguaje de órdenes por ciclo».
- **Pista.** 1) Dónde acabó el robot. 2) En qué paso se desvía. 3) Los primeros pasos de una solución válida.
- **Éxito.** Llega al objetivo dentro del límite; la estrella de eficiencia premia el programa corto.
- **Rejugabilidad.** Tableros generados por plantilla dentro de las reglas del curso, siempre con solución comprobada.
- **Destreza.** Creación de algoritmos y descomposición (plan de pasos).

### 4. Caza del error

- **Objetivo.** Leer un algoritmo ajeno y localizar el paso que falla (depuración).
- **Acciones.** Ver el programa ejecutándose, predecir dónde acabará y marcar el paso equivocado.
- **Reglas.** Un solo error por programa en 2.º. En 2.º, encontrar el error es lo que se evalúa; corregirlo es ayuda guiada (se ofrecen dos opciones). Desde 3.º se corrige libremente.
- **Progresión.** 2.º: secuencias de 5 a 8 pasos. 3.º y 4.º: errores dentro de un bucle. 5.º y 6.º: errores en condiciones.
- **Pista.** 1) El robot no llega a… 2) El error está entre el paso X y el Y. 3) El paso Y debería ser otro.
- **Éxito.** Marca el paso correcto; se registra si necesitó pistas.
- **Rejugabilidad.** Los errores se insertan por tipo (giro, orden, cuenta) en programas distintos.
- **Destreza.** Depuración y lectura de algoritmos.

### 5. Patrón y bucle

- **Objetivo.** Descubrir qué se repite y acortar el programa.
- **Acciones.** Seleccionar el tramo que se repite y convertirlo en un bucle con su número de vueltas.
- **Reglas.** El programa largo y el corto deben hacer lo mismo; el robot ejecuta ambos y compara. Desde 3.º (bucle simple); 4.º repite con patrones más largos; los bucles anidados empiezan en 5.º.
- **Progresión.** Patrones de 2 pasos en 3.º, de 3 o 4 pasos en 4.º, y bucles dentro de bucles en 5.º.
- **Pista.** 1) Esto se repite. 2) Dónde empieza y acaba el tramo. 3) Cuántas vueltas.
- **Éxito.** Programa más corto con el mismo resultado: estrella de eficiencia.
- **Rejugabilidad.** Patrones generados por plantilla (rutas de cultivo, filas de piedras, series de olas).
- **Destreza.** Reconocimiento de patrones.

### 6. Sensor y condición

- **Objetivo.** Decidir qué hace el robot según lo que detecta (viento, luz, temperatura, semáforo).
- **Acciones.** 1.º a 4.º: interpretar la lectura y elegir la orden. 5.º y 6.º: programar «si… si no…» con la lectura del sensor.
- **Reglas.** Las condiciones programadas aparecen desde 5.º, igual que en el decreto (los condicionales se nombran solo en el tercer ciclo). Antes, el sensor da una lectura que la persona interpreta.
- **Progresión.** 5.º: una condición. 6.º: condiciones con «repetir hasta» y varios sensores.
- **Pista.** 1) Qué lee el sensor ahora. 2) Qué rama se ejecuta. 3) Qué condición falta.
- **Éxito.** El robot actúa bien en dos situaciones distintas (viento y calma, día y noche).
- **Rejugabilidad.** Las lecturas se generan al azar dentro de un rango.
- **Destreza.** Creación de algoritmos con condiciones; criterios 3.2 y 6.1.

### 7. Clasificador

- **Objetivo.** Clasificar según un criterio (vivo o inerte, material, rocas, fuentes de energía, alimentos).
- **Acciones.** Arrastrar (o dos toques) lo que llega por una cinta hacia su contenedor.
- **Reglas.** Cada elemento va a un solo contenedor. El criterio se enuncia con un icono y se puede cambiar de ronda en ronda.
- **Progresión.** Dos contenedores en 1.º, tres a cuatro en 3.º, criterios dobles en 5.º.
- **Pista.** 1) Este elemento no va aquí. 2) Qué propiedad mira el contenedor. 3) A dónde va.
- **Éxito.** Cinta completa; se cuentan los aciertos a la primera.
- **Rejugabilidad.** Los elementos salen del banco del curso y se barajan.
- **Destreza.** Abstracción y reconocimiento de patrones.

### 8. Escáner

- **Objetivo.** Encontrar y señalar en la escena lo que pide la misión (especies, señales, partes del volcán, objetos).
- **Acciones.** Mover el visor sobre la escena, mantener o pulsar sobre el objeto y confirmar.
- **Reglas.** Cada hallazgo añade una ficha al cuaderno de campo. Hay señuelos que no cuentan. Se puede usar sin ratón.
- **Progresión.** Pocos objetos grandes en 1.º; más objetos, más pequeños y con parecidos en 4.º a 6.º.
- **Pista.** 1) Hay uno cerca de… 2) Está en esta zona de la escena. 3) Se resalta el objeto.
- **Éxito.** Se señalan todos los objetos pedidos; se premia no confundirse.
- **Rejugabilidad.** La escena cambia la posición de los objetos en cada partida.
- **Destreza.** Abstracción; apoya los criterios de las competencias 5, 6 y 7.

### 9. Línea del tiempo

- **Objetivo.** Ordenar objetos, edificios o hechos de más antiguo a más reciente.
- **Acciones.** Arrastrar (o dos toques) las tarjetas a la línea y comprobar con el robot que viaja por ella.
- **Reglas.** Cada tarjeta tiene un dibujo y una pista; en 1.º y 2.º no hace falta leer. Se trabaja solo con las épocas de cada ciclo.
- **Progresión.** 3 tarjetas en 2.º, 4 a 5 en 4.º, con épocas en 5.º y 6.º.
- **Pista.** 1) Dos tarjetas están cambiadas. 2) Cuál va antes. 3) Primera tarjeta colocada.
- **Éxito.** Línea correcta; se registra si hubo ayudas.
- **Rejugabilidad.** Se barajan objetos del banco del curso.
- **Destreza.** Algoritmos (orden y secuencia) aplicados al tiempo histórico.

### 10. Mapa y rumbo

- **Objetivo.** Localizar un punto con la leyenda, los puntos cardinales o las coordenadas.
- **Acciones.** Leer la leyenda y escribir el rumbo con la rosa de los vientos o con coordenadas.
- **Reglas.** El mapa tiene leyenda, escala y norte señalado. El robot sigue el rumbo y se ve si llega.
- **Progresión.** Flechas en 2.º, N S E O en 3.º y 4.º, coordenadas y escala en 5.º y 6.º.
- **Pista.** 1) Dónde está el norte. 2) Qué rumbo falta. 3) La primera parte de la ruta.
- **Éxito.** El robot llega al punto pedido.
- **Rejugabilidad.** Mapas con puntos de interés barajados.
- **Destreza.** Abstracción: leer símbolos, leyenda y escala.

### 11. Lectura de datos

- **Objetivo.** Interpretar la gráfica o la tabla que envía el sensor y decidir con ella.
- **Acciones.** Mirar la gráfica, señalar el valor pedido y elegir la mejor opción.
- **Reglas.** Los datos se generan dentro de un rango que depende de la misión. La gráfica es de barras o de líneas según el curso.
- **Progresión.** Pictogramas en 1.º y 2.º, barras en 3.º y 4.º, líneas y comparación de dos series en 5.º y 6.º.
- **Pista.** 1) Qué mide el eje. 2) Dónde está el máximo. 3) Qué valor compararías.
- **Éxito.** La elección coincide con el dato; se premia explicar por qué.
- **Rejugabilidad.** Datos nuevos en cada partida.
- **Destreza.** Abstracción: seleccionar lo relevante de los datos.

### 12. Circuito

- **Objetivo.** Conectar pila, cables, interruptor y motor para que el circuito funcione (5.º y 6.º).
- **Acciones.** Arrastrar (o dos toques) cada componente y trazar los cables entre los bornes.
- **Reglas.** Un circuito cerrado enciende el motor; uno abierto no. Se puede añadir un interruptor para abrir y cerrar.
- **Progresión.** Circuito simple en 5.º; circuito con dos bombillas o con motor y sensor en 6.º.
- **Pista.** 1) El circuito está abierto. 2) Entre qué dos componentes falta el cable. 3) Qué borne se conecta.
- **Éxito.** El motor gira; la estrella sostenible depende de la fuente de energía elegida.
- **Rejugabilidad.** Los componentes y su posición cambian en cada partida.
- **Destreza.** Algoritmos (orden y conexión) y depuración del circuito.

## 4. Piezas, aspecto y cuaderno

**Piezas funcionales.** Cuatro ranuras: movimiento, energía, sensor y herramienta. El diseño nombra 3 piezas por zona (18 en total); la lista completa de 24 se cierra en la fase 6.

| Zona | Piezas del diseño |
|---|---|
| El Barrio y la Huerta | Ruedas, pinza, linterna |
| La Costa y el Puerto | Flotadores, filtro, cámara |
| El Monteverde | Patas, termómetro, sensor de humedad |
| Tierra de Volcanes | Orugas, brazo de palanca, imán |
| La Isla Sostenible | Panel solar, aerogenerador, cableado |
| La Cumbre y el Cielo | Hélices de dron, telescopio, antena |

**Piezas de inicio (propuesta, unas 8):** dos por ranura, sencillas, para poder elegir desde la primera misión. Los nombres definitivos se fijan en la fase 4, para que no choquen con las piezas de zona.

**Fichas técnicas.** Cada pieza lleva una ficha con la ciencia que la explica, escrita al nivel del ciclo (por ejemplo, en 2.º, los flotadores se explican por el material y no por la densidad).

**Aspecto.** Pinturas, pegatinas, antenas y caras; se compran con tuercas y no cambian el resultado.

**Cuaderno de campo.** Unas 60 fichas en la versión 1.0; unas 12 en el prototipo. Cada ficha tiene `fuente` y `estado` (`verificada` o `pendiente`); no se publica una ficha pendiente. Las especies, lugares, hechos y personas se comprueban en una fuente fiable antes de escribirlos.

```
ficha: { id, tipo, titulo, texto, fuente, estado: "verificada" | "pendiente", curso }
```

**Insignias.** Una por destreza (descomponer, reconocer patrones, abstraer, crear algoritmos) y varias por hábito (a la primera, programa mínimo, cero emisiones).

## 5. Esquema de datos de una misión

Las misiones son datos; añadir una no obliga a tocar el motor. Los saberes se anotan como bloque y número del decreto (`I.2.6` = bloque I, apartado 2, saber 6).

```js
{
  id: "z3m2", zona: "monteverde", curso: 3,            // el ciclo se deduce del curso
  titulo: "La lluvia que no cae",
  aviso: { quien: "agricultora", datos: ["barro", "niebla", "sin sol"] },
  piezas: { movimiento: "patas", energia: "bateria", sensor: "humedad" },
  porque: { ruedas: "Patinan en el barro.", solar: "Bajo la niebla no carga." },
  tablero: ["....H", "..#..", ".H...", "..#.H", "R...."],
  ordenes: ["N", "S", "E", "O", "medir", "repetir"], limite: 8,
  retos: ["eleccion-piezas", "ruta", "lectura-datos"],
  sensor: [{ tipo: "lectura-datos", banco: "humedad-monteverde" }],
  saberes: ["I.2.6", "III.1.3"], criterios: ["2.1", "2.4", "3.2", "5.1"],
  evidencia: { "2.4": "completa", "3.2": "completa", "3.1": "pareja" },
  pareja: true
}
```

**Nivel de evidencia.** `completa` (la mecánica lo evidencia jugando solo), `parcial` (solo una parte) o `pareja` (solo se evidencia jugando en pareja o en grupo, con observación docente). El informe del alumnado muestra el nivel junto a cada criterio.

**Lo que comprueba el validador (fase 5):**
1. Cada saber y cada criterio citado existe en `curriculo.js`, en el ciclo del curso.
2. Los criterios cooperativos (3.1, 3.3 y 3.4 en tercer ciclo) solo se marcan como `pareja`.
3. Hay una solución dentro de `limite` (el validador la busca por recorrido) y se guarda la de menos órdenes.
4. Las órdenes de la misión no superan el lenguaje de su ciclo (sección 2).
5. Cada `porque` apunta a una pieza que existe, y cada pieza equivocada falla en la prueba.
6. Cada ficha enlazada existe y tiene fuente.

## 6. Las 42 misiones en una línea

Cada zona tiene seis misiones y un Gran Reto. Los límites de órdenes (≤n) son provisionales: el validador de la fase 5 los fija con el recorrido más corto. Los criterios 3.1, 3.3 (y 3.4 en tercer ciclo) no aparecen aquí porque solo se evidencian jugando en pareja. El reparto por cursos es una propuesta didáctica: el decreto ordena por ciclos y cualquier zona se puede elegir libremente. La duración (4 a 7 minutos) es una hipótesis que se mide en la fase 4.

### El Barrio y la Huerta (1.º)

| Id | Misión y aviso | Decisión de diseño | Retos | Saberes | Criterios |
|---|---|---|---|---|---|
| z1m1 | **La huerta de Rosa.** Rosa, agricultora, no sabe qué de su huerta necesita agua y luz. | Herramienta: la regadera sirve para seres vivos, no para la piedra del bancal. | Clasificador (vivo o inerte) · Ruta 4×4 (≤5) | I.2.1 | 5.1, 3.2 |
| z1m2 | **El contenedor despistado.** Una vecina: han mezclado los residuos del barrio. | Pinza o aspirador: el vidrio no se aspira. | Elegir piezas · Clasificador por material · Ruta 4×4 (≤6) | I.3.2, III.4.4 | 6.1, 3.2 |
| z1m3 | **Luz en el desván.** Un abuelo no ve en el desván: ¿qué deja pasar la luz? | Linterna como sensor de luz; se predice qué material la deja pasar. | Banco de pruebas (¿pasa la luz?) · Ruta 4×4 (≤5) | I.3.1, I.3.2 | 2.1, 2.4, 3.2 |
| z1m4 | **El grifo que gotea.** El conserje del colegio: hay grifos abiertos y se pierde agua. | Pinza para cerrar el grifo, no para recoger el agua. | Escáner (qué gasta y qué ahorra agua) · Ruta 4×4 (≤5) | III.4.4 | 6.1, 3.2 |
| z1m5 | **El paso de peatones.** Un agente de la policía local: el robot reparte cartas y debe cruzar seguro. | Dónde y cuándo cruzar; el color no es la única pista (forma e icono del semáforo). | Escáner (señales) · Ruta por la calle 4×4 (≤6) | III.3.8 | 9.3, 3.2 |
| z1m6 | **¿Quién arregla el parque?** Una vecina: farola rota, columpio roto y basura en el parque. | A qué servicio del municipio avisa el robot. | Clasificador (problema → servicio) · Ruta 4×4 (≤6) | III.3.3 | 9.2, 3.2 |
| z1gr | **Gran Reto · La fiesta del barrio.** La concejalía pide preparar la fiesta: huerta, residuos y calle. | Combina piezas de las seis misiones en dos robots. | Dos tableros 4×4: Clasificador + Escáner + Ruta (≤8 cada uno) | I.2.1, I.3.2, III.4.4, III.3.8, III.3.3 | 3.2, 6.1, 9.3 |

### La Costa y el Puerto (2.º)

| Id | Misión y aviso | Decisión de diseño | Retos | Saberes | Criterios |
|---|---|---|---|---|---|
| z2m1 | **La charca de marea.** Una bióloga marina: ¿cómo viven los animales de la charca? | Flotadores o ruedas para cruzar el agua: flota o no flota según el material. | Elegir piezas · Escáner (adaptaciones) · Ruta 5×5 (≤7) | I.2.2, I.3.2 | 5.1, 3.2 |
| z2m2 | **Peces, aves y plantas del puerto.** Una guía del puerto prepara un panel de especies de la costa. | Cámara para identificar sin molestar a los animales. | Clasificador (animal o planta, dónde vive) · Caza del error 5×5 | I.2.3 | 5.1, 3.2 |
| z2m3 | **Arena, agua y sal.** Un salinero: la arena se ha mezclado con el agua. | Filtro: separa la arena, no la sal disuelta. | Banco de pruebas (¿qué separa el filtro?) · Clasificador de mezclas · Ruta 5×5 (≤7) | I.3.3 | 2.1, 2.3, 2.4 |
| z2m4 | **El dique de la playa.** Una ingeniera del puerto: el oleaje tira las estructuras. | Base ancha o base estrecha: qué estructura resiste. | Banco de pruebas (estructuras) · Elegir piezas · Ruta 5×5 (≤7) | I.3.4 | 2.3, 2.4, 3.2 |
| z2m5 | **El barco a La Gomera.** Una pasajera: ¿cómo se viaja entre las islas? | Medio de transporte según la isla y el destino. | Mapa y rumbo (itinerario) · Caza del error 5×5 | III.1.4 | 9.3, 3.2 |
| z2m6 | **Los primeros habitantes.** Una arqueóloga: ¿cómo vivían los aborígenes canarios? | Cámara para fotografiar sin tocar los objetos del yacimiento. | Escáner (objetos y modo de vida) · Caza del error 5×5 | III.2.5 | 7.2, 3.2 |
| z2gr | **Gran Reto · La arena negra.** Tras la fiesta, la playa de arena negra está sucia. | Piezas de las seis misiones; la arena negra es de origen volcánico. | Escáner (paisaje natural o humanizado, partes del volcán) · Clasificador · Ruta 5×5 (≤9) | III.4.1, III.1.2, I.2.2, I.3.3 | 6.2, 5.2, 3.2 |

### El Monteverde (3.º)

| Id | Misión y aviso | Decisión de diseño | Retos | Saberes | Criterios |
|---|---|---|---|---|---|
| z3m1 | **El helecho que se seca.** Una guarda forestal: el monteverde pierde plantas. | Patas para el barro del sendero. | Escáner (especies y ecosistemas canarios) · Ruta con N S E O 6×6 (≤8) | I.2.2, III.1.2 | 5.1, 3.2 |
| z3m2 | **La lluvia que no cae.** Una agricultora quiere saber dónde atrapa más agua la niebla. | Patas, sensor de humedad y batería: bajo la niebla el panel solar no carga. | Elegir piezas · Ruta con bucle 6×6 (≤8) · Lectura de datos (humedad) | I.2.6, III.1.3 | 2.1, 2.4, 3.2, 5.1 |
| z3m3 | **Hielo, agua y vapor.** Una cocinera de la cumbre: ¿qué se derrite y qué conduce el calor? | Termómetro; material conductor o aislante. | Banco de pruebas (calor) · Ruta con bucle 6×6 (≤8) | I.3.1 | 2.1, 2.3, 2.4 |
| z3m4 | **Plantas y animales de la laurisilva.** Un biólogo prepara una guía del bosque. | Qué sensor o herramienta sirve para cada ser vivo. | Clasificador · Patrón y bucle (6×6) | I.2.3, I.2.2 | 5.1, 3.2 |
| z3m5 | **Aviso de niebla.** Una meteoróloga: ¿día seguro para la excursión? | Sensor de humedad y de temperatura; se registra y se lee. | Lectura de datos (tabla y gráfica) · Elegir piezas · Ruta con bucle 6×6 (≤8) | III.1.3 | 2.3, 2.4, 3.2 |
| z3m6 | **El mapa del sendero.** Un guía: el grupo se ha perdido en el sendero. | Orientarse con la rosa de los vientos y la leyenda. | Mapa y rumbo · Caza del error en un programa N S E O 6×6 | III.1.2 | 5.1, 3.2 |
| z3gr | **Gran Reto · Del barranco al grifo.** El ciclo del agua del monteverde a la casa. | Dos robots: uno mide en la niebla, otro lleva el agua. | Dos tableros 6×6: Lectura de datos + Mapa y rumbo + Ruta con bucle (≤10 cada uno) | I.2.6, I.2.2, III.1.3, III.1.2 | 2.4, 3.2, 5.1, 6.1 |

### Tierra de Volcanes (4.º)

*z4m1 y z4m3 están implementadas (18/11) sin el clasificador de rocas ni el banco de pruebas de fuerzas; ver `estado.md`.*

| Id | Misión y aviso | Decisión de diseño | Retos | Saberes | Criterios |
|---|---|---|---|---|---|
| z4m1 | **Piedras del volcán.** Un geólogo: ¿qué rocas hay en la ladera? | Orugas: no se hunden en el picón. | Clasificador de rocas · Ruta con bucle 6×6 (≤8) | I.2.5 | 5.1, 3.2 |
| z4m2 | **Cómo nació la isla.** Una vulcanóloga: ¿qué pasó primero y qué pasó después? | Cuándo se mide y cuándo se espera. | Línea del tiempo (fases de la formación) · Ruta 6×6 (≤8) | III.1.1 | 5.2, 3.2 |
| z4m3 | **La roca que no se mueve.** Un operario: hay hierro mezclado con la lava enfriada. | Imán: atrae unos materiales y otros no. | Banco de pruebas (fuerzas a distancia) · Elegir piezas · Ruta con bucle 6×6 (≤8) | I.3.3 | 2.1, 2.3, 2.4, 3.2 |
| z4m4 | **La palanca del pozo.** Un vecino: no puede levantar la piedra de la boca del pozo. | Brazo de palanca: dónde se pone el apoyo. | Banco de pruebas (máquinas simples) · Patrón y bucle | I.3.4 | 2.3, 2.4, 3.2 |
| z4m5 | **Las herramientas de la cueva.** Una arqueóloga: ordenar los objetos del yacimiento. | Cámara y brazo para no dañar los objetos. | Línea del tiempo · Escáner (objetos y su función) · Ruta 6×6 (≤8) | III.2.5, III.2.3 | 7.1, 7.2, 3.2 |
| z4m6 | **El Parque y su cabildo.** Una guarda del Parque Nacional: ¿quién cuida y quién presta qué servicio? | Qué piezas no dañan el suelo protegido. | Escáner (patrimonio natural, servicios del cabildo) · Ruta 6×6 (≤8) | III.2.6, III.3.3 | 5.3, 9.2 |
| z4gr | **Gran Reto · La caravana al Parque.** Una caravana de robots sube al Parque Nacional respetando las señales. | Orugas, imán y palanca; señales de tráfico en el camino. | Dos tableros 6×6: Escáner (señales) + Ruta con bucle + Banco de pruebas (≤12 cada uno) | I.2.5, III.1.1, I.3.4, III.2.6, III.3.5 | 3.2, 5.3, 9.3 |

### La Isla Sostenible (5.º)

| Id | Misión y aviso | Decisión de diseño | Retos | Saberes | Criterios |
|---|---|---|---|---|---|
| z5m1 | **Apagón en la isla.** El cabildo quiere una isla que funcione solo con renovables. | Elegir la fuente adecuada en cada lugar y cerrar el circuito. | Elegir piezas · Sensor y condición (si hay viento…) · Lectura de datos (dos días) | I.3.2 | 6.1, 3.2, 2.4 |
| z5m2 | **El circuito que no cierra.** Un electricista: la casa del barrio no tiene luz. | Pila, cables, interruptor y motor en el orden que cierra el circuito. | Circuito · Caza del error | I.3.3 | 2.3, 3.2 |
| z5m3 | **¿Flota o se hunde?** Una pescadora: ¿qué cargamento puede llevar el bote del robot? | Flotador o hélice según la densidad de la carga. | Banco de pruebas (densidad y flotabilidad) · Ruta con bucles anidados 7×7 | I.3.1 | 2.1, 2.3, 2.4 |
| z5m4 | **El menú del comedor.** Una cocinera: un menú saludable y sostenible para el comedor. | Sensor y herramienta para pesar y etiquetar. | Clasificador de alimentos · Sensor y condición | I.2.6, I.2.4 | 4.2, 6.1 |
| z5m5 | **La fortaleza y el puerto.** Un guía del museo: ordenar lo que cuentan los objetos y los edificios. | Cámara y antena para consultar la fuente adecuada. | Línea del tiempo (Edad Media y Edad Moderna) · Escáner · Ruta con bucles anidados 7×7 | III.2.1, III.2.4 | 7.1, 3.2 |
| z5m6 | **Quién llegó y quién se fue.** Una investigadora: ¿cómo ha cambiado la población de la isla? | Qué datos recoge el sensor y cuáles sobran. | Lectura de datos (gráfica de población) · Mapa y rumbo · Sensor y condición | III.1.4 | 8.1, 2.4, 3.2 |
| z5gr | **Gran Reto · La isla que se alimenta sola.** Un plan de isla sostenible con energía, agua y alimentos. | Dos robots que comparten la energía de la isla. | Dos tableros 7×7: Circuito + Sensor y condición + Ruta con bucles anidados (≤14 cada uno) | I.3.2, I.3.3, I.3.1, I.2.6 | 3.2, 6.1, 6.2 |

### La Cumbre y el Cielo (6.º)

| Id | Misión y aviso | Decisión de diseño | Retos | Saberes | Criterios |
|---|---|---|---|---|---|
| z6m1 | **El cielo que se apaga.** Un astrónomo: las luces del pueblo tapan las estrellas. | Telescopio y sensor de luz; cuándo se apaga qué. | Lectura de datos (luz) · Sensor y condición | III.1.1 | 6.1, 6.2, 3.2 |
| z6m2 | **¿Cómo vuela un dron?** Un equipo de rescate: ¿qué dron lleva la carga? | Hélices de dron según el peso y el viento. | Banco de pruebas (vuelo) · Elegir piezas · Sensor y condición | I.3.4 | 2.1, 2.3, 2.4, 3.2 |
| z6m3 | **El hielo que se va.** Una climatóloga: la temperatura sube en la cumbre. | Antena para recibir datos de la estación. | Lectura de datos (temperatura) · Sensor y condición | III.1.2, III.4.1 | 2.4, 6.1 |
| z6m4 | **España y Europa en el mapa.** Una profesora de intercambio: ¿dónde están las islas respecto a Europa? | Antena y mapa: dónde se recibe qué. | Mapa y rumbo (coordenadas) · Escáner (instituciones) · Ruta con bucles anidados 8×8 | III.1.3, III.3.5 | 5.1, 9.2, 3.2 |
| z6m5 | **Del siglo XIX a hoy.** Un museo: ordenar objetos de la Edad Contemporánea. | Cámara y escáner para fechar los objetos. | Línea del tiempo · Escáner · Caza del error | III.2.3, III.2.4 | 7.1, 3.2 |
| z6m6 | **La Constitución y el ayuntamiento.** Un grupo escolar: ¿qué derechos y qué instituciones nos protegen? | Quién envía el aviso y quién lo atiende. | Clasificador (derechos, instituciones) · Escáner · Sensor y condición | III.3.2, III.3.5 | 9.2, 3.2 |
| z6gr | **Gran Reto · Noche de estrellas.** Una noche de observación en la cumbre, con todo el equipo. | Dos robots coordinados; ampliación opcional con funciones y contadores. | Dos tableros 8×8: Sensor y condición + Lectura de datos + Ruta con bucles anidados (≤16 cada uno) | III.1.1, I.3.4, III.1.2, III.4.1 | 3.2, 6.1, 6.2 |

## 7. Límites y pendientes

- **Vigencia del decreto:** sin confirmar en Juriscan o BOC (tarea tuya).
- **Contenidos sin saber exacto:** «paisaje natural y humanizado» (2.º) cae en `III.4.1`; las «partes del volcán» y la formación de las islas, en `III.1.2` (primer ciclo) y `III.1.1` (segundo). Se confirma cuando se escriba cada reto, en la fase 6.
- **Criterios:** la columna es propuesta mía, ligada a lo que cada reto evidencia. «Cooperativo» solo en pareja. Es orientativo y no sustituye la evaluación docente.
- **Datos de las fichas y de los retos de contenido:** cada dato (especies, lugares, hechos, personas) está sin comprobar hasta la fase 6.
- **Aborígenes canarios y Edad Media o Moderna:** se redactarán con fuentes de museos o del cabildo, y con revisión tuya, antes de publicarlas.
- **Tiempos de misión y límites de órdenes:** hipótesis; se miden en la fase 4 con alumnado.
- **Nivel Semilla de Infantil:** decisión tomada (opcional, fase 11). Aún no se ha leído el Decreto 196/2022.

## 8. Misiones del prototipo y misiones del diseño (17/11/2026)

El prototipo jugable incluye misiones que sirvieron para probar mecánicas y que **no coinciden** con las de la sección 6. Para que sus códigos no choquen con las 42 previstas, llevan una «p» (prototipo) en lugar de la «m».

| Código en el juego | Misión | Relación con la sección 6 |
|---|---|---|
| z3m1 | El helecho que se seca | Coincide con z3m1. |
| z3m2 | La lluvia que no cae | Coincide con z3m2. |
| z3p3 | El mirador del sendero (escalera con bucle) | Extra de prototipo; no es la z3m3 «Hielo, agua y vapor». |
| z5p1 | Energía para el cuadro eléctrico (`repetir hasta roca`) | Extra de prototipo; no es la z5m1 «Apagón en la isla». |
| z5p2 | El muro de piedra seca (`si … si no` dentro de `repetir hasta`) | Extra de prototipo; no figura en la sección 6. |

**Decisión (David, 17/11/2026):** z3p3, z5p1 y z5p2 se **conservan como retos extra** del Reto rápido de cada zona. Cumplen las reglas de diseño y tienen solución dentro del límite según el validador. Por eso el Reto rápido de El Monteverde y de La Isla Sostenible ya tiene contenido desde el prototipo; en las demás zonas se escribirá en la fase 6 con el mismo formato (un tablero, tres a cuatro minutos).

**Dificultad (17/11):** tras la prueba de 3.º se subieron los límites de órdenes (z3m1 12, z3m2 10, z3p3 12) sin tocar el óptimo.

## 9. Pistas con condiciones y ampliación de 6.º (17/11/2026)

### Pistas con condiciones (aplicado)
Cuando el programa contiene `si` o `repetir hasta`, el segundo escalón de la pista añade qué tenía delante el robot en el paso donde se desvía («una roca», «camino libre», «barro», «la meta» o «el borde del tablero»). Así el alumnado compara lo que veía el sensor con la rama que se ejecutó, que es el error típico («confunde si con siempre que»). Sin condiciones el escalón 2 no cambia. Probado en `tests/interprete.test.js`.

### Funciones y contadores (ampliación opcional de 6.º; implementada en el prototipo el 17/11/2026)
No vienen en el decreto (ver sección 2): son una ampliación declarada, solo en 6.º, que no se cita en ningún criterio ni condiciona las estrellas.

- **Función («Mi rutina»).** Una sola por misión, definida en una zona aparte bajo el programa. Se llama con el bloque «Mi rutina». Una rutina no puede llamar a otra (ni la interfaz lo permite ni el intérprete lo acepta). Coste: la definición cuenta 1 más su contenido, solo si no está vacía; cada llamada cuenta 1. Llamar a una rutina vacía falla con su pista.
- **Contador.** La orden «contar» (+1) suma 1 al contador del robot y se ve en pantalla («Cúpulas contadas: n de 4»). Solo cuenta encima de una cúpula y necesita el telescopio. Las condiciones `cont=N` (verdadera cuando el contador llega a N) se pueden usar en `si` y `repetir hasta` sin cámara; ninguna misión las ofrece todavía.
- **Misión z6p1 «Las cúpulas del observatorio»** (retos extra de La Cumbre y el Cielo): noche, batería de 18 órdenes (el panel solar no carga), telescopio como sensor. Cuatro cúpulas con tramos de camino distintos; en cada una se repite «avanzar, avanzar, contar». Solución de referencia: rutina de 3 órdenes (coste 4) + 9 elementos de programa = **13**; el mismo programa sin rutina cuesta 17 y el límite es 14. Saberes `III.1.1` (observación del cielo y contaminación lumínica) y `II.2.3`; criterio `3.2`.
- **Qué comprueba el validador con rutina:** la referencia cumple la misión, su coste es el óptimo declarado y no pasa del límite; el mismo programa expandido (sin función) **no cabe** en el límite; la misión ofrece «llamar». **No** busca exhaustivamente una solución mejor (el espacio es enorme): el óptimo con rutina es «el mínimo conocido», no un mínimo demostrado.
- **Pendiente:** usar `cont=N` en alguna misión; que la definición de rutina admita más de un nivel en misiones posteriores; probar con alumnado de 6.º.

## 10. Alcance: sin Infantil ni 1.º y 2.º de momento (18/11/2026)

**Decisión (David):** de momento RoboLab **no se usará en Infantil ni en 1.º y 2.º de Primaria**, porque no lo considera un juego interesante para esas edades. El proyecto se centra en **3.º a 6.º** (tercer a sexto curso).

- **Nivel Semilla de Infantil:** descartado por ahora (se quita de la fase 11).
- **Zonas 1.º y 2.º** (El Barrio y la Huerta; La Costa y el Puerto): quedan **aparcadas**. Sus 14 misiones de la sección 6 se conservan como referencia, pero no se desarrollan en la versión 1.0. Si se retomaran, habría que replantear la mecánica para esas edades, no solo reescribir contenidos.
- **Versión 1.0 acotada:** cuatro zonas (El Monteverde 3.º, Tierra de Volcanes 4.º, La Isla Sostenible 5.º, La Cumbre y el Cielo 6.º) con 6 misiones y un Gran Reto cada una: **28 misiones**.
- **Efecto en el lenguaje de órdenes:** desaparecen las flechas y los tableros de 4×4 y 5×5. La progresión empieza en N S E O con bucle simple (3.º).
- **Efecto en accesibilidad:** el requisito «sin lectura obligatoria» (iconos, voz) ya no es obligatorio para el alumnado lector de 3.º a 6.º; se mantienen la lectura en voz alta cuando el navegador la ofrezca y el resto de requisitos de accesibilidad.
- **Efecto curricular:** los criterios de primer ciclo y los de segundo ciclo de 1.º/2.º dejan de usarse en las misiones. En 3.º y 4.º siguen aplicándose los del segundo ciclo (el ciclo 2.º es 3.º y 4.º en Primaria).
