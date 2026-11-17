/* Piezas del prototipo. Las fichas técnicas están escritas al nivel del segundo ciclo. */
(function(RL){RL.piezas={
 mov:{nombre:'Movimiento',op:[
  {id:'ruedas',n:'Ruedas',f:'Las ruedas ruedan muy bien en suelo duro, pero en el barro patinan y no avanzan.'},
  {id:'patas',n:'Patas',f:'Las patas se apoyan en puntos del suelo. Pisan el barro sin patinar.'}]},
 ene:{nombre:'Energía',op:[
  {id:'bateria',n:'Batería',f:'La batería guarda energía y funciona con niebla, de noche o a la sombra. Se gasta con cada paso.'},
  {id:'solar',n:'Panel solar',f:'El panel solar transforma la luz del sol en electricidad. Con niebla casi no carga.'}]},
 sen:{nombre:'Sensor',op:[
  {id:'humedad',n:'Sensor de humedad',f:'Mide cuánta agua hay en el aire o en el suelo.'},
  {id:'camara',n:'Cámara',f:'Hace fotos y reconoce lo que hay delante: roca, barro o camino libre. No mide la humedad.'}]},
 her:{nombre:'Herramienta',op:[
  {id:'regadera',n:'Regadera',f:'Echa agua a las plantas.'},
  {id:'pinza',n:'Pinza',f:'Agarra y coloca objetos pequeños, como un poste.'}]}};
RL.piezaNombre=function(id){var r=id;Object.keys(RL.piezas).forEach(function(k){RL.piezas[k].op.forEach(function(o){if(o.id===id)r=o.n})});return r};
})(globalThis.RL=globalThis.RL||{});
