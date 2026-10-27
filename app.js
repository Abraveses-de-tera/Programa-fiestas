let days = [];
let EVENT_YEAR = 2027;
const EVENT_MONTH = 7;
const UNKNOWN_END_GRACE_MINUTES = 120;

const categoryLabels = {
  musica: "🎶 Música",
  gastronomia: "🍽️ Gastronomía",
  infantil: "🧸 Infantil",
  tradicion: "🚩 Tradición",
  deporte: "🏁 Deporte",
  juegos: "🎲 Juegos",
  ocio: "🎥 Ocio"
};

const dayTabs = document.querySelector("#dayTabs");
const eventList = document.querySelector("#eventList");
const selectedDay = document.querySelector("#selectedDay");
const todayButton = document.querySelector("#todayButton");
const categoryFilters = document.querySelector("#categoryFilters");
const searchInput = document.querySelector("#searchInput");
const noResults = document.querySelector("#noResults");
const favoritesButton = document.querySelector("#favoritesButton");

let selectedId = "all";
let selectedCategory = "all";
let searchTerm = "";
let showFavoritesOnly = false;

const STORAGE_KEY = "abravesesAsistencias";
const FAVORITES_KEY = "abravesesFavoritos";
let attendCounts = {};
let authReady = false;
let authReadyPromise = null;
let eventStatuses = new Map();

function getConfirmed() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (_) {
    return {};
  }
}

function setConfirmed(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}");
  } catch (_) {
    return {};
  }
}

function setFavorites(map) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(map));
}

function countFavorites() {
  const favorites = getFavorites();
  return Object.values(favorites).filter(Boolean).length;
}

function hasFirebase() {
  return typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0;
}

function ensureAuth() {
  if (!hasFirebase() || typeof firebase.auth !== "function") {
    return Promise.reject(new Error("Firebase Auth no disponible."));
  }
  if (authReady && firebase.auth().currentUser) {
    return Promise.resolve(firebase.auth().currentUser);
  }
  if (authReadyPromise) {
    return authReadyPromise;
  }
  authReadyPromise = new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authReady = true;
        unsubscribe();
        resolve(user);
      }
    });
    firebase.auth().signInAnonymously().catch((error) => {
      unsubscribe();
      authReadyPromise = null;
      console.error("No se pudo iniciar sesión anónima.", error);
      reject(error);
    });
  });
  return authReadyPromise;
}

function renderTabs() {
  const all = `<button class="day-tab is-active" type="button" data-day-id="all"><span>Todos</span><strong>✓</strong></button>`;
  const buttons = days.map((day) => `<button class="day-tab" type="button" data-day-id="${day.id}" data-color="${day.color}"><span>${day.short}</span><strong>${day.id}</strong></button>`).join("");
  dayTabs.innerHTML = all + buttons;
}

function renderCategoryFilters() {
  const all = `<button class="category-chip is-active" type="button" data-category="all">Todas</button>`;
  const chips = Object.entries(categoryLabels).map(([key, label]) => `<button class="category-chip" type="button" data-category="${key}">${label}</button>`).join("");
  categoryFilters.innerHTML = all + chips;
}

function renderFavoritesButton() {
  const count = countFavorites();
  favoritesButton.classList.toggle("is-active", showFavoritesOnly);
  favoritesButton.innerHTML = `
    <span aria-hidden="true">${showFavoritesOnly ? "❤️" : "♡"}</span>
    Mis planes
    ${count > 0 ? `<span class="favorites-count">${count}</span>` : ""}
  `;
}

function visualMarkup(event, color) {
  if (event.photo) {
    return `<img class="event-visual-photo" src="${event.photo}" alt="${event.title}" loading="lazy" />`;
  }
  return `<div class="event-visual" style="--accent: var(--${color})" aria-hidden="true">${event.icon}</div>`;
}

function locationMarkup(event) {
  if (!event.location) return "";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ", Abraveses de Tera, Zamora")}`;
  return `
    <a class="event-location" href="${mapUrl}" target="_blank" rel="noopener noreferrer">
      <span class="event-location-icon" aria-hidden="true">📍</span>
      <span class="event-location-name">${event.location}</span>
      <span class="event-location-badge">Ver en mapa ↗</span>
    </a>
  `;
}

function getGoogleCalendarUrl(event, dayId) {
  const start = eventStartDate(dayId, event.time);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const formatUtc = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const title = encodeURIComponent(`${event.title} · Fiestas Abraveses ${EVENT_YEAR}`);
  const details = encodeURIComponent(`${event.detail || event.description || ""}\n\nPrograma de fiestas de Abraveses de Tera ${EVENT_YEAR}`);
  const location = encodeURIComponent(`${event.location || "Abraveses de Tera"}, Abraveses de Tera, Zamora`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatUtc(start)}/${formatUtc(end)}&details=${details}&location=${location}`;
}

function downloadIcs(event, dayId) {
  const start = eventStartDate(dayId, event.time);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const formatUtc = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const now = new Date();
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//Abraveses de Tera//Fiestas ${EVENT_YEAR}//ES`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.eventId}-${EVENT_YEAR}@abraveses-de-tera`,
    `DTSTAMP:${formatUtc(now)}`,
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${event.title} - Fiestas Abraveses ${EVENT_YEAR}`,
    `DESCRIPTION:${(event.detail || event.description || "").replace(/\r?\n/g, "\\n")}`,
    `LOCATION:${event.location || "Abraveses de Tera"}, Abraveses de Tera, Zamora`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.eventId}-abraveses-${EVENT_YEAR}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function calendarMarkup(event, dayId) {
  const gcalUrl = getGoogleCalendarUrl(event, dayId);
  return `
    <div class="calendar-actions">
      <span class="calendar-actions-label">Añadir a mi calendario</span>
      <div class="calendar-buttons">
        <a class="cal-btn cal-btn--google" href="${gcalUrl}" target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">📅</span> Google Calendar
        </a>
        <button class="cal-btn cal-btn--ical" type="button" data-ics="${event.eventId}" data-day="${dayId}">
          <span aria-hidden="true">🍏</span> Apple / Outlook (.ics)
        </button>
      </div>
    </div>
  `;
}

function attendMarkup(event) {
  const confirmed = getConfirmed()[event.eventId] === true;
  const count = attendCounts[event.eventId] || 0;
  return `
    <div class="attend-row">
      <button class="attend-button ${confirmed ? "is-going" : ""}" type="button" data-attend="${event.eventId}">
        ${confirmed ? "Ya voy ✓" : "Asistir"}
      </button>
      <span class="attend-count" data-attend-count="${event.eventId}">${count} ${count === 1 ? "persona va" : "personas van"}</span>
    </div>
  `;
}

function linkMarkup(event) {
  if (!event.link) return "";
  return `<a class="event-link" href="${event.link.url}" target="_blank" rel="noopener noreferrer"><span class="event-link-icon">🔗</span>${event.link.label}<span class="event-link-arrow">→</span></a>`;
}

function eventStartDate(dayId, time) {
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(EVENT_YEAR, EVENT_MONTH, Number(dayId), hours, minutes, 0, 0);
}

function computeEventStatuses(now) {
  const flatEvents = [];
  days.forEach((day) => {
    day.events.forEach((event) => {
      const start = eventStartDate(day.id, event.time);
      flatEvents.push({ event, start });
    });
  });
  flatEvents.sort((a, b) => a.start - b.start);

  flatEvents.forEach((entry, index) => {
    const next = flatEvents[index + 1];
    let end = next ? next.start : null;
    if (!end || end <= entry.start) {
      end = new Date(entry.start.getTime() + UNKNOWN_END_GRACE_MINUTES * 60 * 1000);
    }
    entry.end = end;
  });

  const statuses = new Map();
  const upcoming = flatEvents.filter((entry) => entry.start > now);
  const live = flatEvents.find((entry) => entry.start <= now && now < entry.end);

  if (live) {
    statuses.set(live.event.eventId, "live");
  }
  if (upcoming.length > 0) {
    const nextEntry = upcoming[0];
    if (!live || nextEntry.event.eventId !== live.event.eventId) {
      statuses.set(nextEntry.event.eventId, "next");
    }
  }
  return statuses;
}

function refreshEventStatuses() {
  eventStatuses = computeEventStatuses(new Date());
}

function shareEvent(eventId, title, button) {
  const url = `${window.location.origin}${window.location.pathname}#${eventId}`;
  const shareData = {
    title: `${title} · Fiestas de Abraveses de Tera`,
    text: `Mira esta actividad de las fiestas: ${title}`,
    url
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      const original = button.innerHTML;
      button.innerHTML = `<span aria-hidden="true">✅</span>`;
      setTimeout(() => { button.innerHTML = original; }, 1500);
    }).catch(() => {
      window.prompt("Copia este enlace:", url);
    });
    return;
  }

  window.prompt("Copia este enlace:", url);
}

function openEventFromHash() {
  const hash = decodeURIComponent(window.location.hash.replace("#", ""));
  if (!hash) return;
  const card = document.querySelector(`[data-event-id="${hash}"]`);
  if (!card) return;
  card.classList.add("is-open");
  const summary = card.querySelector("[data-event]");
  if (summary) summary.setAttribute("aria-expanded", "true");
  setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
}

function card(event, color, id, dayId) {
  const featuredClass = event.featured ? "event-card--featured" : "";
  const isFavorite = getFavorites()[event.eventId] === true;
  const status = eventStatuses.get(event.eventId);
  const liveClass = status === "live" ? " event-card--live" : "";
  const badgeMarkup = status === "live"
    ? `<span class="status-badge status-badge--live"><span class="status-dot" aria-hidden="true"></span>En directo ahora</span>`
    : status === "next"
      ? `<span class="status-badge status-badge--next">Siguiente actividad</span>`
      : "";
  return `
    <article class="event-card ${featuredClass}${liveClass}" style="--accent: var(--${color})" data-event-id="${event.eventId}">
      <div class="event-summary" role="button" tabindex="0" data-event="${id}" aria-expanded="false" aria-controls="details-${id}">
        <time class="event-time">${event.time}</time>
        <span class="event-heading">
          <h3>${event.title}</h3>
          ${event.description ? `<p>${event.description}</p>` : ""}
          ${event.location ? `<span class="location-pill"><span aria-hidden="true">📍</span> ${event.location}</span>` : ""}
          ${event.note ? `<span class="note">${event.note}</span>` : ""}
          ${badgeMarkup}
        </span>
        <button class="share-button" type="button" data-share="${event.eventId}" data-share-title="${event.title}" aria-label="Compartir esta actividad">
          <span aria-hidden="true">📤</span>
        </button>
        <button class="favorite-star ${isFavorite ? "is-favorite" : ""}" type="button" data-favorite="${event.eventId}" aria-label="${isFavorite ? "Quitar de mis planes" : "Añadir a mis planes"}" aria-pressed="${isFavorite}">
          ${isFavorite ? "❤️" : "♡"}
        </button>
        <span class="event-chevron" aria-hidden="true">﹢</span>
      </div>

      <div class="event-details" id="details-${id}">
        <div class="event-details-inner">
          ${visualMarkup(event, color)}
          <div class="event-description">
            <p>${event.detail}</p>
            ${locationMarkup(event)}
            ${linkMarkup(event)}
            ${calendarMarkup(event, dayId)}
            ${attendMarkup(event)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function matchesFilters(event) {
  const categoryOk = selectedCategory === "all" || event.category === selectedCategory;
  const term = searchTerm.trim().toLowerCase();
  const searchOk = term === "" ||
    event.title.toLowerCase().includes(term) ||
    (event.description || "").toLowerCase().includes(term) ||
    (event.location || "").toLowerCase().includes(term) ||
    (event.detail || "").toLowerCase().includes(term);
  const favorites = getFavorites();
  const favoriteOk = !showFavoritesOnly || favorites[event.eventId] === true;
  return categoryOk && searchOk && favoriteOk;
}

function renderEvents() {
  refreshEventStatuses();
  const selected = days.find((day) => day.id === selectedId);
  const visible = selected ? [selected] : days;

  selectedDay.textContent = selected
    ? selected.label
    : showFavoritesOnly
      ? "Mis planes guardados"
      : `Todos los eventos · del 24 al 30 de agosto de ${EVENT_YEAR}`;

  let totalVisible = 0;
  const html = visible.map((day) => {
    const filteredEvents = day.events.filter(matchesFilters);
    totalVisible += filteredEvents.length;
    if (filteredEvents.length === 0) return "";
    return `
      ${selected ? "" : `<h3 class="day-group-title">${day.label}</h3>`}
      ${filteredEvents.map((event, index) => card(event, day.color, `${day.id}-${index}`, day.id)).join("")}
    `;
  }).join("");

  eventList.innerHTML = html;
  noResults.hidden = totalVisible > 0;
  if (totalVisible === 0) {
    noResults.textContent = showFavoritesOnly
      ? "Aún no has guardado ninguna actividad. Pulsa el corazón ♡ de cualquier ficha para añadirla a tus planes."
      : "No hay actividades que coincidan con la búsqueda.";
  }
  openEventFromHash();
}

dayTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-day-id]");
  if (!tab) return;
  dayTabs.querySelectorAll(".day-tab").forEach((t) => t.classList.toggle("is-active", t === tab));
  selectedId = tab.dataset.dayId;
  renderEvents();
});

todayButton.addEventListener("click", () => {
  selectedId = "all";
  dayTabs.querySelectorAll(".day-tab").forEach((t) => t.classList.toggle("is-active", t.dataset.dayId === "all"));
  renderEvents();
});

categoryFilters.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-category]");
  if (!chip) return;
  categoryFilters.querySelectorAll(".category-chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  selectedCategory = chip.dataset.category;
  renderEvents();
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderEvents();
});

favoritesButton.addEventListener("click", () => {
  showFavoritesOnly = !showFavoritesOnly;
  renderFavoritesButton();
  renderEvents();
});

eventList.addEventListener("click", (event) => {
  const shareButton = event.target.closest("[data-share]");
  if (shareButton) {
    event.stopPropagation();
    shareEvent(shareButton.dataset.share, shareButton.dataset.shareTitle, shareButton);
    return;
  }

  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) {
    event.stopPropagation();
    const eventId = favoriteButton.dataset.favorite;
    const favorites = getFavorites();
    favorites[eventId] = !favorites[eventId];
    setFavorites(favorites);
    renderFavoritesButton();
    if (showFavoritesOnly) {
      renderEvents();
    } else {
      const isFavorite = favorites[eventId] === true;
      favoriteButton.classList.toggle("is-favorite", isFavorite);
      favoriteButton.textContent = isFavorite ? "❤️" : "♡";
      favoriteButton.setAttribute("aria-pressed", String(isFavorite));
      favoriteButton.setAttribute("aria-label", isFavorite ? "Quitar de mis planes" : "Añadir a mis planes");
    }
    return;
  }

  const icsBtn = event.target.closest("[data-ics]");
  if (icsBtn) {
    event.stopPropagation();
    const eventId = icsBtn.dataset.ics;
    const dayId = icsBtn.dataset.day;
    let foundEvent = null;
    for (const d of days) {
      foundEvent = d.events.find((e) => e.eventId === eventId);
      if (foundEvent) break;
    }
    if (foundEvent) {
      downloadIcs(foundEvent, dayId);
    }
    return;
  }

  const chevronButton = event.target.closest("[data-event]");
  if (chevronButton) {
    const card = chevronButton.closest(".event-card");
    const open = card.classList.toggle("is-open");
    chevronButton.setAttribute("aria-expanded", String(open));
    return;
  }

  const attendButton = event.target.closest("[data-attend]");
  if (attendButton) {
    toggleAttendance(attendButton.dataset.attend, attendButton);
  }
});

eventList.addEventListener("keydown", (event) => {
  const summary = event.target.closest("[data-event]");
  if (!summary) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    const card = summary.closest(".event-card");
    const open = card.classList.toggle("is-open");
    summary.setAttribute("aria-expanded", String(open));
  }
});

function toggleAttendance(eventId, button) {
  if (!hasFirebase()) return;
  button.disabled = true;

  ensureAuth()
    .then((user) => {
      const confirmedMap = getConfirmed();
      const alreadyGoing = confirmedMap[eventId] === true;
      const ref = firebase.database().ref(`attendance/${eventId}`);
      const action = alreadyGoing
        ? ref.child(user.uid).remove()
        : ref.child(user.uid).set(true);

      return action.then(() => {
        confirmedMap[eventId] = !alreadyGoing;
        setConfirmed(confirmedMap);
        button.classList.toggle("is-going", !alreadyGoing);
        button.textContent = !alreadyGoing ? "Ya voy ✓" : "Asistir";
      });
    })
    .catch((error) => {
      console.error("No se pudo actualizar la asistencia.", error);
    })
    .finally(() => {
      button.disabled = false;
    });
}

function listenAttendanceCounts() {
  if (!hasFirebase()) return;
  firebase.database().ref("attendance").on("value", (snapshot) => {
    const data = snapshot.val() || {};
    attendCounts = Object.fromEntries(
      Object.entries(data).map(([eventId, users]) => [eventId, Object.keys(users || {}).length])
    );
    document.querySelectorAll("[data-attend-count]").forEach((element) => {
      const eventId = element.dataset.attendCount;
      const count = attendCounts[eventId] || 0;
      element.textContent = `${count} ${count === 1 ? "persona va" : "personas van"}`;
    });
  });
}

window.addEventListener("hashchange", openEventFromHash);

async function initApp() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) throw new Error("No se pudo cargar events.json");
    const data = await response.json();
    days = data.days || [];
    if (data.year) EVENT_YEAR = data.year;
  } catch (error) {
    console.warn("Error cargando events.json, asegúrate de servir la app por HTTP/HTTPS.", error);
  }

  renderTabs();
  renderCategoryFilters();
  renderFavoritesButton();
  renderEvents();
  listenAttendanceCounts();
  ensureAuth().catch(() => {});
}

initApp();

setInterval(() => {
  const previousStatuses = eventStatuses;
  refreshEventStatuses();
  let changed = previousStatuses.size !== eventStatuses.size;
  if (!changed) {
    for (const [key, value] of eventStatuses) {
      if (previousStatuses.get(key) !== value) {
        changed = true;
        break;
      }
    }
  }
  if (changed) renderEvents();
}, 60 * 1000);
