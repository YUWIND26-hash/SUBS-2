// web-push generate-vapid-keys --json

//PUSH NOTIF FCM

if ("PushManager" in window) {
  navigator.serviceWorker.getRegistration().then(function (registration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BHDRC81QnH3v0aA3-In56i0X388Mqmmb2_tEe3AQsKCAMR8zuKUiET83IOH6C_6BIwV2kkWzHLaCKgCh9EimdBI",
        ),
      })
      .then(function (subscribe) {
        console.log(
          "Berhasil melakukan subscribe dengan endpoint: ",
          subscribe.endpoint,
        );
        console.log(
          "Berhasil melakukan subscribe dengan p256dh key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("p256dh")),
            ),
          ),
        );
        console.log(
          "Berhasil melakukan subscribe dengan auth key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("auth")),
            ),
          ),
        );
      })
      .catch(function (e) {
        console.error("Tidak dapat melakukan subscribe ", e.message);
      });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
