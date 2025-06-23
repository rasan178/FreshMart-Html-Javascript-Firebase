document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  window.addToCart = function(product, price, image) {
    console.log(`Adding to cart: ${product}, ${price}, ${image}`);
    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, price, image, quantity: 1 });
    }
    saveCart();
    updateCart();
    showNotification(`${product} added to cart!`);
  };

  window.removeFromCart = function(product) {
    console.log(`Removing from cart: ${product}`);
    const itemIndex = cart.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
      const item = cart[itemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.splice(itemIndex, 1);
      }
      saveCart();
      updateCart();
      showNotification(`${product} removed from cart!`);
    }
  };

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCart() {
    console.log('Updating cart:', cart);
    const cartBadge = document.querySelector('#cart-badge');
    const cartTotal = document.querySelector('#cart-total');
    const cartItems = document.querySelector('#cart-items');

    if (!cartItems) {
      console.error('Cart items element not found!');
      return;
    }

    const totalItems = cart.length; // Count unique products
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartBadge.textContent = totalItems;
    cartTotal.textContent = `LKR ${totalPrice}`;

    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
      return;
    }

    cart.forEach(item => {
      try {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <img src="${item.image}" alt="${item.product}" onerror="this.src='assets/images/placeholder.jpg';">
          <span class="text-sm">${item.product}</span>
          <span class="text-sm">LKR ${item.price}</span>
          <div class="quantity-controls">
            <button class="btn-quantity" onclick="removeFromCart('${item.product}')">−</button>
            <span>${item.quantity}</span>
            <button class="btn-quantity" onclick="addToCart('${item.product}', ${item.price}, '${item.image}')">+</button>
          </div>
          <span class="text-sm">LKR ${item.price * item.quantity}</span>
          <button class="btn-trash" onclick="removeFromCart('${item.product}')"><i class="fas fa-trash"></i></button>
        `;
        cartItems.appendChild(li);
        setTimeout(() => li.classList.add('visible'), 10);
      } catch (error) {
        console.error(`Error rendering item ${item.product}:`, error);
      }
    });
  }

  function showNotification(message) {
    console.log('Showing notification:', message);
    const notification = document.querySelector('#cart-notification');
    const messageElement = document.querySelector('#notification-message');
    
    if (notification && messageElement) {
      messageElement.textContent = message;
      notification.classList.remove('hidden');
      setTimeout(() => notification.classList.add('hidden'), 3000);
    } else {
      console.error('Notification elements not found!');
    }
  }

  // Initialize cart on page load
  updateCart();
});