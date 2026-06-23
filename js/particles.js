/* ===================================
   Advanced Particle Engine
=================================== */

const canvas =
document.getElementById(
    "particles"
);

if (canvas) {

const ctx =
canvas.getContext("2d");

let particles = [];

const mouse = {

x:null,
y:null,
radius:160

};


/* =========================
   Resize
========================= */

function resizeCanvas(){

canvas.width =
window.innerWidth *
window.devicePixelRatio;

canvas.height =
window.innerHeight *
window.devicePixelRatio;

canvas.style.width =
window.innerWidth + "px";

canvas.style.height =
window.innerHeight + "px";

ctx.scale(
window.devicePixelRatio,
window.devicePixelRatio
);

}

resizeCanvas();


/* =========================
   Mouse
========================= */

window.addEventListener(
"mousemove",
e=>{

mouse.x =
e.clientX;

mouse.y =
e.clientY;

}
);

window.addEventListener(
"mouseleave",
()=>{

mouse.x = null;
mouse.y = null;

}
);


/* =========================
   Particle Class
========================= */

class Particle{

constructor(){

this.reset();

}

reset(){

this.x =
Math.random() *
window.innerWidth;

this.y =
Math.random() *
window.innerHeight;

this.size =
Math.random()*2+1;

this.vx =
(Math.random()-.5)*0.4;

this.vy =
(Math.random()-.5)*0.4;

}

update(){

this.x += this.vx;
this.y += this.vy;

if(
this.x < 0 ||
this.x > window.innerWidth
){

this.vx *= -1;

}

if(
this.y < 0 ||
this.y > window.innerHeight
){

this.vy *= -1;

}

if(mouse.x){

let dx =
mouse.x - this.x;

let dy =
mouse.y - this.y;

let dist =
Math.sqrt(
dx*dx + dy*dy
);

if(
dist <
mouse.radius
){

this.x -=
dx * 0.002;

this.y -=
dy * 0.002;

}

}

}

draw(){

ctx.beginPath();

ctx.arc(
this.x,
this.y,
this.size,
0,
Math.PI*2
);

ctx.fillStyle =
"rgba(255,255,255,.7)";

ctx.fill();

}

}


/* =========================
   Create Particles
========================= */

function createParticles(){

particles=[];

let amount =
Math.min(
160,
Math.floor(
window.innerWidth / 10
)
);

for(
let i=0;
i<amount;
i++
){

particles.push(
new Particle()
);

}

}

createParticles();


/* =========================
   Draw Lines
========================= */

function connect(){

for(
let a=0;
a<particles.length;
a++
){

for(
let b=a;
b<particles.length;
b++
){

let dx =
particles[a].x -
particles[b].x;

let dy =
particles[a].y -
particles[b].y;

let distance =
dx*dx + dy*dy;

if(
distance <
12000
){

let opacity =
1 -
distance/12000;

ctx.strokeStyle =
`rgba(
255,
255,
255,
${opacity*0.12}
)`;

ctx.lineWidth = 1;

ctx.beginPath();

ctx.moveTo(
particles[a].x,
particles[a].y
);

ctx.lineTo(
particles[b].x,
particles[b].y
);

ctx.stroke();

}

}

}

}


/* =========================
   Animation Loop
========================= */

let frame = 0;

function animate(){

frame++;

ctx.clearRect(
0,
0,
window.innerWidth,
window.innerHeight
);

particles.forEach(
particle=>{

particle.update();

particle.draw();

}
);

connect();

requestAnimationFrame(
animate
);

}

animate();


/* =========================
   Resize Event
========================= */

window.addEventListener(
"resize",
()=>{

resizeCanvas();

createParticles();

}
);

}