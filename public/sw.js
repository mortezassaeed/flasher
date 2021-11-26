
const cacheData = 'flsher-v1';
this.addEventListener('install',event =>{
    event.waitUntil(
        caches.open(cacheData).then(cache =>{
            cache.addAll([
                '/index.html',
                '/static/js/bundle.js',
                '/static/js/main.chunk.js',
                '/static/js/vendors~main.chunk.js',
                '/',
                '/Home',
                '/About',
                '/User'
            ])
        })
    )
})


this.addEventListener('activate', function(event) {
    var cacheAllowlist = ['flsher-v1'];
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheAllowlist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  

this.addEventListener('fetch',event => {
    
    if(!navigator.onLine)
    {
        event.respondWith(
        caches.match(event.request).then(response => {
            if(response)
                return response;
            
            const requestUrl = event.request.clone();
            fetch(requestUrl);

            })
        )
    }
})


self.addEventListener('push', function (event) {
    event.waitUntil(self.registration.showNotification('success', {
        body: event.data.text()
    }));
});