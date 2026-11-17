const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");

function openCalendar(event) {
  event.preventDefault();

  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }

  // Vorläufige Navigation für den statischen Prototyp.
  // Später wird hier die Anmeldung über die REST API geprüft.
  loginStatus.textContent = "Kalender wird geöffnet …";

  window.setTimeout(() => {
    window.location.href = "calendar.html";
  }, 350);
}

loginForm.addEventListener("submit", openCalendar);