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
  const image = card.querySelector("img").src; // lấy ảnh sản phẩm

  // kiểm tra đã có trong giỏ chưa
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" style="width:50px;height:50px;object-fit:cover;margin-right:8px;border-radius:5px;">
      <div style="flex:1;">
        <p><strong>${item.name}</strong></p>
        <p>Giá: ${item.price.toLocaleString()}đ</p>
        <p>Số lượng: ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${index})">X</button>
    `;
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";
    li.style.borderBottom = "1px solid #eee";
    li.style.paddingBottom = "8px";

    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();
}

function removeFromCart(index) {
  cart.splice(index, 1);
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

function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
  } else {
    alert("Đi đến trang thanh toán (sau này sẽ kết nối backend).");
  }
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
