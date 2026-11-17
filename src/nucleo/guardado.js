/* Guardado en el navegador, protegido ante errores (modo privado, almacenamiento lleno). Sin datos personales. */
(function(RL){var K='robolab.proto.v1',mem={estrellas:{},intentos:{},ajustes:null,bitacora:{},errores:{}};
function cargar(){try{var s=localStorage.getItem(K);if(s){var o=JSON.parse(s);if(o&&typeof o==='object'){mem.estrellas=o.estrellas||{};mem.intentos=o.intentos||{};mem.bitacora=o.bitacora||{};mem.errores=o.errores||{};mem.ajustes=o.ajustes||null}}}catch(e){}return mem}
function guardar(){try{localStorage.setItem(K,JSON.stringify(mem));return true}catch(e){return false}}
RL.Guardado={datos:mem,cargar:cargar,guardar:guardar};})(globalThis.RL=globalThis.RL||{});
