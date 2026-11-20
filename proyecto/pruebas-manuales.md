# RoboLab · Lista de pruebas manuales

Para hacer en dispositivos reales, antes de usarlo con alumnado. Marca cada punto como **ok**, **falla** (con una nota) o **no probado**. Lo que ya se ha ejecutado de forma automática en Chrome (ordenador y móvil emulado) está en `estado.md`; aquí solo va lo que **no** se ha podido comprobar.

Misiones actuales: z3m1, z3m2, z3p3 (3.º) · z4m1, z4m2, z4m3 (4.º) · z5p1, z5p2 (5.º) · z6p1 (6.º).

## 1. Dispositivos y pantallas
| Prueba | Resultado |
|---|---|
| Abre `index.html` sin conexión (modo avión) y carga con tipografía y dibujos | |
| Ordenador con ratón: completar z3m1 de principio a fin | |
| Tableta del aula, horizontal: completar z4m1 | |
| Tableta del aula, vertical: ningún texto o botón queda cortado | |
| Móvil, vertical: la línea del tiempo (z4m2) se ve en dos columnas y se puede completar | |
| Pantalla táctil: los botones se aciertan con el dedo (los huecos del programa miden unos 30 px) | |
| Se ve fluido (sin saltos) al lanzar el robot en la tableta del aula | |

## 2. Teclado y Makey Makey
| Prueba | Resultado |
|---|---|
| Solo con flechas y Espacio: elegir las cuatro piezas, predecir y lanzar el robot (z4m1) | |
| Solo con flechas y Espacio: armar un bucle (`repetir ×5` + una orden + «salir») | |
| Solo con flechas y Espacio: ordenar las tarjetas de la línea del tiempo (z4m2) y pedir pistas | |
| Con Makey Makey (4 flechas + Espacio): completar z4m3 | |
| La tecla M silencia y Esc vuelve al inicio sin perder el progreso | |
| El foco se ve siempre (contorno oscuro con halo amarillo) | |

## 3. Arrastrar y soltar (táctil)
| Prueba | Resultado |
|---|---|
| Arrastrar una orden de la paleta a un hueco con el dedo | |
| Arrastrar un bloque a otro hueco y soltarlo en la paleta para quitarlo | |
| La página no se desplaza sola mientras se arrastra | |
| Alternativa de dos toques (marcar bloque, tocar hueco) funciona igual | |

## 4. Sonido y ajustes
| Prueba | Resultado |
|---|---|
| Se oyen los pitidos al colocar, acertar y fallar; «Silencio» los apaga | |
| «Texto grande» no corta botones ni cajas en móvil | |
| «Sin movimiento» detiene las animaciones del fondo y del robot | |
| El dispositivo en modo «reducir movimiento» activa el modo sin movimiento solo | |
| Contraste: el texto se lee con luz de aula (proyector o pantalla con reflejos) | |

## 5. Contenido (lo revisa una persona, no una máquina)
| Prueba | Resultado |
|---|---|
| Las 4 frases de la línea del tiempo (z4m2) son correctas y adecuadas a 4.º | |
| Las fichas de pieza (orugas, imán, telescopio…) son correctas y se entienden | |
| Los textos de los avisos y las bitácoras se entienden sin ayuda | |
| Las preguntas «para conversar» de la ventana de docentes sirven en el aula | |
| Los saberes y criterios citados corresponden al BOC (comprobar un par al azar) | |
| El decreto sigue vigente (Juriscan o BOC); sin comprobar | |

## 6. Aprendizaje (con alumnado, observando)
| Pregunta | Anotaciones |
|---|---|
| ¿Qué misión resultó más difícil y en qué momento se bloquearon? | |
| ¿Usaron las pistas? ¿Les ayudaron o las ignoraron? | |
| ¿Entendieron por qué falló el robot (pieza o programa) sin que se lo dijeran? | |
| ¿Hubo algún botón o gesto que no entendieron? | |
| ¿Cuánto tardó cada misión? (se estimaron 4–7 minutos) | |
| ¿Quisieron repetir alguna misión o buscar una solución más corta? | |

## 7. Datos personales y guardado
| Prueba | Resultado |
|---|---|
| El juego no pide nombre ni datos; el informe se rellena a mano | |
| Cerrar y volver a abrir conserva las estrellas en el mismo navegador | |
| En un navegador compartido, el progreso de un alumno lo ve el siguiente (límite conocido) | |
| El informe se imprime o se guarda en PDF y se lee bien página a página | |
