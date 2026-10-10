export const restaurants = [
  {
    id: "bun-and-done",
    name: "Bun & Done",
    cuisine: "Burgers",
    rating: "4.8",
    time: "20-30 min",
    emoji: "🍔",
    color: "peach",
    menu: [
      { id: "classic-smash", name: "Classic Smash Burger", description: "Crispy edges, cheddar, house sauce", price: 219, emoji: "🍔" },
      { id: "loaded-fries", name: "Loaded Masala Fries", description: "Crispy fries with our signature spice", price: 129, emoji: "🍟" },
      { id: "cold-coffee", name: "Cold Coffee", description: "Creamy, chilled and made to order", price: 99, emoji: "🥤" }
    ]
  },
  {
    id: "little-italy",
    name: "Little Italy",
    cuisine: "Italian",
    rating: "4.7",
    time: "25-35 min",
    emoji: "🍕",
    color: "lavender",
    menu: [
      { id: "margherita", name: "Classic Margherita", description: "Tomato, fresh basil, mozzarella", price: 269, emoji: "🍕" },
      { id: "alfredo-pasta", name: "Creamy Alfredo Pasta", description: "Penne in a rich parmesan sauce", price: 239, emoji: "🍝" },
      { id: "garlic-bread", name: "Cheesy Garlic Bread", description: "Toasted bread, herbs and cheese", price: 149, emoji: "🥖" }
    ]
  },
  {
    id: "curry-leaf",
    name: "Curry Leaf",
    cuisine: "Indian",
    rating: "4.9",
    time: "20-30 min",
    emoji: "🍛",
    color: "mint",
    menu: [
      { id: "paneer-tikka", name: "Paneer Tikka Bowl", description: "Smoky paneer, rice and mint chutney", price: 229, emoji: "🍲" },
      { id: "butter-naan", name: "Butter Naan (2 pcs)", description: "Soft tandoor-baked naan", price: 79, emoji: "🫓" },
      { id: "gulab-jamun", name: "Gulab Jamun", description: "Two warm syrup-soaked delights", price: 89, emoji: "🍮" }
    ]
  },
  {
    id: "green-bowl",
    name: "The Green Bowl",
    cuisine: "Healthy",
    rating: "4.6",
    time: "15-25 min",
    emoji: "🥗",
    color: "yellow",
    menu: [
      { id: "rainbow-bowl", name: "Rainbow Power Bowl", description: "Quinoa, greens, avocado and tahini", price: 249, emoji: "🥗" },
      { id: "mango-smoothie", name: "Mango Smoothie", description: "Fresh mango blended with yogurt", price: 139, emoji: "🥭" },
      { id: "hummus-toast", name: "Hummus Toast", description: "Sourdough, hummus and crunchy veg", price: 169, emoji: "🍞" }
    ]
  }
];

export function filterRestaurants(list, query = "", cuisine = "All") {
  const normalizedQuery = query.trim().toLowerCase();
  return list.filter((restaurant) => {
    const matchesCuisine = cuisine === "All" || restaurant.cuisine === cuisine;
    const matchesQuery = !normalizedQuery || `${restaurant.name} ${restaurant.cuisine}`.toLowerCase().includes(normalizedQuery);
    return matchesCuisine && matchesQuery;
  });
}

export function calculateCartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function addMenuItem(cart, restaurantId, item) {
  if (cart.length && cart[0].restaurantId !== restaurantId) {
    return { cart, error: "Your cart has items from another restaurant. Please clear it before ordering here." };
  }
  const existing = cart.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    return {
      cart: cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem),
      error: ""
    };
  }
  return { cart: [...cart, { ...item, restaurantId, quantity: 1 }], error: "" };
}

function startApp() {
  const grid = document.querySelector("#restaurant-grid");
  if (!grid) return;

  const cart = [];
  let activeCuisine = "All";
  let activeRestaurant = null;
  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  const menuDialog = document.querySelector("#menu-dialog");
  const cartDialog = document.querySelector("#cart-dialog");

  const showToast = (message) => {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 2200);
  };

  function renderRestaurants() {
    const query = document.querySelector("#search-input").value;
    const visible = filterRestaurants(restaurants, query, activeCuisine);
    grid.innerHTML = visible.length ? visible.map((restaurant) => `
      <article class="restaurant-card">
        <button class="restaurant-art ${restaurant.color}" type="button" data-open="${restaurant.id}" aria-label="View ${restaurant.name} menu">
          <span class="food-emoji">${restaurant.emoji}</span><span class="delivery-badge">FREE DELIVERY</span>
        </button>
        <div class="restaurant-info">
          <div><h3>${restaurant.name}</h3><p>${restaurant.cuisine} <span>•</span> ${restaurant.time}</p></div>
          <span class="rating">★ ${restaurant.rating}</span>
        </div>
      </article>`).join("") : '<p class="empty-state">No restaurants found. Try another search or cuisine.</p>';
  }

  function renderFilters() {
    const cuisines = ["All", ...new Set(restaurants.map((restaurant) => restaurant.cuisine))];
    document.querySelector("#filters").innerHTML = cuisines.map((cuisine) =>
      `<button class="filter-chip ${cuisine === activeCuisine ? "selected" : ""}" type="button" data-cuisine="${cuisine}">${cuisine}</button>`
    ).join("");
  }

  function renderCart() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#cart-count").textContent = totalQuantity;
    document.querySelector("#cart-total").textContent = currency.format(calculateCartTotal(cart));
    const cartItems = document.querySelector("#cart-items");
    cartItems.innerHTML = cart.length ? cart.map((item) => `
      <div class="cart-row">
        <span class="cart-emoji">${item.emoji}</span>
        <div class="cart-row-copy"><strong>${item.name}</strong><span>${currency.format(item.price)} × ${item.quantity}</span></div>
        <button class="remove-item" type="button" data-remove="${item.id}" aria-label="Remove ${item.name}">−</button>
        <button class="add-item" type="button" data-add="${item.id}" aria-label="Add another ${item.name}">+</button>
      </div>`).join("") : '<p class="empty-state">Your cart is empty. Pick something delicious!</p>';
    document.querySelector("#checkout-form .primary-button").disabled = cart.length === 0;
  }

  renderFilters();
  renderRestaurants();
  renderCart();

  document.querySelector("#search-input").addEventListener("input", renderRestaurants);
  document.querySelector("#filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-cuisine]");
    if (!button) return;
    activeCuisine = button.dataset.cuisine;
    renderFilters();
    renderRestaurants();
  });
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    activeRestaurant = restaurants.find((restaurant) => restaurant.id === button.dataset.open);
    document.querySelector("#menu-title").textContent = activeRestaurant.name;
    document.querySelector("#menu-items").innerHTML = activeRestaurant.menu.map((item) => `
      <article class="menu-item">
        <span class="menu-emoji">${item.emoji}</span>
        <div class="menu-item-copy"><h3>${item.name}</h3><p>${item.description}</p><strong>${currency.format(item.price)}</strong></div>
        <button class="add-item" type="button" data-menu-add="${item.id}">Add +</button>
      </article>`).join("");
    menuDialog.showModal();
  });
  document.querySelector("#menu-items").addEventListener("click", (event) => {
    const button = event.target.closest("[data-menu-add]");
    if (!button || !activeRestaurant) return;
    const item = activeRestaurant.menu.find((menuItem) => menuItem.id === button.dataset.menuAdd);
    const result = addMenuItem(cart, activeRestaurant.id, item);
    if (result.error) return showToast(result.error);
    cart.splice(0, cart.length, ...result.cart);
    renderCart();
    button.textContent = "Added ✓";
    window.setTimeout(() => { button.textContent = "Add +"; }, 900);
    showToast(`${item.name} added to your cart`);
  });
  document.querySelector("#cart-button").addEventListener("click", () => cartDialog.showModal());
  document.querySelector("#cart-items").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove]");
    const addButton = event.target.closest("[data-add]");
    const itemId = removeButton?.dataset.remove || addButton?.dataset.add;
    if (!itemId) return;
    const index = cart.findIndex((item) => item.id === itemId);
    if (removeButton) {
      cart[index].quantity -= 1;
      if (cart[index].quantity === 0) cart.splice(index, 1);
    } else {
      cart[index].quantity += 1;
    }
    renderCart();
  });
  document.querySelector("#checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const error = document.querySelector("#checkout-error");
    error.textContent = "";
    if (!form.reportValidity() || !cart.length) {
      error.textContent = "Please provide your name and a valid delivery address.";
      return;
    }
    const orderId = `CR-${Date.now().toString().slice(-6)}`;
    document.querySelector("#order-section").hidden = false;
    document.querySelector("#order-status").textContent = "Confirmed";
    document.querySelector("#order-message").textContent = `Thanks, ${form.elements.name.value.trim()}! Order ${orderId} is confirmed. Estimated delivery: 25–35 minutes.`;
    cart.splice(0, cart.length);
    renderCart();
    form.reset();
    cartDialog.close();
    document.querySelector("#order-section").scrollIntoView({ behavior: "smooth" });
    showToast("Your order has been placed!");
  });
  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => {
    document.getElementById(button.dataset.close).close();
  }));
}

if (typeof document !== "undefined") startApp();
