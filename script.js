const timer = document.getElementById("timer");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const focusInput = document.getElementById("focusInput");
const breakInput = document.getElementById("breakInput");

const historyList = document.getElementById("historyList");

const alarm = document.getElementById("alarm");

let interval = null;

let isRunning = false;
let isPaused = false;

let mode = "focus";

let focusMinutes = 25;
let breakMinutes = 5;

let totalSeconds = focusMinutes * 60;

function updateDisplay() {

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  timer.innerText =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {

  if (isRunning) return;

  isRunning = true;
  isPaused = false;

  interval = setInterval(() => {

    totalSeconds--;

    updateDisplay();

    if (totalSeconds <= 0) {

      clearInterval(interval);

      alarm.play();

      if (mode === "focus") {

        saveSession();

        mode = "break";

        statusText.innerText = "Break Time";
        statusText.className = "status break-mode";

        totalSeconds = breakMinutes * 60;

      } else {

        mode = "focus";

        statusText.innerText = "Focus Mode";
        statusText.className = "status focus-mode";

        totalSeconds = focusMinutes * 60;
      }

      isRunning = false;

      updateDisplay();

      startTimer();
    }

  }, 1000);
}

function pauseTimer() {

  if (!isRunning) return;

  clearInterval(interval);

  isRunning = false;
  isPaused = true;

  statusText.innerText = "Paused";
  statusText.className = "status paused";
}

function resetTimer() {

  clearInterval(interval);

  isRunning = false;
  isPaused = false;

  mode = "focus";

  focusMinutes = parseInt(focusInput.value);
  breakMinutes = parseInt(breakInput.value);

  totalSeconds = focusMinutes * 60;

  statusText.innerText = "Focus Mode";
  statusText.className = "status focus-mode";

  updateDisplay();
}

function saveSession() {

  const today = new Date().toDateString();

  let sessions = JSON.parse(localStorage.getItem("pomodoroSessions")) || [];

  sessions = sessions.filter(session => session.date === today);

  const now = new Date();

  sessions.push({
    date: today,
    duration: `${focusMinutes}:00`,
    time: now.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    })
  });

  localStorage.setItem("pomodoroSessions", JSON.stringify(sessions));

  renderHistory();
}

function renderHistory() {

  const today = new Date().toDateString();

  let sessions = JSON.parse(localStorage.getItem("pomodoroSessions")) || [];

  sessions = sessions.filter(session => session.date === today);

  localStorage.setItem("pomodoroSessions", JSON.stringify(sessions));

  historyList.innerHTML = "";

  if (sessions.length === 0) {

    historyList.innerHTML = `
      <li>No sessions completed yet.</li>
    `;

    return;
  }

  sessions.forEach(session => {

    const li = document.createElement("li");

    li.innerHTML =
      `✓ ${session.duration} Focus — ${session.time}`;

    historyList.appendChild(li);
  });
}

startBtn.addEventListener("click", () => {

  focusMinutes = parseInt(focusInput.value);
  breakMinutes = parseInt(breakInput.value);

  if (!isPaused) {
    totalSeconds =
      mode === "focus"
      ? focusMinutes * 60
      : breakMinutes * 60;
  }

  startTimer();
});

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

updateDisplay();

renderHistory();