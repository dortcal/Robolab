/* Pruebas de misiones: node tests/misiones.test.js */
globalThis.RL={};
['datos/curriculo','motor/interprete','motor/validador','datos/misiones','datos/piezas'].forEach(function(f){require('../src/'+f+'.js')});
var RL=globalThis.RL,fallos=0;
function ok(c,msg){if(!c){fallos++;console.log('FALLA: '+msg)}else console.log('ok   '+msg)}
RL.misiones.forEach(function(m){
 var t0=Date.now(),r=RL.Validador.validar(m,RL.curriculo);
 ok(r.errores.length===0,m.id+' valida'+(r.errores.length?' -> '+r.errores.join(' | '):'')+' (óptimo '+r.optimo+', '+(Date.now()-t0)+' ms)');
 /* cada banco de lecturas funciona con la solución */
 (m.bancoLecturas||[]).forEach(function(v,i){var mm=Object.assign({},m,{lecturas:{}});m.ordenLecturas.forEach(function(k,j){mm.lecturas[k]=v[j]});
  var x=RL.Interprete.ejecutar(mm,m.diseno,m.solucion);ok(!x.fallo&&x.meta&&x.medidas.length===4,m.id+' banco '+i+' completa')});
 /* en 3.º las órdenes no pasan del segundo ciclo */
 var perm=m.ciclo===2?['N','S','E','O','medir','repetir']:['A','GI','GD','N','S','E','O','medir','contar','llamar','repetir','hasta','si'];
 ok(m.ordenes.every(function(o){return perm.indexOf(o)>=0})&&(m.ciclo===3||!m.condiciones),m.id+' órdenes del ciclo '+m.ciclo);
});
/* Piezas del prototipo existen */
RL.misiones.forEach(function(m){Object.keys(m.diseno).forEach(function(k){ok(RL.piezas[k].op.some(function(o){return o.id===m.diseno[k]}),m.id+' pieza '+k+'='+m.diseno[k]+' existe')})});
console.log(fallos?('\n'+fallos+' fallos'):'\nTodas las pruebas de misiones pasan');process.exit(fallos?1:0);
