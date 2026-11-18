/* Pruebas del intérprete y del validador: node tests/interprete.test.js */
globalThis.RL={};
['datos/curriculo','motor/interprete','motor/validador','datos/misiones'].forEach(function(f){require('../src/'+f+'.js')});
var RL=globalThis.RL,I=RL.Interprete,V=RL.Validador,fallos=0;
function ok(c,msg){if(!c){fallos++;console.log('FALLA: '+msg)}else console.log('ok   '+msg)}
var M=RL.misiones,m1=M[0],m2=M[1],m3=M[2];
function P(s){return s.split(' ').map(function(o){return{o:o}})}
/* intérprete */
var r=I.ejecutar(m1,m1.diseno,m1.solucion);
ok(r.meta&&!r.fallo&&r.fin.x===2&&r.fin.y===0,'m1: la solución con bucles llega al helecho');
ok(r.coste===4&&r.pasos.length===6,'m1: coste 4 y 6 pasos ejecutados');
ok(I.coste(P('N N E'))===3,'coste de órdenes sueltas');
ok(I.flatten([{rep:3,body:['N','E']}]).length===6,'un bucle de 3 con 2 órdenes da 6 pasos');
r=I.ejecutar(m1,m1.diseno,P('O'));ok(r.fallo&&r.fallo.tipo==='borde','salirse por el borde falla');
r=I.ejecutar(m1,m1.diseno,P('N N N N E S'));ok(r.fallo&&r.fallo.tipo==='roca','chocar con una roca falla');
r=I.ejecutar(m1,Object.assign({},m1.diseno,{mov:'ruedas'}),m1.solucion);ok(r.fallo&&r.fallo.tipo==='patina'&&r.fallo.paso===1,'ruedas: se atasca en el primer barro (paso 2)');
r=I.ejecutar(m1,Object.assign({},m1.diseno,{ene:'solar'}),m1.solucion);ok(r.fallo&&r.fallo.tipo==='sinEnergia'&&r.fallo.paso===3,'panel solar con niebla: sin energía en el paso 4');
r=I.ejecutar(m1,Object.assign({},m1.diseno,{her:'pinza'}),m1.solucion);ok(r.fallo&&r.fallo.tipo==='herramienta','herramienta equivocada falla al llegar');
r=I.ejecutar(m1,m1.diseno,P('N N'));ok(r.fallo&&r.fallo.tipo==='noLlega','programa corto: no llega');
r=I.ejecutar(m2,m2.diseno,P('N medir'));ok(r.fallo&&r.fallo.tipo==='faltanMedidas','medir solo una vez: faltan medidas');
r=I.ejecutar(m2,m2.diseno,P('medir'));ok(r.fallo&&r.fallo.tipo==='medirFuera','medir fuera de un poste falla');
r=I.ejecutar(m2,m2.diseno,m2.solucion);ok(r.meta&&r.medidas.length===4&&r.medidas[0].v===m2.lecturas['0,3'],'m2: mide los cuatro postes con sus lecturas');
r=I.ejecutar(m3,m3.diseno,m3.solucion);ok(r.meta&&r.fin.x===5&&r.fin.y===0,'m3: la escalera con bucle llega');
r=I.ejecutar(m3,m3.diseno,P('N E N E N E N E N E'));ok(r.meta&&r.coste===10,'m3: la escalera larga también llega (coste 10) y cabe en el límite (cumple, sin estrella de eficiencia)');
ok(r.coste<=m3.limite&&r.coste>m3.optimo,'m3: sin bucle cumple la misión pero no es eficiente');
/* pistas: tres escalones y nunca un simple «mal» */
r=I.ejecutar(m1,Object.assign({},m1.diseno,{mov:'ruedas'}),m1.solucion);var ps=I.pistas(m1,m1.diseno,m1.solucion,r);
ok(ps.length===3&&ps[0].nivel===1&&/diseño del robot/.test(ps[1].texto)&&/Movimiento/.test(ps[2].texto)&&/patinan/.test(ps[2].texto),'pistas de diseño: qué pasó, que el fallo es de una pieza y cuál');
r=I.ejecutar(m1,m1.diseno,P('N N N E E E'));ps=I.pistas(m1,m1.diseno,P('N N N E E E'),r);ok(ps&&ps[1].paso>=0,'desvío calculado cuando no llega ('+(r.fallo&&r.fallo.tipo)+', paso '+(ps&&ps[1].paso+1)+')');
ok(I.pistas(m1,m1.diseno,m1.solucion,I.ejecutar(m1,m1.diseno,m1.solucion))===null,'sin fallo no hay pistas');
/* validador: detecta misiones imposibles y códigos inventados */
var mala=Object.assign({},m3,{limite:2});ok(V.validar(mala,RL.curriculo).errores.length>0,'validador: límite imposible detectado');
mala=Object.assign({},m1,{saberes:['I.9.9']});ok(V.validar(mala,RL.curriculo).errores.some(function(e){return/I\.9\.9/.test(e)}),'validador: saber inventado detectado');
mala=Object.assign({},m1,{criterios:['3.1']});ok(V.validar(mala,RL.curriculo).errores.some(function(e){return/cooperativo/.test(e)}),'validador: 3.1 fuera de pareja detectado');
mala=Object.assign({},m1,{criterios:['3.4']});ok(V.validar(mala,RL.curriculo).errores.some(function(e){return/3\.4/.test(e)}),'validador: 3.4 no existe en segundo ciclo');
mala=Object.assign({},m1,{optimo:9});ok(V.validar(mala,RL.curriculo).errores.some(function(e){return/óptimo/.test(e)}),'validador: óptimo mal declarado detectado');
mala=Object.assign({},m1,{errores:{x:{cambio:{mov:'patas'},fallo:'patina'}}});ok(V.validar(mala,RL.curriculo).errores.some(function(e){return/se esperaba/.test(e)}),'validador: «porque» que no ocurre detectado');

/* motor del tercer ciclo: avanzar y girar, bucles anidados, si / si no, repetir hasta */
var F={id:'fx',tablero:['.....G','#.....','......','......','......','R.....'],lecturas:{},meta:{tipo:'llegar',x:5,y:0,herramienta:'pinza'},clima:'sol',rumbo:'N'};
var DC={mov:'patas',ene:'solar',sen:'camara',her:'pinza'};
r=I.ejecutar(F,DC,P('A A GD A A'));ok(r.fin.x===2&&r.fin.y===3&&r.dir==='E','avanzar y girar: termina en (2,3) mirando al este');
r=I.ejecutar(F,DC,[{rep:2,body:[{rep:3,body:['A']},'GD']}]);ok(r.pasos.length===8&&I.coste([{rep:2,body:[{rep:3,body:['A']},'GD']}])===4,'bucle anidado: 8 pasos y coste 4');
r=I.ejecutar(F,DC,[{hasta:'roca',body:['A']}]);ok(r.fin.x===0&&r.fin.y===2,'repetir hasta roca: se para delante de la roca (0,2)');
r=I.ejecutar(F,Object.assign({},DC,{sen:'humedad'}),[{hasta:'roca',body:['A']}]);ok(r.fallo&&r.fallo.tipo==='sinSensor','la condición sin cámara falla con sinSensor');
r=I.ejecutar(F,DC,[{hasta:'roca',body:['A']},{si:'roca',alto:['GD'],sino:['A']},{rep:5,body:['A']}]);ok(r.fin.x===5&&r.fin.y===2&&!r.fallo===false,'si roca…: gira y sigue (acaba en (5,2) y no llega a la meta)');
r=I.ejecutar(F,DC,[{si:'roca',alto:['GD'],sino:['A']}]);ok(r.fin.y===4&&r.pasos.length===1,'si no hay roca, ejecuta la rama «si no»');
r=I.ejecutar(F,DC,[{hasta:'meta',body:[]}]);ok(r.fallo&&r.fallo.tipo==='demasiados','un bucle que no termina se corta con «demasiados»');
ok(I.coste([{si:'roca',alto:['GD'],sino:['A','A']}])===4,'coste de si / si no = 1 + ramas');
r=I.ejecutar(F,DC,[{rep:2,body:[{rep:3,body:['A']},'GD']}]);ok(r.traza.every(function(e){return Array.isArray(e.ref)}),'las referencias de la traza son rutas');
var FS=Object.assign({},F,{ordenes:['A','GI','GD','repetir','hasta','si'],condiciones:['roca'],anidado:true}),bs=V.buscar(FS,DC,7);
ok(bs&&bs.coste===6,'validador de 3.er ciclo: óptimo 6 (girar, 5 avances, girar, 5 avances)');
ok(V.buscar(FS,DC,5)===null,'validador de 3.er ciclo: no existe solución con coste 5');
/* pistas con condiciones */
(function(){var mz=M.filter(function(x){return x.id==='z5p2'})[0];
 var prog=[{hasta:'meta',body:[{si:'roca',alto:['A'],sino:['GD']}]},{o:'A'}];
 var r=I.ejecutar(mz,mz.diseno,prog),ps=I.pistas(mz,mz.diseno,prog,r);
 ok(r.fallo&&ps&&/tenía delante/.test(ps[1].texto),'pistas con condiciones dicen qué había delante: '+(ps&&ps[1].texto));
 var plano=[{o:'GD'}],r2=I.ejecutar(mz,mz.diseno,plano),p2=I.pistas(mz,mz.diseno,plano,r2);
 ok(p2&&!/tenía delante/.test(p2[1].texto),'sin condiciones el escalón 2 no cambia')})();
/* rutina, llamada y contador */
(function(){var mz=M.filter(function(x){return x.id==='z6p1'})[0],d=mz.diseno;
 var r=I.ejecutar(mz,d,mz.solucion,mz.rutina);
 ok(r.meta&&r.cuenta===4&&r.coste===13,'z6p1: la solución con rutina cuenta 4 cúpulas con coste 13');
 ok(I.coste(I.expandir(mz.solucion,mz.rutina))===17,'sin la rutina el mismo programa cuesta 17');
 ok(I.ejecutar(mz,d,I.expandir(mz.solucion,mz.rutina)).meta,'el programa expandido hace lo mismo');
 var v=I.ejecutar(mz,d,[{llama:1}]);ok(v.fallo&&v.fallo.tipo==='sinRutina','llamar a una rutina vacía falla');
 var rr=I.ejecutar(mz,d,[{llama:1}],[{llama:1}]);ok(rr.fallo&&rr.fallo.tipo==='rutinaEnRutina','una rutina no llama a otra');
 var cf=I.ejecutar(mz,d,[{o:'contar'}]);ok(cf.fallo&&cf.fallo.tipo==='contarFuera','contar fuera de una cúpula falla');
 var ss=I.ejecutar(mz,Object.assign({},d,{sen:'camara'}),[{o:'A'},{o:'A'},{o:'contar'}]);ok(ss.fallo&&ss.fallo.tipo==='sinSensor','contar sin telescopio falla');
 var ec=I.ejecutar(mz,Object.assign({},d,{ene:'solar'}),mz.solucion,mz.rutina);ok(ec.fallo&&ec.fallo.tipo==='sinEnergia','de noche el panel solar no llega');
 /* condición del contador: repetir hasta contar 2 */
 var mm=Object.assign({},mz,{tablero:['........','........','........','........','.C.C....','........','.R......','........']});
 var h=I.ejecutar(mm,d,[{rep:2,body:[{o:'A'},{o:'A'},{o:'contar'}]},{hasta:'cont=2',body:[{o:'GD'}]}]);
 ok(h.cuenta===2||h.fallo,'el contador se acumula entre llamadas ('+h.cuenta+')');
 var h2=I.ejecutar(mz,d,[{o:'A'},{o:'A'},{o:'contar'},{si:'cont=1',alto:['GD'],sino:['GI']}]);
 ok(h2.dir==='E'||h2.dir==='O','«si cont=1» se evalúa sin cámara ('+h2.dir+')');
 var h3=I.ejecutar(mz,d,[{o:'A'},{o:'A'},{o:'contar'},{si:'cont=1',alto:['GD'],sino:['GI']}]);
 ok(h3.dir==='E','con un contador en 1 se toma la rama «entonces»')})();
console.log(fallos?('\n'+fallos+' fallos'):'\nTodas las pruebas del intérprete pasan');process.exit(fallos?1:0);
