function updateCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;

  const now = new Date();
  const year = (now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() > 30))
    ? now.getFullYear() + 1
    : now.getFullYear();

  const start = new Date(year, 7, 24, 0, 0, 0, 0);
  const end = new Date(year, 7, 30, 23, 59, 59, 999);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((start - today) / msPerDay);

  el.classList.remove("is-today");

  if (today >= start && today <= end) {
    el.textContent = "🎉 ¡Estamos de fiestas!";
    el.classList.add("is-today");
  } else if (diffDays === 1) {
    el.textContent = "¡Falta 1 día para las fiestas!";
  } else if (diffDays > 1) {
    el.textContent = `Faltan ${diffDays} días para las fiestas`;
  } else {
    el.textContent = "";
  }
}

updateCountdown();
setInterval(updateCountdown, 60 * 60 * 1000);
