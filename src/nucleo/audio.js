/* Sonidos sintetizados en el navegador: pitidos melódicos del robot. M silencia. */
(function(RL){var ctx=null;
function beep(f,d,tipo){if(RL.E.ajustes.silencio)return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();var o=ctx.createOscillator(),g=ctx.createGain();o.type=tipo||'sine';o.frequency.value=f;g.gain.value=.06;o.connect(g);g.connect(ctx.destination);var t=ctx.currentTime;g.gain.setValueAtTime(.06,t);g.gain.exponentialRampToValueAtTime(.0008,t+(d||.12));o.start(t);o.stop(t+(d||.12)+.02)}catch(e){}}
function melodia(a){a.forEach(function(f,i){setTimeout(function(){beep(f,.14,'triangle')},i*110)})}
RL.Audio={beep:beep,ok:function(){melodia([523,659,784,1046])},error:function(){melodia([330,262])},toca:function(){beep(660,.07)},paso:function(){beep(440,.06,'square')}};})(globalThis.RL=globalThis.RL||{});
