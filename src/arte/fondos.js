/* Fondo del Monteverde: cielo, lomas con parallax, árboles, niebla y lluvia. */
(function(RL){var A=RL.Arte,P=A.P,shade=A.shade;

function isla(w,h){
 var s='<defs><linearGradient id="skyI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FC4E8"/><stop offset=".55" stop-color="#FFE3A3"/><stop offset="1" stop-color="#FFC98A"/></linearGradient></defs>';
 s+='<rect width="'+w+'" height="'+h+'" fill="url(#skyI)"/><circle cx="720" cy="190" r="40" fill="#FFF3C4"/><circle cx="720" cy="190" r="58" fill="#FFF3C4" opacity=".35"/>';
 s+='<g class="par" data-p="8"><rect x="-40" y="268" width="1000" height="140" fill="#2F8FD0"/><path d="M-40 270h1000" stroke="#fff" stroke-width="3" opacity=".5"/></g>';
 s+='<g class="par" data-p="16"><path d="M-40 330q150-70 300-20t280-30q160-50 320 30v110H-40z" fill="#C79A5E"/><path d="M-40 350q160-50 320-10t300-20q140-30 320 20v100H-40z" fill="#7BB35C"/>';
 [[110,330],[330,318],[560,326],[800,316]].forEach(function(t,i){s+='<g transform="translate('+t[0]+' '+t[1]+')"><rect x="-3" y="-70" width="6" height="70" fill="#F4F1EA" stroke="#2B1A16" stroke-width="2.5"/><g transform="translate(0 -70)"><g class="spin" style="animation-duration:'+(5+i)+'s"><circle r="44" fill="none"/><path d="M0 0L0-42M0 0L36 21M0 0L-36 21" stroke="#F4F1EA" stroke-width="7" stroke-linecap="round"/></g></g><circle cx="0" cy="-70" r="5" fill="#2B1A16"/></g>'});
 s+='</g><rect x="0" y="400" width="'+w+'" height="'+(h-400)+'" fill="#5E9B4B"/>';
 return s}
function monteverde(w,h,niebla){
 var s='<defs><linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+(niebla?P.sky[0]:'#CFEFFF')+'"/><stop offset="1" stop-color="'+(niebla?P.sky[1]:'#BFE6DC')+'"/></linearGradient></defs>';
 s+='<rect width="'+w+'" height="'+h+'" fill="url(#skyM)"/>';
 if(!niebla)s+='<circle cx="780" cy="70" r="34" fill="#FFE27A"/><circle cx="780" cy="70" r="46" fill="#FFE27A" opacity=".3"/>';
 s+='<g class="par" data-p="8"><path d="M-40 250q120-120 260-40t240-60q140-70 280 20t160 20v140H-40z" fill="'+P.hillA+'"/></g>';
 s+='<g class="par" data-p="16"><path d="M-40 300q140-80 260-10t260-40q160-40 300 40v120H-40z" fill="'+P.hillB+'"/>';
 for(var i=0;i<12;i++){var tx=20+i*78,ty=285+(i%3)*14;s+='<g transform="translate('+tx+' '+ty+')"><rect x="-3" y="0" width="6" height="26" fill="'+shade(P.tree,-.45)+'"/><ellipse cx="0" cy="-8" rx="'+(20+(i%2)*6)+'" ry="'+(26+(i%3)*3)+'" fill="'+shade(P.tree,-.15*(i%3))+'"/></g>'}
 s+='</g>';
 if(niebla)s+='<g class="fogA"><ellipse cx="260" cy="300" rx="320" ry="26" fill="#fff" opacity=".45"/><ellipse cx="720" cy="250" rx="260" ry="22" fill="#fff" opacity=".4"/></g>';
 s+='<rect x="0" y="360" width="'+w+'" height="'+(h-360)+'" fill="'+shade(P.grass,-.25)+'"/>';
 return s}
function lluvia(){var s='<g opacity=".8">';for(var i=0;i<22;i++)s+='<line class="drop" style="animation-delay:'+(-i*.14)+'s" x1="'+(i*42+10)+'" y1="40" x2="'+(i*42+4)+'" y2="58" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>';return s+'</g>'}
RL.Fondos={isla:isla,monteverde:monteverde,lluvia:lluvia};
})(globalThis.RL=globalThis.RL||{});
