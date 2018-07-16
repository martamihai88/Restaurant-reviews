'use strict';


//list of files to cache
let filesToCatch = [
    '.',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];

//cache version
var cacheName = 'restaurant-v1';


//installing service worker
self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
        console.log('Caching files');
      return cache.addAll(filesToCatch);
    })
  );
});


//activating service worker
self.addEventListener('activate', function(event){
   console.log('SW activating'); 
   event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
              if(thisCacheName !== cacheName) {
                  return caches.delete(thisCacheName);
              } 
            }));
        })    
   );
});


// responding to requests from cache
self.addEventListener('fetch', function(event){
   console.log('SW fetching', event.request.url);
   event.respondWith(
       caches.match(event.request).then(function(response){
           if(response) {
               console.log('Found in cache');
               return response; 
           }
            return fetch(event.request);
    })
   );
});