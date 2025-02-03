// Select all details elements
const detailsElements = document.querySelectorAll("details");

// Add event listeners to each details element
detailsElements.forEach((details) => {
    details.addEventListener("toggle", () => {
        if (details.open) {
            // Close all other details elements
            detailsElements.forEach((otherDetails) => {
                if (otherDetails !== details) {
                    otherDetails.open = false;
                }
            });
        }
    });
});

/***********************************************
 * Global Variables & Initial Events Data
 ***********************************************/
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0 = January
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Define events as key-value pairs (date in "YYYY-MM-DD" format)
let events = {
  "2025-02-02": "Sunday Service @ 10:00 AM",
  "2025-02-09": "Sunday Service @ 10:00 AM",
  "2025-02-16": "Sunday Service @ 10:00 AM",
  "2025-02-23": "Sunday Service @ 10:00 AM",
  "2025-02-05": "Bible Study @ 7:00 PM",
  "2025-02-12": "Bible Study @ 7:00 PM",
  "2025-02-19": "Bible Study @ 7:00 PM",
  "2025-02-26": "Bible Study @ 7:00 PM",
  "2025-02-07": "Youth Night @ 7:30 PM",
  "2025-02-14": "Youth Night @ 7:30 PM",
  "2025-02-21": "Youth Night @ 7:30 PM",
  "2025-02-28": "Youth Night @ 7:30 PM",
  // Add or remove events here as needed.
};

/***********************************************
 * buildCalendar(year, month)
 ***********************************************/
function buildCalendar(year, month) {
  // Update the header with the current month and year.
  const monthYearTitle = document.getElementById("monthYear");
  monthYearTitle.textContent = `${monthNames[month]} ${year}`;

  // Clear any previous calendar content.
  const calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  // Create the calendar grid container.
  const calendarGrid = document.createElement("div");
  calendarGrid.classList.add("calendar-grid");

  // Add day-of-week headers.
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach((dn) => {
    const headerCell = document.createElement("div");
    headerCell.classList.add("calendar-day-name");
    headerCell.textContent = dn;
    calendarGrid.appendChild(headerCell);
  });

  // Calculate the first day of the month and total days in the month.
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // For shading the current day, get today's date values.
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth(); // 0-based
  const todayDate = today.getDate();

  // Add blank cells for days before the 1st of the month.
  const startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  for (let i = 0; i < startWeekday; i++) {
    const blankCell = document.createElement("div");
    blankCell.classList.add("calendar-day");
    calendarGrid.appendChild(blankCell);
  }

  // Create cells for each day of the month.
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");

    // Check if this day is today.
    if (year === todayYear && month === todayMonth && day === todayDate) {
      dayCell.classList.add("today");
    }

    // Add the day number.
    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date-number");
    dateSpan.textContent = day;
    dayCell.appendChild(dateSpan);

    // Format date key as "YYYY-MM-DD"
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // If an event is defined for this day, add it to the cell.
    if (events[dateKey]) {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");
      eventDiv.textContent = events[dateKey];
      dayCell.appendChild(eventDiv);
    }

    calendarGrid.appendChild(dayCell);
  }

  // Append the calendar grid to the container.
  calendarContainer.appendChild(calendarGrid);
}

/***********************************************
 * Month Navigation Functions
 ***********************************************/
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  buildCalendar(currentYear, currentMonth);
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  buildCalendar(currentYear, currentMonth);
}

/***********************************************
 * Initial Setup & Event Listeners
 ***********************************************/
document.addEventListener("DOMContentLoaded", () => {
  buildCalendar(currentYear, currentMonth);
  document.getElementById("prevMonth").addEventListener("click", prevMonth);
  document.getElementById("nextMonth").addEventListener("click", nextMonth);
});

