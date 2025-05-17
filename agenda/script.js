// script.js

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDay = today.getDate();
let activities = JSON.parse(localStorage.getItem("atividades")) || [];

function updateCalendar() {
  const calendarGrid = document.getElementById("calendarGrid");
  const monthYear = document.getElementById("monthYear");
  calendarGrid.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  weekdays.forEach(day => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${day}</strong>`;
    calendarGrid.appendChild(div);
  });

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.textContent = i;

    const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    if (isToday) day.classList.add("today");

    const hasActivity = activities.some(a => a.day == i && a.month == currentMonth && a.year == currentYear);
    if (hasActivity) day.style.border = "1px solid #2b446c";

    day.style.cursor = "pointer";
    day.onclick = () => {
      selectedDay = i;
      renderActivities();
    };

    calendarGrid.appendChild(day);
  }

  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
  renderActivities();
}

function renderActivities() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";
  const items = activities.filter(a => a.day == selectedDay && a.month == currentMonth && a.year == currentYear);
  items.forEach(act => {
    const div = document.createElement("div");
    div.className = `activity-card ${act.color}`;
    div.innerHTML = `
      <div class="activity-info">
        <strong>${act.title}</strong>
        <div><i class="fas fa-clock"></i> ${act.time}</div>
      </div>
      <button class="edit-btn"><i class="fas fa-pen"></i></button>
    `;
    list.appendChild(div);
  });
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function addActivity() {
  const title = document.getElementById("titleInput").value;
  const time = document.getElementById("timeInput").value;
  if (!title || !time) return alert("Preencha todos os campos.");
  const color = activities.length % 2 === 0 ? "red" : "blue";
  activities.push({ title, time, day: selectedDay, month: currentMonth, year: currentYear, color });
  localStorage.setItem("atividades", JSON.stringify(activities));
  closeModal();
  renderActivities();
  updateCalendar();
}

function filterActivities(query) {
  const cards = document.querySelectorAll(".activity-card");
  cards.forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(query.toLowerCase()) ? "flex" : "none";
  });
}

// Espera o DOM carregar para evitar erros com elementos ainda não carregados
document.addEventListener("DOMContentLoaded", () => {
  updateCalendar();
  renderActivities();
});
