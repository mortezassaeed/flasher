

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

Notification.requestPermission().then(function(result) {
  if (result === 'denied') {
    console.log('Permission wasn\'t granted. Allow a retry.');
    return;
  }
  if (result === 'default') {
    console.log('The permission request was dismissed.');
    return;
  }
  // Do something with the granted permission.
  notifyMe();
});

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have alredy been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied' || Notification.permission === "default") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}