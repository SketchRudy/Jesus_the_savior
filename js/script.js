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
 * Current Displayed Month/Year
 ***********************************************/
let currentYear = 2025;
let currentMonth = 0; // 0 = January

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/***********************************************
 * Example Events Data
 ***********************************************/
const events = {
  "2025-01-01": "New Year’s Service @ 10:00 AM",
  "2025-01-04": "Midweek Bible Study @ 7:00 PM",
  "2025-01-06": "Youth Night @ 7:30 PM",
  "2025-01-07": "Choir Rehearsal @ 5:00 PM",
  "2025-01-14": "Church Potluck – After Evening Service",
  "2025-01-21": "Youth Retreat – Check the sign-up sheet",
  "2025-01-28": "Community Outreach @ 11:00 AM to 2:00 PM"
  // Add more as needed...
};

/***********************************************
 * buildCalendar(year, month)
 ***********************************************/
function buildCalendar(year, month) {
  // 1) Update the <h2 id="monthYear"> text
  const monthYearTitle = document.getElementById("monthYear");
  monthYearTitle.textContent = `${monthNames[month]} ${year}`;

  // 2) Clear the #calendar container
  const calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  // 3) Create a .calendar-grid to hold days
  const calendarGrid = document.createElement("div");
  calendarGrid.classList.add("calendar-grid");

  // 4) Add day-of-week headers (Sun to Sat)
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach((dn) => {
    const dnDiv = document.createElement("div");
    dnDiv.classList.add("calendar-day-name");
    dnDiv.textContent = dn;
    calendarGrid.appendChild(dnDiv);
  });

  // 5) Figure out the first day + days in month
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // 6) Add blank cells for days before the 1st
  const startWeekday = firstDay.getDay(); // Sun=0, Mon=1, etc.
  for (let i = 0; i < startWeekday; i++) {
    const blankCell = document.createElement("div");
    blankCell.classList.add("calendar-day");
    calendarGrid.appendChild(blankCell);
  }

  // 7) Loop through all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("calendar-day");

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date-number");
    dateSpan.textContent = day;
    dayDiv.appendChild(dateSpan);

    // Build dateKey 'YYYY-MM-DD' to check if there's an event
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (events[dateKey]) {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");
      eventDiv.textContent = events[dateKey];
      dayDiv.appendChild(eventDiv);
    }

    calendarGrid.appendChild(dayDiv);
  }

  // 8) Append the grid to the container
  calendarContainer.appendChild(calendarGrid);
  
}
document.addEventListener("DOMContentLoaded", () => {
  buildCalendar(currentYear, currentMonth);
});

/***********************************************
 * Next / Previous Month Functions
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



