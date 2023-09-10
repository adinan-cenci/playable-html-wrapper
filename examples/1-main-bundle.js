(()=>{"use strict";class e extends HTMLElement{constructor(){super(),this.state={isPaused:!1,isPlaying:!1,isReproducing:!1,isBuffering:!1,isWaiting:!1,isEnded:!1,volume:100}}appendTo(e){return e.append(this),new Promise((async(e,t)=>{e()}))}get isPaused(){return this.state.isPaused}get isPlaying(){return this.state.isPlaying}get isBuffering(){return this.state.isBuffering}get isReproducing(){return this.state.isReproducing}get isWaiting(){return this.state.isWaiting}get isEnded(){return this.state.isEnded}get volume(){return this.state.volume}get currentTime(){}get currentTimeFormatted(){return e.secondsToStringRepresentation(this.currentTime)}get currentTimePercentage(){var e,t;return e=Math.round(this.currentTime),t=Math.round(this.duration),isNaN(e)||isNaN(t)||0==e||0==t?0:e/t*100}get remainingTime(){return this.duration-this.currentTime}get remainingTimeFormatted(){return e.secondsToStringRepresentation(this.remainingTime)}get remainingTimePercentage(){return 100-this.currentTimePercentage}get duration(){}get durationFormatted(){return e.secondsToStringRepresentation(this.duration)}getTime(e){return Math.round(this.duration/100*e)}getTimeFormatted(t){return e.secondsToStringRepresentation(this.getTime(t))}getPercentage(t){return("string"==typeof t&&t.indexOf(":")>=0?e.stringRepresentationToSeconds(t):parseFloat(t))/this.duration*100}seek(e){}play(e=null){}pause(){}toggle(){this.isPlaying?this.pause():this.play()}sanitizeGetSeconds(t){var i;return i="string"==typeof t&&t.indexOf(":")>=0?e.stringRepresentationToSeconds(t):"string"==typeof t&&t.indexOf("%")>=0?this.getTime(parseInt(t)):"string"==typeof t?parseInt(t):t,isNaN(i)&&(i=0),i}fireEvent(e,t,i=!0){return this.dispatchEvent(new CustomEvent(e,{bubbles:i,detail:t}))}log(e){console.log(e)}static secondsToStringRepresentation(e){return isNaN(e)?"00:00":(e=Math.round(e),a=(s=(s=(i=Math.floor(e/60))-60*(t=Math.floor(i/60)))<10?"0"+s:s)+":"+(r=(r=e-60*i)<10?"0"+r:r),a=(n=t)>0?n+":"+a:a);var t,i,n,s,r,a}static stringRepresentationToSeconds(e){var t,i,n;return!((t=e.match(/[0-9]+/g)).length>3)&&(n=parseInt(t[t.length-1]),i=parseInt(t[t.length-2]||0),3600*parseInt(t[t.length-3]||0)+60*i+n)}}const t=e;function i(e){var t=document.createElement("p");t.innerHTML=e,window.logWindow.append(t)}customElements.define("audio-player",class extends t{constructor(){super(),this.settings={src:null}}connectedCallback(){this.mediaP=this.createMedia(),this.mediaP.src=this.settings.src,this.append(this.mediaP),this.mediaP.addEventListener("play",(e=>{this.state.isPaused=!1,this.state.isPlaying=!0,this.state.isWaiting=!1,this.fireEvent("player:play")})),this.mediaP.addEventListener("pause",(e=>{this.state.isPlaying=!1,this.state.isPaused=!0,this.state.isReproducing=!1,this.fireEvent("player:pause")})),this.mediaP.addEventListener("timeupdate",(e=>{this.state.isReproducing=!0,this.fireEvent("player:timeupdate")})),this.mediaP.addEventListener("ended",(e=>{this.state.isPlaying=!1,this.state.isPaused=!0,this.state.isReproducing=!1,this.state.isWaiting=!1,this.fireEvent("player:ended")})),this.mediaP.addEventListener("error",(e=>{this.fireEvent("player:error",{errorCode:0,errorMessage:"Resource could not be loaded"})})),this.mediaP.addEventListener("loadstart",(e=>{this.state.isBuffering=!0})),this.mediaP.addEventListener("progress",(e=>{this.state.isBuffering=!0})),this.mediaP.addEventListener("waiting",(e=>{this.state.isReproducing=!1,this.state.isBuffering=!0,this.state.isWaiting=!0,this.fireEvent("player:waiting")})),this.mediaP.addEventListener("playing",(e=>{this.state.isWaiting=!1,this.fireEvent("player:playing")})),this.mediaP.addEventListener("canplaythrough",(e=>{this.state.isBuffering=!1,this.state.isWaiting=!1})),this.mediaP.addEventListener("canplay",(e=>{this.state.isBuffering=!1,this.state.isWaiting=!1})),this.mediaP.addEventListener("suspend",(e=>{this.state.isBuffering=!1})),this.mediaP.addEventListener("abort",(e=>{this.state.isBuffering=!1})),this.mediaP.addEventListener("stalled",(e=>{this.state.isBuffering=!1}))}set src(e){this.settings.src=e}createMedia(){return new Audio}get currentTime(){return this.mediaP.currentTime}get duration(){return this.mediaP.duration}play(e=this.currentTime){return this.seek(e),this.mediaP.play()}pause(){this.mediaP.pause()}seek(e){var t=this.sanitizeGetSeconds(e);this.mediaP.currentTime=t}setVolume(e){this.state.volume=e,e>1&&(e/=100),this.mediaP.volume=e}newSource(e){this.pause(),this.source=e,this.mediaP.src=e,this.mediaP.load(),this.state.waiting=!0}}),document.addEventListener("DOMContentLoaded",(function(){window.mediaPlayer=document.getElementById("media-player"),window.currentTime=document.getElementById("current-time"),window.remainingTime=document.getElementById("remaining-time"),window.progressBar=document.getElementById("progress-bar"),window.logWindow=document.querySelector("#log div"),window.wrapper=document.getElementById("audio-wrapper"),window.volume=15,document.getElementById("toggle-play-pause").addEventListener("click",(function(){window.player.toggle()})),document.querySelectorAll("#media-list a").forEach((function(e){e.addEventListener("click",(function(t){var n,s;t.preventDefault(),window.player&&(window.player.pause(),window.player.remove()),window.player=(n=this.attributes.href.value,(s=document.createElement("audio-player")).src=n,s.addEventListener("player:play",(function(){i("Play")})),s.addEventListener("player:pause",(function(){i("Pause")})),s.addEventListener("player:ended",(function(){i("Ended")})),s.addEventListener("player:timeupdate",(function(){window.currentTime.innerHTML=this.currentTimeFormatted,window.remainingTime.innerHTML=this.remainingTimeFormatted,window.progressBar.value=this.currentTimePercentage})),s.addEventListener("player:waiting",(function(){window.mediaPlayer.classList.add("waiting"),i("Waiting")})),s.addEventListener("player:playing",(function(){window.mediaPlayer.classList.remove("waiting"),i("Playing")})),s.addEventListener("player:error",(function(e){i(e.detail.errorMessage)})),s),window.player.appendTo(window.wrapper).then((()=>{window.player.setVolume(window.volume),window.player.play()})),document.getElementById("title").innerHTML=e.querySelector(":scope .title").innerHTML,document.getElementById("artist").innerHTML=e.querySelector(":scope .artist").innerHTML}))})),document.getElementById("progress-bar").addEventListener("click",(function(e){var t,i,n;t=e.clientX-this.offsetLeft,i=this.offsetWidth,n=Math.ceil(t/i*100)+"%",window.player.seek(n)})),document.getElementById("volume-slider").value=window.volume,document.getElementById("volume-slider").addEventListener("change",(function(){window.volume=parseInt(this.value),window.player.setVolume(window.volume)}))}))})();