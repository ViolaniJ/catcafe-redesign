// CATSCRIPT.JS: Interactivity across the website

// Page transition effect
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in"); // fade in transition
  updateCartBadge(); // update cart bubble on every page when user add items to the shopping cart
});

// Fade out transition on internal links
document.querySelectorAll("a[href]").forEach((link) => {
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

// Time slot selection in the SELECTDATE.HTML
const slot1pm = document.getElementById("slot-1pm"); // only 1pm is allowed in this algorithm
if (slot1pm) {
  slot1pm.addEventListener("click", () => {
    slot1pm.classList.toggle("selected");
  });
}

// Select date in SELECTDATE.HTML
const days = document.querySelectorAll(".calendar-day.selectable");
days.forEach((day) => {
  day.addEventListener("click", () => {
    if (day.classList.contains("selected-date")) {
      // only the the date 18 is allowed in this algorithm
      day.classList.remove("selected-date");
    } else {
      days.forEach((d) => d.classList.remove("selected-date")); // clear if previous selected date
      day.classList.add("selected-date"); // add new selection
    }
  });
});

// Adding and subtracting product quantity in SELECTPASS.HTML
document.querySelectorAll(".quantity-selector").forEach((selector) => {
  const minusBtn = selector.querySelector(".minus");
  const plusBtn = selector.querySelector(".plus");
  const qtyValue = selector.querySelector(".qty-value");

  if (!minusBtn || !plusBtn || !qtyValue) return;

  let count = 0;

  plusBtn.addEventListener("click", () => {
    let count = parseInt(qtyValue.textContent);
    if (count < 1) {
      qtyValue.textContent = count + 1; // only allows 0 or 1
    }
  });

  minusBtn.addEventListener("click", () => {
    let count = parseInt(qtyValue.textContent);
    if (count > 0) {
      qtyValue.textContent = count - 1;
    }
  });
});

// Updating products from SELECTPASS.HTML to SHOPPINGCART.HTML
document.querySelectorAll(".pass-card").forEach((card) => {
  const minusBtn = card.querySelector(".minus");
  const plusBtn = card.querySelector(".plus");
  const qtyValue = card.querySelector(".qty-value");
  const addToCartBtn = card.querySelector(".add-to-cart");

  if (minusBtn && plusBtn && qtyValue) {
    // quantity control per product
    minusBtn.addEventListener("click", () => {
      let qty = parseInt(qtyValue.textContent);
      if (qty > 0) qtyValue.textContent = qty - 1;
    });

    plusBtn.addEventListener("click", () => {
      let qty = parseInt(qtyValue.textContent);
      if (qty < 1) qtyValue.textContent = qty + 1;
    });
  }

  // updating product details in shopping cart when clicking add to cart button
  if (addToCartBtn && qtyValue) {
    addToCartBtn.addEventListener("click", () => {
      const quantity = Math.min(parseInt(qtyValue.textContent), 1);
      if (quantity > 0) {
        const id = card.dataset.id;
        const title = card.querySelector("h2")?.innerText || "";
        const details = card.querySelector("p")?.innerText || "";
        const priceText =
          card.querySelector(".price")?.innerText.replace("$", "") || "0";
        const price = parseFloat(priceText);

        // pre-set details for product information
        let image = "";
        let date = "Friday, 18th April, 2025 @ 1:00 PM (GMT+10)";
        if (id === "pass-001") image = "images/green-cat.png";
        else if (id === "pass-003") image = "images/brown-cat.png";

        // reset confirmation status on new item
        localStorage.setItem("checkoutConfirmed", "false");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === id);
        if (existingItem) {
          existingItem.quantity = 1; // always set to 1
          existingItem.image = image;
          existingItem.date = date;
        } else {
          // always set quantity to 1 regardless of selected amount
          cart.push({ id, title, details, price, quantity: 1, image, date });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        qtyValue.textContent = 0; // reset quantity

        updateCartBadge(); // refresh bubble
      }
    });
  }
});

// Updating shopping cart bubble if item is added across all pages
function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutConfirmed =
    localStorage.getItem("checkoutConfirmed") === "true";
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    if (totalQty > 0 && !checkoutConfirmed) {
      cartBadge.textContent = totalQty;
      cartBadge.classList.remove("hidden");
    } else {
      cartBadge.classList.add("hidden");
    }
  }
}

// Display Cart Items in SHOPPINGCART.HTML
function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const subtotalAmount = document.querySelector(".subtotal-amount");

  // no render if page doesn't have products and subtotal elements
  if (!cartItemsContainer || !subtotalAmount) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = ""; // clear current items

  let subtotal = 0;

  // subtotal amount
  cart.forEach((item) => {
    const itemTotal = item.quantity * item.price;
    subtotal += itemTotal;

    // generate items in shopping cart
    const itemHTML = `
      <div class="cart-item-row" data-id="${item.id}">
        <div class="item-info">
          <img src="${item.image}" alt="${item.title}">
          <div class="item-text">
            <p class="title">GENERAL VISIT SESSION</p>
            <p class="subtitle">${item.title}<br><span class="note">${
      item.details
    }</span></p>
            <p class="date">${item.date}</p>
          </div>
        </div>
        <div class="quantity-price-remove-row">
          <div class="quantity-col">
            <div class="quantity-control">
              <button>-</button>
              <span>${item.quantity}</span>
              <button>+</button>
            </div>
          </div>
          <div class="price-col">$${itemTotal.toFixed(2)}</div>
        </div>
        <div class="remove-col">
          <button class="remove-btn"><span class="material-icons">delete</span></button>
        </div>
      </div>
    `;
    cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
  });

  subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
  attachRemoveListeners(); // allow removing product from cart
}
renderCartItems();

// Removing products from cart using the trash icon
function attachRemoveListeners() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const cartRow = e.target.closest(".cart-item-row");
      const id = cartRow.getAttribute("data-id");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));

      cartRow.remove();
      renderCartItems();
      updateCartBadge();
    });
  });
}

// Final confirmation for checkout
const checkoutBtn = document.querySelector(".confirm-button");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    localStorage.setItem("checkoutConfirmed", "true");
    updateCartBadge(); // hide bubble once pay and confirmed
  });
}

// Hamburger menu toggle for mobile version
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("hamburgerMenu");

// show/hide menu on icon click
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent immediate close from document click
  menu.classList.toggle("show");
});

// close Hamburger menu if clicking any other elements
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove("show");
  }
});

// close hamburger menu when clicking one of the navigation menus
const links = menu.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});
