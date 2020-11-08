var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BHDRC81QnH3v0aA3-In56i0X388Mqmmb2_tEe3AQsKCAMR8zuKUiET83IOH6C_6BIwV2kkWzHLaCKgCh9EimdBI",
  privateKey: "hgmCTC3IeAXuOmITouUih4wG5VDgNPaFuDx8p_GykK4",
};

webPush.setVapidDetails(
  "mailto:tranggonoadi54@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
var pushSubscription = {
  endpoint:
    " https://fcm.googleapis.com/fcm/send/fOEp6srGOWE:APA91bGAsw2MbiokupbwvGRv0LGaMM06GxiYDUORzL8NBmDm7C9jg_wECDO8yv8kJzsb4mzgABO6ESUAsPCvrvA5raeUaHXLwzZknbB3GjC10UbQwLBr7US7VtTX0iJ6N8TfWC1TMb0b",
  keys: {
    p256dh:
      "BCFYP1kfDVnsKikeIRgq/fnW+CCHRXpf2vl1Pz00sBiAMh9d2QFYSO5j2aeEkekJySXw5BbliBvoR00PLuL4Mr8=",
    auth: "kmnFDkLmdDgH6fwNPHzJ+Q==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi";

var options = {
  gcmAPIKey: "130552806798",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
