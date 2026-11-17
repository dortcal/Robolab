/* Intérprete de órdenes paso a paso. Sin DOM: se prueba con Node. */
(function(RL){
var DIR={N:[0,-1],S:[0,1],E:[1,0],O:[-1,0]},GIRO={GD:{N:'E',E:'S',S:'O',O:'N'},GI:{N:'O',O:'S',S:'E',E:'N'}};
/* Un elemento del programa: {o}, {rep,body}, {si,alto,sino} o {hasta,body}. En un cuerpo se admite además la orden como texto. */
function norm(x){return typeof x==='string'?{o:x}:x}
/* Coste del programa; si hay «Mi rutina» (fn) con contenido, su definición cuenta 1 más sus órdenes y cada llamada cuenta 1. */
function coste(prog,fn){return prog.reduce(function(a,it){it=norm(it);
 if(it.rep||it.hasta)return a+1+coste(it.body);
 if(it.si)return a+1+coste(it.alto||[])+coste(it.sino||[]);return a+1},0)+(fn&&fn.length?1+coste(fn):0)}
/* Programa equivalente con cada llamada sustituida por el contenido de la rutina (para comparar con y sin función). */
function expandir(prog,fn){function ex(L){var o=[];L.forEach(function(x){var it=norm(x);
  if(it.llama)(fn||[]).forEach(function(y){o.push(y)});
  else if(it.rep||it.hasta){var c=Object.assign({},it);c.body=ex(it.body);o.push(c)}
  else if(it.si){var c2=Object.assign({},it);c2.alto=ex(it.alto||[]);c2.sino=ex(it.sino||[]);o.push(c2)}
  else o.push(x)});return o}return ex(prog)}
function celda(m,x,y){var f=m.tablero[y];if(!f||x<0||y<0||x>=f.length)return null;return f.charAt(x)}
function inicio(m){for(var y=0;y<m.tablero.length;y++){var x=m.tablero[y].indexOf('R');if(x>=0)return{x:x,y:y}}}
function postes(m){var p=[];m.tablero.forEach(function(f,y){for(var x=0;x<f.length;x++)if('HM'.indexOf(f[x])>=0)p.push({x:x,y:y})});return p}
function cupulas(m){var p=[];m.tablero.forEach(function(f,y){for(var x=0;x<f.length;x++)if(f[x]==='C')p.push({x:x,y:y})});return p}
function capacidad(m,d){return d.ene==='bateria'?(m.bateria||14):((m.clima==='niebla'||m.clima==='noche')?3:30)}
/* Ejecuta el programa con el diseño dado. Devuelve la traza y, si falla, dónde y por qué.
   Las condiciones (si / hasta) se evalúan con el sensor: «roca», «barro», «libre» y «meta» miran la casilla de enfrente y necesitan la cámara. */
function ejecutar(m,d,prog,fn){
 var p=inicio(m),dir=m.rumbo||'N',cap=capacidad(m,d),tr=[],pasos=[],med=[],fallo=null,i=0,LIM=200,exceso=false,cnt=0,cup=[],enFn=false;
 function fail(t,ref,ev){fallo={tipo:t,paso:i,ref:ref};if(ev)ev.fallo=t}
 function delante(){var v=DIR[dir];return{x:p.x+v[0],y:p.y+v[1]}}
 function cond(c,ref){
  var mc=/^cont=(\d+)$/.exec(c);if(mc)return cnt>=+mc[1];
  if(d.sen!=='camara'){fail('sinSensor',ref);return null}
  var q=delante(),k=celda(m,q.x,q.y);
  if(c==='roca')return k==='#';if(c==='barro')return k==='B'||k==='M';
  if(c==='libre')return k!==null&&k!=='#';if(c==='meta')return k==='G';return false}
 function orden(o,ref){
  var ev={i:i,o:o,ref:ref,de:{x:p.x,y:p.y},dir:dir};pasos.push({o:o,ref:ref});
  if(i>=cap){fail('sinEnergia',ref,ev);ev.a={x:p.x,y:p.y};tr.push(ev);i++;return}
  if(o==='GD'||o==='GI'){dir=GIRO[o][dir];ev.a={x:p.x,y:p.y};ev.dir=dir;ev.giro=o;tr.push(ev);i++;return}
  if(o==='contar'){
   var cc=celda(m,p.x,p.y);
   if(d.sen!=='telescopio')fail('sinSensor',ref,ev);
   else if(cc!=='C')fail('contarFuera',ref,ev);
   else{cnt++;if(!cup.some(function(q){return q.x===p.x&&q.y===p.y}))cup.push({x:p.x,y:p.y});ev.cuenta=cnt}
   ev.a={x:p.x,y:p.y};tr.push(ev);i++;return}
  if(o==='medir'){
   var c=celda(m,p.x,p.y);
   if(d.sen!=='humedad')fail('sinSensor',ref,ev);
   else if('HM'.indexOf(c)<0)fail('medirFuera',ref,ev);
   else{var v=m.lecturas[p.x+','+p.y];med.push({x:p.x,y:p.y,v:v});ev.medida=v}
   ev.a={x:p.x,y:p.y};tr.push(ev);i++;return}
  var dd=o==='A'?DIR[dir]:DIR[o],nx=p.x+dd[0],ny=p.y+dd[1],c2=celda(m,nx,ny);
  if(c2===null){fail('borde',ref,ev);ev.a={x:p.x,y:p.y}}
  else if(c2==='#'){fail('roca',ref,ev);ev.a={x:p.x,y:p.y}}
  else{p={x:nx,y:ny};ev.a={x:nx,y:ny};
   if((c2==='B'||c2==='M')&&d.mov==='ruedas')fail('patina',ref,ev)}
  tr.push(ev);i++}
 function correr(items,path){
  for(var k=0;k<items.length&&!fallo&&!exceso;k++){
   var it=norm(items[k]),ref=path.concat(k);
   if(i>LIM){exceso=true;return}
   if(it.rep){for(var r=0;r<it.rep&&!fallo&&!exceso;r++)correr(it.body,ref)}
   else if(it.hasta){var g=0;while(!fallo&&!exceso){var c=cond(it.hasta,ref);if(fallo||c)break;if(++g>60||i>LIM){exceso=true;break}correr(it.body,ref)}}
   else if(it.llama){if(!fn||!fn.length)fail('sinRutina',ref);else if(enFn)fail('rutinaEnRutina',ref);else{enFn=true;correr(fn,['f']);enFn=false}}
   else if(it.si){var c2=cond(it.si,ref);if(!fallo){var br=c2?0:1;correr((c2?it.alto:it.sino)||[],ref.concat(br))}}
   else orden(it.o,ref)}}
 correr(prog,[]);
 if(exceso&&!fallo)fallo={tipo:'demasiados',paso:i,ref:[0]};
 var meta=false,g=m.meta,ult=pasos.length?pasos[pasos.length-1].ref:[0];
 if(!fallo){
  if(g.tipo==='llegar'){
   if(p.x===g.x&&p.y===g.y){if(d.her!==g.herramienta)fallo={tipo:'herramienta',paso:pasos.length-1,ref:ult};else meta=true}
   else fallo={tipo:'noLlega',paso:pasos.length-1,ref:ult}}
  else if(g.tipo==='medir'){
   var ok=postes(m).every(function(q){return med.some(function(z){return z.x===q.x&&z.y===q.y})});
   if(ok)meta=true;else fallo={tipo:'faltanMedidas',paso:pasos.length-1,ref:ult}}
  else if(g.tipo==='contar'){
   var okc=cupulas(m).every(function(q){return cup.some(function(z){return z.x===q.x&&z.y===q.y})});
   if(okc)meta=true;else fallo={tipo:'faltanCupulas',paso:pasos.length-1,ref:ult}}}
 return{pasos:pasos,traza:tr,fallo:fallo,medidas:med,meta:meta,coste:coste(prog,fn),fin:p,dir:dir,cuenta:cnt,cupulas:cup}}
function flatten(prog){return ejecutarSolo(prog)}
function ejecutarSolo(prog){var o=[];(function f(items,path){items.forEach(function(x,k){var it=norm(x),ref=path.concat(k);if(it.rep){for(var r=0;r<it.rep;r++)f(it.body,ref)}else if(it.o)o.push({o:it.o,ref:ref})})})(prog,[]);return o}
function primerDesvio(m,d,prog,res){
 var ref=ejecutar(m,m.diseno,m.solucion,m.rutina).traza,k;
 for(k=0;k<res.traza.length;k++){var a=res.traza[k].a,b=ref[k]&&ref[k].a;if(!b||!a||a.x!==b.x||a.y!==b.y)return k}
 return res.traza.length?res.traza.length-1:0}
var TXT={
 patina:'El robot se ha atascado en el barro.',sinEnergia:'El robot se ha quedado sin energía antes de terminar.',
 roca:'El robot ha chocado con una roca.',borde:'El robot se ha salido del tablero.',
 sinSensor:'El sensor no sirve para medir aquí.',medirFuera:'El robot ha medido donde no hay poste.',
 herramienta:'El robot ha llegado, pero su herramienta no sirve para esto.',
 noLlega:'El programa ha terminado y el robot no ha llegado a la meta.',faltanMedidas:'Faltan puntos por medir.',contarFuera:'El robot ha contado donde no hay cúpula.',faltanCupulas:'Faltan cúpulas por contar.',sinRutina:'Has llamado a «Mi rutina», pero está vacía.',rutinaEnRutina:'Una rutina no puede llamar a otra rutina.',demasiados:'El programa tiene demasiados pasos o no termina.'};
/* Si el programa usa condiciones, el segundo escalón dice qué tenía delante el robot en ese paso. */
function delante(m,ev,prog){
 if(!ev||!ev.de||!ev.dir||!/"(si|hasta)":/.test(JSON.stringify(prog)))return'';
 var v=DIR[ev.dir],k=celda(m,ev.de.x+v[0],ev.de.y+v[1]);
 var t=k===null?'el borde del tablero':(k==='#'?'una roca':(k==='G'?'la meta':(k==='B'||k==='M'?'barro':'camino libre')));
 return' En ese momento tenía delante '+t+'.'}
/* Tres escalones: qué ha pasado, en qué paso se desvía, primera parte de la solución. */
function pistas(m,d,prog,res){
 var f=res.fallo;if(!f)return null;
 var desv=primerDesvio(m,d,prog,res),n1=(f.tipo==='noLlega'||f.tipo==='faltanMedidas'||f.tipo==='faltanCupulas')?desv:f.paso;
 var sol=ejecutar(m,m.diseno,m.solucion,m.rutina).pasos.slice(0,2).map(function(s){return s.o}).join(' ');
 return[{nivel:1,texto:TXT[f.tipo]||'Algo ha salido mal.'},
  {nivel:2,texto:'El robot se desvía en el paso '+(n1+1)+'.'+delante(m,res.traza[n1],prog),paso:n1,ref:(res.pasos[n1]||{}).ref},
  {nivel:3,texto:(m.porque[f.tipo]||'')+' El programa empieza así: '+sol+'.',porque:m.porque[f.tipo]||''}]}
RL.Interprete={flatten:flatten,coste:coste,expandir:expandir,cupulas:cupulas,ejecutar:ejecutar,primerDesvio:primerDesvio,pistas:pistas,inicio:inicio,postes:postes,celda:celda,capacidad:capacidad};
if(typeof module!=='undefined')module.exports=RL.Interprete;
})(globalThis.RL=globalThis.RL||{});
