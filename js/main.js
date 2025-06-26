document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
      navToggle.textContent = navMenu.classList.contains('hidden') ? '☰' : '×';
    });
  }

  // Slideshow
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    setInterval(nextSlide, 5000);
  }

  // Special Offer Pop-up
  const specialOffer = document.querySelector('#special-offer');
  const closeOffer = document.querySelector('#close-offer');

  if (specialOffer && closeOffer) {
    setTimeout(() => {
      specialOffer.classList.remove('hidden');
      specialOffer.querySelector('.bg-white').classList.remove('scale-95', 'opacity-0');
      document.body.classList.add('blurred', 'overflow-hidden');
    }, 2000);

    closeOffer.addEventListener('click', () => {
      specialOffer.classList.add('hidden');
      document.body.classList.remove('blurred', 'overflow-hidden');
    });

    specialOffer.addEventListener('click', (e) => {
      if (e.target === specialOffer) {
        specialOffer.classList.add('hidden');
        document.body.classList.remove('blurred', 'overflow-hidden');
      }
    });
  }

  // Login and Signup Pop-ups
  const loginToggle = document.querySelector('#login-toggle');
  const loginPopup = document.querySelector('#login-popup');
  const closeLogin = document.querySelector('#close-login');
  const loginForm = document.querySelector('#login-form');
  const showSignup = document.querySelector('#show-signup');
  const signupPopup = document.querySelector('#signup-popup');
  const closeSignup = document.querySelector('#close-signup');
  const signupForm = document.querySelector('#signup-form');
  const showLogin = document.querySelector('#show-login');

  function togglePopup(popup, show) {
    if (show) {
      popup.classList.remove('hidden');
      popup.querySelector('.bg-gray-50').classList.remove('scale-95', 'opacity-0');
      document.body.classList.add('blurred', 'overflow-hidden');
    } else {
      popup.classList.add('hidden');
      popup.querySelector('.bg-gray-50').classList.add('scale-95', 'opacity-0');
      document.body.classList.remove('blurred', 'overflow-hidden');
    }
  }

  // Login Popup
  if (loginToggle && loginPopup) {
    loginToggle.addEventListener('click', () => togglePopup(loginPopup, true));
  }

  if (closeLogin) {
    closeLogin.addEventListener('click', () => togglePopup(loginPopup, false));
  }

  if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
      if (e.target === loginPopup) {
        togglePopup(loginPopup, false);
      }
    });
  }

  // 🛑 Disable login form handler (handled by auth.js)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // Signup Popup
  if (showSignup && signupPopup) {
    showSignup.addEventListener('click', () => {
      togglePopup(loginPopup, false);
      togglePopup(signupPopup, true);
    });
  }

  if (closeSignup) {
    closeSignup.addEventListener('click', () => togglePopup(signupPopup, false));
  }

  if (signupPopup) {
    signupPopup.addEventListener('click', (e) => {
      if (e.target === signupPopup) {
        togglePopup(signupPopup, false);
      }
    });
  }

  if (showLogin && loginPopup) {
    showLogin.addEventListener('click', () => {
      togglePopup(signupPopup, false);
      togglePopup(loginPopup, true);
    });
  }

  // 🛑 Disable signup form handler (handled by auth.js)
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // Cart Pop-up
  const cartToggle = document.querySelector('#cart-toggle');
  const cartPopup = document.querySelector('#cart-popup');
  const closeCart = document.querySelector('#close-cart');

  if (cartToggle && cartPopup) {
    cartToggle.addEventListener('click', () => togglePopup(cartPopup, true));
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => togglePopup(cartPopup, false));
  }

  if (cartPopup) {
    cartPopup.addEventListener('click', (e) => {
      if (e.target === cartPopup) {
        togglePopup(cartPopup, false);
      }
    });
  }

  // Cart Notification
  const notification = document.getElementById('cart-notification');
  const notificationMessage = document.getElementById('notification-message');

  function showNotification(message) {
    if (notification && notificationMessage) {
      notificationMessage.textContent = message;
      notification.classList.remove('hidden');
      notification.classList.add('opacity-100', 'translate-y-0');

      // Hide after 3 seconds
      setTimeout(() => {
        notification.classList.remove('opacity-100', 'translate-y-0');
        notification.classList.add('opacity-0', 'translate-y-10');
        setTimeout(() => notification.classList.add('hidden'), 300);
      }, 3000);
    }
  }

  // Trigger notification on "Add to Cart" button click
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showNotification('Item added to cart!');
    });
  });

  // Trigger notification on "Remove from Cart" button click
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-button');
  removeFromCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      showNotification('Item removed from cart!');
    });
  });

  // Close popups on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (loginPopup && !loginPopup.classList.contains('hidden')) {
        togglePopup(loginPopup, false);
      }
      if (signupPopup && !signupPopup.classList.contains('hidden')) {
        togglePopup(signupPopup, false);
      }
      if (cartPopup && !cartPopup.classList.contains('hidden')) {
        togglePopup(cartPopup, false);
      }
    }
  });
});
