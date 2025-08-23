document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#productForm")) {
    document.querySelector('#productForm').addEventListener('submit', addProduct);
    showProducts();
  }

  if (document.querySelector("#cartContainer")) {
    showCart();
  }

  updateCartCount();
});

// ======================= CART BADGE =======================
function updateCartCount() {
  let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
  const totalItems = cartList.reduce((sum, item) => sum + item.count, 0);

  const badge = document.querySelector('#cartCount');
  if (badge) {
    badge.textContent = totalItems;
  }
}

// ======================= ADD PRODUCT =======================
function addProduct(e) {
  e.preventDefault();

  const category = document.querySelector('#productCategory').value;
  const name = document.querySelector('#productName').value.trim().toUpperCase();
  const url = document.querySelector('#productImage').value;
  const price = document.querySelector('#productPrice').value;
  const description = document.querySelector('#productDesc').value.trim();

  const productList = JSON.parse(localStorage.getItem('productList')) || [];

  const newProduct = {
    id: Date.now(),
    category,
    name,
    url,
    price,
    description
  };

  productList.push(newProduct);
  localStorage.setItem('productList', JSON.stringify(productList));

  document.querySelector('#productForm').reset();
  showProducts();
  updateCartCount();
}

// ======================= SHOW PRODUCTS =======================
function showProducts() {
  const productList = JSON.parse(localStorage.getItem('productList')) || [];
  const container = document.querySelector('#productList');
  if (!container) return;

  container.innerHTML = productList.length === 0 ? `
    <div class="col-12 text-center p-5">
      <h4 class="text-muted">No products added yet.</h4>
    </div>
  ` : productList.map(product => `
    <div class="col-lg-4 col-md-6">
      <div class="card shadow-sm mb-4 border-0">
        <img src="${product.url}" class="card-img-top" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="text-muted small">Category: ${product.category}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">₹${product.price}</span>
            <div>
              <button onclick="addToCart(${product.id})" class="btn btn-sm btn-warning me-2">Add to Cart</button>
              <button onclick="removeProduct(${product.id})" class="btn btn-sm btn-danger me-2">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ======================= ADD TO CART =======================
function addToCart(id) {
  const productList = JSON.parse(localStorage.getItem('productList')) || [];
  let cartList = JSON.parse(localStorage.getItem('cartList')) || [];

  const product = productList.find(p => p.id === id);
  const exist = cartList.find(c => c.id === id);

  if (exist) {
    exist.count += 1;
  } else {
    cartList.push({ ...product, count: 1 });
  }

  localStorage.setItem('cartList', JSON.stringify(cartList));
  updateCartCount();

  alert("Item added to cart");
}

// ======================= SHOW CART =======================
function showCart() {
  const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
  const container = document.querySelector('#cartContainer');

  if (cartList.length === 0) {
    container.innerHTML = `<div class="text-center mt-5"><h3>Your cart is empty</h3></div>`;
    return;
  }

  container.innerHTML = cartList.map(cart => `
    <div class="card mb-4 shadow-sm border-0">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${cart.url}" class="img-fluid h-100 object-fit-cover">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4>${cart.name}</h4>
            <p><strong>Description:</strong> ${cart.description}</p>
            <p><strong>Category:</strong> ${cart.category}</p>
            <p><strong>Price:</strong> ₹${cart.price}</p>
            <p><strong>Quantity:</strong> ${cart.count}</p>
            <p><strong>Total:</strong> ₹${cart.price * cart.count}</p>
            <button onclick="removeCartItem(${cart.id})" class="btn btn-outline-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ======================= REMOVE CART ITEM =======================
function removeCartItem(id) {
  let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
  cartList = cartList.filter(cart => cart.id !== id);
  localStorage.setItem('cartList', JSON.stringify(cartList));
  showCart();
  updateCartCount();
}

// ======================= REMOVE PRODUCT =======================
function removeProduct(id) {
  let productList = JSON.parse(localStorage.getItem('productList')) || [];
  productList = productList.filter(product => product.id !== id);
  localStorage.setItem('productList', JSON.stringify(productList));
  showProducts();
  alert("Product removed successfully!");
}
