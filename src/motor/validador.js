/* Validador de misiones: busca la solución más corta y comprueba códigos y reglas. */
(function(RL){
var I=RL.Interprete;
/* Búsqueda por profundización: programas de coste exacto c (órdenes sueltas o bucles simples). */
function buscar(m,d,maxC){
 var O=m.ordenes,ord=O.filter(function(o){return['repetir','si','hasta'].indexOf(o)<0}),found=null,cand=[],conds=m.condiciones||[];
 function bodies(L,cb){(function g(b){if(b.length===L){cb(b);return}ord.forEach(function(o){b.push(o);g(b);b.pop()})})([])}
 ord.forEach(function(o){cand.push({c:1,it:{o:o}})});
 if(O.indexOf('repetir')>=0){
  for(var L=1;L<=3;L++)bodies(L,function(b){for(var n=2;n<=5;n++)cand.push({c:1+L,it:{rep:n,body:b.slice()}})});
  if(m.anidado)ord.forEach(function(o){for(var n=2;n<=4;n++)for(var k=2;k<=4;k++){cand.push({c:3,it:{rep:n,body:[{rep:k,body:[o]}]}});ord.forEach(function(o2){cand.push({c:4,it:{rep:n,body:[{rep:k,body:[o]},o2]}})})}})}
 if(O.indexOf('si')>=0)conds.forEach(function(c){ord.forEach(function(a){cand.push({c:2,it:{si:c,alto:[a],sino:[]}});ord.forEach(function(e){cand.push({c:3,it:{si:c,alto:[a],sino:[e]}})})})});
 if(O.indexOf('hasta')>=0)conds.forEach(function(c){for(var L2=1;L2<=2;L2++)bodies(L2,function(b){cand.push({c:1+L2,it:{hasta:c,body:b.slice()}})})});
 /* «si» dentro de un bucle (profundidad 2): hasta/repetir con un si…si no como único cuerpo */
 if(m.siEnBucle&&O.indexOf('si')>=0)conds.forEach(function(c2){ord.forEach(function(a){ord.forEach(function(e){
  var si={si:c2,alto:[a],sino:[e]};
  conds.forEach(function(c){if(O.indexOf('hasta')>=0)cand.push({c:4,it:{hasta:c,body:[si]}})});
  if(O.indexOf('repetir')>=0)for(var n=2;n<=5;n++)cand.push({c:4,it:{rep:n,body:[si]}})});
  conds.forEach(function(c){if(O.indexOf('hasta')>=0)cand.push({c:3,it:{hasta:c,body:[{si:c2,alto:[a],sino:[]}]}})});
  if(O.indexOf('repetir')>=0)for(var n2=2;n2<=5;n2++)cand.push({c:3,it:{rep:n2,body:[{si:c2,alto:[a],sino:[]}]}})})});
 function dfs(prog,resto){
  if(found)return;
  if(resto===0){var r=I.ejecutar(m,d,prog);if(!r.fallo&&r.meta)found=prog.slice();return}
  for(var k=0;k<cand.length&&!found;k++)if(cand[k].c<=resto){prog.push(cand[k].it);dfs(prog,resto-cand[k].c);prog.pop()}}
 for(var c=1;c<=maxC&&!found;c++)dfs([],c);
 return found?{coste:I.coste(found),programa:found}:null}
var PIEZAS=['mov','ene','sen','her'];
function validar(m,cur){
 var e=[],C=cur.ciclos[m.ciclo];
 if(!C)e.push(m.id+': ciclo '+m.ciclo+' sin datos de currículo');
 else{
  m.saberes.forEach(function(s){if(!C.saberes[s])e.push(m.id+': saber '+s+' no existe en el ciclo '+m.ciclo)});
  m.criterios.forEach(function(c){if(!C.criterios[c])e.push(m.id+': criterio '+c+' no existe en el ciclo '+m.ciclo)})}
 m.criterios.forEach(function(c){if(c==='3.1'||c==='3.3')e.push(m.id+': el criterio cooperativo '+c+' solo se cita en modo pareja')});
 if(m.ciclo===2&&JSON.stringify(m.solucion).indexOf('"rep":')>=0&&m.solucion.some(function(it){return it.rep&&it.body.some(function(b){return typeof b!=='string'})}))e.push(m.id+': bucles anidados no permitidos en 3.º y 4.º');
 var r=I.ejecutar(m,m.diseno,m.solucion);
 if(r.fallo||!r.meta)e.push(m.id+': la solución de referencia no cumple la misión ('+(r.fallo&&r.fallo.tipo)+')');
 if(I.coste(m.solucion)>m.limite)e.push(m.id+': la solución de referencia ('+I.coste(m.solucion)+') supera el límite '+m.limite);
 var b=buscar(m,m.diseno,m.limite);
 if(!b)e.push(m.id+': no hay solución dentro del límite '+m.limite);
 else if(b.coste!==m.optimo)e.push(m.id+': óptimo declarado '+m.optimo+' pero el buscador halla '+b.coste);
 /* cada «porque» debe ocurrir de verdad con la pieza equivocada */
 Object.keys(m.errores||{}).forEach(function(k){
  var x=m.errores[k],d=Object.assign({},m.diseno,x.cambio),rr=I.ejecutar(m,d,m.solucion);
  if(!rr.fallo||rr.fallo.tipo!==x.fallo)e.push(m.id+': con '+JSON.stringify(x.cambio)+' se esperaba el fallo '+x.fallo+' y ocurre '+(rr.fallo&&rr.fallo.tipo))});
 /* la solución debe pedir bucle si el límite no deja otra cosa */
 if(m.ordenes.indexOf('repetir')<0&&m.exigeBucle)e.push(m.id+': exige bucle pero no ofrece «repetir»');
 return{errores:e,optimo:b&&b.coste,ejemplo:b&&b.programa}}
RL.Validador={buscar:buscar,validar:validar,PIEZAS:PIEZAS};
if(typeof module!=='undefined')module.exports=RL.Validador;
})(globalThis.RL=globalThis.RL||{});
