
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
this.addEventListener('fetch',event => {
    
    // event.waitUntil(
    //     this.registration.showNotification("hello",{
    //         body : "hello from notification"
    //     })
    // )

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