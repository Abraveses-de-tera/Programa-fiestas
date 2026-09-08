import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging.js";
import { getDatabase, ref, set, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
const NOTIF_ACTIVE_KEY = "abraveses_notificaciones_activas";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

function ensureAuth() {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe();
        resolve(user);
      }
    });
    signInAnonymously(auth).catch(reject);
  });
}

async function guardarTokenEnBaseDeDatos(token) {
  const user = await ensureAuth();
  await set(ref(db, `tokens_notificaciones/${user.uid}`), token);
}

async function eliminarTokenDeBaseDeDatos() {
  const user = await ensureAuth();
  await remove(ref(db, `tokens_notificaciones/${user.uid}`));
}

export function notificacionesActivas() {
  return (
    typeof Notification !== "undefined" &&
    Notification.permission === "granted" &&
    localStorage.getItem(NOTIF_ACTIVE_KEY) === "1"
  );
}

export function permisoBloqueado() {
  return typeof Notification !== "undefined" && Notification.permission === "denied";
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
      localStorage.setItem(NOTIF_ACTIVE_KEY, "1");

      onMessage(messaging, (payload) => {
        const { title, body } = payload.notification || {};
        if (title) {
          registration.showNotification(title, {
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

export async function desactivarNotificaciones() {
  localStorage.setItem(NOTIF_ACTIVE_KEY, "0");
  try {
    await eliminarTokenDeBaseDeDatos();
  } catch (error) {
    console.error("Error desactivando notificaciones:", error);
  }
  return true;
}
