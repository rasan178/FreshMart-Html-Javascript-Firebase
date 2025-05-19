/* main.js - FreshMart Main JavaScript File */
/* Last Updated: May 19, 2025, 09:26 PM +0530 */

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle for Mobile
    const menuToggle = document.querySelector('.advanced-menu-toggle');
    const navLinks = document.querySelector('.advanced-nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Popup Ad (Only on Homepage)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const popup = document.getElementById('popup-ad');
        const closePopup = document.getElementById('close-popup');

        if (popup) {
            setTimeout(() => {
                popup.classList.add('active');
            }, 1000); // Show after 1 second
        }

        if (closePopup) {
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active');
            });
        }
    }

    // Update Cart Count in Navbar
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
        });
    };

    // Initial cart count update
    updateCartCount();

    // Listen for storage changes to update cart count
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            updateCartCount();
        }
    });

    // Update cart count on page load
    window.addEventListener('load', updateCartCount);

    // Scroll Effect for Navbar
    const navbar = document.querySelector('.advanced-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Contact Form Auto-Clear on Submission
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Since Formspree handles the submission, clear the form after a short delay
            setTimeout(() => {
                contactForm.reset(); // Reset the form fields
                alert('Message sent successfully! The form has been cleared.');
            }, 500); // Delay to simulate submission
        });
    }
});