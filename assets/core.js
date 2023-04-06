/*! howler.js v2.2.3 | (c) 2013-2020, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var o=this||n;if(e=parseFloat(e),o.ctx||_(),void 0!==e&&e>=0&&e<=1){if(o._volume=e,o._muted)return o;o.usingWebAudio&&o.masterGain.gain.setValueAtTime(e,n.ctx.currentTime);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.volume=u._volume*e)}return o}return o._volume},mute:function(e){var o=this||n;o.ctx||_(),o._muted=e,o.usingWebAudio&&o.masterGain.gain.setValueAtTime(e?0:o._volume,n.ctx.currentTime);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.muted=!!e||u._muted)}return o},stop:function(){for(var e=this||n,o=0;o<e._howls.length;o++)e._howls[o].stop();return e},unload:function(){for(var e=this||n,o=e._howls.length-1;o>=0;o--)e._howls[o].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx?e.ctx.state||"suspended":"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{var o=new Audio;void 0===o.oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{var o=new Audio;o.muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,o=null;try{o="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!o||"function"!=typeof o.canPlayType)return e;var t=o.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator?e._navigator.userAgent:"",a=r.match(/OPR\/([0-6].)/g),u=a&&parseInt(a[0].split("/")[1],10)<33,d=-1!==r.indexOf("Safari")&&-1===r.indexOf("Chrome"),i=r.match(/Version\/(.*?) /),_=d&&i&&parseInt(i[1],10)<15;return e._codecs={mp3:!(u||!t&&!o.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(o.canPlayType('audio/wav; codecs="1"')||o.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(o.canPlayType("audio/x-m4b;")||o.canPlayType("audio/m4b;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!(_||!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!(_||!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(o.canPlayType("audio/x-flac;")||o.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||n;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var o=function(n){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var t=new Audio;t._unlocked=!0,e._releaseHtml5Audio(t)}catch(n){e.noAudio=!0;break}for(var r=0;r<e._howls.length;r++)if(!e._howls[r]._webAudio)for(var a=e._howls[r]._getSoundIds(),u=0;u<a.length;u++){var d=e._howls[r]._soundById(a[u]);d&&d._node&&!d._node._unlocked&&(d._node._unlocked=!0,d._node.load())}e._autoResume();var i=e.ctx.createBufferSource();i.buffer=e._scratchBuffer,i.connect(e.ctx.destination),void 0===i.start?i.noteOn(0):i.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),i.onended=function(){i.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",o,!0),document.removeEventListener("touchend",o,!0),document.removeEventListener("click",o,!0),document.removeEventListener("keydown",o,!0);for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("unlock")}};return document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",o,!0),document.addEventListener("click",o,!0),document.addEventListener("keydown",o,!0),e}},_obtainHtml5Audio:function(){var e=this||n;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var o=(new Audio).play();return o&&"undefined"!=typeof Promise&&(o instanceof Promise||"function"==typeof o.then)&&o.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(e){var o=this||n;return e._unlocked&&o._html5AudioPool.push(e),o},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&n.usingWebAudio){for(var o=0;o<e._howls.length;o++)if(e._howls[o]._webAudio)for(var t=0;t<e._howls[o]._sounds.length;t++)if(!e._howls[o]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var n=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(n,n)}},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,o=function(e){var n=this;if(!e.src||0===e.src.length)return void console.error("An array of source files must be passed with any new Howl.");n.init(e)};o.prototype={init:function(e){var o=this;return n.ctx||_(),o._autoplay=e.autoplay||!1,o._format="string"!=typeof e.format?e.format:[e.format],o._html5=e.html5||!1,o._muted=e.mute||!1,o._loop=e.loop||!1,o._pool=e.pool||5,o._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,o._rate=e.rate||1,o._sprite=e.sprite||{},o._src="string"!=typeof e.src?e.src:[e.src],o._volume=void 0!==e.volume?e.volume:1,o._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._playLock=!1,o._onend=e.onend?[{fn:e.onend}]:[],o._onfade=e.onfade?[{fn:e.onfade}]:[],o._onload=e.onload?[{fn:e.onload}]:[],o._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],o._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],o._onpause=e.onpause?[{fn:e.onpause}]:[],o._onplay=e.onplay?[{fn:e.onplay}]:[],o._onstop=e.onstop?[{fn:e.onstop}]:[],o._onmute=e.onmute?[{fn:e.onmute}]:[],o._onvolume=e.onvolume?[{fn:e.onvolume}]:[],o._onrate=e.onrate?[{fn:e.onrate}]:[],o._onseek=e.onseek?[{fn:e.onseek}]:[],o._onunlock=e.onunlock?[{fn:e.onunlock}]:[],o._onresume=[],o._webAudio=n.usingWebAudio&&!o._html5,void 0!==n.ctx&&n.ctx&&n.autoUnlock&&n._unlockAudio(),n._howls.push(o),o._autoplay&&o._queue.push({event:"play",action:function(){o.play()}}),o._preload&&"none"!==o._preload&&o.load(),o},load:function(){var e=this,o=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var u,d;if(e._format&&e._format[r])u=e._format[r];else{if("string"!=typeof(d=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}u=/^data:audio\/([^;,]+);/i.exec(d),u||(u=/\.([^.]+)$/.exec(d.split("?",1)[0])),u&&(u=u[1].toLowerCase())}if(u||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),u&&n.codecs(u)){o=e._src[r];break}}return o?(e._src=o,e._state="loading","https:"===window.location.protocol&&"http:"===o.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new t(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,o){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e&&(e="__default",!t._playLock)){for(var a=0,u=0;u<t._sounds.length;u++)t._sounds[u]._paused&&!t._sounds[u]._ended&&(a++,r=t._sounds[u]._id);1===a?e=null:r=null}}var d=r?t._soundById(r):t._inactiveSound();if(!d)return null;if(r&&!e&&(e=d._sprite||"__default"),"loaded"!==t._state){d._sprite=e,d._ended=!1;var i=d._id;return t._queue.push({event:"play",action:function(){t.play(i)}}),i}if(r&&!d._paused)return o||t._loadQueue("play"),d._id;t._webAudio&&n._autoResume();var _=Math.max(0,d._seek>0?d._seek:t._sprite[e][0]/1e3),s=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-_),l=1e3*s/Math.abs(d._rate),c=t._sprite[e][0]/1e3,f=(t._sprite[e][0]+t._sprite[e][1])/1e3;d._sprite=e,d._ended=!1;var p=function(){d._paused=!1,d._seek=_,d._start=c,d._stop=f,d._loop=!(!d._loop&&!t._sprite[e][2])};if(_>=f)return void t._ended(d);var m=d._node;if(t._webAudio){var v=function(){t._playLock=!1,p(),t._refreshBuffer(d);var e=d._muted||t._muted?0:d._volume;m.gain.setValueAtTime(e,n.ctx.currentTime),d._playStart=n.ctx.currentTime,void 0===m.bufferSource.start?d._loop?m.bufferSource.noteGrainOn(0,_,86400):m.bufferSource.noteGrainOn(0,_,s):d._loop?m.bufferSource.start(0,_,86400):m.bufferSource.start(0,_,s),l!==1/0&&(t._endTimers[d._id]=setTimeout(t._ended.bind(t,d),l)),o||setTimeout(function(){t._emit("play",d._id),t._loadQueue()},0)};"running"===n.state&&"interrupted"!==n.ctx.state?v():(t._playLock=!0,t.once("resume",v),t._clearTimer(d._id))}else{var h=function(){m.currentTime=_,m.muted=d._muted||t._muted||n._muted||m.muted,m.volume=d._volume*n.volume(),m.playbackRate=d._rate;try{var r=m.play();if(r&&"undefined"!=typeof Promise&&(r instanceof Promise||"function"==typeof r.then)?(t._playLock=!0,p(),r.then(function(){t._playLock=!1,m._unlocked=!0,o?t._loadQueue():t._emit("play",d._id)}).catch(function(){t._playLock=!1,t._emit("playerror",d._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),d._ended=!0,d._paused=!0})):o||(t._playLock=!1,p(),t._emit("play",d._id)),m.playbackRate=d._rate,m.paused)return void t._emit("playerror",d._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||d._loop?t._endTimers[d._id]=setTimeout(t._ended.bind(t,d),l):(t._endTimers[d._id]=function(){t._ended(d),m.removeEventListener("ended",t._endTimers[d._id],!1)},m.addEventListener("ended",t._endTimers[d._id],!1))}catch(e){t._emit("playerror",d._id,e)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===m.src&&(m.src=t._src,m.load());var y=window&&window.ejecta||!m.readyState&&n._navigator.isCocoonJS;if(m.readyState>=3||y)h();else{t._playLock=!0,t._state="loading";var g=function(){t._state="loaded",h(),m.removeEventListener(n._canPlayEvent,g,!1)};m.addEventListener(n._canPlayEvent,g,!1),t._clearTimer(d._id)}}return d._id},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused&&(r._seek=n.seek(o[t]),r._rateSeek=0,r._paused=!0,n._stopFade(o[t]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var o=this;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"stop",action:function(){o.stop(e)}}),o;for(var t=o._getSoundIds(e),r=0;r<t.length;r++){o._clearTimer(t[r]);var a=o._soundById(t[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,o._stopFade(t[r]),a._node&&(o._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),o._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause(),a._node.duration===1/0&&o._clearSound(a._node))),n||o._emit("stop",a._id))}return o},mute:function(e,o){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if(void 0===o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),a=0;a<r.length;a++){var u=t._soundById(r[a]);u&&(u._muted=e,u._interval&&t._stopFade(u._id),t._webAudio&&u._node?u._node.gain.setValueAtTime(e?0:u._volume,n.ctx.currentTime):u._node&&(u._node.muted=!!n._muted||e),t._emit("mute",u._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length||2===r.length&&void 0===r[1]){t._getSoundIds().indexOf(r[0])>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var a;if(!(void 0!==e&&e>=0&&e<=1))return a=o?t._soundById(o):t._sounds[0],a?a._volume:0;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;void 0===o&&(t._volume=e),o=t._getSoundIds(o);for(var u=0;u<o.length;u++)(a=t._soundById(o[u]))&&(a._volume=e,r[2]||t._stopFade(o[u]),t._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(e,n.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=e*n.volume()),t._emit("volume",a._id));return t},fade:function(e,o,t,r){var a=this;if("loaded"!==a._state||a._playLock)return a._queue.push({event:"fade",action:function(){a.fade(e,o,t,r)}}),a;e=Math.min(Math.max(0,parseFloat(e)),1),o=Math.min(Math.max(0,parseFloat(o)),1),t=parseFloat(t),a.volume(e,r);for(var u=a._getSoundIds(r),d=0;d<u.length;d++){var i=a._soundById(u[d]);if(i){if(r||a._stopFade(u[d]),a._webAudio&&!i._muted){var _=n.ctx.currentTime,s=_+t/1e3;i._volume=e,i._node.gain.setValueAtTime(e,_),i._node.gain.linearRampToValueAtTime(o,s)}a._startFadeInterval(i,e,o,t,u[d],void 0===r)}}return a},_startFadeInterval:function(e,n,o,t,r,a){var u=this,d=n,i=o-n,_=Math.abs(i/.01),s=Math.max(4,_>0?t/_:t),l=Date.now();e._fadeTo=o,e._interval=setInterval(function(){var r=(Date.now()-l)/t;l=Date.now(),d+=i*r,d=Math.round(100*d)/100,d=i<0?Math.max(o,d):Math.min(o,d),u._webAudio?e._volume=d:u.volume(d,e._id,!0),a&&(u._volume=d),(o<n&&d<=o||o>n&&d>=o)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,u.volume(o,e._id),u._emit("fade",e._id))},s)},_stopFade:function(e){var o=this,t=o._soundById(e);return t&&t._interval&&(o._webAudio&&t._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(t._interval),t._interval=null,o.volume(t._fadeTo,e),t._fadeTo=null,o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(o=t._soundById(parseInt(r[0],10)))&&o._loop;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=t._getSoundIds(n),u=0;u<a.length;u++)(o=t._soundById(a[u]))&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e,e&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop,t.playing(a[u])&&(t.pause(a[u],!0),t.play(a[u],!0)))));return t},rate:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var d;if("number"!=typeof e)return d=t._soundById(o),d?d._rate:t._rate;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;void 0===o&&(t._rate=e),o=t._getSoundIds(o);for(var i=0;i<o.length;i++)if(d=t._soundById(o[i])){t.playing(o[i])&&(d._rateSeek=t.seek(o[i]),d._playStart=t._webAudio?n.ctx.currentTime:d._playStart),d._rate=e,t._webAudio&&d._node&&d._node.bufferSource?d._node.bufferSource.playbackRate.setValueAtTime(e,n.ctx.currentTime):d._node&&(d._node.playbackRate=e);var _=t.seek(o[i]),s=(t._sprite[d._sprite][0]+t._sprite[d._sprite][1])/1e3-_,l=1e3*s/Math.abs(d._rate);!t._endTimers[o[i]]&&d._paused||(t._clearTimer(o[i]),t._endTimers[o[i]]=setTimeout(t._ended.bind(t,d),l)),t._emit("rate",d._id)}return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)t._sounds.length&&(o=t._sounds[0]._id);else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):t._sounds.length&&(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if(void 0===o)return 0;if("number"==typeof e&&("loaded"!==t._state||t._playLock))return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var d=t._soundById(o);if(d){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var i=t.playing(o)?n.ctx.currentTime-d._playStart:0,_=d._rateSeek?d._rateSeek-d._seek:0;return d._seek+(_+i*Math.abs(d._rate))}return d._node.currentTime}var s=t.playing(o);s&&t.pause(o,!0),d._seek=e,d._ended=!1,t._clearTimer(o),t._webAudio||!d._node||isNaN(d._node.duration)||(d._node.currentTime=e);var l=function(){s&&t.play(o,!0),t._emit("seek",o)};if(s&&!t._webAudio){var c=function(){t._playLock?setTimeout(c,0):l()};setTimeout(c,0)}else l()}return t},playing:function(e){var n=this;if("number"==typeof e){var o=n._soundById(e);return!!o&&!o._paused}for(var t=0;t<n._sounds.length;t++)if(!n._sounds[t]._paused)return!0;return!1},duration:function(e){var n=this,o=n._duration,t=n._soundById(e);return t&&(o=n._sprite[t._sprite][1]/1e3),o},state:function(){return this._state},unload:function(){for(var e=this,o=e._sounds,t=0;t<o.length;t++)o[t]._paused||e.stop(o[t]._id),e._webAudio||(e._clearSound(o[t]._node),o[t]._node.removeEventListener("error",o[t]._errorFn,!1),o[t]._node.removeEventListener(n._canPlayEvent,o[t]._loadFn,!1),o[t]._node.removeEventListener("ended",o[t]._endFn,!1),n._releaseHtml5Audio(o[t]._node)),delete o[t]._node,e._clearTimer(o[t]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1);var u=!0;for(t=0;t<n._howls.length;t++)if(n._howls[t]._src===e._src||e._src.indexOf(n._howls[t]._src)>=0){u=!1;break}return r&&u&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,a=r["_on"+e];return"function"==typeof n&&a.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e],a=0;if("number"==typeof n&&(o=n,n=null),n||o)for(a=0;a<r.length;a++){var u=o===r[a].id;if(n===r[a].fn&&u||!n&&u){r.splice(a,1);break}}else if(e)t["_on"+e]=[];else{var d=Object.keys(t);for(a=0;a<d.length;a++)0===d[a].indexOf("_on")&&Array.isArray(t[d[a]])&&(t[d[a]]=[])}return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[a].fn),0),r[a].once&&t.off(e,r[a].fn,r[a].id));return t._loadQueue(e),t},_loadQueue:function(e){var n=this;if(n._queue.length>0){var o=n._queue[0];o.event===e&&(n._queue.shift(),n._loadQueue()),e||o.action()}return n},_ended:function(e){var o=this,t=e._sprite;if(!o._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(o._ended.bind(o,e),100),o;var r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id,!0).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),a)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,o._clearTimer(e._id),o._cleanBuffer(e._node),n._autoSuspend()),o._webAudio||r||o.stop(e._id,!0),o},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var o=n._soundById(e);o&&o._node&&o._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new t(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(o<=n)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if(void 0===e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[o._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,n.ctx.currentTime),o},_cleanBuffer:function(e){var o=this,t=n._navigator&&n._navigator.vendor.indexOf("Apple")>=0;if(n._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),t))try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}return e.bufferSource=null,o},_clearSound:function(e){/MSIE |Trident\//.test(n._navigator&&n._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var t=function(e){this._parent=e,this.init()};t.prototype={init:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,o._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=n._muted||e._muted||e._parent._muted?0:e._volume;return o._webAudio?(e._node=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(t,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):n.noAudio||(e._node=n._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=o._src,e._node.preload=!0===o._preload?"auto":o._preload,e._node.volume=t*n.volume(),e._node.load()),e},reset:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,o=e._parent;o._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(o._sprite).length&&(o._sprite={__default:[0,1e3*o._duration]}),"loaded"!==o._state&&(o._state="loaded",o._emit("load"),o._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,n=e._parent;n._duration===1/0&&(n._duration=Math.ceil(10*e._node.duration)/10,n._sprite.__default[1]===1/0&&(n._sprite.__default[1]=1e3*n._duration),n._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void i(e);if(/^data:[^;]+;base64,/.test(n)){for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),a=0;a<o.length;++a)t[a]=o.charCodeAt(a);d(t.buffer,e)}else{var _=new XMLHttpRequest;_.open(e._xhr.method,n,!0),_.withCredentials=e._xhr.withCredentials,_.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach(function(n){_.setRequestHeader(n,e._xhr.headers[n])}),_.onload=function(){var n=(_.status+"")[0];if("0"!==n&&"2"!==n&&"3"!==n)return void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");d(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},u(_)}},u=function(e){try{e.send()}catch(n){e.onerror()}},d=function(e,o){var t=function(){o._emit("loaderror",null,"Decoding audio data failed.")},a=function(e){e&&o._sounds.length>0?(r[o._src]=e,i(o,e)):t()};"undefined"!=typeof Promise&&1===n.ctx.decodeAudioData.length?n.ctx.decodeAudioData(e).then(a).catch(t):n.ctx.decodeAudioData(e,a,t)},i=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},_=function(){if(n.usingWebAudio){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}n.ctx||(n.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),o=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=o?parseInt(o[1],10):null;if(e&&t&&t<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());n._navigator&&!r&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.setValueAtTime(n._muted?0:n._volume,n.ctx.currentTime),n.masterGain.connect(n.ctx.destination)),n._setup()}};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:o}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=o),"undefined"!=typeof global?(global.HowlerGlobal=e,global.Howler=n,global.Howl=o,global.Sound=t):"undefined"!=typeof window&&(window.HowlerGlobal=e,window.Howler=n,window.Howl=o,window.Sound=t)}();
/*! Spatial Plugin */
!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var t=n._howls.length-1;t>=0;t--)n._howls[t].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var r=this;return r.ctx&&r.ctx.listener?(n="number"!=typeof n?r._pos[1]:n,t="number"!=typeof t?r._pos[2]:t,"number"!=typeof e?r._pos:(r._pos=[e,n,t],void 0!==r.ctx.listener.positionX?(r.ctx.listener.positionX.setTargetAtTime(r._pos[0],Howler.ctx.currentTime,.1),r.ctx.listener.positionY.setTargetAtTime(r._pos[1],Howler.ctx.currentTime,.1),r.ctx.listener.positionZ.setTargetAtTime(r._pos[2],Howler.ctx.currentTime,.1)):r.ctx.listener.setPosition(r._pos[0],r._pos[1],r._pos[2]),r)):r},HowlerGlobal.prototype.orientation=function(e,n,t,r,o,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var s=a._orientation;return n="number"!=typeof n?s[1]:n,t="number"!=typeof t?s[2]:t,r="number"!=typeof r?s[3]:r,o="number"!=typeof o?s[4]:o,i="number"!=typeof i?s[5]:i,"number"!=typeof e?s:(a._orientation=[e,n,t,r,o,i],void 0!==a.ctx.listener.forwardX?(a.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),a.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),a.ctx.listener.forwardZ.setTargetAtTime(t,Howler.ctx.currentTime,.1),a.ctx.listener.upX.setTargetAtTime(r,Howler.ctx.currentTime,.1),a.ctx.listener.upY.setTargetAtTime(o,Howler.ctx.currentTime,.1),a.ctx.listener.upZ.setTargetAtTime(i,Howler.ctx.currentTime,.1)):a.ctx.listener.setOrientation(e,n,t,r,o,i),a)},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:0,distanceModel:void 0!==n.distanceModel?n.distanceModel:"inverse",maxDistance:void 0!==n.maxDistance?n.maxDistance:1e4,panningModel:void 0!==n.panningModel?n.panningModel:"HRTF",refDistance:void 0!==n.refDistance?n.refDistance:1,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(n,t){var r=this;if(!r._webAudio)return r;if("loaded"!==r._state)return r._queue.push({event:"stereo",action:function(){r.stereo(n,t)}}),r;var o=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof n)return r._stereo;r._stereo=n,r._pos=[n,0,0]}for(var i=r._getSoundIds(t),a=0;a<i.length;a++){var s=r._soundById(i[a]);if(s){if("number"!=typeof n)return s._stereo;s._stereo=n,s._pos=[n,0,0],s._node&&(s._pannerAttr.panningModel="equalpower",s._panner&&s._panner.pan||e(s,o),"spatial"===o?void 0!==s._panner.positionX?(s._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),s._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),s._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):s._panner.setPosition(n,0,0):s._panner.pan.setValueAtTime(n,Howler.ctx.currentTime)),r._emit("stereo",s._id)}}return r},Howl.prototype.pos=function(n,t,r,o){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"pos",action:function(){i.pos(n,t,r,o)}}),i;if(t="number"!=typeof t?0:t,r="number"!=typeof r?-.5:r,void 0===o){if("number"!=typeof n)return i._pos;i._pos=[n,t,r]}for(var a=i._getSoundIds(o),s=0;s<a.length;s++){var p=i._soundById(a[s]);if(p){if("number"!=typeof n)return p._pos;p._pos=[n,t,r],p._node&&(p._panner&&!p._panner.pan||e(p,"spatial"),void 0!==p._panner.positionX?(p._panner.positionX.setValueAtTime(n,Howler.ctx.currentTime),p._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),p._panner.positionZ.setValueAtTime(r,Howler.ctx.currentTime)):p._panner.setPosition(n,t,r)),i._emit("pos",p._id)}}return i},Howl.prototype.orientation=function(n,t,r,o){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"orientation",action:function(){i.orientation(n,t,r,o)}}),i;if(t="number"!=typeof t?i._orientation[1]:t,r="number"!=typeof r?i._orientation[2]:r,void 0===o){if("number"!=typeof n)return i._orientation;i._orientation=[n,t,r]}for(var a=i._getSoundIds(o),s=0;s<a.length;s++){var p=i._soundById(a[s]);if(p){if("number"!=typeof n)return p._orientation;p._orientation=[n,t,r],p._node&&(p._panner||(p._pos||(p._pos=i._pos||[0,0,-.5]),e(p,"spatial")),void 0!==p._panner.orientationX?(p._panner.orientationX.setValueAtTime(n,Howler.ctx.currentTime),p._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),p._panner.orientationZ.setValueAtTime(r,Howler.ctx.currentTime)):p._panner.setOrientation(n,t,r)),i._emit("orientation",p._id)}}return i},Howl.prototype.pannerAttr=function(){var n,t,r,o=this,i=arguments;if(!o._webAudio)return o;if(0===i.length)return o._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return r=o._soundById(parseInt(i[0],10)),r?r._pannerAttr:o._pannerAttr;n=i[0],void 0===t&&(n.pannerAttr||(n.pannerAttr={coneInnerAngle:n.coneInnerAngle,coneOuterAngle:n.coneOuterAngle,coneOuterGain:n.coneOuterGain,distanceModel:n.distanceModel,maxDistance:n.maxDistance,refDistance:n.refDistance,rolloffFactor:n.rolloffFactor,panningModel:n.panningModel}),o._pannerAttr={coneInnerAngle:void 0!==n.pannerAttr.coneInnerAngle?n.pannerAttr.coneInnerAngle:o._coneInnerAngle,coneOuterAngle:void 0!==n.pannerAttr.coneOuterAngle?n.pannerAttr.coneOuterAngle:o._coneOuterAngle,coneOuterGain:void 0!==n.pannerAttr.coneOuterGain?n.pannerAttr.coneOuterGain:o._coneOuterGain,distanceModel:void 0!==n.pannerAttr.distanceModel?n.pannerAttr.distanceModel:o._distanceModel,maxDistance:void 0!==n.pannerAttr.maxDistance?n.pannerAttr.maxDistance:o._maxDistance,refDistance:void 0!==n.pannerAttr.refDistance?n.pannerAttr.refDistance:o._refDistance,rolloffFactor:void 0!==n.pannerAttr.rolloffFactor?n.pannerAttr.rolloffFactor:o._rolloffFactor,panningModel:void 0!==n.pannerAttr.panningModel?n.pannerAttr.panningModel:o._panningModel})}else 2===i.length&&(n=i[0],t=parseInt(i[1],10));for(var a=o._getSoundIds(t),s=0;s<a.length;s++)if(r=o._soundById(a[s])){var p=r._pannerAttr;p={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:p.coneInnerAngle,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:p.coneOuterAngle,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:p.coneOuterGain,distanceModel:void 0!==n.distanceModel?n.distanceModel:p.distanceModel,maxDistance:void 0!==n.maxDistance?n.maxDistance:p.maxDistance,refDistance:void 0!==n.refDistance?n.refDistance:p.refDistance,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:p.rolloffFactor,panningModel:void 0!==n.panningModel?n.panningModel:p.panningModel};var c=r._panner;c?(c.coneInnerAngle=p.coneInnerAngle,c.coneOuterAngle=p.coneOuterAngle,c.coneOuterGain=p.coneOuterGain,c.distanceModel=p.distanceModel,c.maxDistance=p.maxDistance,c.refDistance=p.refDistance,c.rolloffFactor=p.rolloffFactor,c.panningModel=p.panningModel):(r._pos||(r._pos=o._pos||[0,0,-.5]),e(r,"spatial"))}return o},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,n._stereo?t.stereo(n._stereo):n._pos?t.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,t._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var e=function(e,n){n=n||"spatial","spatial"===n?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}();

var playFlag = 0;
var musicisok = 0;
function initFromInvp(){
	try{
		if(musicisok==0){
			var musicPlayer = $("#pagemusic")[0];
			var musicPlay = $("#musicPlay");
			var audio = $("#show_audio");
			
			console.log("musicPlay",musicPlay)
			if(musicPlay.length>0){
				var music = audio[0];
				music.play();
				music.pause();
			}
			var psrc = $("#pagemusic").attr("src");
			if(psrc&&psrc!=''){
				musicPlayer.play();
			}
			if(fpage_play_music=='1'){
				playFlag = 1;
				playOrParse();
			}else{
				playFlag = 0;
				playOrParse();
			}
			setTimeout(function(){
				if(musicPlay.length>0){
					if(audio[0].paused&&musicPlayer.paused){}else{
						musicisok = 1;
					}
				}else{
					if(musicPlayer.paused){}else{
						musicisok = 1;
					}
				}
			},200);
		}
		if(thevivi.length>0){
  	  	  	thevivi[0].play();
  	  		thevivi[0].pause();
  	  	}
	}catch(e){
		console.log(e);
	}
	$("#frominvpdiv").remove();
}


function initMusic(){
	console.log("initMusic:") 
	var musicPlay = $("#musicPlay");
	var audio = $("#show_audio");

	if(musicPlay.length>0){  
		try{
			var music_url;
			var show_audio = audio;
			var mu_o_url = show_audio.attr("mu_o_url");

			// console.log(music_url,show_audio,mu_o_url)
			// if(mu_o_url.indexOf('--zcl--')>-1){
			// 	var muArr = mu_o_url.split('--zcl--');
			// 	music_url = muArr[1];
			// 	console.log("music_url",music_url)
			// 	$.ajax({
			//         type: 'get',
			//         url: music_url,
			//         async:false,		//这个是是否异步加载true为异步加载，false则是同步加载
			//         complete: function (res,status) {
			//             if(status!='success'){
			// 				music_url = OSS_MUSIC_URL_HEAD + muArr[0];
			//             }
			//         }
			//     });
			// }else{
			// 	if(mu_o_url&&mu_o_url.indexOf("http")!=-1){
			// 		music_url = mu_o_url;
			// 	}else if(mu_o_url&&mu_o_url.indexOf("qq--")!=-1){
			// 		music_url = qqguid;
			// 	}else{
			// 		music_url = OSS_MUSIC_URL_HEAD + mu_o_url;
			// 	}
			// }
			show_audio.attr("src",OSS_MUSIC_URL_HEAD + mu_o_url);
		}catch(e){
			console.log(e);
		}
		musicPlay.bind("click",function(){playOrParse();});
		if(s_direction=='0'){
			domPositionUtil('body',"#musicPlay",35,35,12,16,3);
		}else{
			domPositionUtil('body',"#musicPlay",30,30,12,16,7);
			$("#musicPlay").css("-webkit-transform","rotate(90deg)");
		}
	}
	if(frominvp==1){
		$("body").append("<div id='frominvpdiv' style='width:100%;height:100%;z-index:2147483646;position:fixed;background-color:"+stylecolor_back+";' align='center'><div style='height:40%;'></div>"+
				"	<div style='width:70px;height:40px;line-height:40px;font-weight:bold;color:"+colorstyle+";font-size:11px;' align='center' ontouchend='initFromInvp()'>"+
				"		<div style='width:30px;height:30px;background-color:"+colorstyle+";border-radius:50px;'><div style='width:30px;height:30px;background-color:"+colorstyle+";border-radius:50px;-webkit-animation:outtonone 1s infinite;'></div></div>"+
				"			点击预览"+
				"	</div>"+
				"</div>");
	}else{


		initMusicByHo(musicPlay,audio);
		return ;
		var isWechat = theAgent.toLowerCase().indexOf('micromessenger') != -1;
		if(!isWechat){
			console.log("!isWechat:")
			initMusicByHo(musicPlay,audio);
		}else{
			if(theAgent.indexOf("ndroid")>-1){
				console.log("android: initMusicByHo")
				document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
					initMusicByHo(musicPlay,audio);
				});
			}else if(theAgent.toLowerCase().indexOf('windowswechat')!=-1){
				console.log("windowswechat: initMusicByWXJSB")
				initMusicByWXJSB(musicPlay,audio);
			}else{
				console.log("其他如 ios: initMusicByWXJSB")
				document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
					initMusicByWXJSB(musicPlay,audio);
				});
			}
		}
	}
}

var isHo = false;
var hoBGM;
function initMusicByHo(musicPlay,audio){
	var musrc = audio.attr('src');
	audio.remove();
	hoBGM = new Howl({
	      src: [musrc],
	      preload:true,
          loop: !0
	 });
	isHo = true;
	musicisok = 1;
	if(fpage_play_music=='1'){
		playFlag = 1;
	}else{
		playFlag = 0;
	}
	playOrParse();
}

function initMusicByWXJSB(musicPlay,audio){
	var musicPlayer = $("#pagemusic")[0];
	if(musicisok==0){
//		if(musicPlay.length>0){
//			var music = audio[0];
//			music.play();
//			music.pause();
//		}
		//if($("#pagemusic").attr("src")!=''){
			musicPlayer.play();
		//}
		if(fpage_play_music=='1'){
			playFlag = 1;
		}else{
			playFlag = 0;
		}
		playOrParse();
		checkIsPlay(audio,musicPlay);
	}
}

function checkIsPlay(audio,musicPlay){
	var musicPlayer = $("#pagemusic")[0];
	setTimeout(function(){
		if(musicPlay.length>0){
			if(audio[0].paused&&musicPlayer.paused){
				$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM2RTNBMzQ5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM2RTNBMzM5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMxYmRhNDItYjQ5My02MDQyLWIzZWQtM2M1ZTEzNTAyMjM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIv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");
				$("#musicPlay").css("-webkit-animation","none");
				playFlag = 0;
			}else{
				musicisok = 1;
			}
		}else{
			if(musicPlayer.paused){
				$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM2RTNBMzQ5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM2RTNBMzM5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMxYmRhNDItYjQ5My02MDQyLWIzZWQtM2M1ZTEzNTAyMjM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIv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");
				$("#musicPlay").css("-webkit-animation","none");
				playFlag = 0;
			}else{
				musicisok = 1;
			}
		}
		if(musicisok==0){
			var html = "<div class='notice_music'><img style='height:26px;' src='data:image/png;base64,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'/></div>";
			$('body').prepend(html);
			
			//$("#loadingkeykey").show();
		}else{
			$("#loadDiv").animate({
		        opacity:0
		    },1000,null,function(){
		        $(this).remove();
		    });
		}
	},2000);
	
}

function playOrParse(){
	if(playFlag==0){
		if(isHo){
			hoBGM.play();
		}else{
			$("#show_audio")[0].play();
		}
		$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjQzQzE2RUU5MjA1MTFFN0E4ODlDMTA3NjEyQkZBNjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjQzQzE2RUQ5MjA1MTFFN0E4ODlDMTA3NjEyQkZBNjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE1ZmI5MzctY2EzNS0zNDRlLWIzMDAtMWVlZDFlY2ZkM2ExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIv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");
		$("#musicPlay").css("-webkit-animation","menurotate 3s infinite linear");
		playFlag = 1;
	}else{
		if(isHo){
			hoBGM.pause();
		}else{
			$("#show_audio")[0].pause();
		}
		$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM2RTNBMzQ5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM2RTNBMzM5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMxYmRhNDItYjQ5My02MDQyLWIzZWQtM2M1ZTEzNTAyMjM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIv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");
		$("#musicPlay").css("-webkit-animation","none");
		playFlag = 0;
	}
}


var andInStatePlayOrNot = 0;
function playSound(url,smaterial_id){
    var musicSm = document.getElementById("sound"+smaterial_id);
    if(musicSm){
    	musicSm.volume = 1;
    	musicSm.currentTime = 0;
    	musicSm.play();
    	var is_playFinish = setInterval(function(){
            if(musicSm.ended){
                if(andInStatePlayOrNot == 1){
                    playFlag = 0;
                    playOrParse();
                }
                window.clearInterval(is_playFinish);
            }
        },30);
        if(playFlag == 1){
            andInStatePlayOrNot = 1;
            playOrParse();
        }else{
            andInStatePlayOrNot = 0;
        }
    }
}

var trbuttonsFlag = 0;
function openTrbuttons(){
	if(trbuttonsFlag==0){
		$(".trbutton").hide();
		trbuttonsFlag = 1;
	}else{
		$(".trbutton").show();
		trbuttonsFlag = 0;
	}
}

var all_trbuttons = null;
var leftjishu = 15;
function initMenus(data, datav, funs) {//3个侧边栏按钮
	var max_icon_len = 3;
	/*if(color.length==7&&color.indexOf('#')==0){
		color = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',0.5)';
	}*/
    var hastouch = "ontouchend" in window ? true : false;
    var length = data.length;
    var html = '';
    if(length>max_icon_len){
    	length =max_icon_len;
    }
    for (var i = 0; i < length; i++) {
        var click = hastouch ? "ontouchend=\"" + funs[i] + ";event.preventDefault();\"" : "onclick=\"" + funs[i] + "\"";
        html = html + 
        '<div class="trbutton" style="z-index:1314521;font-size:14px;text-align:center;color:#444;position:absolute;display:none;" id="' + data[i] + 'f" ' + click + '>'+
        '<table style="width:100%;height:100%;"><tr><td class="myrightmenu" style="color:#444" align="center">' + datav[i] + '</td></tr></table></div>'
    }
    $("body").prepend(html);
	var topjishu = 40;
	var k = 0;
    for(var i = 0; i < length; i++) {
    	if(data[i]=='invitation'){
	    	domPositionUtil('body', "#" + data[i] + 'f', 45, 45, (max_icon_len * 70) + topjishu, 17, 5);
    	}else{
	    	domPositionUtil('body', "#" + data[i] + 'f', 45, 45, ((max_icon_len-k-1) * 70) + topjishu, leftjishu, 5);
	    	k+=1;
    	}
    }
    all_trbuttons = $(".trbutton");
}

function initwbw(){//底部弹幕和弹幕详情
	var html = "<div tag='level2' id='btmhope' style='z-index:1314521;background:rgba(0,0,0,0.2);padding:0px 5px 0px 15px;box-sizing:border-box;color:white;border-radius:30px;font-size:14px;'>"+
		"<span onclick='showleavehope()' style='display:inline-block;width:calc(100% - 24px);'>留下您的祝福...</span>"+
		"<img  ontouchend='opendm();event.preventDefault();' onmouseup='opendm();' style='height:16px;vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAzCAMAAAAElGBiAAAAS1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////+DmQsHAAAAGHRSTlMA4LyJgGHw0BDAsKAgQJBwMFBH6aV4xdj5hWvuAAABxElEQVRIx7WVjbKCIBCFQUUF/zWL93/Sy4G8S5CKTZ2ZAnE/YFncZf+qhZKl3lcl+45FahudoLIIsF4nik8eVVcYkkNXs32NU89hNhBWghrZuQQsG381wZJUS9iSbxNLFc6vQ6dNXY12J9GRro0llHLtomhet87kmnYby7OnhOmbFysGMxO3IGbKzIZ/yJk8lZsHsyGOQfN4Y8GCjCnyLuBm196C5eyEHdwLrx3s3SyVmbLEU3i5BhixdxzXL8oYqdC6+AVnztVsssqy6pSjc+F2nFvn8jNu/pBDrDm0JvpHHHe9SxxifCeOc8AL58sZl5FBmn/EVTkkrnEPDV2PO/+Qu2UQNofudl+g/IgjLzczTt3fcTCOE/V3OPe9xxyHtvsC3YPvXUXZk7ZA/sX5ZfDz2Yzf/YRDPqspf1ot2upxxBVuJfkmga4HXFs6zzq/Pqz4fNTM9jmqC6gwe8VvzfN5px7ZClOm1j/lVdzWVtE2ARMcluSqre9KjIdLda6+9/5Yr1/V+MdAih0ag/eCjsGnipqFagdVRWDjMbKZEmq47p5Yw5JEoRnZQFgqWMIZwpI1Iqb2Rn0CVjW7rImwaxLAvq0/rLdLrUPFh+0AAAAASUVORK5CYII='/>"+
		"</div>";
	$("body").prepend(html);
	var wishdanmu = "<div tag='level2' id='wishdanmu' style='display:flex;overflow:hidden;z-index:1314521;height:105px;'></div>";
	$("body").prepend(wishdanmu);
	domPositionUtil('body', '#btmhope', 180, 36, 16, leftjishu, 7);
	domPositionUtil('body', '#wishdanmu', 265, 125, 50, leftjishu, 7);
}


function closeTheInvitation(flag){
	$(".pageac").attr("class","pageac blur_c");
	$("#invCon").show();
}

var theRightNowLn=0;
var theRightNowLa=0;
function openMap(ln,la,hotel,place,isgaode){
	window.location.href ="http://api.map.baidu.com/marker?location="+parseFloat(la)+","+parseFloat(ln)+"&title=农耕年华-二张烙馍村(白浪店)&content=王俊+徐小娟&output=html"
	return;
	var isWeixin = theAgent.toLowerCase().indexOf('micromessenger') != -1;
	if(!isWeixin){
		mtips('请在微信客户端打开定位导航'); 
		return;
	}
	if(isgaode&&isgaode=='1'){
		wx.openLocation({
		    latitude:parseFloat(la),
		    longitude:parseFloat(ln),
		    name:hotel,
		    address: place, // 地址详情说明
            scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
		    infoUrl:'耕年华-二张烙馍村(白浪店) 王俊+徐小娟'
		});
	}else{
		AMap.convertFrom([ln,la],'baidu',
			function(status,result){
				var theTlalns = result.locations.toString().split(",");
				wx.openLocation({
				    latitude:parseFloat(theTlalns[1]),
				    longitude:parseFloat(theTlalns[0]),
				    name:hotel,
				    address: place, // 地址详情说明
	                scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
				    infoUrl:'耕年华-二张烙馍村(白浪店) 王俊+徐小娟'
				});
			}
		);
	}
}




function openDaohang(){
	AMap.convertFrom([theRightNowLn,theRightNowLa],'baidu',
		function(status,result){
			var theTlalns = result.locations.toString().split(",");
			wx.openLocation({
			    latitude:parseFloat(theTlalns[1]),
			    longitude:parseFloat(theTlalns[0]),
			    name:'',
			    infoUrl:'耕年华-二张烙馍村(白浪店) 王俊+徐小娟'
			});
		}
	);
}

function stopRealVideo(){
	if(isnotusvideo){
		$('#videoCon').html('');
	}else{
		$("#ourmp4")[0].pause();
	}
	playOrParse();
}
var isnotusvideo = true;
function openVideo(needUrl){
	$("#videosCon").show();
	if(playFlag==1){
		playOrParse();
	}
	var url = movie_url;
	if(needUrl){
		url = needUrl;
	}
	if(url!=''){
		if(url.indexOf("s.xiaomaomv.com")!=-1||url.indexOf("s.hunlihu.com")!=-1||url.indexOf("2420380645")!=-1||url.indexOf("hunliji.com")!=-1||url.indexOf("2210508254720")!=-1){
			if(isnotusvideo){
				isnotusvideo = false;
				$("#videoCon").html("<video id=\"ourmp4\" controls=\"true\" autoplay=\"true\" webkit-playsinline=\"true\" x5-playsinline='x5-playsinline' playsinline=\"true\" poster=\"\" style=\"width:100%;height:400px;display:block;position:relative;\" src=\""+url+"\"></video>");
			}else{
				$("#ourmp4")[0].play();
			}
		}else if(url.indexOf("youku")==-1){
			$("#videoCon").html("<iframe style='width:100%;height:100%;border:none;' src='"+url+"' frameborder=0 allowfullscreen></iframe>");
		}else{
			if(s_direction=='0'){
				$("#videoCon").html("<div id='youkuplayerC' style='width:100%;height:45%;z-index:0;'></div>");
			}else{
				$("#videoCon").html("<div id='youkuplayerC' style='width:100%;height:80%;z-index:0;'></div>");
			}
			var vvid = '';
	    	if(url.indexOf('embed/')!=-1){
	    		vvid = url.split('embed/')[1].split('==')[0];
	    	}else{
	    		vvid = url.split('id_')[1].split('==')[0];
	    	}
	    	player = new YKU.Player('youkuplayerC',{
	            styleid:'0',
	            client_id:'b299ff842aa44893',
	            vid:vvid,
	            autoplay:1
	        });
		}
	}
}

function playbilibili(){
	$("[tag='bilibili_mv']").remove();
	if(playFlag==1){
		$("#show_audio")[0].pause();
		$("#musicPlay").attr("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNzBmYzI1Ni05MTgyLWY4NDYtYjkzNi02MzJiM2QxMDc4OWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODM2RTNBMzQ5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODM2RTNBMzM5MjA1MTFFN0FFRjVFMkM5REQ0RTdFMkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDMxYmRhNDItYjQ5My02MDQyLWIzZWQtM2M1ZTEzNTAyMjM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmY3MGZjMjU2LTkxODItZjg0Ni1iOTM2LTYzMmIzZDEwNzg5YyIv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");
		$("#musicPlay").css("-webkit-animation","none");
		playFlag = 0;
	}
}

function getGiftToDomain(theSS){
	return "h5.hunlihu.com/payhlh";
}
/*******************************an************************************/
function splitImgBlocks(con,column_no,row_no,url){
	var border_color = con.attr("border_color");
	var border_color_size = con.attr("border_color_size");
	var box_shadow = "";
	if(border_color){
		box_shadow = "box-shadow:0px 0px 0px "+border_color_size+"px "+border_color+";";
		border_color = "border_color='"+border_color+"'";
	}else{
		border_color = "";
	}
	var splic = column_no;
	var splics = row_no;
	var width = $(con).width();
	var height = $(con).height();
	var average = width/splic;
	var averages = height/splics;
	var imgface = $(con);
	for(var j = 0;j<splics;j++){
		for(var i = 0;i < splic;i++){
			imgface.append("<div class='amazingImgBlock' "+border_color+" style=\""+box_shadow+"display:none;float:left;width:"+average+"px;height:"+averages+"px;background-image:url('"+url+"');background-position:"+((average*i)*-1)+"px "+((averages*j)*-1)+"px;background-size:"+width+"px "+height+"px;background-repeat:no-repeat;-webkit-transition:box-shadow 0.2s;\"></div>");
		}
	}
}
function splitImgCircles(con,nos,url){
	var border_color = con.attr("border_color");
	var border_color_size = con.attr("border_color_size");
	var box_shadow = "";
	if(border_color){
		box_shadow = "box-shadow:0px 0px 0px "+border_color_size+"px "+border_color+";";
		border_color = "border_color='"+border_color+"'";
	}else{
		border_color = "";
	}
	var width = con.width();
	var height = con.height();
	var thinkSize = width>height?height:width;
	var limitSize = thinkSize/4;
	var average = (thinkSize-limitSize)/(nos-1);
	con.append("<div class='amazingImgBlock' "+border_color+" style=\"display:none;position:absolute;width:"+width+"px;height:"+height+"px;background-image:url('"+url+"');background-size:100% 100%;background-repeat:no-repeat;\"></div>");
	for(var i = 1;i<nos;i++){
		var nWidth = thinkSize - i*average;
		con.append("<div class='amazingImgBlock' "+border_color+" style=\""+box_shadow+"display:none;border-radius:1000px;position:absolute;width:"+nWidth+"px;height:"+nWidth+"px;background-image:url('"+url+"');background-position:center center;background-size:"+width+"px "+height+"px;background-repeat:no-repeat;margin-top:"+(height-nWidth)/2+"px;margin-left:"+(width-nWidth)/2+"px;-webkit-transition:box-shadow 0.2s;\"></div>");
	}
}

var AmazingImg = function(con){
	this.con = con;
	this.pause = false;
	this.isCss = con.attr("is_css")=="1"?true:false;
	var imgUrl = con.attr("img_url");
	this.am_delay = parseFloat(con.attr("am_delay"));
	var am_style = con.attr("am_style");
	this.am_style = am_style;
	if(this.isCss){
		con.css("background-size","100% 100%");
		var amazingImgBlocks = null;
		if(am_style=='two_line'){//两交错
			splitImgBlocks(con,1,2,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			$(amazingImgBlocks[0]).attr("class","am_left_in");
			$(amazingImgBlocks[1]).attr("class","am_right_in");
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='two_row'){//
			splitImgBlocks(con,2,1,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			$(amazingImgBlocks[0]).attr("class","am_top_in");
			$(amazingImgBlocks[1]).attr("class","am_foot_in");
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='three_line_in'){
			splitImgBlocks(con,1,3,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			$(amazingImgBlocks[0]).attr("class","am_left_in");
			$(amazingImgBlocks[1]).attr("class","am_right_in");
			$(amazingImgBlocks[2]).attr("class","am_left_in");
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='three_row_in'){
			splitImgBlocks(con,3,1,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			$(amazingImgBlocks[0]).attr("class","am_top_in");
			$(amazingImgBlocks[1]).attr("class","am_foot_in");
			$(amazingImgBlocks[2]).attr("class","am_top_in");
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='three_line_open'){
			splitImgBlocks(con,1,3,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			amazingImgBlocks.attr("class","am_insite_open");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.5s");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","1s");
			amazingImgBlocks[2].overflag = true;
		}else if(am_style=='three_row_open'){
			splitImgBlocks(con,3,1,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			amazingImgBlocks.attr("class","am_insite_open_2");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.5s");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","1s");
			amazingImgBlocks[2].overflag = true;
		}else if(am_style=='three_circle_in'){
			splitImgCircles(con,4,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			amazingImgBlocks.attr("class","am_insite_pop");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","0.2s");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[0]).css("-webkit-animation-delay","0.6s");
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='three_circle_out'){
			splitImgCircles(con,4,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			amazingImgBlocks.attr("class","am_insite_pop2");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","0.2s");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[0]).css("-webkit-animation-delay","0.6s");
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='four_block_run'){
			splitImgBlocks(con,2,2,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			for(var i = 0;i<4;i++){
				$(amazingImgBlocks[i]).attr("class","four_block_run_"+i);
			}
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='four_block_open'){
			splitImgBlocks(con,2,2,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			for(var i = 0;i<4;i++){
				$(amazingImgBlocks[i]).attr("class","four_block_open_"+i);
			}
			amazingImgBlocks[0].overflag = true;
		}else if(am_style=='six_block_runin_h'){
			splitImgBlocks(con,3,2,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			for(var i = 0;i<6;i++){
				var dom = $(amazingImgBlocks[i]);
				if(i<3){
					dom.attr("class","six_block_runin_h");
					dom.css("z-index",6-i);
				}else{
					dom.attr("class","six_block_runin_h1");
					dom.css("z-index",i);
				}
			}
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","1.6s");
			$(amazingImgBlocks[4]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[3]).css("-webkit-animation-delay","1.6s");
			amazingImgBlocks[3].overflag = true;
		}else if(am_style=='six_block_runin_s'){
			splitImgBlocks(con,2,3,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			for(var i = 0;i<6;i++){
				var dom = $(amazingImgBlocks[i]);
				if(i%2==0){
					dom.attr("class","six_block_runin_s");
					dom.css("z-index",6-i);
				}else{
					dom.attr("class","six_block_runin_s1");
					dom.css("z-index",i);
				}
			}
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[0]).css("-webkit-animation-delay","1.6s");
			$(amazingImgBlocks[3]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[5]).css("-webkit-animation-delay","1.6s");
			amazingImgBlocks[5].overflag = true;
		}else if(am_style=='nine_block_runin_s'){
			splitImgBlocks(con,3,3,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			for(var i = 0;i<9;i++){
				var dom = $(amazingImgBlocks[i]);
				if(i>2&&i<6){
					dom.attr("class","nine_block_runin_s1");
				}else{
					dom.attr("class","nine_block_runin_s");
				}
			}
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[4]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[3]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[7]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[8]).css("-webkit-animation-delay","0.8s");
			amazingImgBlocks[8].overflag = true;
		}else if(am_style=='nine_block_runin_h'){
			splitImgBlocks(con,3,3,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			for(var i = 0;i<9;i++){
				var dom = $(amazingImgBlocks[i]);
				if(i%3==1){
					dom.attr("class","nine_block_runin_h1");
				}else{
					dom.attr("class","nine_block_runin_h");
				}
			}
			$(amazingImgBlocks[3]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[6]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[4]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.8s");
			$(amazingImgBlocks[5]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[8]).css("-webkit-animation-delay","0.8s");
			amazingImgBlocks[8].overflag = true;
		}else if(am_style=='twelve_block_runin_h'){
			splitImgBlocks(con,4,3,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			$(amazingImgBlocks[4]).attr("class","twelve_block_runin_h");
			$(amazingImgBlocks[5]).attr("class","twelve_block_runin_h");
			$(amazingImgBlocks[6]).attr("class","twelve_block_runin_h1");
			$(amazingImgBlocks[7]).attr("class","twelve_block_runin_h1");
			$(amazingImgBlocks[0]).attr("class","twelve_block_runin_h2");
			$(amazingImgBlocks[1]).attr("class","twelve_block_runin_h2");
			$(amazingImgBlocks[2]).attr("class","twelve_block_runin_h2");
			$(amazingImgBlocks[3]).attr("class","twelve_block_runin_h2");
			$(amazingImgBlocks[8]).attr("class","twelve_block_runin_h3");
			$(amazingImgBlocks[9]).attr("class","twelve_block_runin_h3");
			$(amazingImgBlocks[10]).attr("class","twelve_block_runin_h3");
			$(amazingImgBlocks[11]).attr("class","twelve_block_runin_h3");
			$(amazingImgBlocks[4]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[7]).css("-webkit-animation-delay","0.5s");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[10]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.6s");
			$(amazingImgBlocks[9]).css("-webkit-animation-delay","0.6s");
			$(amazingImgBlocks[3]).css("-webkit-animation-delay","0.9s");
			$(amazingImgBlocks[11]).css("-webkit-animation-delay","1s");
			$(amazingImgBlocks[0]).css("-webkit-animation-delay","1s");
			$(amazingImgBlocks[8]).css("-webkit-animation-delay","1.2s");
			amazingImgBlocks[8].overflag = true;
		}else if(am_style=='twelve_block_runin_s'){
			splitImgBlocks(con,3,4,imgUrl);
			amazingImgBlocks = con.find(".amazingImgBlock");
			$(amazingImgBlocks[4]).attr("class","twelve_block_runin_s");
			$(amazingImgBlocks[1]).attr("class","twelve_block_runin_s");
			$(amazingImgBlocks[7]).attr("class","twelve_block_runin_s1");
			$(amazingImgBlocks[10]).attr("class","twelve_block_runin_s1");
			$(amazingImgBlocks[0]).attr("class","twelve_block_runin_s2");
			$(amazingImgBlocks[3]).attr("class","twelve_block_runin_s2");
			$(amazingImgBlocks[6]).attr("class","twelve_block_runin_s2");
			$(amazingImgBlocks[9]).attr("class","twelve_block_runin_s2");
			$(amazingImgBlocks[2]).attr("class","twelve_block_runin_s3");
			$(amazingImgBlocks[5]).attr("class","twelve_block_runin_s3");
			$(amazingImgBlocks[8]).attr("class","twelve_block_runin_s3");
			$(amazingImgBlocks[11]).attr("class","twelve_block_runin_s3");
			$(amazingImgBlocks[1]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[10]).css("-webkit-animation-delay","0.5s");
			$(amazingImgBlocks[6]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[8]).css("-webkit-animation-delay","0.4s");
			$(amazingImgBlocks[3]).css("-webkit-animation-delay","0.6s");
			$(amazingImgBlocks[5]).css("-webkit-animation-delay","0.6s");
			$(amazingImgBlocks[9]).css("-webkit-animation-delay","0.9s");
			$(amazingImgBlocks[11]).css("-webkit-animation-delay","1s");
			$(amazingImgBlocks[0]).css("-webkit-animation-delay","1s");
			$(amazingImgBlocks[2]).css("-webkit-animation-delay","1.2s");
			amazingImgBlocks[2].overflag = true;
		}
		this.amazingImgBlocks = amazingImgBlocks;
		amazingImgBlocks.each(function(){
			this.addEventListener("webkitAnimationEnd",function(){
				var border_color = $(this).attr("border_color");
				if(border_color){
					$(this).css("box-shadow","0px 0px 0px 0px "+border_color);
				}
				if(this.overflag){
					con.css("background-image","url('"+imgUrl+"')");
				}
			},false);
		});
	}else{

	}
}
AmazingImg.prototype = {
	play:function(){
		var $this = this;
		if($this.isCss){
			setTimeout(function(){
				$this.amazingImgBlocks.show();
			},$this.am_delay*1000);
		}else{

		}
	},
	stop:function(){
		var $this = this;
		if($this.isCss){
			var con = $this.con;
			var border_color = con.attr("border_color");
			var border_color_size = con.attr("border_color_size");
			if(border_color){
				$this.amazingImgBlocks.css("box-shadow","0px 0px 0px "+border_color_size+"px "+border_color);
			}
			con.css("background-image","none");
			$this.amazingImgBlocks.hide();
		}else{

		}
	}
};

/*******************************an************************************/
/*******************************dealurl************************************/
function colseTheHopeOk(dom){
	$(dom).parent().parent().parent().hide();
	//$("#guantips").show();
	//var guanzhuerweima = $("#guanzhuerweima");
	//var sr = guanzhuerweima.attr("sr");
	//guanzhuerweima.attr("src",sr);
}
var woyaozhizuo_url = null;
var ourshowsurl = location.href;
var code
if(ourshowsurl.indexOf('ispc=1')==-1){
    var theAgent = navigator.userAgent;
	if(theAgent.indexOf("ndroid")==-1&&theAgent.indexOf("iPhone")==-1&&theAgent.indexOf("iphone")==-1){
		if(ourshowsurl.indexOf("pmp4")!=-1){
			var mp4ulr = ourshowsurl.split("pmp4=");
			location.href = mp4ulr[1];
		}else{
			if(ourshowsurl.indexOf("?")!=-1){
				ourshowsurl = ourshowsurl.split("?")[0];
			}
			var sTemp = ourshowsurl.split('make/');
			if(sTemp.length!=2){
				sTemp = ourshowsurl.split('.com/');
			}
			var code = sTemp[1];
		    //window.location.href = 'https://s.hunlihu.com/pc.html?t=0.1&code='+code;
		}
	}else{
		var sTemp = ourshowsurl.split('make/');
		if(sTemp.length!=2){
			sTemp = ourshowsurl.split('.com/');
		}
		try{
		code = sTemp[1].replace('html/','').split("?")[0];
		}catch(e){
			console.log("759:error")
		}
	}
}
var openid = null;
var nickname = null;
var headimgurl = null;
var timestamp = Date.parse(new Date());
var frominvp = "0";
var colorstyle = "";
var stylecolor_back = "#EDEDED";
var hname = "";
var hope_words = "";
var himg = "";
var make = "";
var is_snapshotuser = false;
var badv=false;
if(ourshowsurl){
	var splitS = ourshowsurl.split("?");
	if(splitS.length>1){
		var theSecondStr = splitS[1];
		var secondSplits = theSecondStr.split("&");
		for(var i=0;i<secondSplits.length;i++){
			var str = secondSplits[i];
			if(str.indexOf('openid')!=-1){//openid
				var strs = str.split("=");
				if(strs.length>1){
					openid = strs[1];
				}
			}else if(str.indexOf('nickname')!=-1){//名字
				var strs = str.split("=");
				if(strs.length>1){
					nickname = strs[1].replaceAll("[.]u[.]","\\u").toGB2312();
				}
			}else if(str.indexOf('headimgurl')!=-1){//头像
				var strs = str.split("=");
				if(strs.length>1){
					headimgurl = strs[1];
				}
			}else if(str.indexOf('opt')!=-1){//宾客开启方式
				var strs = str.split("=");
				if(strs.length>1){
					customer_open_type = strs[1];
				}
			}else if(str.indexOf('keren')!=-1){//宾客名字
				var strs = str.split("=");
				if(strs.length>1){
					keren = strs[1].replaceAll("[.]u[.]","\\u").toGB2312();
					keren_unicode = strs[1];
				}
			}else if(str.indexOf('frominvp')!=-1){
				frominvp = 1;
			}else if(str.indexOf('colorstyle')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					colorstyle = strs[1];
				}
			}else if(str.indexOf('stylecolor_back')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					stylecolor_back = strs[1];
				}
			}else if(str.indexOf('name')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					hname = strs[1].replaceAll("[.]u[.]","\\u").toGB2312();
				}
			}else if(str.indexOf('hope_words')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					hope_words = strs[1].replaceAll("[.]u[.]","\\u").toGB2312();
				}
			}else if(str.indexOf('himg')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					himg = strs[1];
				}
			}else if(str.indexOf('make')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					make = strs[1];
				}
			}else if(str.indexOf('pmp4')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					pmp4 = strs[1];
				}
			}else if(str.indexOf('timestamp')!=-1){
				var strs = str.split("=");
				if(strs.length>1){
					timestamp = strs[1];
					$.ajaxSettings.async = false;
					$.post('https://visitor.hunlihu.com/visitor/timestamp',{},function(res){
						var now = res;
						console.log(timestamp,Date.parse(new Date()),res);
						if(now-timestamp>60000){
							$.ajaxSettings.async = true;
							location.replace('https://visit.hunlihu.com/vit'+code);
							return;
						}
					});
					$.ajaxSettings.async = true;
				}
			}else if(str.indexOf('badv')!=-1){
				badv = true;
			}else if(str.indexOf('is_snapshotuser')!=-1){
				is_snapshotuser = true;
			}
		}
	}
}

if(hname!=''&&hope_words!=''&&himg!=''){
	
}

String.prototype.toGB2312 = function(){
	var str = this;
	str = unescape(str.replace(/\\u/gi,'%u'));
	return str;
}
// 处理图片 主页调用
function dealAllImgs(){
	var imgformat = '';
	if(isAndroid){
		imgformat = '/format,webp';
	}
	
	if(open_page_backimg!=''){
		open_page_backimg = OSS_SHARE_URL + open_page_backimg;
	}
	$("[pa_o_url]").each(function(){
		var $this = $(this);
		var pa_o_url = $this.attr("pa_o_url");
		var url = OSS_IMG_URL_HEAD + pa_o_url;
		if(use_fast_way==0){
			url = $this.attr("pa_t_url");
		}else if(use_fast_way==1){
			url = LOCAL_IMG_URL_HEAD + pa_o_url;
		}
		$this.css("background-image","url("+url+")");
	});
	$("[am_style]").each(function(){
		var $this = $(this);
		var img_url = $this.attr("img_url");
		var url = OSS_IMG_URL_HEAD + img_url;
		if(use_fast_way==0){
			url = $this.attr("st_img_t_url");
		}else if(use_fast_way==1){
			url = LOCAL_IMG_URL_HEAD + img_url;
		}
		$this.attr("img_url",url);
	});
	$("[split_img]").each(function(){
		var $this = $(this);
		var img_url = $this.attr("img_url");
		var st_video_mp4_url = $this.attr("st_video_mp4_url");
		var url = OSS_IMG_URL_HEAD + img_url;
		var url_mask = (st_video_mp4_url&&st_video_mp4_url!='')?("https://s.hunlihu.com/mask/"+st_video_mp4_url):'';
		$this.attr("img_url",url);
		$this.attr("st_video_mp4_url",url_mask);
		$this.find(".hideimga").attr("src",url);
		var id = $this.attr("smaterial_id");
		var img_css = "#c_imgs_"+id+"{";
		if(st_video_mp4_url&&st_video_mp4_url!=''){
			var prexsss = "";
			img_css = img_css + "-webkit-mask-size:100% 100%;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;-webkit-mask-image:url('"+prexsss+url_mask+"');";
		}
		img_css = img_css + "}\n";
		if(img_css.indexOf("image:url")!=-1){
			img_boss.append(img_css);
		}
	});
	$("[st_img_mask_url]").each(function(){
		var $this = $(this);
		var st_img_mask_url = $this.attr("st_img_mask_url");
		var mask_url = "https://s.hunlihu.com/mask/" + st_img_mask_url;
		if(mask_url.indexOf('x-oss-process')==-1){
			if(imgformat==''){
				
			}else{
				mask_url = mask_url+"?x-oss-process=image"+imgformat;
			}
		}else{
			mask_url = mask_url+imgformat;
		}
		var id = $this.attr("id");
		var prexsss = (make=='1')?"/nshow/us?url=http:":"";
		var img_css = "#"+id+"{-webkit-mask-size:100% 100%;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;-webkit-mask-image:url('"+prexsss+mask_url+"');}\n";
		img_boss.append(img_css);
		$("body").append("<img src='"+mask_url+"' style='display:none;'/>");
	});
	$("[lazy_url]").each(function(){
		var useStImg = true;
		var $this = $(this);
		var st_img_o_url = $this.attr("st_img_o_url");
		var url;
		if(st_img_o_url.indexOf('x-oss-process')==-1){
			if(imgformat==''){
				url = OSS_IMG_URL_HEAD + st_img_o_url
			}else{
				url = OSS_IMG_URL_HEAD + st_img_o_url+"?x-oss-process=image"+imgformat;
			}
		}else{
			url = OSS_IMG_URL_HEAD + st_img_o_url+imgformat;
		}
		if(url.indexOf('image/crop')>-1){
			useStImg = false;
		}
		$this.attr('onerrorurl',url);
		var st_img_t_url = $this.attr("st_img_t_url");
		var can_edit = $this.attr("can_edit");
		if(can_edit==0&&st_img_t_url&&useStImg){
			url = st_img_t_url;
		}
		var st_video_mp4_url = $this.attr("st_video_mp4_url");
		var url_mask = (st_video_mp4_url&&st_video_mp4_url!='')?("https://s.hunlihu.com/mask/"+st_video_mp4_url):'';
		$this.attr("lazy_url",url);
		$this.attr("st_video_mp4_url",url_mask);
		var thep10 = $this.attr("thep10");
		if(thep10=='1'){
			dealLazyImg($this)
		}
		$this.removeAttr("can_edit");
		$this.removeAttr("st_img_t_url");
	});
	$("[isplayimg]").each(function(){
		var dom = $(this);
		var st_imgs_auto = dom.attr("st_imgs_auto");
		var isautoplay = false;
		if(st_imgs_auto.split("autoplay")!=-1){
			isautoplay = true;
		}
		dom.find(".sildeimg").each(function(){
			var theim = $(this);
			var url = OSS_IMG_URL_HEAD + theim.attr("im_o_url");
			if(use_fast_way==0){
				url = theim.attr("im_t_url");
			}else if(use_fast_way==1){
				url = LOCAL_IMG_URL_HEAD + theim.attr("im_o_url");
			}
			if(isautoplay){
				theim.attr("laz_y_imgs_url",url);
			}else{
				theim.attr("src",url);
			}
		});
	});
}
function initSplitImg(page){
	var doms = page.jdom;
	var page_direction = page.page_direction;
	$(doms).find("[split_img='1']").each(function(){
		var ds = $(this);
		var img_url = ds.attr("img_url");
		var st_img_am_delay = ds.attr("split_style").split("_");
		var st_img_am_border_color_size = ds.attr("st_img_am_border_color_size");
		var hang = parseInt(st_img_am_delay[0]);
		var lie = parseInt(st_img_am_delay[1]);
		var width = Math.floor(ds.width())-1;
		var height = ds.height();
		var addwidthheight = 0;
		if(st_img_am_border_color_size>0){
			addwidthheight = 2;
		}
		var awidth = parseInt(width/lie);
		var yuw = width%lie;
		var allWidth = new Array();
		for(var i = 0;i<lie;i++){
			if(i<yuw){
				allWidth.push(awidth+1-addwidthheight);
			}else{
				allWidth.push(awidth-addwidthheight);
			}
		}
		var aheight = parseInt(height/hang);
		var yuh = height%hang;
		var allHeight = new Array();
		for(var i = 0;i<hang;i++){
			if(i<yuh){
				allHeight.push(aheight+1-addwidthheight);
			}else{
				allHeight.push(aheight-addwidthheight);
			}
		}
		var widthAndHeight = new Array();
		for(var i = 0;i<hang;i++){
			for(var j = 0;j<lie;j++){
				widthAndHeight.push({"width":allWidth[j],"height":allHeight[i],top:i*allHeight[i],left:j*allWidth[j]});
			}	
		}
		var index = 0;
		ds.find(".imgsplit").each(function(){
			var theDom = $(this);
			if(addwidthheight==2){
				theDom.css('margin','1px');
			}
			theDom.width(widthAndHeight[index].width);
			theDom.height(widthAndHeight[index].height);
			theDom.css("background-size","auto "+height+"px");
			theDom.css("background-image","url("+img_url+")");
			theDom.css("background-position","-"+widthAndHeight[index].left+"px -"+widthAndHeight[index].top+"px");
			var css_z_index = theDom.attr("css_z_index");
			var css_opacity = theDom.attr("css_opacity");
			var css_border_radius = theDom.attr("css_border_radius");
			theDom.css("z-index",css_z_index);
			theDom.css("opacity",css_opacity);
			theDom.css("border-radius",css_border_radius+"px");
			var css_box_shadow_h = theDom.attr("css_box_shadow_h");
			var css_box_shadow_v = theDom.attr("css_box_shadow_v");
			var css_box_shadow_blur = theDom.attr("css_box_shadow_blur");
			var css_box_shadow_spread = theDom.attr("css_box_shadow_spread");
			var css_box_shadow_color = theDom.attr("css_box_shadow_color");
			var css_box_shadow_inset = theDom.attr("css_box_shadow_inset");
			var val = css_box_shadow_h+"px "+css_box_shadow_v+"px "+css_box_shadow_blur+"px "+css_box_shadow_spread+"px "+css_box_shadow_color+" "+css_box_shadow_inset;
			theDom.css("box-shadow",val);
			aSplitImgAnFac(theDom,page_direction);
			index++;
		});
	});
}

function aSplitImgAnFac(sma,page_direction){
	var an_boss = $("#an_boss");
	var an_use = sma.attr("an_use");
	var smaterial_img_id = sma.attr("smaterial_img_id");
	var biliW = widthBili;
	var biliH = heightBili;
	if(page_direction=='5'){
		biliW = heightBili;
		biliH = widthBili;
	}
	var sm_type = sma.attr("sm_type");
	if(an_use==1){
		var an_text = sma.attr("an_text");
		var an_duration = sma.attr("an_duration");
		var an_timing_function = sma.attr("an_timing_function");
		var an_delay = sma.attr("an_delay");
		var an_iteration_count = sma.attr("an_iteration_count");
		var animationDetail = an_duration+"s "+an_timing_function+" "+an_delay+"s "+an_iteration_count+" both;";
		var an = dealAn(an_text,biliW,'translateX');
		an = dealAn(an,biliH,'translateY');
		an_boss.append(
				"@-webkit-keyframes ansp_"+smaterial_img_id+"{"+an+"}\n"+
				".pageac .dm .split_"+smaterial_img_id+"{-webkit-animation:ansp_"+smaterial_img_id+" "+animationDetail+"}\n"
				);
		sma.attr("class","split_"+smaterial_img_id+" imgsplit");
		var an_use_1 = sma.attr("an_use_1");
		if(an_use_1==1){
			var an_text_1 = sma.attr("an_text_1");
			var an_duration_1 = sma.attr("an_duration_1");
			var an_timing_function_1 = sma.attr("an_timing_function_1");
			var an_delay_1 = sma.attr("an_delay_1");
			var an_iteration_count_1 = sma.attr("an_iteration_count_1");
			var animationDetail_1 = an_duration_1+"s "+an_timing_function_1+" "+an_delay_1+"s "+an_iteration_count_1+" both;";
			var an_1 = dealAn(an_text_1,biliW,'translateX');
			an_1 = dealAn(an_1,biliH,'translateY');
			an_boss.append(
					"@-webkit-keyframes ansp_"+smaterial_img_id+"_1"+"{"+an_1+"}\n"+
					".pageac .dm .split_"+smaterial_img_id+"_1{-webkit-animation:ansp_"+smaterial_img_id+"_1 "+animationDetail_1+"}\n"
					);
			var theDom = sma;
			sma[0].addEventListener("webkitAnimationEnd",function(){
				var theDom = sma;
				var smaterial_img_id = theDom.attr("smaterial_img_id");
				theDom.attr("class","split_"+smaterial_img_id+"_1 imgsplit");
			});
		}
	}
}
function gomakeminp(url){
	if(woyaozhizuo_url==null){
		location.replace(url);
	}else{
		location.replace(woyaozhizuo_url);
	}
}
/**theCountDown Begin**/
function showCountDown(year,month,day,hour,minite){ 
	var now = new Date(); 
	var endDate = new Date(year,month-1,day,hour,minite); 
	var leftTime=endDate.getTime()-now.getTime(); 
	if(leftTime<0){
		return{dayleft:0,hourleft:0,miniteleft:0,secondleft:0};
	}
	var leftsecond = parseInt(leftTime/1000); 
	var dayleft=Math.floor(leftsecond/(60*60*24)); 
	var hourleft=Math.floor((leftsecond-dayleft*24*60*60)/3600); 
	var miniteleft=Math.floor((leftsecond-dayleft*24*60*60-hourleft*3600)/60); 
	var secondleft=Math.floor(leftsecond-dayleft*24*60*60-hourleft*3600-miniteleft*60); 
	return {dayleft:dayleft,hourleft:hourleft,miniteleft:miniteleft,secondleft:secondleft}
}
function autoCountDown(year,month,day,hour,minite,callback){
	window.setInterval(function(){callback(showCountDown(year,month,day,hour,minite));},1000);
}
function countDown(time,callback){
	if(time&&time!=''){
		var timePro1 = time.split(" ");
		if(timePro1.length==2){
			var timePro2 = timePro1[0].split("-");
			var timePro3 = timePro1[1].split(":");
			try {
				autoCountDown(timePro2[0],timePro2[1],timePro2[2],timePro3[0],timePro3[1],callback);
			} catch (e) {
				console.log('error time!')
			}
		}
	}
}
function timeCountDownBegin(){
	var t_CDa = $('.t_CDa');
	var t_CHo = $('.t_CHo');
	var t_CMi = $('.t_CMi');
	var t_CSe = $('.t_CSe');
	countDown(count_down_begin_time,function(data){
		t_CDa.html(data.dayleft);
		if(data.hourleft<10)data.hourleft = "0"+data.hourleft;
		t_CHo.html(data.hourleft);
		if(data.miniteleft<10)data.miniteleft = "0"+data.miniteleft;
		t_CMi.html(data.miniteleft);
		if(data.secondleft<10)data.secondleft = "0"+data.secondleft;
		t_CSe.html(data.secondleft);
	});
}
/**theCountDown Over**/
/*******************************dealurl************************************/
/*******************************door************************************/
var urlPrex = "//h5.hunlihu.com/vashow/ly/door/door/";
var urlDomain = "//h5.hunlihu.com/";
function choosetheface(img,sm_id){
	var imgs = "<img class='viewface' src='"+$(img).attr('src')+"'>";
	if(sm_id){
		sm_id = "_"+sm_id;
	}else{
		sm_id = "";
	}
	var concon = $("#inputhopedetail"+sm_id);
	if(concon.find(".viewface").length>2){
		mtips("只能选择3个表情哦!");
	}else{
		$("#inputhopedetail"+sm_id).append(imgs);
	}
}

function recordUserInfo(){
	$.post(urlPrex+"footmark?"+randomNumber,{auth:auth,openid:openid,nickname:nickname,headimgurl:headimgurl});
}

/*******************************door************************************/
/*******************************wished************************************/
var playi = 0;
function playbtnw(color){
	if(color.length==7&&color.indexOf('#')==0){
		color = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',0.5)';
	}
	var t = 0;
	var inter = setInterval(function(){
		$("#wishdanmu").append("<div class='wishdanmu_one' srcc='"+sData[playi]+"' style='font-size:11px;color:white;position:absolute;top:105;left:0;background:"+color+
				";height:28px;line-height:14px;margin:3px 0px;border-radius:20px;padding:0px 15px;display: flex;align-items: center;justify-content: center;'>"+
				"<span style='overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;'>"+
				sData[playi]+"</span></div>");
		$(".wishdanmu_one").bind('touchstart',movePrevent);
		$("#wishdanmu").find("div").animate({top:'-=35'});
		var divlen = $("#wishdanmu").find("div").length;
		if(divlen>3){
			$("#wishdanmu").find("div").eq(0).remove();
		}
		playi++;
		if(playi==sData.length){
			playi = 0;
		}
	},3000);
}
// 查看详情
function viewOneWishDetail(dom){
	var nameAndMsg = $(dom).attr("srcc");
	//var arr = nameAndMsg.split("：");
	var ind = nameAndMsg.indexOf("：");
	var name = nameAndMsg.substring(0,ind);
	var wish = nameAndMsg.substring(parseInt(ind)+1);
	var html = "<div id='wishdetaildiy'><div style='position:absolute;top:0;left:0;background:rgba(0,0,0,0.7);width:100%;height:100%;z-index:1414521'></div>"+
	"<div style='border-radius: 10px;width:80%;position: fixed;top: 50%;left: 10%;max-height: 100%;overflow-y: auto;background-color: #fff;-webkit-transform: translateY(-40%);transform: translateY(-40%);z-index: 1414522;' >"+
	"<img src='https://qnm.hunliji.com/o_1blaqnfq612e8arl1lb3g53n2u7.png' style='position: absolute;right: 0;top: 0;width: 30px;z-index: 100;' ontouchstart='closewishdetail()'>"+
	" <div style='width: calc(100% - 64px);background: #fff;font-size: 16px;padding: 25px 32px;overflow: auto;'><p style='font-weight:700;font-size: 18px;margin:10px 0px;'>"+name+"：</p> <p style='margin-bottom:10px;'>"+wish+"</p></div></div></div>";
	$('body').prepend(html);
}
//关闭详情
function closewishdetail(){
	$("#wishdetaildiy").remove();

}

var myListHide = SList();
var face_img_index = 1;
var WishSprite = function(dom,theDatas){
	this.css_color = dom.attr("css_color");
	this.font_color = dom.attr("font_color");
	this.theCon = dom;
	this.dataList = myListHide;
	if(theDatas){
		var index = 1;
		for(var i = 0;i<theDatas.length;i++){
	    	myListHide.put("<div class='hopeinfo'>face_img_fac"+face_img_index+".jpg_face_img"+theDatas[i]+"</div>");
	    	face_img_index++;
	    	if(face_img_index==15)face_img_index = 1;
		}
	}
	this.interId = null;
}
WishSprite.prototype = {
	play:function(){
		var hopescon = this.theCon;
		var css_color = this.css_color;
		var font_color = this.font_color;
		var list = this.dataList;
		var theDifOne = list.getDif();
		var theLastHeight = 16;
		var theRightDelay = 0;
		if(theDifOne){
			var dom1 = $(theDifOne).appendTo(hopescon);
			var imgs = dom1.find("img");
			var texts = dom1.text();
			if(texts.length>75){
				dom1.css("font-size","10px");
			}
			texts = texts.replaceAll("face_img_","<img class='myf_imgs' src='//s.hunlihu.com/static/").replaceAll("_face_img","'/>");
			dom1.html(texts);
			imgs.appendTo(dom1);
			var width = dom1.width();
			if(width>270){
				dom1.width(270);
			}
			if(css_color){
				dom1.css("background-color",css_color);
			}
			if(font_color){
				dom1.css("color",font_color);
				dom1.find('td').css("color",font_color);
			}
			dom1[0].addEventListener("webkitAnimationEnd", function(){
				dom1.remove();
			},false);
			theLastHeight = dom1.height();
		}
		var intervalId = setInterval(function(){
			var theDifOne = list.getDif();
			if(theDifOne){
				var delay = parseFloat((Math.abs(theLastHeight-16)/36).toFixed(2));
				theRightDelay = theRightDelay + delay;
				var dealTheDifOne = theDifOne.replace("'hopeinfo'","'hopeinfo' style='background-color:"+css_color+";-webkit-animation-delay:"+theRightDelay+"s;'");
				
				var dom = $(dealTheDifOne).appendTo(hopescon);
				var imgs = dom.find("img");
				var texts = dom.text();
				if(texts.length>75){
					dom.css("font-size","10px");
				}
				texts = texts.replaceAll("face_img_","<img class='myf_imgs' src='//s.hunlihu.com/static/").replaceAll("_face_img","'/>");
				dom.html(texts);
				imgs.appendTo(dom);
				
				var width = dom.width();
				if(width>270){
					dom.width(270);
				}
				if(css_color){
					dom.css("background-color",css_color);
				}
				if(font_color){
					dom.css("color",font_color);
					dom.find('td').css("color",font_color);
				}
				dom[0].addEventListener("webkitAnimationEnd", function(){
					dom.remove();
				},false);
				theLastHeight = dom.height();
			}
		},1500);
		this.interId = intervalId;
	},
	stop:function(){
		var interId = this.interId;
		clearInterval(interId);
		this.theCon.html('');
	}
};
function SList(){
    var array = new Array();
    var theSize = 0;
	var theIndex = 0;
    array.put = function(value){
    	array.push(value);
    	theSize++;
    }
    array.rightPut = function(value){
    	array.splice(theIndex,0,value);
    	theSize++;
    }
    array.getDif = function(){
    	if(theSize>0){
	    	var res = array[theIndex];
	        if(theIndex<(theSize-1)){
	        	theIndex++;
	        }else{
	        	theIndex = 0;
	        }
	    	return res;
    	}else{
    		return null;
    	}
    }
    return array;
}
/*******************************wishes************************************/
