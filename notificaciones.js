// Notificaciones push con Firebase Cloud Messaging (estilo compat, igual que el resto del proyecto)
const VAPID_KEY = "BJABj-fS-xgydA16NRrHC33MgfhFDs8CckUe3LMKHVBhln0IPujuApeekMmjxPkOvvDqZLLBjATp2ZFqm6n7WAs";

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
  await firebase.database().ref("tokens_notificaciones/" + deviceId).set({
    token,
    actualizado: Date.now(),
    idioma: navigator.language || "es"
  });
}

async function activarNotificaciones() {
  if (!("Notification" in window) || !("serviceWorker" in navigator) || !firebase.messaging.isSupported()) {
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
    const messaging = firebase.messaging();

    const token = await messaging.getToken({
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (token) {
      await guardarTokenEnBaseDeDatos(token);
      localStorage.setItem("abraveses_notificaciones_activas", "1");

      messaging.onMessage((payload) => {
        const { title, body } = payload.notification || {};
        if (title) {
          new Notification(title, { body: body || "", icon: "images/abraveses.jpg" });
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

function notificacionesActivas() {
  return localStorage.getItem("abraveses_notificaciones_activas") === "1";
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-notificaciones");
  if (!btn) return;

  if (notificacionesActivas()) {
    btn.innerHTML = "<span aria-hidden=\"true\">🔔</span> Avisos activados";
  }

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    const ok = await activarNotificaciones();
    btn.innerHTML = ok
      ? "<span aria-hidden=\"true\">🔔</span> Avisos activados"
      : "<span aria-hidden=\"true\">❌</span> No se pudo activar";
    btn.disabled = false;
  });
});
