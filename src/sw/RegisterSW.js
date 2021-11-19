

export default function RegisterSW() {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).then(response =>{
      var serviceWorker;
      if (response.installing) {
          serviceWorker = response.installing;
           console.log('Service worker installing');
      } else if (response.waiting) {
          serviceWorker = response.waiting;
           console.log('Service worker installed & waiting');
      } else if (response.active) {
          serviceWorker = response.active;
           console.log('Service worker active');
      }


      if (serviceWorker) {
        console.log("sw current state", serviceWorker.state);
        if (serviceWorker.state == "activated") {
            //If push subscription wasnt done yet have to do here
            console.log("sw already activated - Do watever needed here");
            response.pushManager.getSubscription().then(function(subscription){
              console.log("push notification installed");
              return response.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey : getvvapidKeyobject()
              })
            })
        }
       
    }
    serviceWorker.addEventListener("statechange", function(e) {
      console.log("sw statechange : ", e.target.state);
      if (e.target.state == "activated") {
          // use pushManger for subscribing here.
          console.log("Just now activated. now we can subscribe for push notification")
          response.pushManager.getSubscription().then(function(subscription){
            console.log("push notification installed");
            return response.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey : getvvapidKeyobject()
            })
          })
      }
  });
    }).catch(function(error) {
        // Failed registration, service worker wonâ€™t be installed
        console.log(
          "Whoops. Service worker registration failed, error:",
          error
        );
      });
}

function getvvapidKeyobject(){
  const key = {
    "subject": "mailto: <mortezassaeed@gamil.com>",
    "publicKey": "BMWJs5dXJB0uPjqJ7_lIFoeAgUHDRN6RtymtvVeg-wEd9mMWslfEGuSTDk9uTMqHx2B8vYj1dZY889XMooMgKyw",
    "privateKey": "n_N790B3NNEzo1Nt4qLdm2cPUuRyWYmtMyKvZRaiujc"
    }
}

function generateKey(){
  const webpush = require('web-push');
  // VAPID keys should be generated only once.
  const vapidKeys = webpush.generateVAPIDKeys();
  console.log(vapidKeys);
  return vapidKeys;

}