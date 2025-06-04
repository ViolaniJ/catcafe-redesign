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
const slotBtn = document.getElementById("selectable-slot");
  slotBtn.addEventListener("click", () => {
    slotBtn.classList.toggle("selected");
});

  const date18 = document.getElementById("selectable-date");
  date18.addEventListener("click", () => {
    date18.classList.toggle("selected-date");
});

document.addEventListener("DOMContentLoaded", function () {
  const date18 = document.querySelector('.calendar-day.selectable');

  date18.addEventListener('click', function () {
    this.classList.toggle('selected-date');
  });
});