const CACHE_NAME =
"ivseznayfews-v1";

const urlsToCache = [

"/",
"/index.html",
"/about.html",
"/projects.html",
"/contact.html",

"/css/style.css",

"/js/main.js",
"/js/github.js",
"/js/music.js",
"/js/particles.js"

];

self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(
urlsToCache
);

})

);

}
);

self.addEventListener(
"fetch",
event=>{

event.respondWith(

caches.match(
event.request
)

.then(response=>{

return response ||
fetch(
event.request
);

})

);

}
);