import notifyMe from '../notify'

export default async function RegisterSW() {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    const applicationServerPublicKey = 'BK25xCSUKxrD6o5_TBzb5cvbjLg_fwSUxwPU9vJ5nAWemytaXrqHzbv-QUXjNakuG39W-sH8cxubsyUYbiMQ_5o';
    const swrReg = await navigator.serviceWorker.register(swUrl)
    // .then(response =>{

    //   // if(Notification.permission === 'granted')
    //   //   getSubscription(response);
    //   // else
    //   //   askToNotificationPermisison();
    // }).catch(function(error) {
    //     // Failed registration, service worker wonâ€™t be installed
    //     console.log(
    //       "Whoops. Service worker registration failed, error:",
    //       error
    //     );
    //   });


    await navigator.serviceWorker.ready

    swrReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
        }).then(function (pushSubscription) {
            fetch('http://localhost:5091/api/PushNotification/subscriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pushSubscription)
            }).then(function (response) {
                if (response.ok) {
                    console.log('Successfully subscribed for Push Notifications');
                } else {
                    console.log('Failed to store the Push Notifications subscription on server');
                }
            }).catch(function (error) {
                console.log('Failed to store the Push Notifications subscription on server: ' + error);
            });
          })


}

// function getSubscription(reg) {
//   reg.pushManager.getSubscription().then(function (sub) {
//       if (sub === null) {
//           reg.pushManager.subscribe({
//               userVisibleOnly: true,
//               applicationServerKey: "BI7W2Tbf3lU9N50PxccWwStDoFlRPBA3f6ic_fM0g_jzyA-eNNccq2IFzha5XK4WWw9IEJmVLMwPLdiCVQHJC5c"
//           }).then(function (sub) {
//               //fillSubscribeFields(sub);
//           }).catch(function (e) {
//               console.error("Unable to subscribe to push", e);
//           });
//       } else {
//           //fillSubscribeFields(sub);
//       }
//   });
// }


function  askToNotificationPermisison() {
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
    //notifyMe();
  });
  
}
// function notifyMe() {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     console.log("This browser does not support desktop notification");
//   }

//   // Let's check whether notification permissions have alredy been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     new Notification("Hi there!");
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== 'denied' || Notification.permission === "default") {
//     Notification.requestPermission(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         new Notification("Hi there!");
//       }
//     });
//   }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
//}