// Service Worker de Firebase Cloud Messaging
// Necesario para recibir notificaciones cuando la web esta cerrada o en segundo plano.
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAfRHsZtUFClLt5FXKm4ydjsRQVjRM4M2I",
  authDomain: "abraveses-de-tera.firebaseapp.com",
  databaseURL: "https://abraveses-de-tera-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "abraveses-de-tera",
  storageBucket: "abraveses-de-tera.firebasestorage.app",
  messagingSenderId: "1010226528549",
  appId: "1:1010226528549:web:0c74e3c440350f54671acc"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = payload.notification?.title || "Programa de fiestas";
  const opciones = {
    body: payload.notification?.body || "",
    icon: "images/abraveses.jpg",
    badge: "images/abraveses.jpg"
  };
  self.registration.showNotification(titulo, opciones);
});
