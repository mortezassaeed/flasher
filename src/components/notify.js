// export default function notifyMe(message) {
//     // Let's check if the browser supports notifications
//     if (!("Notification" in window)) {
//       console.log("This browser does not support desktop notification");
//     }
  
//     // Let's check whether notification permissions have alredy been granted
//     else if (Notification.permission === "granted") {
//       // If it's okay let's create a notification
//       new Notification(
//           message,
//           );
//     }
  
//     // Otherwise, we need to ask the user for permission
//     else if (Notification.permission !== 'denied' || Notification.permission === "default") {
//       Notification.requestPermission(function (permission) {
//         // If the user accepts, let's create a notification
//         if (permission === "granted") {
//           new Notification("Hi there!");
//         }
//       });
//     }
// }


export default function notifyMe(message) {
  navigator.serviceWorker.getRegistration().then(registration => {
    setTimeout(() => {
        registration.showNotification('Title', {
            body: message,
            badge: '/images/icon-light.png',
            icon: '/images/icon-light.png',
            renotify: false,
            requireInteraction: true,
            silent: false,
            vibrate: [200, 100, 200],
            dir: 'ltr',
            lang: 'en-US'
        });
    }, 3000);
  });
}