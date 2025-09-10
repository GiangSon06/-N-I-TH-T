// Banner slider
let slideIndex = 0;
const slides = document.querySelectorAll(".banner img");

function showSlide() {
  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });
  slideIndex = (slideIndex + 1) % slides.length;
}
showSlide();
setInterval(showSlide, 3000);

// Giỏ hàng
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartPopup = document.getElementById("cart-popup");

function addToCart(button) {
  const card = button.closest(".product-card");
  const name = card.getAttribute("data-name");
  const price = parseInt(card.getAttribute("data-price"));

  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - ${item.price.toLocaleString()}đ</span>
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1); // Xóa sản phẩm tại vị trí index
  updateCart();
}

function toggleCart() {
  cartPopup.style.display =
    cartPopup.style.display === "block" ? "none" : "block";
}

function clearCart() {
  cart = [];
  updateCart();
}
// Lọc sản phẩm theo danh mục
function filterCategory(category) {
  const products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    if (
      category === "all" ||
      product.getAttribute("data-category") === category
    ) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
// 🔍 Tìm kiếm sản phẩm
const searchBox = document.getElementById("search-box");
const productCards = document.querySelectorAll(".product-card");

searchBox.addEventListener("keyup", function () {
  const keyword = searchBox.value.toLowerCase();
  productCards.forEach((card) => {
    const name = card.getAttribute("data-name").toLowerCase();
    if (name.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
