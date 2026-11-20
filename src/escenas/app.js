/* Escenas del prototipo: inicio, aviso, diseña, programa y prueba, lectura de datos y bitácora. */
(function(RL){
var E=RL.E,A=RL.Arte,I=RL.Interprete,G=RL.Guardado,$=function(s){return document.querySelector(s)},app,timers=[];
var GL={N:'↑',S:'↓',E:'→',O:'←',medir:'⌖',contar:'+1',llamar:'↪',A:'▲',GI:'↶',GD:'↷'},NOM={N:'norte',S:'sur',E:'este',O:'oeste',medir:'medir',contar:'contar',llamar:'Mi rutina',A:'avanzar',GI:'girar izq.',GD:'girar der.'},DV={N:[0,-1],E:[1,0],S:[0,1],O:[-1,0]},ANG={N:0,E:90,S:180,O:270};
function nuevaLinea(m){var l={pos:[],mix:[],ok:false,fallos:0,hint:0,msg:''};if(!m.linea)return l;var ids=m.linea.tarjetas.map(function(c){return c.id}),a;
 do{a=ids.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}}while(a.length>1&&a.every(function(x,k){return x===ids[k]}));l.mix=a;return l}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function decir(t){var e=$('#estado');if(e)e.textContent=t}
function limpiar(){timers.forEach(clearTimeout);timers=[]}
function mision(id){return RL.misiones.filter(function(m){return m.id===id})[0]}
/* ---------- tablero ---------- */
function geo(m){var n=m.tablero.length,w=m.tablero[0].length,S=n>6?54:(n>5?60:66);return{n:n,w:w,S:S,X0:(900-w*S)/2,Y0:n>6?104:(n>5?132:150),sc:S/125}}
function botT(g,p){var x=g.X0+p.x*g.S+g.S/2,y=g.Y0+p.y*g.S+g.S-6;return'translate('+(x-100*g.sc)+'px,'+(y-188*g.sc)+'px) scale('+g.sc+')'}
function rosa(x0){var big=!x0;return'<g transform="translate('+(big?78:x0+50)+' '+(big?78:70)+') scale('+(big?1:.7)+')"><circle r="40" fill="#FFFDFA" stroke="#2B1A16" stroke-width="3"/><path d="M0-30V30M-30 0H30" stroke="#2B1A16" stroke-width="3" stroke-linecap="round"/><path d="M0-34l7 12h-14z" fill="#FF6A4D" stroke="#2B1A16" stroke-width="2.5" stroke-linejoin="round"/><text y="-40" x="0" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="15" fill="#2B1A16" transform="translate(0 -10)">N</text><text x="52" y="6" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="15" fill="#2B1A16">E</text><text x="0" y="62" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="15" fill="#2B1A16">S</text><text x="-52" y="6" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="15" fill="#2B1A16">O</text></g>'}
function hdT(d){var v=DV[d];return'translate('+(100+v[0]*78)+' '+(140+v[1]*78)+') rotate('+ANG[d]+') scale(1.5)'}
function setHead(d){var h=$('#hd');if(h)h.setAttribute('transform',hdT(d))}
function estrecha(){return window.innerWidth<640}
function board(m,o){o=o||{};var g=geo(m),s='';var vb=estrecha()?[g.X0-24,0,g.w*g.S+48,540]:[0,0,900,540];
 s+=(m.zona==='isla'?RL.Fondos.isla(900,540):(m.zona==='cumbre'?RL.Fondos.cumbre(900,540):(m.zona==='volcanes'?RL.Fondos.volcanes(900,540):RL.Fondos.monteverde(900,540,m.clima==='niebla'))));
 for(var y=0;y<g.n;y++)for(var x=0;x<g.w;x++){var c=m.tablero[y][x],k=c==='#'?'roca':(c==='B'||c==='M')?'barro':(c==='P'?'picon':(m.zona==='cumbre'?'cumbre':(m.zona==='volcanes'?'ceniza':'hierba')));s+=RL.Casillas.tile(k,g.X0+x*g.S,g.Y0+y*g.S,g.S-4,12)}
 for(y=0;y<g.n;y++)for(x=0;x<g.w;x++){c=m.tablero[y][x];var cx=g.X0+x*g.S+g.S/2-2,by=g.Y0+y*g.S+g.S-10;
  if(c==='H'||c==='M')s+=RL.Casillas.obj('poste',cx,by,.9);
  if(c==='C')s+=RL.Casillas.obj('cupula',cx,by,.95);
  if(c==='G')s+=RL.Casillas.obj(m.meta.herramienta==='regadera'?(o.hecho?'helecho':'seco'):'meta',cx,by,.95)}
 s+=rosa(vb[0]);
 if(m.clima==='niebla')s+=RL.Fondos.lluvia();
 s+='<g id="fxs"></g><g id="bot" style="transition:transform '+(.5/E.ajustes.vel)+'s cubic-bezier(.3,1.3,.5,1);transform:'+botT(g,o.pos||I.inicio(m))+'"><g id="botInner">'+A.robot(o.diseno||E.diseno,o.ojos||'reposo',false)+'</g>'+(m.rumbo?'<g id="hd" style="transition:transform .25s" transform="'+hdT(m.rumbo)+'"><path d="M0-18L13 8H-13z" fill="#FF6A4D" stroke="#2B1A16" stroke-width="5" stroke-linejoin="round"/></g>':'')+'</g>';
 return'<svg id="tab" viewBox="'+vb.join(' ')+'" role="img" aria-label="Tablero de '+g.w+' por '+g.n+' casillas en '+({isla:'la isla',cumbre:'la cumbre',volcanes:'el volcán'}[m.zona]||'el monteverde')+'">'+s+'</svg>'}
function setBot(ojos,mover){var b=$('#botInner');if(b)b.innerHTML=A.robot(E.diseno,ojos,mover)}
function par(){var sv=$('#tab');if(!sv)return}
/* ---------- pantallas ---------- */
function barra(titulo,atras){return'<div class="top"><button class="btn peq" data-nav data-act="'+(atras||'inicio')+'" aria-label="Volver">← Volver</button><h1>'+esc(titulo)+'</h1><button class="btn peq" data-nav data-act="ajustes" aria-label="Ajustes">Ajustes</button></div>'}
function estrellas(n){var s='';for(var i=0;i<3;i++)s+='<svg class="est'+(i<n?' on':'')+'" viewBox="-12 -12 24 24" aria-hidden="true"><path d="M0-10l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>';return'<span class="estrellas" role="img" aria-label="'+n+' de 3 estrellas">'+s+'</span>'}
function inicio(){
 var h='<div class="top"><h1>RoboLab · Prototipo</h1><button class="btn peq" data-nav data-act="ajustes">Ajustes</button></div>';
 h+='<p class="lead">Prototipo con misiones de 3.º, 5.º y 6.º. Elige una misión: diseña el robot, prográmalo y mira qué pasa.</p><div class="cards">';
 RL.misiones.forEach(function(m){var n=G.datos.estrellas[m.id]||0;
  h+='<button class="card mis" data-nav data-act="mision" data-id="'+m.id+'"><span class="t">'+esc(m.titulo)+'</span><span class="q">'+m.curso+'.º · '+esc(m.aviso.quien)+'</span>'+estrellas(n)+'</button>'});
 return h+'</div><div class="acc"><button class="btn peq" data-nav data-act="ir" data-p="informe">Ver mi informe</button><button class="btn peq" data-nav data-act="ir" data-p="docentes">Para docentes</button></div><p class="nota">Flechas para moverte, Espacio para elegir. También funciona tocando.</p>'}
function aviso(){var m=E.m,o=Object.keys(E.datos).length;
 var h=barra(m.titulo,'inicio');
 h+='<div class="escena">'+board(m,{})+'';
 m.aviso.datos.forEach(function(d){h+='<button class="hot'+(E.datos[d.id]?' ok':'')+'" data-nav data-act="dato" data-id="'+d.id+'" style="left:'+d.x+'%;top:'+d.y+'%" aria-label="Mirar: '+esc(d.id)+'"><span aria-hidden="true">'+(E.datos[d.id]?'✓':'?')+'</span></button>'});
 h+='</div><div class="burbuja"><b>'+esc(m.aviso.quien)+':</b> '+esc(m.aviso.texto)+'</div>';
 h+='<ul class="datos" aria-label="Datos reunidos">';m.aviso.datos.forEach(function(d){h+='<li class="'+(E.datos[d.id]?'on':'')+'">'+(E.datos[d.id]?esc(d.t):'Toca la escena para reunir un dato')+'</li>'});
 return h+'</ul><div class="acc"><button class="btn gr" data-nav data-act="ir" data-p="'+(m.linea?'linea':'disena')+'">'+(m.linea?'Ordenar las etapas':'Diseñar el robot')+'</button><span class="nota">Datos: '+o+' de '+m.aviso.datos.length+'</span></div>'}
function disena(){var m=E.m,d=E.diseno,h=barra('Diseña el robot','aviso'),listo=d.mov&&d.ene&&d.sen&&d.her&&E.pred;
 h+='<div class="dis"><div class="stage"><svg viewBox="0 0 220 200" role="img" aria-label="Robot con las piezas elegidas">'+'<g transform="translate(10 0)">'+A.robot({mov:d.mov||'ruedas',ene:d.ene||'bateria',sen:d.sen||'camara',her:d.her||'pinza'},E.pred?'reposo':'duda',false)+'</g></svg></div><div class="slots">';
 ['mov','ene','sen','her'].forEach(function(k){var S=RL.piezas[k];h+='<div class="col"><h2>'+S.nombre+'</h2>';
  S.op.filter(function(o){return!o.z||o.z.indexOf(E.m.zona)>=0}).forEach(function(o){h+='<button class="btn pz" data-nav data-act="pieza" data-k="'+k+'" data-id="'+o.id+'" aria-pressed="'+(d[k]===o.id)+'">'+o.n+'</button>'});h+='</div>'});
 h+='</div></div><div class="ficha" id="ficha" aria-live="polite">'+(E.ficha?'<b>'+esc(E.ficha.n)+'.</b> '+esc(E.ficha.f):'Elige una pieza en cada columna para ver su ficha.')+'</div>';
 h+='<div class="pred"><h2>¿Qué crees que pasará?</h2><div class="fila">';
 [['ok','Lo conseguirá'],['atasca','Se atascará o chocará'],['energia','Se quedará sin energía']].forEach(function(p){h+='<button class="btn pz" data-nav data-act="pred" data-id="'+p[0]+'" aria-pressed="'+(E.pred===p[0])+'">'+p[1]+'</button>'});
 return h+'</div></div><div class="acc"><button class="btn gr" data-nav data-act="ir" data-p="programa"'+(listo?'':' disabled')+'>Programar</button>'+(listo?'':'<span class="nota">Elige cuatro piezas y una predicción.</span>')+'</div>'}
function raiz(c){return c==='F'||c.indexOf('F.')===0}
function rel(c){return c==='F'?'':(c.indexOf('F.')===0?c.slice(2):c)}
function K(c){c=rel(c);return c===''?[]:c.split('.').map(function(x,k){return k%2?x:+x})}
function cont(c){var a=raiz(c)?E.fn:E.prog,k=K(c),j;for(j=0;j<k.length;j+=2){var it=a[k[j]];if(!it||!it[k[j+1]])return null;a=it[k[j+1]]}return a}
function prof(c){var r=rel(c);return r===''?0:r.split('.').length/2}
function alt(it){if(!(it.rep||it.hasta||it.si))return 0;var m=0;['body','alto','sino'].forEach(function(k){(it[k]||[]).forEach(function(x){m=Math.max(m,alt(typeof x==='string'?{o:x}:x))})});return 1+m}
function hallar(it,L,c){for(var j=0;j<L.length;j++){if(L[j]===it)return{c:c,i:j};var x=L[j],ks=(x.rep||x.hasta)?['body']:(x.si?['alto','sino']:[]);for(var k=0;k<ks.length;k++){var r=hallar(it,x[ks[k]],(c?c+'.':'')+j+'.'+ks[k]);if(r)return r}}return null}
function raizDe(c){return raiz(c)?'F':''}
function setCur(c,i){E.cur={c:c,i:i};E.enBucle=(c===''||c==='F')?null:c}
function ajustarCur(){var c=E.cur.c,L=cont(c);if(!L){c='';L=E.prog;E.cur={c:'',i:E.prog.length}}E.cur={c:c,i:Math.max(0,Math.min(E.cur.i,L.length))};E.enBucle=(c===''||c==='F')?null:c}
function padre(c){var k=K(c),pr=raizDe(c),pa=k.slice(0,-2).join('.');return{c:pa===''?pr:(pr?pr+'.':'')+pa,i:k[k.length-2]}}
function coste(){return I.coste(E.prog,E.fn)}
function esSel(c,i){return!!E.sel&&E.sel.c===c&&E.sel.i===i}
function slot(c,i){var on=E.cur.c===c&&E.cur.i===i;return'<button class="slot'+(on?' cur':'')+'" data-nav data-act="slot" data-c="'+c+'" data-i="'+i+'" aria-pressed="'+on+'" aria-label="'+(E.sel?'Mover aquí':'Poner aquí')+'"'+(E.ejecutando?' disabled':'')+'><span class="bar"></span></button>'}
function blk(c,i,ref,txt,nom,cls){return'<button class="'+cls+' blk'+(esSel(c,i)?' sel':'')+'" data-nav data-act="sel" data-c="'+c+'" data-i="'+i+'" data-ref="'+ref+'" aria-pressed="'+esSel(c,i)+'" aria-label="'+nom+'"'+(E.ejecutando?' disabled':'')+'>'+txt+'</button>'}
function lista(items,c,ref){var h=slot(c,0);
 items.forEach(function(it,j){it=typeof it==='string'?{o:it}:it;var r=ref.concat(j),rs=r.join('-'),cj=(c?c+'.':'')+j;
  if(it.rep||it.hasta){var cb=cj+'.body';h+='<div class="bucle'+(E.cur.c===cb?' act':'')+'">'+blk(c,j,rs,it.rep?'Repetir ×'+it.rep:'Repetir hasta '+it.hasta,(it.rep?'Repetir '+it.rep+' veces':'Repetir hasta '+it.hasta)+', bucle','rep')+'<div class="dentro">'+lista(it.body,cb,r)+'</div></div>'}
  else if(it.si){h+='<div class="cond">'+blk(c,j,rs,'Si '+it.si,'Si hay '+it.si+', condición','rep')+'<div class="ramas"><div class="rama'+(E.cur.c===cj+'.alto'?' act':'')+'"><span class="et">entonces</span><div class="dentro">'+lista(it.alto||[],cj+'.alto',r.concat(0))+'</div></div><div class="rama'+(E.cur.c===cj+'.sino'?' act':'')+'"><span class="et">si no</span><div class="dentro">'+lista(it.sino||[],cj+'.sino',r.concat(1))+'</div></div></div></div>'}
  else if(it.llama)h+=blk(c,j,rs,GL.llamar+' Mi rutina','Llamar a Mi rutina','step llama');
  else h+=blk(c,j,rs,GL[it.o],NOM[it.o],'step');
  h+=slot(c,j+1)});
 return h}
function tira(m){ajustarCur();var h='<div class="linea">'+lista(E.prog,'',[])+(E.prog.length?'':'<span class="vacia">Pulsa una orden de abajo, o arrástrala hasta aquí.</span>')+'</div>';
 if(m.ordenes.indexOf('llamar')>=0)h+='<div class="linea rutina"><span class="et">Mi rutina</span>'+lista(E.fn,'F',['f'])+(E.fn.length?'':'<span class="vacia">Escribe aquí lo que se repite; luego usa «Mi rutina» en el programa.</span>')+'</div>';
 return h}
function programa(){var m=E.m,c=coste(),lleno=c>=m.limite,h=barra(m.titulo,'disena');
 h+='<div class="escena'+(E.ejecutando?'':' calm')+'" id="esc">'+board(m,{diseno:E.diseno,ojos:'reposo'})+'</div>';
 if(m.meta.tipo==='contar')h+='<p class="cuenta" aria-live="polite">Cúpulas contadas: <b id="cnt">'+(E.res&&!E.ejecutando?E.res.cuenta:0)+'</b> de '+I.cupulas(m).length+'</p>';
if(m.ordenes.indexOf('llamar')>=0)h+='<p class="guia">Si un tramo se repite pero entre medias hay otros pasos, escríbelo una sola vez en «Mi rutina» y llámala cuando la necesites.</p>';
 h+='<p class="guia">Pulsa una orden por cada paso. Si algo se repite, usa un bucle (↻ o ⟳): así necesitas menos órdenes y ganas una estrella. Arrastra los bloques adonde quieras, o toca un hueco, un bloque y «borrar» para cambiarlo.</p><div class="prog"><div class="tira" id="tira" aria-label="Tu programa">'+tira(m)+'</div><div class="cont">Órdenes: <b>'+c+'</b> de '+m.limite+'</div></div>';
 h+='<div class="pal" role="group" aria-label="Órdenes">';
 m.ordenes.forEach(function(o){if(o==='repetir'||o==='hasta'||o==='si')return;h+='<button class="btn ord" data-nav data-act="ord" data-o="'+o+'"'+((lleno||E.ejecutando||(o==='llamar'&&(raiz(E.cur.c)||!E.fn.length)))?' disabled':'')+' aria-label="'+NOM[o]+'"><span class="g" aria-hidden="true">'+GL[o]+'</span><span class="n">'+(o==='medir'?'medir':NOM[o])+'</span></button>'});
 var sinHueco=lleno||E.ejecutando||prof(E.cur.c)>=(m.profundidad||1);
 if(m.ordenes.indexOf('hasta')>=0)(m.condiciones||[]).forEach(function(c){h+='<button class="btn ord rp" data-nav data-act="hasta" data-cond="'+c+'"'+(sinHueco?' disabled':'')+'><span class="g" aria-hidden="true">⟳</span><span class="n">hasta '+c+'</span></button>'});
 if(m.ordenes.indexOf('si')>=0)(m.condiciones||[]).forEach(function(c){h+='<button class="btn ord rp" data-nav data-act="si" data-cond="'+c+'"'+(sinHueco?' disabled':'')+'><span class="g" aria-hidden="true">?</span><span class="n">si '+c+'</span></button>'});
 if(m.ordenes.indexOf('repetir')>=0)[2,3,4,5].forEach(function(n){h+='<button class="btn ord rp" data-nav data-act="rep" data-n="'+n+'"'+(sinHueco?' disabled':'')+'><span class="g" aria-hidden="true">↻</span><span class="n">×'+n+'</span></button>'});
 if(m.ordenes.indexOf('repetir')>=0||m.ordenes.indexOf('hasta')>=0||m.ordenes.indexOf('si')>=0){h+='<button class="btn ord" data-nav data-act="salir"'+((E.enBucle===null||E.ejecutando)?' disabled':'')+'><span class="g" aria-hidden="true">⤴</span><span class="n">salir</span></button>'}
 h+='<button class="btn ord" data-nav data-act="borrar"'+((!(E.prog.length+E.fn.length)||E.ejecutando)?' disabled':'')+'><span class="g" aria-hidden="true">⌫</span><span class="n">borrar</span></button></div>';
 h+='<div class="acc"><button class="btn gr" data-nav data-act="probar"'+((!E.prog.length||E.ejecutando)?' disabled':'')+'>Probar</button><button class="btn peq" data-nav data-act="vel">Velocidad ×'+E.ajustes.vel+'</button><span class="nota" id="aviso-lim">'+(E.sel?'Bloque marcado: toca un hueco para moverlo o pulsa borrar.':(E.enBucle!==null?(/\.(alto|sino)$/.test(E.enBucle)?'Estás dentro de un «si»: lo que añadas ocurre solo en esa rama.':'Estás dentro de un bucle: lo que añadas se repite.'):(lleno?'Has llegado al límite de órdenes.':'')))+'</span></div>';
 h+='<div class="res" id="res" aria-live="polite">'+resultado()+'</div>';return h}
function resultado(){var r=E.res;if(!r||E.ejecutando)return'';
 if(!r.fallo&&r.meta){return'<div class="ok"><b>¡Lo has conseguido!</b> Con '+r.coste+' órdenes. '+(E.m.lectura?'Ahora toca leer los datos.':'')+'</div><div class="acc"><button class="btn gr" data-nav data-act="ir" data-p="'+(E.m.lectura?'lectura':'bitacora')+'">'+(E.m.lectura?'Leer los datos':'Bitácora')+'</button></div>'}
 var h='<div class="mal">',p=E.pistas;h+='<p><b>Prediste:</b> '+({ok:'lo conseguirá',atasca:'se atascará o chocará',energia:'se quedará sin energía'}[E.pred])+'. <b>Pasó:</b> '+({hunde:'se hundió',patina:'se atascó',roca:'chocó',borde:'chocó',sinEnergia:'se quedó sin energía'}[r.fallo.tipo]||'no lo consiguió')+'.</p>';
 for(var i=0;i<E.hint&&i<3;i++)h+='<p class="pista"><span class="np">Pista '+(i+1)+'</span> '+esc(p[i].texto)+'</p>';
 h+='</div><div class="acc">';if(E.hint<3)h+='<button class="btn" data-nav data-act="pista">Otra pista</button>';
 h+='<button class="btn" data-nav data-act="ir" data-p="disena">Cambiar el robot</button><button class="btn gr" data-nav data-act="ir" data-p="programa">Seguir programando</button></div>';return h}
function lectura(){var m=E.m,r=E.res,h=barra('Lee los datos','programa'),max=Math.max.apply(null,r.medidas.map(function(x){return x.v}));
 h+='<div class="burbuja">'+esc(m.lectura.pregunta)+'</div><div class="graf" role="group" aria-label="Gráfico de humedad">';
 r.medidas.forEach(function(x,i){h+='<button class="barra" data-nav data-act="barra" data-i="'+i+'" aria-pressed="'+(E.lectura===i)+'" style="--h:'+Math.round(x.v/100*180)+'px"><span class="v">'+x.v+'%</span><span class="b"></span><span class="e">Poste '+(i+1)+'</span></button>'});
 h+='</div><div class="ficha" id="ficha" aria-live="polite">'+(E.lectura==null?'Toca el poste que elegirías.':(r.medidas[E.lectura].v===max?'<b>Correcto.</b> Ese es el que tiene más humedad: '+max+'%.':'Casi. Mira otra vez: el poste con la barra más alta tiene más humedad.'))+'</div>';
 return h+'<div class="acc"><button class="btn gr" data-nav data-act="ir" data-p="bitacora"'+((E.lectura!=null&&r.medidas[E.lectura].v===max)?'':' disabled')+'>Bitácora</button></div>'}
function estrellasMision(){var m=E.m,r=E.res,n=0,d={cumplida:!!(r&&r.meta),eficiente:!!(r&&r.meta&&r.coste<=m.optimo),sostenible:!!(r&&r.meta&&E.diseno.ene===m.energiaOK)};n=(d.cumplida?1:0)+(d.eficiente?1:0)+(d.sostenible?1:0);return{n:n,d:d}}
function bitacora(){var m=E.m,s=estrellasMision(),h=barra('Bitácora','programa');
 h+='<div class="stars">'+estrellas(s.n)+'</div><ul class="criterios"><li class="'+(s.d.cumplida?'on':'')+'">Misión cumplida</li><li class="'+(s.d.eficiente?'on':'')+'">Programa eficiente'+(s.d.eficiente?'':' (se puede con '+m.optimo+')')+'</li><li class="'+(s.d.sostenible?'on':'')+'">Diseño sostenible'+(s.d.sostenible?'':' (¿qué energía va mejor aquí?)')+'</li></ul>';
 h+='<h2>¿Qué ha funcionado?</h2><div class="frases">';m.bitacora.forEach(function(f,i){h+='<button class="btn pz fr" data-nav data-act="frase" data-i="'+i+'" aria-pressed="'+(E.frase===i)+'">'+esc(f.t)+'</button>'});h+='</div>';
 if(E.frase!=null)h+='<div class="ficha">'+(m.bitacora[E.frase].ok?'<b>Eso es.</b> Lo has explicado bien.':'Casi. Piensa en qué ocurrió en la prueba y vuelve a elegir.')+'</div>';
 h+='<h2>¿Cómo te has sentido?</h2><div class="fila">';[['c','Contento'],['t','Tranquilo'],['n','Nervioso'],['f','Frustrado']].forEach(function(e){h+='<button class="btn pz" data-nav data-act="emo" data-e="'+e[0]+'" aria-pressed="'+(E.emo===e[0])+'">'+e[1]+'</button>'});
 return h+'</div><div class="acc"><button class="btn gr" data-nav data-act="terminar"'+((E.frase!=null&&m.bitacora[E.frase].ok&&E.emo)?'':' disabled')+'>Terminar</button></div>'}
function ajustes(){var a=E.ajustes;return barra('Ajustes','inicio')+'<div class="fila aj">'+[['grande','Texto grande'],['sinMov','Sin movimiento'],['silencio','Silencio']].map(function(x){return'<button class="btn pz" data-nav data-act="ajuste" data-k="'+x[0]+'" aria-pressed="'+a[x[0]]+'">'+x[1]+'</button>'}).join('')+'<button class="btn pz" data-nav data-act="vel" aria-pressed="false">Velocidad del robot ×'+a.vel+'</button></div><p class="nota">M silencia el sonido. Esc vuelve al inicio.</p><p class="nota">Este prototipo no guarda nombres ni datos personales. El progreso queda en este navegador.</p>'}
var EMO={c:'Contento',t:'Tranquilo',n:'Nervioso',f:'Frustrado'},TIPO={hunde:'Se hundió en el picón',contarFuera:'Contó donde no había cúpula',faltanCupulas:'Faltaron cúpulas',sinRutina:'Llamó a una rutina vacía',rutinaEnRutina:'Una rutina llamó a otra',patina:'Se atascó',roca:'Chocó con una roca',borde:'Se salió del tablero',sinEnergia:'Se quedó sin energía',sinSensor:'Faltaba el sensor',medirFuera:'Midió donde no había poste',herramienta:'Herramienta equivocada',noLlega:'No llegó a la meta',faltanMedidas:'Faltaron medidas',demasiados:'Demasiadas órdenes'};
function informe(){var d=G.datos,h='<div class="top noprint"><button class="btn peq" data-nav data-act="inicio">← Volver</button><h1>Informe</h1><button class="btn peq gr" data-nav data-act="imprimir">Imprimir o guardar PDF</button></div>';
 h+='<div class="hoja"><h1 class="tit">RoboLab · Informe</h1><p class="nom">Nombre: ______________________ Fecha: ____________</p><p class="nota">Informe orientativo generado en este dispositivo. No recoge datos personales y no sustituye la evaluación docente.</p>';
 RL.misiones.forEach(function(m){var n=d.estrellas[m.id];h+='<section class="im"><h2>'+esc(m.titulo)+'</h2>';
  if(n==null){h+='<p>Sin completar.</p></section>';return}
  h+='<p>'+estrellas(n)+' · Pruebas necesarias: <b>'+d.intentos[m.id]+'</b> (el mínimo posible es 1)</p>';
  var b=d.bitacora[m.id];if(b)h+='<p><b>Bitácora:</b> «'+esc(b.t)+'» · Me sentí: '+(EMO[b.e]||'')+'</p>';
  var er=d.errores[m.id];if(er)Object.keys(er).forEach(function(k){h+='<p class="er"><b>'+(TIPO[k]||k)+'</b> ('+er[k].n+(er[k].n>1?' veces':' vez')+'): '+esc(er[k].t)+'</p>'});
  h+='<p class="crit"><b>Criterios relacionados (orientativo):</b> '+m.criterios.map(function(c){return c}).join(', ')+'</p></section>'});
 h+='<p class="nota">Criterios según el Decreto 211/2022 (segundo y tercer ciclo), consultado el '+RL.curriculo.consulta+'; vigencia sin confirmar. El juego trabaja una selección de saberes.</p></div>';return h}
function docentes(){var C=RL.curriculo,h='<div class="top noprint"><button class="btn peq" data-nav data-act="inicio">← Volver</button><h1>Para docentes</h1><button class="btn peq gr" data-nav data-act="imprimir">Imprimir o guardar en PDF</button></div><div class="hoja">';
 h+='<p class="aviso-doc"><b>Importante.</b> RoboLab trabaja una <b>selección</b> de saberes de Conocimiento del Medio y no sustituye la programación del área. La relación con criterios y saberes es <b>orientativa</b>: no sustituye la evaluación docente. Código Escuela 4.0 es un programa, no un currículo.</p>';
 h+='<h2>Fuente curricular</h2><p>'+esc(C.fuente)+'. Consultado el '+esc(C.consulta)+'. Estado: '+esc(C.estado)+'. No se ha comprobado si el decreto tiene modificaciones posteriores.</p>';
 h+='<h2>Cómo usarlo</h2><ul><li><b>Individual:</b> cada misión dura unos minutos (duración sin medir con alumnado todavía).</li><li><b>En pareja:</b> una persona diseña y otra programa, y cambian. Los criterios que piden trabajo cooperativo solo se evidencian así y con observación docente.</li><li><b>Gran grupo:</b> con la pizarra digital, el grupo propone y el docente pulsa.</li><li><b>Makey Makey:</b> todo se maneja con cuatro flechas y Espacio.</li></ul>';
 h+='<h2>Misiones</h2>';
 RL.misiones.forEach(function(m){var cc=C.ciclos[m.ciclo]||{criterios:{},saberes:{}};
  h+='<section class="ficha"><h3>'+esc(m.titulo)+' <small>('+m.curso+'.º)</small></h3><p><b>Aviso de:</b> '+esc(m.aviso.quien)+'. <b>Programación:</b> '+esc(m.ordenes.filter(function(o){return o!=='llamar'}).join(', '))+(m.ordenes.indexOf('llamar')>=0?', rutina propia (ampliación fuera del decreto)':'')+'.</p>';
  h+='<p><b>Saberes</b></p><ul>'+m.saberes.map(function(k){return'<li><b>'+esc(k)+'</b> '+esc(cc.saberes[k]||'')+'</li>'}).join('')+'</ul>';
  h+='<p><b>Criterios de evaluación (orientativos)</b></p><ul>'+m.criterios.map(function(k){return'<li><b>'+esc(k)+'</b> '+esc(cc.criterios[k]||'')+'</li>'}).join('')+'</ul>';
  h+='<p><b>Para conversar después de jugar:</b> '+esc(m.conversa||'')+'</p></section>'});
 return h+'</div>'}

var ICO={
 magma:'<path d="M6 44h68" stroke="#2B1A16" stroke-width="3"/><path d="M30 44l6-22 8 0 6 22z" fill="#D8392B" stroke="#2B1A16" stroke-width="3" stroke-linejoin="round"/><circle cx="40" cy="14" r="5" fill="#FFC21A" stroke="#2B1A16" stroke-width="2.5"/>',
 enfria:'<path d="M2 14q8-6 16 0t16 0 16 0 16 0 14 0v40H2z" fill="#1F86C8" stroke="#2B1A16" stroke-width="3"/><path d="M22 54l10-22h16l10 22z" fill="#5B4A47" stroke="#2B1A16" stroke-width="3" stroke-linejoin="round"/>',
 asoma:'<path d="M2 36q8-6 16 0t16 0 16 0 16 0 14 0v18H2z" fill="#1F86C8" stroke="#2B1A16" stroke-width="3"/><path d="M20 38l14-26 8 0 14 26z" fill="#5B4A47" stroke="#2B1A16" stroke-width="3" stroke-linejoin="round"/>',
 vida:'<path d="M2 40q8-6 16 0t16 0 16 0 16 0 14 0v14H2z" fill="#1F86C8" stroke="#2B1A16" stroke-width="3"/><path d="M18 42l12-16h20l12 16z" fill="#5B4A47" stroke="#2B1A16" stroke-width="3" stroke-linejoin="round"/><path d="M40 26v-10" stroke="#2B1A16" stroke-width="3"/><path d="M40 18q-12-2-14-10 12-1 14 10zM40 18q12-2 14-10-12-1-14 10z" fill="#2E9D68" stroke="#2B1A16" stroke-width="2.5" stroke-linejoin="round"/>'};
function tarj(c,k,acc){return'<button class="ltarj" data-nav data-act="'+acc+'" data-id="'+c.id+'" aria-label="'+(acc==='lquita'?'Quitar, puesto '+(k+1)+': ':'Poner: ')+esc(c.t)+'"'+(E.lin.ok?' disabled':'')+'><svg viewBox="0 0 80 56" aria-hidden="true">'+(ICO[c.id]||'')+'</svg><span>'+esc(c.t)+'</span></button>'}
function tarjeta(id){return E.m.linea.tarjetas.filter(function(c){return c.id===id})[0]}
function linea(){var m=E.m,L=m.linea,n=L.tarjetas.length,l=E.lin,h=barra('Ordena el tiempo','aviso');
 h+='<div class="burbuja">'+esc(L.pregunta)+'</div><div class="eje"><span>Primero</span><span>Después</span></div><ol class="lin" aria-label="Línea del tiempo">';
 for(var k=0;k<n;k++){var id=l.pos[k];h+='<li class="lhueco'+(id?' lleno':'')+'">'+(id?tarj(tarjeta(id),k,'lquita'):'<span class="lnum">'+(k+1)+'</span>')+'</li>'}
 h+='</ol><div class="ltray" aria-label="Tarjetas por colocar">';
 l.mix.forEach(function(id){if(l.pos.indexOf(id)<0)h+=tarj(tarjeta(id),0,'lpon')});
 h+='</div><div class="ficha" id="ficha" aria-live="polite">'+(l.ok?'<b>¡Bien ordenado!</b> '+esc(L.cierre):esc(l.msg||'Toca una tarjeta para ponerla en la línea. Toca una tarjeta colocada para quitarla.'))+'</div>';
 h+='<div class="acc">';
 if(!l.ok)h+='<button class="btn gr" data-nav data-act="lcomp"'+(l.pos.length<n?' disabled':'')+'>Comprobar</button><button class="btn" data-nav data-act="lpista">Pista</button>';
 return h+'<button class="btn gr" data-nav data-act="ir" data-p="disena"'+(l.ok?'':' disabled')+'>Diseñar el robot</button></div>'}
function lpista(){var L=E.m.linea.tarjetas,l=E.lin,k=0;while(k<L.length&&l.pos[k]===L[k].id)k++;
 if(k>=L.length)return;var c=L[k];
 if(l.hint===1)l.msg='Pista 1: hay '+k+' tarjeta'+(k===1?'':'s')+' bien colocada'+(k===1?'':'s')+' desde el principio. Piensa qué tiene que pasar primero para que pase lo siguiente.';
 else if(l.hint===2)l.msg='Pista 2: en el puesto '+(k+1)+' va esta tarjeta: «'+c.t+'»';
 else{l.pos=L.slice(0,k+1).map(function(x){return x.id});l.msg='Pista 3: te la he colocado en el puesto '+(k+1)+'. '+(c.p||'')}}
var VISTAS={linea:linea,docentes:docentes,informe:informe,inicio:inicio,aviso:aviso,disena:disena,programa:programa,lectura:lectura,bitacora:bitacora,ajustes:ajustes};
var previa='inicio';
function render(foco){limpiar();if(E.pantalla!=='ajustes')previa=E.pantalla;app.innerHTML='<div class="vista v-'+E.pantalla+'">'+VISTAS[E.pantalla]()+'</div>';
 document.body.classList.toggle('grande',E.ajustes.grande);document.body.classList.toggle('nomotion',E.ajustes.sinMov);
 var f=foco&&app.querySelector(foco);if(!f){var l=RL.Entrada.visibles();f=l.filter(function(e){return e.classList.contains('gr')})[0]||l[1]||l[0]}if(f)f.focus({preventScroll:true})}
function ir(p,foco){E.pantalla=p;render(foco);window.scrollTo(0,0)}
/* ---------- animación de la prueba ---------- */
function probar(){var m=E.m;if(!E.prog.length||E.ejecutando)return;
 E.sel=null;E.cur={c:'',i:E.prog.length};E.enBucle=null;E.intentos++;E.res=I.ejecutar(m,E.diseno,E.prog,E.fn);E.pistas=I.pistas(m,E.diseno,E.prog,E.res);
 if(E.res.fallo){var er=G.datos.errores[m.id]=G.datos.errores[m.id]||{},tp=E.res.fallo.tipo;er[tp]=er[tp]||{n:0,t:E.pistas&&E.pistas[0]?E.pistas[0].texto:''};er[tp].n++;E.fallosSeguidos++;E.hint=Math.min(3,Math.max(1,E.hint)+(E.fallosSeguidos>=2?1:0)-(E.hint>0&&E.fallosSeguidos<2?0:0));if(E.fallosSeguidos===1)E.hint=1}else E.fallosSeguidos=0;
 E.ejecutando=true;var g=geo(m),tr=E.res.traza,dt=650/E.ajustes.vel,i=0;var cn0=$('#cnt');if(cn0)cn0.textContent='0';
 $('#esc').classList.remove('calm');render('#tira');$('#esc').classList.remove('calm');
 document.querySelectorAll('.pal .btn,.acc .gr').forEach(function(b){b.disabled=true});
 RL.Audio.beep(520,.15,'triangle');setBot('sorpresa',true);decir('El robot se pone en marcha.');
 tr.forEach(function(ev,k){timers.push(setTimeout(function(){
  document.querySelectorAll('.step.on').forEach(function(e){e.classList.remove('on')});
  var r=ev.ref.join('-'),el=document.querySelector('.step[data-ref="'+r+'"]');if(el)el.classList.add('on');
  var b=$('#bot');if(b&&ev.a)b.style.transform=botT(g,ev.a);if(ev.dir)setHead(ev.dir);RL.Audio.paso();
  if(ev.medida!==undefined){var x=g.X0+ev.a.x*g.S+g.S/2,y=g.Y0+ev.a.y*g.S-8;$('#fxs').insertAdjacentHTML('beforeend','<g class="pop" transform="translate('+x+' '+y+')"><rect x="-28" y="-22" width="56" height="28" rx="10" fill="#FFFDFA" stroke="#2B1A16" stroke-width="3"/><text y="-2" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="18" fill="#2B1A16">'+ev.medida+'%</text></g>');RL.Audio.beep(880,.1,'triangle')}
  if(ev.cuenta!==undefined){var cn=$('#cnt');if(cn)cn.textContent=ev.cuenta;var cx2=g.X0+ev.a.x*g.S+g.S/2,cy2=g.Y0+ev.a.y*g.S-8;$('#fxs').insertAdjacentHTML('beforeend','<g class="pop" transform="translate('+cx2+' '+cy2+')"><rect x="-26" y="-22" width="52" height="28" rx="10" fill="#FFFDFA" stroke="#2B1A16" stroke-width="3"/><text y="-2" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="18" fill="#2B1A16">+1</text></g>');RL.Audio.beep(880,.12,'triangle')}
  if(ev.fallo){setBot('duda',false);RL.Audio.error();decir(I.pistas(m,E.diseno,E.prog,E.res)[0].texto)}
  },(k+1)*dt))});
 timers.push(setTimeout(function(){E.ejecutando=false;
  document.querySelectorAll('.step.on').forEach(function(e){e.classList.remove('on')});
  var r=E.res;if(!r.fallo&&r.meta){setBot('alegria',false);RL.Audio.ok();decir('¡Lo has conseguido!');if(m.meta.herramienta==='regadera'){var g2=geo(m),gx=0,gy=0;m.tablero.forEach(function(r,y){var x=r.indexOf('G');if(x>=0){gx=x;gy=y}});$('#fxs').insertAdjacentHTML('beforeend','<g class="pop">'+RL.Casillas.obj('helecho',g2.X0+gx*g2.S+g2.S/2-2,g2.Y0+gy*g2.S+g2.S-10,.95)+'</g>')}}
  else if(!r.fallo){setBot('duda',false)}
  var pr=$('#esc');if(pr)pr.classList.add('calm');
  $('#res').innerHTML=resultado();document.querySelectorAll('.pal .btn').forEach(function(b){});
  RL.App.refrescarPal();var foc=RL.Entrada.visibles().filter(function(e){return e.closest('#res')&&e.classList.contains('gr')})[0]||RL.Entrada.visibles().filter(function(e){return e.closest('#res')})[0];if(foc)foc.focus({preventScroll:true})},(tr.length+1.4)*dt))}
/* ---------- acciones ---------- */
/* Edición del programa: hueco de inserción (E.cur), bloque marcado (E.sel), arrastrar y soltar. */
function nuevo(x,foco){var m=E.m;if(!insertar(E.cur.c,E.cur.i,x)){decir(coste()>=m.limite?'Has llegado al límite de órdenes.':'Ahí no cabe.');return}RL.Audio.toca();refrescar(foco)}
function insertar(c,i,x){var L=cont(c);if(!L||coste()>=E.m.limite)return false;var it,ant=E.cur;
 if(x.o==='llamar'){if(raiz(c)||!E.fn.length)return false;it={llama:1}}
 else if(x.o)it={o:x.o};
 else{if(prof(c)>=(E.m.profundidad||1))return false;
  it=x.rep?{rep:x.rep,body:[]}:(x.si?{si:x.si,alto:[],sino:[]}:{hasta:x.hasta,body:[]})}
 L.splice(i,0,it);
 if(coste()>E.m.limite){L.splice(i,1);return false}
 if(x.o)setCur(c,i+1);else setCur((c?c+'.':'')+i+(it.si?'.alto':'.body'),0);
 E.sel=null;return true}
function conLlama(it){return!!(it.llama||(['body','alto','sino'].some(function(k){return(it[k]||[]).some(function(x){return conLlama(typeof x==='string'?{o:x}:x)})})))}
function mover(de,a){var src=cont(de.c),dst=cont(a.c);if(!src||!dst)return false;var it=src[de.i];if(!it)return false;
 var itp=(de.c?de.c+'.':'')+de.i,x=alt(it);
 if(x>0){if(a.c.indexOf(itp+'.')===0)return false;if(prof(a.c)+x>(E.m.profundidad||1))return false}
 if(raiz(a.c)&&conLlama(it))return false;
 var i=a.i;src.splice(de.i,1);if(src===dst&&de.i<a.i)i--;dst.splice(i,0,it);
 if(coste()>E.m.limite){dst.splice(i,1);src.splice(de.i,0,it);return false}
 var q=hallar(it,E.prog,'')||hallar(it,E.fn,'F');if(q)setCur(q.c,q.i+1);return true}
var arr=null,fant=null,sinClic=false;
function soltarDonde(e){var t=document.elementFromPoint(e.clientX,e.clientY);return{slot:t&&t.closest('.slot:not(:disabled)'),pal:t&&t.closest('.pal')}}
function iniciarArrastre(){
 document.addEventListener('pointerdown',function(e){
  if(e.button>0||E.pantalla!=='programa'||E.ejecutando)return;
  var el=e.target.closest('.pal .ord:not(:disabled), .tira .blk:not(:disabled)');if(!el||['salir','borrar'].indexOf(el.dataset.act)>=0)return;
  var mv=el.classList.contains('blk');
  arr={x:e.clientX,y:e.clientY,on:false,mv:mv,c:mv?el.dataset.c:'',i:mv?+el.dataset.i:0,act:el.dataset.act,o:el.dataset.o,n:el.dataset.n,cond:el.dataset.cond,txt:mv?el.textContent:(el.querySelector('.g')||el).textContent}});
 document.addEventListener('pointermove',function(e){if(!arr)return;
  if(!arr.on){if(Math.hypot(e.clientX-arr.x,e.clientY-arr.y)<10)return;arr.on=true;fant=document.createElement('div');fant.className='fantasma';fant.textContent=arr.txt;document.body.appendChild(fant);document.body.classList.add('arrastrando')}
  fant.style.transform='translate('+(e.clientX-26)+'px,'+(e.clientY-26)+'px)';
  var d=soltarDonde(e);document.querySelectorAll('.slot.drop').forEach(function(x){x.classList.remove('drop')});if(d.slot)d.slot.classList.add('drop');
  fant.classList.toggle('quitar',!!(d.pal&&arr.mv))});
 function fin(e,cancel){if(!arr)return;var a=arr;arr=null;if(!a.on)return;
  if(fant){fant.remove();fant=null}document.body.classList.remove('arrastrando');document.querySelectorAll('.slot.drop').forEach(function(x){x.classList.remove('drop')});
  sinClic=true;setTimeout(function(){sinClic=false},0);if(cancel)return;
  var d=soltarDonde(e),ok=false;
  if(d.slot){var t={c:d.slot.dataset.c,i:+d.slot.dataset.i};
   if(a.mv)ok=mover({c:a.c,i:a.i},t);else ok=insertar(t.c,t.i,a.act==='ord'?{o:a.o}:(a.act==='rep'?{rep:+a.n}:(a.act==='si'?{si:a.cond}:{hasta:a.cond})));
   if(!ok)decir(coste()>=E.m.limite&&!a.mv?'Has llegado al límite de órdenes.':'Ahí no cabe.')}
  else if(d.pal&&a.mv){cont(a.c).splice(a.i,1);setCur(a.c,a.i);ok=true}
  E.sel=null;if(ok)RL.Audio.toca();refrescar('.slot.cur')}
 document.addEventListener('pointerup',function(e){fin(e,false)});document.addEventListener('pointercancel',function(e){fin(e,true)});
 document.addEventListener('click',function(e){if(sinClic){e.stopPropagation();e.preventDefault()}},true)}
var AC={
 mision:function(d){E.m=mision(d.id);E.datos={};E.diseno={mov:null,ene:null,sen:null,her:null};E.pred=null;E.prog=[];E.fn=[];E.cur={c:'',i:0};E.sel=null;E.enBucle=null;E.intentos=0;E.hint=0;E.fallosSeguidos=0;E.lin=nuevaLinea(E.m);E.ficha=null;E.res=null;E.pistas=null;E.lectura=null;E.frase=null;E.emo=null;
  if(E.m.bancoLecturas){var v=E.m.bancoLecturas[Math.floor(Math.random()*E.m.bancoLecturas.length)];E.m.ordenLecturas.forEach(function(k,i){E.m.lecturas[k]=v[i]})}ir('aviso')},
 ir:function(d){if(d.p==='programa'&&!(E.diseno.mov&&E.diseno.ene&&E.diseno.sen&&E.diseno.her&&E.pred))return;ir(d.p)},
 aviso:function(){ir('aviso')},disena:function(){ir('disena')},programa:function(){ir('programa')},inicio:function(){G.guardar();ir('inicio')},
 ajustes:function(){ir('ajustes')},imprimir:function(){window.print()},
 dato:function(d){E.datos[d.id]=true;RL.Audio.toca();render('[data-id="'+d.id+'"]');decir(E.m.aviso.datos.filter(function(x){return x.id===d.id})[0].t)},
 pieza:function(d){E.diseno[d.k]=d.id;E.ficha=RL.piezas[d.k].op.filter(function(o){return o.id===d.id})[0];RL.Audio.toca();render('[data-k="'+d.k+'"][data-id="'+d.id+'"]')},
 pred:function(d){E.pred=d.id;RL.Audio.toca();render('[data-act="pred"][data-id="'+d.id+'"]')},
 lpon:function(d){if(E.lin.ok)return;E.lin.pos.push(d.id);E.lin.msg='';RL.Audio.toca();render('[data-act="lcomp"]')},
 lquita:function(d){if(E.lin.ok)return;var i=E.lin.pos.indexOf(d.id);if(i>=0)E.lin.pos.splice(i,1);E.lin.msg='';RL.Audio.toca();render('[data-act="lpon"]')},
 lcomp:function(){var L=E.m.linea.tarjetas,l=E.lin;if(l.pos.length<L.length)return;
  if(L.every(function(c,k){return l.pos[k]===c.id})){l.ok=true;l.msg='';RL.Audio.ok();render('[data-p="disena"]');decir('¡Bien ordenado!')}
  else{l.fallos++;l.hint=Math.min(3,Math.max(l.hint,l.fallos));RL.Audio.error();lpista();render('[data-act="lpista"]')}},
 lpista:function(){var l=E.lin;l.hint=Math.min(3,l.hint+1);lpista();RL.Audio.toca();render('[data-act="lpista"]')},
 ord:function(d){nuevo({o:d.o},'[data-act="ord"][data-o="'+d.o+'"]')},
 rep:function(d){nuevo({rep:+d.n},'[data-act="ord"]')},
 hasta:function(d){nuevo({hasta:d.cond},'[data-act="ord"]')},
 si:function(d){nuevo({si:d.cond},'[data-act="ord"]')},
 slot:function(d){var i=+d.i;
  if(E.sel){var de=E.sel;if(mover(de,{c:d.c,i:i}))RL.Audio.toca();E.sel=null}else{setCur(d.c,i);RL.Audio.toca()}
  refrescar('.slot.cur')},
 sel:function(d){var i=+d.i;if(esSel(d.c,i))E.sel=null;else{E.sel={c:d.c,i:i};setCur(d.c,i)}RL.Audio.toca();refrescar('.blk.sel')},
 salir:function(){if(K(E.cur.c).length){var pd=padre(E.cur.c);setCur(pd.c,pd.i+1)}RL.Audio.toca();refrescar('[data-act="ord"]')},
 borrar:function(){var s=E.sel;
  if(s){cont(s.c).splice(s.i,1);E.sel=null;setCur(s.c,s.i)}
  else{var c=E.cur,L=cont(c.c);if(c.i>0){L.splice(c.i-1,1);setCur(c.c,c.i-1)}
   else if(K(c.c).length){var pd=padre(c.c),it=cont(pd.c)[pd.i];
    if(!(it.body||[]).length&&!(it.alto||[]).length&&!(it.sino||[]).length){cont(pd.c).splice(pd.i,1);setCur(pd.c,pd.i)}}}
  RL.Audio.toca();refrescar('[data-act="borrar"]')},
 probar:probar,pista:function(){E.hint=Math.min(3,E.hint+1);$('#res').innerHTML=resultado();var b=RL.Entrada.visibles().filter(function(e){return e.closest('#res')})[0];if(b)b.focus()},
 vel:function(){var v=E.ajustes.vel;E.ajustes.vel=v===1?2:(v===2?.5:1);if(E.pantalla==='ajustes')ir('ajustes','[data-act="vel"]');else{var b=$('[data-act="vel"]');if(b)b.textContent='Velocidad ×'+E.ajustes.vel}},
 ajuste:function(d){E.ajustes[d.k]=!E.ajustes[d.k];G.datos.ajustes=E.ajustes;G.guardar();render('[data-k="'+d.k+'"]')},
 barra:function(d){E.lectura=+d.i;RL.Audio.toca();render('[data-i="'+d.i+'"]')},
 frase:function(d){E.frase=+d.i;RL.Audio.toca();render('[data-i="'+d.i+'"]')},
 emo:function(d){E.emo=d.e;RL.Audio.toca();render('[data-e="'+d.e+'"]')},
 terminar:function(){var s=estrellasMision();G.datos.estrellas[E.m.id]=Math.max(G.datos.estrellas[E.m.id]||0,s.n);G.datos.intentos[E.m.id]=E.intentos;G.datos.bitacora[E.m.id]={t:E.m.bitacora[E.frase].t,e:E.emo};G.guardar();RL.Audio.ok();E.pantalla='inicio';render('[data-id="'+E.m.id+'"]')}};
/* Actualiza solo tira y paleta, sin perder el foco ni reiniciar la escena. */
function refrescar(sel){var v=programa(),t=document.createElement('div');t.innerHTML=v;
 ['#tira','.cont','.pal','.acc'].forEach(function(q){var n=t.querySelector(q),o=$(q);if(n&&o)o.innerHTML=n.innerHTML});
 var f=$(sel)&&!$(sel).disabled?$(sel):RL.Entrada.visibles().filter(function(e){return e.closest('.pal')})[0];if(f)f.focus({preventScroll:true});
 var l=$('#aviso-lim');if(l)decir(l.textContent)}
function init(){app=$('#app');G.cargar();if(G.datos.ajustes)Object.assign(E.ajustes,G.datos.ajustes);
 app.addEventListener('click',function(ev){var b=ev.target.closest('[data-act]');if(!b||b.disabled||!AC[b.dataset.act])return;AC[b.dataset.act](b.dataset)});
 document.addEventListener('pointermove',function(e){if(E.ajustes.sinMov)return;var s=$('#tab');if(!s)return;var r=s.getBoundingClientRect();if(e.clientY<r.top-60||e.clientY>r.bottom+60)return;var v=(e.clientX-r.left)/r.width-.5;document.querySelectorAll('#tab .par').forEach(function(g){g.style.transform='translateX('+(-v*g.dataset.p)+'px)'})});
 iniciarArrastre();render()}
window.addEventListener('resize',function(){var e=estrecha();if(RL.App._nar!==e){RL.App._nar=e;if(!E.ejecutando&&(E.pantalla==='programa'||E.pantalla==='aviso'))render()}});
RL.App={_nar:window.innerWidth<640,init:init,pausa:function(){if(E.pantalla!=='inicio'){limpiar();E.ejecutando=false;G.guardar();ir('inicio')}},silencio:function(){E.ajustes.silencio=!E.ajustes.silencio;decir(E.ajustes.silencio?'Sonido desactivado.':'Sonido activado.')},refrescarPal:function(){refrescar('[data-act="ord"]')},_E:E};
})(globalThis.RL=globalThis.RL||{});
