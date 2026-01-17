var habitList = document.getElementById("habitList");
var addHabitBtn = document.getElementById("addHabit");
var calendar = document.getElementById("calendar");
var prevBtn = document.getElementById("prevMonth");
var nextBtn = document.getElementById("nextMonth");
var activeHabitText = document.getElementById("activeHabit");
var monthYear = document.getElementById("monthYear");
var streakText = document.getElementById("streakCount");

var noteModal = document.getElementById("noteModal");
var noteInput = document.getElementById("noteText");
var saveNoteBtn = document.getElementById("saveNote");

var habits = JSON.parse(localStorage.getItem("habits")) || [];
var calendarData = JSON.parse(localStorage.getItem("calendarData")) || {};

var activeHabit = "";
var currentDate = new Date();
var selectedKey = "";

function saveData() {
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("calendarData", JSON.stringify(calendarData));
}

function formatKey(date) {
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, "0");
  var d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function showHabits() {
  habitList.innerHTML = "";
  habits.forEach(function (habit) {
    var li = document.createElement("li");
    li.innerText = habit;
    li.onclick = function () {
      activeHabit = habit;
      activeHabitText.innerText = habit;
      if (!calendarData[habit]) calendarData[habit] = {};
      showCalendar();
    };
    habitList.appendChild(li);
  });
}

addHabitBtn.onclick = function () {
  var name = prompt("Enter habit name");
  if (!name || !name.trim()) return;
  habits.push(name);
  saveData();
  showHabits();
};

function showCalendar() {
  calendar.innerHTML = "";
  if (!activeHabit) return;

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();

  monthYear.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  var firstDay = new Date(year, month, 1).getDay();
  var totalDays = new Date(year, month + 1, 0).getDate();

  for (var i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (var day = 1; day <= totalDays; day++) {
    var box = document.createElement("div");
    box.className = "day";

    var dayNumber = document.createElement("div");
    dayNumber.innerText = day;
    box.appendChild(dayNumber);

    var dateObj = new Date(year, month, day);
    var key = formatKey(dateObj);

    if (calendarData[activeHabit][key]?.done) {
      box.classList.add("done");
    }

    if (calendarData[activeHabit][key]?.note) {
      var noteDiv = document.createElement("div");
      noteDiv.className = "note-preview";
      noteDiv.innerText = calendarData[activeHabit][key].note;
      box.appendChild(noteDiv);
    }

    box.onclick = function () {
      var clickedDay = this.firstChild.innerText;
      var d = new Date(year, month, clickedDay);
      selectedKey = formatKey(d);

      if (!calendarData[activeHabit][selectedKey]) {
        calendarData[activeHabit][selectedKey] = {
          done: false,
          note: ""
        };
      }

      calendarData[activeHabit][selectedKey].done = true;
      noteInput.value = calendarData[activeHabit][selectedKey].note;
      saveData();
      noteModal.style.display = "flex";
    };

    calendar.appendChild(box);
  }

  updateStreak();
}

saveNoteBtn.onclick = function () {
  if (!activeHabit || !selectedKey) return;
  calendarData[activeHabit][selectedKey].note = noteInput.value;
  saveData();
  noteModal.style.display = "none";
  showCalendar();
};

function updateStreak() {
  var count = 0;
  var d = new Date();

  while (true) {
    var key = formatKey(d);
    if (calendarData[activeHabit]?.[key]?.done) {
      count++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  streakText.innerText = count + " days";
}

prevBtn.onclick = function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalendar();
};

nextBtn.onclick = function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalendar();
};

showHabits();
