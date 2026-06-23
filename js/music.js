/* ===================================
   Music Player System
=================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

const audio =
document.getElementById(
"bgMusic"
);

const toggle =
document.querySelector(
".music-toggle"
);

const panel =
document.querySelector(
".music-player"
);

if(
!audio ||
!toggle ||
!panel
) return;


/* =========================
   Load Settings
========================= */

const savedVolume =
localStorage.getItem(
"music-volume"
);

const savedPlaying =
localStorage.getItem(
"music-playing"
);

audio.volume =
savedVolume
? parseFloat(savedVolume)
: 0.5;


/* =========================
   UI Create
========================= */

const controls =
document.createElement("div");

controls.className =
"music-controls";

controls.innerHTML =

`
<button id="playBtn">

▶

</button>

<input
id="volumeSlider"
type="range"
min="0"
max="1"
step="0.01"
value="${audio.volume}"
>

`;

panel.appendChild(
controls
);

const playBtn =
document.getElementById(
"playBtn"
);

const volumeSlider =
document.getElementById(
"volumeSlider"
);


/* =========================
   Toggle Panel
========================= */

toggle.addEventListener(
"click",
() => {

panel.classList.toggle(
"show"
);

}
);


/* =========================
   Play Pause
========================= */

function updateButton(){

playBtn.innerHTML =
audio.paused
? "▶"
: "⏸";

}

playBtn.addEventListener(
"click",
async ()=>{

try{

if(audio.paused){

await audio.play();

localStorage.setItem(
"music-playing",
"true"
);

}else{

audio.pause();

localStorage.setItem(
"music-playing",
"false"
);

}

updateButton();

}catch(err){

console.log(err);

}

});


/* =========================
   Volume
========================= */

volumeSlider.addEventListener(
"input",
()=>{

audio.volume =
volumeSlider.value;

localStorage.setItem(
"music-volume",
audio.volume
);

}
);


/* =========================
   First Interaction Unlock
========================= */

let unlocked = false;

function unlockAudio(){

if(unlocked) return;

unlocked = true;

if(savedPlaying === "true"){

audio.play()
.catch(()=>{});

}

document.removeEventListener(
"click",
unlockAudio
);

}

document.addEventListener(
"click",
unlockAudio
);


/* =========================
   Restore State
========================= */

if(savedPlaying === "true"){

updateButton();

}

audio.addEventListener(
"play",
()=>{

playBtn.innerHTML="⏸";

}
);

audio.addEventListener(
"pause",
()=>{

playBtn.innerHTML="▶";

}
);

}
);