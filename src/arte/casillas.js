/* Casillas en vista de tres cuartos y objetos de pie. */
(function(RL){var A=RL.Arte,P=A.P,shade=A.shade,SW=A.SW,uid=0;
function tile(kind,x,y,s,dep){
 var top={hierba:P.grass,barro:P.mud,roca:P.rock,cumbre:'#7A6BB5'}[kind]||P.grass,o='',id='t'+(++uid),k=s/56;
 o+='<rect x="'+x+'" y="'+(y+dep)+'" width="'+s+'" height="'+s+'" rx="9" fill="'+shade(top,-.35)+'"/><rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" rx="9" fill="'+top+'"/>';
 o+='<clipPath id="'+id+'"><rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" rx="9"/></clipPath><g clip-path="url(#'+id+')">';
 if(kind==='hierba')o+='<path d="M'+(x+10*k)+' '+(y+36*k)+'l3-9 3 9M'+(x+34*k)+' '+(y+20*k)+'l3-9 3 9M'+(x+42*k)+' '+(y+44*k)+'l3-9 3 9" stroke="'+shade(top,-.3)+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
 if(kind==='barro')o+='<ellipse cx="'+(x+20*k)+'" cy="'+(y+22*k)+'" rx="'+9*k+'" ry="'+5*k+'" fill="'+shade(top,-.25)+'"/><ellipse cx="'+(x+38*k)+'" cy="'+(y+40*k)+'" rx="'+11*k+'" ry="'+6*k+'" fill="'+shade(top,.2)+'" opacity=".6"/>';
 if(kind==='roca')o+='<circle cx="'+(x+18*k)+'" cy="'+(y+20*k)+'" r="'+4*k+'" fill="'+shade(top,-.25)+'"/><circle cx="'+(x+40*k)+'" cy="'+(y+36*k)+'" r="'+5*k+'" fill="'+shade(top,.25)+'"/><circle cx="'+(x+24*k)+'" cy="'+(y+44*k)+'" r="'+3*k+'" fill="'+shade(top,-.25)+'"/>';
 o+='</g><rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" rx="9" fill="none" '+SW+'/><path d="M'+x+' '+(y+s)+'v'+dep+'a9 9 0 0 0 9 9h'+(s-18)+'a9 9 0 0 0 9-9v-'+dep+'" fill="none" '+SW+'/>';return o}
function obj(kind,cx,by,k){var o='<g transform="translate('+cx+' '+by+') scale('+k+')">';
 if(kind==='cupula')o+=A.rr(-18,-14,36,14,3,P.metal)+'<path d="M-17-14a17 17 0 0 1 34 0z" fill="#F4F1EA" '+SW+'/><g class="sway"><path d="M-3-30l6 0 0 16-6 0z" fill="#3B2F6B" '+SW+'/></g><circle cx="0" cy="-8" r="2.5" fill="#FFE27A"/>';
 if(kind==='helecho')o+=A.rr(-5,-26,10,26,3,P.mud)+'<g class="sway"><path d="M0-24q-30-4-32 22q12-14 32-14zM0-24q30-4 32 22q-12-14-32-14zM0-26q-6-22 6-28q8 14-6 28z" fill="'+P.tree+'" '+SW+'/></g>';
 if(kind==='seco')o+=A.rr(-5,-26,10,26,3,P.mud)+'<g class="sway"><path d="M0-24q-30 2-30 24q10-16 30-12zM0-24q30 2 30 24q-10-16-30-12zM0-26q-4-20 6-26q6 12-6 26z" fill="#B7A25A" '+SW+'/></g>';
 if(kind==='poste')o+='<rect x="-3" y="-38" width="6" height="38" fill="'+shade(P.metal,-.2)+'" '+SW+'/>'+A.rr(-10,-52,20,16,5,P.post)+'<circle cx="0" cy="-44" r="3" fill="#fff"/>';
 if(kind==='meta')o+='<rect x="-2.5" y="-46" width="5" height="46" fill="'+shade(P.metal,-.2)+'" '+SW+'/><path d="M2.5-46h26l-6 9 6 9h-26z" fill="'+P.coral+'" '+SW+'/>';
 return o+'</g>'}
RL.Casillas={tile:tile,obj:obj};
})(globalThis.RL=globalThis.RL||{});
