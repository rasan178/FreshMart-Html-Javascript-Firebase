document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  window.addToCart = function (product, price, image) {
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

  window.removeFromCart = function (product) {
    const itemIndex = cart.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
      const item = cart[itemIndex];
      item.quantity > 1 ? item.quantity-- : cart.splice(itemIndex, 1);
      saveCart();
      updateCart();
      showNotification(`${product} removed from cart!`);
    }
  };

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCart() {
    const cartBadge = document.querySelector('#cart-badge');
    const cartTotal = document.querySelector('#cart-total');
    const cartItems = document.querySelector('#cart-items');

    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartBadge.textContent = totalItems;
    cartTotal.textContent = `LKR ${totalPrice}`;

    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
      return;
    }

    cart.forEach(item => {
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
    });

    updateCheckout();
  }

  function showNotification(message) {
    const notification = document.querySelector('#cart-notification');
    const messageElement = document.querySelector('#notification-message');
    if (notification && messageElement) {
      messageElement.textContent = message;
      notification.classList.remove('hidden');
      setTimeout(() => notification.classList.add('hidden'), 3000);
    } else {
      alert(message);
    }
  }

  function updateCheckout() {
    const checkoutTotal = document.querySelector('#checkout-total');
    const checkoutItems = document.querySelector('#checkout-items');

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    checkoutTotal.textContent = `LKR ${totalPrice}`;

    checkoutItems.innerHTML = '';
    if (cart.length === 0) {
      checkoutItems.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
      return;
    }

    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${item.image}" alt="${item.product}" onerror="this.src='assets/images/placeholder.jpg';">
        <span class="text-sm">${item.product}</span>
        <span class="text-sm">LKR ${item.price}</span>
        <span class="text-sm">${item.quantity}</span>
        <span class="text-sm">LKR ${item.price * item.quantity}</span>
      `;
      checkoutItems.appendChild(li);
      setTimeout(() => li.classList.add('visible'), 10);
    });
  }

  function initPopups() {
    const cartToggle = document.querySelector('#cart-toggle');
    const cartPopup = document.querySelector('#cart-popup');
    const cartInner = document.querySelector('#cart-inner');
    const closeCart = document.querySelector('#close-cart');
    const proceedToCheckout = document.querySelector('#proceed-to-checkout');
    const checkoutPopup = document.querySelector('#checkout-popup');
    const checkoutInner = document.querySelector('#checkout-inner');
    const closeCheckout = document.querySelector('#close-checkout');

    cartToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      cartPopup.style.display = 'flex';
      setTimeout(() => {
        cartInner.style.transform = 'scale(1)';
        cartInner.style.opacity = '1';
      }, 10);
    });

    closeCart?.addEventListener('click', () => {
      cartInner.style.transform = 'scale(0.95)';
      cartInner.style.opacity = '0';
      setTimeout(() => {
        cartPopup.style.display = 'none';
      }, 300);
    });

    proceedToCheckout?.addEventListener('click', () => {
      if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
      }
      cartInner.style.transform = 'scale(0.95)';
      cartInner.style.opacity = '0';
      setTimeout(() => {
        cartPopup.style.display = 'none';
        checkoutPopup.style.display = 'flex';
        setTimeout(() => {
          checkoutInner.style.transform = 'scale(1)';
          checkoutInner.style.opacity = '1';
        }, 10);
      }, 300);
    });

    closeCheckout?.addEventListener('click', () => {
      checkoutInner.style.transform = 'scale(0.95)';
      checkoutInner.style.opacity = '0';
      setTimeout(() => {
        checkoutPopup.style.display = 'none';
      }, 300);
    });

    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardDetails = document.querySelector('#card-details');

    paymentMethods.forEach(method => {
      method.addEventListener('change', () => {
        cardDetails.style.display = method.value === 'card' ? 'block' : 'none';
      });
    });
  }

  updateCart();
  initPopups();
});
