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

//adding quantity 
document.querySelectorAll('.quantity-selector').forEach(selector => {
  const minusBtn = selector.querySelector('.minus');
  const plusBtn = selector.querySelector('.plus');
  const qtyValue = selector.querySelector('.qty-value');

  if (!minusBtn || !plusBtn || !qtyValue) return;

  let count = 0;

  plusBtn.addEventListener('click', () => {
    if (count < 1) {
      count++;
      qtyValue.textContent = count;
    }
  });

  minusBtn.addEventListener('click', () => {
    if (count > 0) {
      count--;
      qtyValue.textContent = count;
    }
  });
});

// adding shopping bubble
let cartCount = 0;
const cartBadge = document.querySelector('.cart-badge');

document.querySelectorAll('.pass-card').forEach(card => {
  const addToCartBtn = card.querySelector('.add-to-cart');
  const qtyValue = card.querySelector('.qty-value');

  if (!addToCartBtn || !qtyValue) return;

  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(qtyValue.textContent, 10);
    if (quantity > 0) {
      cartCount += quantity;
      cartBadge.textContent = cartCount;

      // ✨ Show the badge when count > 0
      if (cartCount > 0) {
        cartBadge.classList.remove('hidden');
      }

      // Optional: reset the quantity
      qtyValue.textContent = 0;
    }
  });
});