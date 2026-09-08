// Configuración e inicialización de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfRHsZtUFClLt5FXKm4ydjsRQVjRM4M2I",
  authDomain: "abraveses-de-tera.firebaseapp.com",
  databaseURL: "https://abraveses-de-tera-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "abraveses-de-tera",
  storageBucket: "abraveses-de-tera.firebasestorage.app",
  messagingSenderId: "1010226528549",
  appId: "1:1010226528549:web:0c74e3c440350f54671acc",
  measurementId: "G-H6G81SHL0X"
};

const VAPID_KEY = "BJABj-fS-xgydA16NRrHC33MgfhFDs8CckUe3LMKHVBhln0IPujuApeekMmjxPkOvvDqZLLBjATp2ZFqm6n7WAs";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function generarIdDispositivo() {
  let id = localStorage.getItem("abraveses_device_id");
  if (!id) {
    id = "dev-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem("abraveses_device_id", id);
  }
  return id;
}

async function guardarTokenEnBaseDeDatos(token) {
  const deviceId = generarIdDispositivo();
  await set(ref(db, "tokens_notificaciones/" + deviceId), {
    token,
    actualizado: Date.now(),
    idioma: navigator.language || "es"
  });
}

export async function activarNotificaciones() {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    console.warn("Este navegador no soporta notificaciones push.");
    return false;
  }

  try {
    const permiso = await Notification.requestPermission();
    if (permiso !== "granted") {
      console.warn("Permiso de notificaciones no concedido.");
      return false;
    }

    const registration = await navigator.serviceWorker.register("firebase-messaging-sw.js");
    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      await guardarTokenEnBaseDeDatos(token);
      localStorage.setItem("abraveses_notificaciones_activas", "1");

      onMessage(messaging, (payload) => {
        const { title, body } = payload.notification || {};
        if (title) {
          new Notification(title, {
            body: body || "",
            icon: "images/abraveses.jpg"
          });
        }
      });

      return true;
    }
    return false;
  } catch (error) {
    console.error("Error activando notificaciones:", error);
    return false;
  }
}

export function notificacionesActivas() {
  return localStorage.getItem("abraveses_notificaciones_activas") === "1";
}
