import { activarNotificaciones, desactivarNotificaciones, notificacionesActivas, permisoBloqueado } from "./notificaciones.js";

function renderNotifButton(button) {
  if (!button) return;

  if (permisoBloqueado()) {
    button.innerHTML = `<span aria-hidden="true">🔕</span>Notificaciones bloqueadas`;
    button.classList.remove("is-active");
    button.disabled = true;
    button.title = "Has bloqueado los avisos para este sitio. Actívalos desde los ajustes de tu navegador.";
    return;
  }

  button.disabled = false;
  button.title = "";
  const active = notificacionesActivas();
  button.classList.toggle("is-active", active);
  button.innerHTML = active
    ? `<span aria-hidden="true">✅</span>Avisos activados (pulsa para desactivar)`
    : `<span aria-hidden="true">🔔</span>Activar avisos`;
}

function initNotificationsButton() {
  const button = document.querySelector("#btn-notificaciones");
  if (!button) return;

  renderNotifButton(button);

  button.addEventListener("click", async () => {
    if (button.disabled) return;
    button.disabled = true;

    if (notificacionesActivas()) {
      await desactivarNotificaciones();
    } else {
      await activarNotificaciones();
    }

    renderNotifButton(button);
    button.disabled = false;
  });
}

document.addEventListener("DOMContentLoaded", initNotificationsButton);
