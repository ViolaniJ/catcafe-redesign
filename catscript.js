// transitions between each pages 
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

document.querySelectorAll("a[href]").forEach(link => {
  const url = new URL(link.href);
  const isSameOrigin = url.origin === location.origin;

  if (isSameOrigin && !link.href.includes("#")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = link.href;
      }, 400); 
    });
  }
});

// adding time slot
document.addEventListener('DOMContentLoaded', () => {
  // Get the 1PM time slot button
  const slot1pm = document.getElementById('slot-1pm');

  // Only proceed if the element exists
  if (slot1pm) {
    // Add click event listener
    slot1pm.addEventListener('click', () => {
      // Toggle the 'selected' class
      slot1pm.classList.toggle('selected');
    });
  }
});

// calendar
  // Select all clickable calendar days
const days = document.querySelectorAll('.calendar-day.selectable');

days.forEach(day => {
  day.addEventListener('click', () => {
      // If this day is already selected, remove it
    if (day.classList.contains('selected-date')) {
       day.classList.remove('selected-date');
    } else {
        // Otherwise, remove selection from others and select this one
      days.forEach(d => d.classList.remove('selected-date'));
      day.classList.add('selected-date');
    }
  });
});
