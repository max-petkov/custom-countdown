const resourcesItems = document.querySelectorAll(".resources__item");
const resourcesLink = document.querySelector(".nav__link");
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today); // Can not select date from the past

// Resources
resourcesItems.forEach((el, i) => (el.style.top = `${i * 48}px`));

resourcesLink.addEventListener("click", () =>
  resourcesItems.forEach((el) => el.classList.toggle("js-resources-active"))
);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;

    // Show Countdown
    countdownEl.hidden = false;

    if (distance < 0) {
      completeEl.hidden = false;
      countdownEl.hidden = true;
      clearInterval(countdownActive);
    }
  }, 1000);
}

// Take values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = { date: countdownDate };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // Get Number version of current Date, updateDOM
  if (!countdownDate) {
    alert("Please select a date...");
    return;
  }
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

// Reset all Values
function reset() {
  // Hide countdowns, show input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;
  // Stop the countdown
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On load, check localStorage
restorePreviousCountdown();
