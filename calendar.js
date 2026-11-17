const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menu-button");
const closeButton = document.getElementById("sidebar-close");
const backdrop = document.getElementById("sidebar-backdrop");
const viewTitle = document.getElementById("view-title");
const navigationLinks = document.querySelectorAll("[data-view-title]");

function openSidebar() {
  sidebar.classList.add("is-open");
  backdrop.classList.add("is-visible");
  menuButton.setAttribute("aria-expanded", "true");
  closeButton.focus();
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  backdrop.classList.remove("is-visible");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", openSidebar);
closeButton.addEventListener("click", closeSidebar);
backdrop.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
    closeSidebar();
    menuButton.focus();
  }
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigationLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
    viewTitle.textContent = link.dataset.viewTitle;

    if (window.innerWidth < 735) {
      closeSidebar();
    }
  });
});

const calendarTitle = document.getElementById("calendar-title");
const calendarGrid = document.getElementById("calendar-grid");
const previousMonthButton = document.getElementById("previous-month");
const nextMonthButton = document.getElementById("next-month");
const todayButton = document.getElementById("today-button");

const today = new Date();
let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const exampleEvents = [
  { day: 4, title: "Arzttermin", type: "private" },
  { day: 11, title: "Abendessen", type: "group" },
  { day: 18, title: "Spontan verfügbar", type: "free" }
];

function createDayCell(date, isOutsideMonth) {
  const day = document.createElement("div");
  const dayNumber = document.createElement("span");

  day.className = "calendar-day";
  dayNumber.className = "calendar-day__number";
  dayNumber.textContent = date.getDate();
  day.append(dayNumber);

  if (isOutsideMonth) {
    day.classList.add("calendar-day--outside");
  }

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isToday) {
    day.classList.add("calendar-day--today");
    day.setAttribute("aria-current", "date");
  }

  if (!isOutsideMonth) {
    exampleEvents
      .filter((event) => event.day === date.getDate())
      .forEach((event) => {
        const eventElement = document.createElement("span");

        eventElement.className = `calendar-event calendar-event--${event.type}`;
        eventElement.textContent = event.title;
        eventElement.title = event.title;
        day.append(eventElement);
      });
  }

  return day;
}

function renderCalendar() {
  calendarGrid.replaceChildren();

  weekDays.forEach((weekDay) => {
    const heading = document.createElement("div");
    heading.className = "calendar-weekday";
    heading.textContent = weekDay;
    calendarGrid.append(heading);
  });

  calendarTitle.textContent = new Intl.DateTimeFormat("de-CH", {
    month: "long",
    year: "numeric"
  }).format(visibleMonth);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const mondayBasedOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - mondayBasedOffset);

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index
    );

    calendarGrid.append(createDayCell(date, date.getMonth() !== month));
  }
}

previousMonthButton.addEventListener("click", () => {
  visibleMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() - 1,
    1
  );
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  visibleMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    1
  );
  renderCalendar();
});

todayButton.addEventListener("click", () => {
  visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  renderCalendar();
});

renderCalendar();
