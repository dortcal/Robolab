/* Arte del robot y utilidades de dibujo. Todo se dibuja por código (SVG). Dirección A · Guagua. */
(function(RL){
var P={ink:'#2B1A16',amarillo:'#FFC21A',coral:'#FF6A4D',mar:'#1F86C8',monte:'#2E9D68',lava:'#D8392B',body:'#FFC21A',screen:'#2B1A16',eye:'#8CF5D0',metal:'#C9D3D8',
 grass:'#6CBF7D',mud:'#B98A5E',rock:'#9AA3A6',tree:'#2E7D5B',post:'#1F86C8',fog:'#FFFFFF',hillA:'#8DBFA9',hillB:'#5FA58B',sky:['#DDEFE6','#A9D3C4']};
var uid=0;
function shade(h,a){var n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;function f(v){return Math.max(0,Math.min(255,Math.round(a<0?v*(1+a):v+(255-v)*a)))}return'#'+((1<<24)+(f(r)<<16)+(f(g)<<8)+f(b)).toString(16).slice(1)}
var SW='stroke="'+P.ink+'" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
function rr(x,y,w,h,r,fill){var id='k'+(++uid);return'<clipPath id="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'"/></clipPath><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'"/><g clip-path="url(#'+id+')"><rect x="'+x+'" y="'+(y+h*.62)+'" width="'+w+'" height="'+h*.4+'" fill="'+shade(fill,-.22)+'"/></g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="none" '+SW+'/>'}
function circ(cx,cy,r,fill,cls){return'<g'+(cls?' class="'+cls+'"':'')+'><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+fill+'"/><path d="M'+(cx-r)+' '+cy+'a'+r+' '+r+' 0 0 0 '+2*r+' 0z" fill="'+shade(fill,-.22)+'" opacity=".9"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" '+SW+'/></g>'}
function ojos(t){var e=P.eye,s='';
 if(t==='alegria')s+='<path d="M80 100q8-14 16 0M104 100q8-14 16 0" fill="none" stroke="'+e+'" stroke-width="6" stroke-linecap="round"/>';
 else if(t==='duda')s+='<g class="blink"><ellipse cx="88" cy="97" rx="7" ry="9" fill="'+e+'"/></g><ellipse cx="112" cy="99" rx="5.5" ry="6" fill="'+e+'"/><path d="M104 84l16-5" stroke="'+e+'" stroke-width="4" stroke-linecap="round"/>';
 else if(t==='sorpresa')s+='<circle cx="88" cy="96" r="10" fill="'+e+'"/><circle cx="112" cy="96" r="10" fill="'+e+'"/><circle cx="88" cy="96" r="4" fill="'+P.screen+'"/><circle cx="112" cy="96" r="4" fill="'+P.screen+'"/><ellipse cx="100" cy="116" rx="4" ry="5" fill="'+e+'"/>';
 else s+='<g class="blink"><ellipse cx="88" cy="97" rx="7" ry="9" fill="'+e+'"/><ellipse cx="112" cy="97" rx="7" ry="9" fill="'+e+'"/></g>';
 return s}
/* d = {mov,ene,sen,her}; ojos: reposo|duda|alegria|sorpresa; mover: true cuando se desplaza */
function robot(d,ojosT,mover){var s='',met=P.metal;
 s+='<ellipse cx="100" cy="188" rx="54" ry="7" fill="#2B1A16" opacity=".22"/><g class="'+(mover?'':'bob')+'">';
 if(d.mov==='patas'){
  s+='<g class="'+(mover?'legL':'')+'">'+rr(66,148,16,32,6,shade(met,-.35))+rr(58,174,32,12,6,P.amarillo)+'</g><g class="'+(mover?'legR':'')+'">'+rr(118,148,16,32,6,shade(met,-.35))+rr(110,174,32,12,6,P.amarillo)+'</g>'}
 else{s+=circ(74,166,19,P.mar,'')+circ(126,166,19,P.mar,'')+'<g class="spin"><circle cx="74" cy="166" r="7" fill="'+shade(met,.3)+'"/><circle cx="74" cy="158" r="2.4" fill="'+P.screen+'"/></g><g class="spin"><circle cx="126" cy="166" r="7" fill="'+shade(met,.3)+'"/><circle cx="126" cy="158" r="2.4" fill="'+P.screen+'"/></g>'}
 if(d.ene==='solar'){s+='<g class="sway"><rect x="38" y="76" width="5" height="26" fill="'+shade(met,-.3)+'"/><path d="M8 62l52-12 6 22-52 12z" fill="'+P.mar+'"/><path d="M21 59l6 22M34 56l6 22M47 53l6 22M10 71l52-12" stroke="'+shade(P.mar,.55)+'" stroke-width="2"/><path d="M8 62l52-12 6 22-52 12z" fill="none" '+SW+'/></g>'}
 else{s+=rr(22,92,30,44,8,P.monte)+rr(31,86,12,8,3,shade(met,.1))+'<path d="M38 104l-8 14h7l-3 12 11-17h-7l3-9z" fill="#FFF" opacity=".95"/>'}
 s+=rr(52,62,96,92,24,P.body)+rr(62,74,76,52,14,P.screen)+ojos(ojosT||'reposo')+'<rect x="76" y="136" width="48" height="8" rx="4" fill="'+shade(P.body,-.3)+'" opacity=".7"/>';
 if(d.sen==='humedad'){s+='<rect x="97" y="38" width="6" height="26" fill="'+shade(met,-.3)+'"/><path d="M100 4q-13 17-13 25a13 13 0 0 0 26 0q0-8-13-25z" fill="'+P.mar+'" '+SW+'/><path d="M94 28a6 6 0 0 0 5 6" stroke="#FFF" stroke-width="3" fill="none" stroke-linecap="round"/>'}
 else{s+='<rect x="96" y="44" width="8" height="20" fill="'+shade(met,-.3)+'"/>'+circ(100,38,15,met,'')+circ(100,38,7,P.screen,'')+'<circle cx="97" cy="35" r="2.4" fill="#fff"/>'}
 s+=rr(146,100,22,12,6,shade(met,-.1));
 if(d.her==='regadera'){s+=rr(166,92,28,26,7,P.mar)+'<path d="M194 102l14-9" '+SW+' fill="none"/><rect x="206" y="86" width="8" height="10" rx="2" fill="'+P.amarillo+'" '+SW+'/><path d="M170 92q8-14 16 0" fill="none" '+SW+'/>'}
 else{s+='<g class="claw1"><path d="M166 98q22-4 18 14-6-2-12 0z" fill="'+P.amarillo+'" '+SW+'/></g><g class="claw2"><path d="M166 114q22 4 18-14-6 2-12 0z" fill="'+shade(P.amarillo,-.15)+'" '+SW+'/></g>'}
 return s+'</g>'}
RL.Arte={P:P,shade:shade,SW:SW,rr:rr,circ:circ,robot:robot};
})(globalThis.RL=globalThis.RL||{});
