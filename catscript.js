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
// ====== Quantity and Add to Cart Logic (selectpass.html) ======
document.querySelectorAll('.pass-card').forEach(card => {
  const minusBtn = card.querySelector('.minus');
  const plusBtn = card.querySelector('.plus');
  const qtyValue = card.querySelector('.qty-value');
  const addToCartBtn = card.querySelector('.add-to-cart');

  // Quantity buttons
  if (minusBtn && plusBtn && qtyValue) {
    minusBtn.addEventListener('click', () => {
      let qty = parseInt(qtyValue.textContent);
      if (qty > 0) qtyValue.textContent = qty - 1;
    });

    plusBtn.addEventListener('click', () => {
      let qty = parseInt(qtyValue.textContent);
      if (qty < 1) qtyValue.textContent = qty + 1;
    });
  }

  // Add to cart button
  if (addToCartBtn && qtyValue) {
    addToCartBtn.addEventListener('click', () => {
      const quantity = Math.min(parseInt(qtyValue.textContent), 1);
      if (quantity > 0) {
        const id = card.dataset.id;
        const title = card.querySelector('h2')?.innerText || '';
        const details = card.querySelector('p')?.innerText || '';
        const priceText = card.querySelector('.price')?.innerText.replace('$', '') || '0';
        const price = parseFloat(priceText);

        let image = '';
        let date = 'Friday, 18th April, 2025 @ 1:00 PM (GMT+10)';
        if (id === 'pass-001') {
          image = 'images/green-cat.png';
        
        } else if (id === 'pass-003') {
          image = 'images/brown-cat.png';
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.image = image;
          existingItem.date = date;
        } else {
          cart.push({ id, title, details, price, quantity, image, date });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        qtyValue.textContent = 0;

        updateCartBadge();
      }
    });
  }
});

// ====== Update Cart Badge (runs on all pages) ======
function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-badge');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    if (totalQty > 0) {
      cartBadge.textContent = totalQty;
      cartBadge.classList.remove('hidden');
    } else {
      cartBadge.classList.add('hidden');
    }
  }
}
updateCartBadge(); // Run on load

// ====== Display Cart Items on shoppingcart.html ======
function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalAmount = document.querySelector('.subtotal-amount');

  if (!cartItemsContainer || !subtotalAmount) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.quantity * item.price;
    subtotal += itemTotal;

    const itemHTML = `
      <div class="cart-item-row">
        <div class="item-info">
          <img src="${item.image}" alt="${item.title}">
          <div class="item-text">
            <p class="title">GENERAL VISIT SESSION</p>
            <p class="subtitle">${item.title}<br><span class="note">${item.details}</span></p>
            <p class="date">${item.date}</p>
          </div>
        </div>
        <div class="quantity-control">
          <button disabled>-</button>
          <span>${item.quantity}</span>
          <button disabled>+</button>
        </div>
        <div class="item-price">$${itemTotal.toFixed(2)}</div>
        <button class="remove-btn"><img src="images/trash.png" alt="Delete"></button>
      </div>
    `;
    cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
  });

  subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
}
renderCartItems(); // Only does something on cart page

// ====== Optional: Clear cart after checkout (you can remove this if not needed) ======
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    // Optional: remove this line if you want to persist cart after checkout
    localStorage.removeItem('cart');
  });
}
