const days = [
  {
    id: "24",
    short: "Lun",
    label: "Lunes 24 de agosto",
    color: "orange",
    events: [
      {
        eventId: "bailes-regionales",
        time: "20:00",
        title: "Bailes regionales",
        description: "A cargo de Doña Urraca.",
        icon: "💃",
        detail: "Una tarde para disfrutar de los bailes y la música tradicional en un ambiente abierto a vecinos y visitantes. Doña Urraca pondrá sobre el escenario un repertorio de piezas populares, con coreografías y vestimenta tradicional. Es una actividad pensada para todas las edades: puedes acercarte a mirar, acompañar con palmas o simplemente aprovechar el inicio de las fiestas para encontrarte con la gente del pueblo."
      }
    ]
  },
  {
    id: "25",
    short: "Mar",
    label: "Martes 25 de agosto",
    color: "red",
    events: [
      {
        eventId: "ruta-bodegas",
        time: "19:00",
        title: "II Ruta por las bodegas",
        description: "Con la charanga MANÁITA.",
        note: "Inscripción previa",
        icon: "🍷",
        photo: "images/ruta-bodegas.jpg",
        detail: "Recorrido festivo por las bodegas de Abraveses de Tera acompañado por la charanga MANÁITA. La propuesta combina música, convivencia y una forma diferente de descubrir los rincones con más historia del pueblo. Lleva calzado cómodo, respeta las indicaciones de la organización y consulta previamente el punto de salida y las condiciones de inscripción.",
        featured: true,
        link: { label: "MANÁITA en Instagram", url: "https://www.instagram.com/manaitaoficial/?hl=es" }
      },
      {
        eventId: "desfile-disfraces",
        time: "22:30",
        title: "Desfile infantil de disfraces",
        icon: "🎭",
        photo: "images/disfraz.jpg",
        detail: "Los más pequeños serán protagonistas de una noche llena de imaginación. Anímate a preparar un disfraz individual, en familia o con amigos y participa en el recorrido por las calles del pueblo. Habrá música, ambiente festivo y tiempo para que cada participante luzca su creación. Se recomienda que los menores vayan acompañados por una persona adulta."
      },
      {
        eventId: "campanadas",
        time: "00:00",
        title: "Campanadas inicio fiestas",
        icon: "🔔",
        detail: "El encuentro simbólico que marca oficialmente el comienzo de las fiestas. A medianoche nos reuniremos para dar la bienvenida a los días grandes de Abraveses de Tera, compartir las primeras felicitaciones y arrancar el programa con ganas de disfrutar. Acércate con antelación para vivir el ambiente desde el principio."
      }
    ]
  },
  {
    id: "26",
    short: "Mié",
    label: "Miércoles 26 de agosto",
    color: "blue",
    events: [
      {
        eventId: "marcha-solidaria",
        time: "18:30",
        title: "Marcha solidaria FUNDAME",
        icon: "🚶",
        photo: "images/marcha-solidaria.jpg",
        detail: "Una caminata solidaria abierta a toda persona que quiera colaborar y sumar pasos por una buena causa. El ritmo estará pensado para que puedan participar familias, grupos de amigos y vecinos de distintas edades. Consulta con la organización el recorrido, el punto de encuentro y cualquier aportación solidaria prevista antes de comenzar.",
        featured: true,
        link: { label: "Conoce FUNDAME", url: "https://www.fundame.net/" }
      },
      {
        eventId: "bingo-miercoles",
        time: "20:00",
        title: "Bingo",
        icon: "🎱",
        detail: "Momento de juego, risas y participación para compartir en grupo. El bingo es una de las actividades más populares de las fiestas por su ambiente cercano y por la emoción de cada número. Acude unos minutos antes para conseguir tu cartón y atender las indicaciones de la organización."
      },
      {
        eventId: "cine-aire-libre",
        time: "21:30",
        title: "Cine al aire libre",
        icon: "🎬",
        detail: "Una sesión de cine bajo las estrellas para disfrutar en familia. Trae una silla cómoda, una manta si refresca y algo de picoteo para vivir una noche de verano diferente. La película y el espacio de proyección podrán confirmarse en los avisos de la organización antes de la actividad."
      },
      {
        eventId: "campeonato-tute",
        time: "23:30",
        title: "Campeonato de tute",
        note: "Inscripción hasta las 23 h",
        icon: "🃏",
        detail: "Torneo de cartas para quienes disfrutan de la estrategia, la competición sana y las partidas entre amigos. Las parejas deberán estar formadas antes del inicio y respetar las normas indicadas por la organización. La inscripción se cierra a las 23:00, así que conviene apuntarse con tiempo."
      }
    ]
  },
  {
    id: "27",
    short: "Jue",
    label: "Jueves 27 de agosto",
    color: "yellow",
    events: [
      {
        eventId: "juegos-infantiles",
        time: "17:00",
        title: "Juegos infantiles",
        icon: "🪁",
        detail: "Tarde de propuestas pensadas para que niños y niñas jueguen, se muevan y compartan las fiestas con sus amigos. Habrá actividades sencillas y participativas adaptadas al ambiente festivo. Se recomienda llevar agua, protección solar si aún hay sol y ropa cómoda para correr y jugar."
      },
      {
        eventId: "grand-prix-braga",
        time: "19:00",
        title: "I Grand Prix Braga",
        note: "Mayores de 16 años",
        icon: "🏁",
        detail: "Prueba festiva de equipos con retos, habilidad, equilibrio y muchas risas. El Grand Prix está pensado para participantes mayores de 16 años que quieran colaborar con su peña o grupo de amigos. Consulta la normativa, los equipos disponibles y las medidas de seguridad antes de participar."
      },
      {
        eventId: "sardinada",
        time: "21:30",
        title: "Sardinada",
        icon: "🐟",
        detail: "Una cita gastronómica para reunirse alrededor de una tradición de verano: las sardinas compartidas entre vecinos, familiares y visitantes. Acércate con hambre y disfruta del ambiente de sobremesa y charla. La organización podrá indicar el sistema de reparto, horarios concretos y posibles turnos de atención."
      },
      {
        eventId: "orquesta-media-luna",
        time: "23:30",
        title: "Orquesta MEDIA LUNA",
        description: "Al descanso, Carrera de la sangría; al finalizar, ELECTROGARITO.",
        note: "Noche de disfraces: Tercera edad",
        icon: "🎸",
        detail: "Noche de verbena con la Orquesta MEDIA LUNA, música para bailar y repertorio para todos los públicos. Durante el descanso se celebrará la Carrera de la sangría y, al terminar la orquesta, continuará la fiesta con ELECTROGARITO. La jornada incluye noche de disfraces para la tercera edad: una buena ocasión para participar, animar y disfrutar del ambiente.",
        featured: true,
        link: { label: "MEDIA LUNA en Instagram", url: "https://www.instagram.com/orquesta_medialuna/?hl=es" }
      }
    ]
  },
  {
    id: "28",
    short: "Vie",
    label: "Viernes 28 de agosto",
    color: "green",
    events: [
      {
        eventId: "bendicion-bolas",
        time: "18:30",
        title: "Bendición de bolas",
        icon: "🕯️",
        photo: "images/bendicion-bolas.jpg",
        detail: "Acto tradicional incluido en el programa festivo. Se recomienda acudir con unos minutos de antelación, mantener un ambiente respetuoso y seguir las indicaciones que se den en el lugar de celebración. Los detalles prácticos, punto de encuentro y posible participación se podrán comunicar por los canales de la organización."
      },
      {
        eventId: "cagada-gallina",
        time: "21:00",
        title: "Cagada de la gallina",
        icon: "🐔",
        photo: "images/cagada-gallina.jpg",
        detail: "Uno de los juegos más divertidos y comentados de las fiestas. Los participantes eligen su casilla y esperan a que la suerte decida el resultado, siempre en un ambiente de humor y convivencia. Consulta en el lugar de la actividad cómo participar, los horarios de venta y las normas del juego."
      },
      {
        eventId: "electromoon",
        time: "01:00",
        title: "ELECTROMOON",
        icon: "🌙",
        detail: "Sesión nocturna de música electrónica y baile para seguir disfrutando de la madrugada de fiestas. ELECTROMOON pondrá el ritmo con una selección pensada para animar la pista y cerrar el día con energía. Respeta el descanso de los vecinos, cuida el espacio común y disfruta de forma responsable.",
        featured: true,
        link: { label: "ELECTROMOON en Instagram", url: "https://www.instagram.com/electromoonn9/?hl=es" }
      }
    ]
  },
  {
    id: "29",
    short: "Sáb",
    label: "Sábado 29 de agosto",
    color: "pink",
    events: [
      {
        eventId: "misa-difuntos",
        time: "12:00",
        title: "Misa por los difuntos",
        icon: "⛪",
        detail: "Celebración en recuerdo de las personas fallecidas y de quienes forman parte de la memoria de Abraveses de Tera. Es un momento de recogimiento dentro del programa de fiestas, abierto a quienes quieran acompañar a familiares y vecinos. Se ruega puntualidad y respeto durante el acto."
      },
      {
        eventId: "paella-popular",
        time: "15:00",
        title: "Paella popular",
        icon: "🥘",
        detail: "Comida popular para reunir a vecinos, familias y visitantes alrededor de una gran paella. Es una de las citas centrales del sábado, ideal para compartir mesa, conversación y ambiente de pueblo. Consulta en los avisos oficiales cómo se organiza el reparto, si hay tickets o turnos y a qué hora conviene acercarse."
      },
      {
        eventId: "edu-mago",
        time: "16:00",
        title: "Edu el mago",
        icon: "🪄",
        detail: "Espectáculo de magia familiar con trucos, humor y participación del público. Edu el mago propondrá una sesión cercana para sorprender a pequeños y mayores, por lo que es recomendable llegar unos minutos antes para colocarse con comodidad. Mantén a los niños cerca y prepárate para participar si te toca salir al escenario."
      },
      {
        eventId: "parque-acuatico",
        time: "17:00",
        title: "Parque acuático",
        icon: "💦",
        detail: "Tarde refrescante de juegos de agua y diversión para combatir el calor. Lleva bañador, toalla, chanclas y ropa de recambio; los menores deberán seguir las indicaciones de seguridad y permanecer bajo la supervisión de sus responsables. Revisa el lugar y las normas antes de acceder a las atracciones."
      },
      {
        eventId: "bingo-sabado",
        time: "19:00",
        title: "Bingo",
        icon: "🎱",
        detail: "Nueva oportunidad para jugar al bingo durante el sábado de fiestas. Reúne a tu familia o a tu peña, compra tu cartón y sigue los números con atención. Más allá de los premios, es un rato perfecto para coincidir con gente del pueblo y mantener el ambiente de la tarde."
      },
      {
        eventId: "beer-pong",
        time: "19:30",
        title: "Torneo de Beer Pong",
        icon: "🏓",
        detail: "Competición por equipos basada en puntería y coordinación, pensada para el ambiente festivo adulto. Consulta antes las normas, el formato de inscripción y las condiciones de participación. La actividad debe disfrutarse con responsabilidad, respetando a las demás personas y las indicaciones de la organización."
      },
      {
        eventId: "syn3rgia",
        time: "01:00",
        title: "Grupo SYN3RGIA",
        description: "En el descanso y al finalizar: ELECTROGARITO con DJ DAMM VALLEY.",
        icon: "🎤",
        detail: "Concierto y fiesta nocturna con el Grupo SYN3RGIA como protagonista. Durante el descanso y al finalizar continuará la música con ELECTROGARITO y DJ DAMM VALLEY. Una cita para cantar, bailar y disfrutar de la noche grande del programa, siempre cuidando el entorno y compartiendo el espacio con respeto.",
        featured: true,
        link: { label: "SYN3RGIA en Instagram", url: "https://www.instagram.com/syn3rgiagrupo/?hl=es" }
      }
    ]
  },
  {
    id: "30",
    short: "Dom",
    label: "Domingo 30 de agosto",
    color: "cyan",
    events: [
      {
        eventId: "romeria-pendones",
        time: "13:00",
        title: "Romería de pendones",
        icon: "🚩",
        photo: "images/romeria-pendones.jpg",
        detail: "Desfile tradicional de pendones que reúne color, música y patrimonio popular. Es una oportunidad para contemplar de cerca estas enseñas y acompañar el recorrido en un ambiente comunitario. Respeta el espacio de las personas que portan los pendones y sigue las indicaciones de la organización durante el trayecto."
      },
      {
        eventId: "pulpero",
        time: "14:00",
        title: "Pulpero",
        icon: "🐙",
        detail: "Cita gastronómica para degustar pulpo y disfrutar de una comida informal de domingo. Acércate con tiempo para conocer el funcionamiento del servicio, los posibles turnos y la disponibilidad. Un momento ideal para despedir las fiestas alrededor de una mesa y con buena conversación."
      },
      {
        eventId: "parque-infantil",
        time: "17:00",
        title: "Parque infantil",
        icon: "🎈",
        detail: "Espacio de juego y entretenimiento destinado al público infantil para que los más pequeños cierren las fiestas con actividades a su medida. Lleva agua y ropa cómoda, y recuerda que los menores deben estar atendidos por sus padres, madres o personas responsables."
      },
      {
        eventId: "tardeo-markfeel",
        time: "19:00",
        title: "Tardeo con MARKFEEL",
        icon: "🎧",
        detail: "Sesión de tarde con MARKFEEL para despedir el programa al ritmo de la música. Una propuesta pensada para reunirse, bailar y poner el broche final a los días de fiesta antes de la vuelta a la rutina. Ven con ganas de disfrutar y ayuda a dejar el recinto limpio al terminar."
      }
    ]
  }
];

const dayTabs = document.querySelector("#dayTabs");
const eventList = document.querySelector("#eventList");
const selectedDay = document.querySelector("#selectedDay");
const todayButton = document.querySelector("#todayButton");
let selectedId = "all";

const STORAGE_KEY = "abravesesAsistencias";
let attendCounts = {};
let authReady = false;
let authReadyPromise = null;

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
  const all = `<button class="day-tab ${selectedId === "all" ? "is-active" : ""}" type="button" data-day="all" aria-pressed="${selectedId === "all"}"><span>Todos</span><strong>✓</strong></button>`;

  const buttons = days.map((day) => `
    <button class="day-tab ${selectedId === day.id ? "is-active" : ""}" type="button" data-day="${day.id}" data-color="${day.color}" aria-pressed="${selectedId === day.id}">
      <span>${day.short}</span>
      <strong>${day.id}</strong>
    </button>
  `).join("");

  dayTabs.innerHTML = all + buttons;
}

function visualMarkup(event, color) {
  if (event.photo) {
    return `<img class="event-visual-photo" src="${event.photo}" alt="${event.title}" loading="lazy" />`;
  }
  return `<div class="event-visual" style="--accent: var(--${color})" aria-hidden="true">${event.icon}</div>`;
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
  return `
    <a class="event-link" href="${event.link.url}" target="_blank" rel="noopener noreferrer">
      <span class="event-link-icon" aria-hidden="true">🔗</span>
      <span>${event.link.label}</span>
      <span class="event-link-arrow" aria-hidden="true">↗</span>
    </a>
  `;
}

function card(event, color, id) {
  const featuredClass = event.featured ? "event-card--featured" : "";
  return `
    <article class="event-card ${featuredClass}" style="--accent: var(--${color})">
      <button class="event-summary" type="button" data-event="${id}" aria-expanded="false" aria-controls="details-${id}">
        <time class="event-time">${event.time}</time>
        <span class="event-heading">
          <h3>${event.title}</h3>
          ${event.description ? `<p>${event.description}</p>` : ""}
          ${event.note ? `<span class="note">${event.note}</span>` : ""}
        </span>
        <span class="event-chevron" aria-hidden="true">＋</span>
      </button>

      <div class="event-details" id="details-${id}">
        <div class="event-details-inner">
          ${visualMarkup(event, color)}
          <div class="event-description">
            <p>${event.detail}</p>
            ${linkMarkup(event)}
            ${attendMarkup(event)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderEvents() {
  const selected = days.find((day) => day.id === selectedId);
  const visible = selected ? [selected] : days;

  selectedDay.textContent = selected
    ? selected.label
    : "Todos los eventos · del 24 al 30 de agosto";

  eventList.innerHTML = visible.map((day) => `
    ${selected ? "" : `<h3 class="day-group-title">${day.label}</h3>`}
    ${day.events.map((event, index) => card(event, day.color, `${day.id}-${index}`)).join("")}
  `).join("");
}

function selectDay(id) {
  selectedId = id;
  renderTabs();
  renderEvents();
  document.querySelector(".selected-day")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

dayTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-day]");
  if (button) selectDay(button.dataset.day);
});

todayButton.addEventListener("click", () => selectDay("all"));

eventList.addEventListener("click", (event) => {
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

function toggleAttendance(eventId, button) {
  if (!hasFirebase()) return;
  button.disabled = true;

  ensureAuth()
    .then(() => {
      const confirmedMap = getConfirmed();
      const alreadyGoing = confirmedMap[eventId] === true;
      const ref = firebase.database().ref(`asistentes/${eventId}`);

      return ref.transaction((current) => {
        const value = typeof current === "number" ? current : 0;
        return alreadyGoing ? Math.max(0, value - 1) : value + 1;
      }).then(() => {
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
  firebase.database().ref("asistentes").on("value", (snapshot) => {
    attendCounts = snapshot.val() || {};
    document.querySelectorAll("[data-attend-count]").forEach((element) => {
      const eventId = element.dataset.attendCount;
      const count = attendCounts[eventId] || 0;
      element.textContent = `${count} ${count === 1 ? "persona va" : "personas van"}`;
    });
  });
}

renderTabs();
renderEvents();
listenAttendanceCounts();
ensureAuth().catch(() => {});
