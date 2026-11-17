/* Entrada: flechas y Espacio (teclado y Makey Makey), ratón y táctil. Esc pausa, M silencia. */
(function(RL){
function visibles(){return Array.prototype.slice.call(document.querySelectorAll('#app [data-nav]')).filter(function(e){return!e.disabled&&e.offsetParent!==null})}
function centro(e){var r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}}
function mover(dir){var l=visibles(),a=document.activeElement;if(!l.length)return;
 if(l.indexOf(a)<0){l[0].focus();return}
 var c=centro(a),mejor=null,mejorD=1e9;
 l.forEach(function(e){if(e===a)return;var p=centro(e),dx=p.x-c.x,dy=p.y-c.y,en=false,par,per;
  if(dir==='ArrowRight'){en=dx>4;par=dx;per=Math.abs(dy)}if(dir==='ArrowLeft'){en=dx<-4;par=-dx;per=Math.abs(dy)}
  if(dir==='ArrowDown'){en=dy>4;par=dy;per=Math.abs(dx)}if(dir==='ArrowUp'){en=dy<-4;par=-dy;per=Math.abs(dx)}
  if(!en)return;var d=par+per*2.2;if(d<mejorD){mejorD=d;mejor=e}});
 if(!mejor){/* si no hay nada en esa dirección, recorre la lista (útil con 5 contactos) */var i=l.indexOf(a),k=(dir==='ArrowRight'||dir==='ArrowDown')?1:-1;mejor=l[(i+k+l.length)%l.length]}
 mejor.focus();if(mejor.scrollIntoView)mejor.scrollIntoView({block:'nearest'});RL.Audio.toca()}
document.addEventListener('keydown',function(ev){
 var k=ev.key;
 if(k==='ArrowUp'||k==='ArrowDown'||k==='ArrowLeft'||k==='ArrowRight'){ev.preventDefault();mover(k)}
 else if(k===' '||k==='Spacebar'){var a=document.activeElement;if(a&&a.closest&&a.closest('#app')&&a.hasAttribute('data-nav')){ev.preventDefault();a.click()}else if(!a||a===document.body){var l=visibles();if(l.length){ev.preventDefault();l[0].focus()}}}
 else if(k==='Escape'){RL.App&&RL.App.pausa()}
 else if(k==='m'||k==='M'){RL.App&&RL.App.silencio()}});
RL.Entrada={mover:mover,visibles:visibles};})(globalThis.RL=globalThis.RL||{});
document.addEventListener('keyup',function(ev){if((ev.key===' '||ev.key==='Spacebar')&&document.activeElement&&document.activeElement.hasAttribute&&document.activeElement.hasAttribute('data-nav'))ev.preventDefault()});
