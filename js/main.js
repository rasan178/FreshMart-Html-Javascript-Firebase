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
    }, 2000);

    closeOffer.addEventListener('click', () => {
      specialOffer.classList.add('hidden');
    });
  }

  // Login Pop-up
  const loginToggle = document.querySelector('#login-toggle');
  const loginPopup = document.querySelector('#login-popup');
  const closeLogin = document.querySelector('#close-login');
  const loginForm = document.querySelector('#login-form');

  function toggleLoginPopup(show) {
    if (show) {
      loginPopup.classList.remove('hidden');
      loginPopup.querySelector('.bg-white').classList.remove('scale-95', 'opacity-0');
      document.body.classList.add('blurred', 'overflow-hidden');
    } else {
      loginPopup.classList.add('hidden');
      loginPopup.querySelector('.bg-white').classList.add('scale-95', 'opacity-0');
      document.body.classList.remove('blurred', 'overflow-hidden');
    }
  }

  if (loginToggle && loginPopup) {
    loginToggle.addEventListener('click', () => toggleLoginPopup(true));
  }

  if (closeLogin) {
    closeLogin.addEventListener('click', () => toggleLoginPopup(false));
  }

  if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
      if (e.target === loginPopup) {
        toggleLoginPopup(false);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !loginPopup.classList.contains('hidden')) {
      toggleLoginPopup(false);
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Login submitted:', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      });
      toggleLoginPopup(false);
    });
  }

  // Cart Pop-up
  const cartToggle = document.querySelector('#cart-toggle');
  const cartPopup = document.querySelector('#cart-popup');
  const closeCart = document.querySelector('#close-cart');

  function toggleCartPopup(show) {
    if (show) {
      cartPopup.classList.remove('hidden');
      cartPopup.querySelector('.bg-white').classList.remove('scale-95', 'opacity-0');
    } else {
      cartPopup.classList.add('hidden');
      cartPopup.querySelector('.bg-white').classList.add('scale-95', 'opacity-0');
    }
  }

  if (cartToggle && cartPopup) {
    cartToggle.addEventListener('click', () => toggleCartPopup(true));
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => toggleCartPopup(false));
  }

  if (cartPopup) {
    cartPopup.addEventListener('click', (e) => {
      if (e.target === cartPopup) {
        toggleCartPopup(false);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cartPopup.classList.contains('hidden')) {
      toggleCartPopup(false);
    }
  });
});

// Login Pop-up
  const loginToggle = document.querySelector('#login-toggle');
  const loginPopup = document.querySelector('#login-popup');
  const closeLogin = document.querySelector('#close-login');
  const loginForm = document.querySelector('#login-form');

  function toggleLoginPopup(show) {
    if (show) {
      loginPopup.classList.remove('hidden');
      loginPopup.querySelector('div').classList.remove('scale-95', 'opacity-0');
      document.body.classList.add('blurred', 'overflow-hidden');
    } else {
      loginPopup.classList.add('hidden');
      loginPopup.querySelector('div').classList.add('scale-95', 'opacity-0');
      document.body.classList.remove('blurred', 'overflow-hidden');
    }
  }

  if (loginToggle && loginPopup) {
    loginToggle.addEventListener('click', () => toggleLoginPopup(true));
  }

  if (closeLogin) {
    closeLogin.addEventListener('click', () => toggleLoginPopup(false));
  }

  if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
      if (e.target === loginPopup) {
        toggleLoginPopup(false);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !loginPopup.classList.contains('hidden')) {
      toggleLoginPopup(false);
    }
  });

  // Placeholder for login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Login submitted:', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      });
      toggleLoginPopup(false); // Close pop-up after submission
    });
  }
;