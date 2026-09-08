function hasFirebaseMessaging() {
  return typeof firebase !== "undefined" && typeof firebase.messaging === "function";
}

function hasFirebaseApp() {
  return typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0;
}

const NOTIF_SUBSCRIBED_KEY = "abravesesNotificacionesActivas";

function isSubscribedLocally() {
  return localStorage.getItem(NOTIF_SUBSCRIBED_KEY) === "true";
}

function setSubscribedLocally(value) {
  localStorage.setItem(NOTIF_SUBSCRIBED_KEY, value ? "true" : "false");
}

function renderNotifButton(button) {
  if (!button) return;
  const browserPermission = typeof Notification !== "undefined" ? Notification.permission : "unsupported";

  if (browserPermission === "denied") {
    button.innerHTML = `<span aria-hidden="true">🔕</span>Notificaciones bloqueadas`;
    button.classList.remove("is-active");
    button.disabled = true;
    button.title = "Has bloqueado los avisos para este sitio. Actívalos desde los ajustes de tu navegador.";
    return;
  }

  button.disabled = false;
  button.title = "";
  const active = browserPermission === "granted" && isSubscribedLocally();
  button.classList.toggle("is-active", active);
  button.innerHTML = active
    ? `<span aria-hidden="true">✅</span>Avisos activados (pulsa para desactivar)`
    : `<span aria-hidden="true">🔔</span>Activar avisos`;
}

async function ensureNotifAuth() {
  if (!hasFirebaseApp() || typeof firebase.auth !== "function") {
    throw new Error("Firebase Auth no disponible.");
  }
  if (firebase.auth().currentUser) return firebase.auth().currentUser;
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        unsubscribe();
        resolve(user);
      }
    });
    firebase.auth().signInAnonymously().catch(reject);
  });
}

async function enableNotifications(button) {
  if (!("Notification" in window)) {
    alert("Tu navegador no admite notificaciones.");
    return;
  }

  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    setSubscribedLocally(false);
    renderNotifButton(button);
    return;
  }

  setSubscribedLocally(true);

  if (hasFirebaseMessaging()) {
    try {
      const messaging = firebase.messaging();
      const registration = await navigator.serviceWorker.ready;
      const token = await messaging.getToken({ serviceWorkerRegistration: registration });
      if (token && hasFirebaseApp() && firebase.database) {
        const user = await ensureNotifAuth();
        await firebase.database().ref(`notificationTokens/${user.uid}`).set(token);
      }
    } catch (error) {
      console.error("No se pudo obtener el token de notificaciones.", error);
    }
  }

  renderNotifButton(button);
}

async function disableNotifications(button) {
  setSubscribedLocally(false);

  if (hasFirebaseMessaging() && hasFirebaseApp() && firebase.database) {
    try {
      const user = await ensureNotifAuth();
      await firebase.database().ref(`notificationTokens/${user.uid}`).remove();
      const messaging = firebase.messaging();
      const registration = await navigator.serviceWorker.ready;
      const token = await messaging.getToken({ serviceWorkerRegistration: registration }).catch(() => null);
      if (token) {
        await messaging.deleteToken(token).catch(() => {});
      }
    } catch (error) {
      console.error("No se pudo eliminar la suscripción de notificaciones.", error);
    }
  }

  renderNotifButton(button);
}

function initNotificationsButton() {
  const button = document.querySelector("#btn-notificaciones");
  if (!button) return;

  renderNotifButton(button);

  button.addEventListener("click", async () => {
    if (button.disabled) return;
    button.disabled = true;
    const browserPermission = typeof Notification !== "undefined" ? Notification.permission : "unsupported";
    const currentlyActive = browserPermission === "granted" && isSubscribedLocally();

    if (currentlyActive) {
      await disableNotifications(button);
    } else {
      await enableNotifications(button);
    }
    button.disabled = false;
  });
}

document.addEventListener("DOMContentLoaded", initNotificationsButton);
