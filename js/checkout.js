/* checkout.js - FreshMart Checkout Logic */
/* Last Updated: May 19, 2025, 09:58 PM +0530 */

document.addEventListener('DOMContentLoaded', () => {
    const paymentMethod = document.querySelector('#payment');
    const cardDetails = document.querySelector('#card-details');
    const cardNumber = document.querySelector('#card-number');
    const cardExpiry = document.querySelector('#card-expiry');
    const cardCvv = document.querySelector('#card-cvv');
    const placeOrderButton = document.querySelector('#place-order');
    const checkoutForm = document.querySelector('#checkout-form');
    const guestPrompt = document.querySelector('#guest-prompt');
    const continueGuestButton = document.querySelector('#continue-guest');
    const deliveryDetails = document.querySelector('#delivery-details');

    // Initialize Firebase Authentication
    const auth = firebase.auth();

    // Show guest prompt or delivery details based on auth state
    auth.onAuthStateChanged((user) => {
        if (!user && guestPrompt && deliveryDetails) {
            guestPrompt.classList.remove('hidden');
            deliveryDetails.classList.add('hidden');
        } else if (deliveryDetails) {
            deliveryDetails.classList.remove('hidden');
            // Pre-fill name if user is logged in (phone isn't stored in Firebase Auth by default, so left blank)
            if (user) {
                document.querySelector('#name').value = user.displayName || user.email.split('@')[0];
            }
        }
    });

    // Continue as Guest button handler
    if (continueGuestButton) {
        continueGuestButton.addEventListener('click', () => {
            if (guestPrompt && deliveryDetails) {
                guestPrompt.classList.add('hidden');
                deliveryDetails.classList.remove('hidden');
            }
        });
    }

    // Toggle card details visibility based on payment method
    if (paymentMethod && cardDetails) {
        paymentMethod.addEventListener('change', () => {
            if (paymentMethod.value === 'card') {
                cardDetails.classList.remove('hidden');
                // Make card fields required when visible
                cardNumber.setAttribute('required', 'true');
                cardExpiry.setAttribute('required', 'true');
                cardCvv.setAttribute('required', 'true');
            } else {
                cardDetails.classList.add('hidden');
                // Remove required attribute when hidden
                cardNumber.removeAttribute('required');
                cardExpiry.removeAttribute('required');
                cardCvv.removeAttribute('required');
            }
        });
    }

    // Handle order placement
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default form submission behavior

            const name = document.querySelector('#name').value.trim();
            const address = document.querySelector('#address').value.trim();
            const phone = document.querySelector('#phone').value.trim();
            const payment = document.querySelector('#payment').value;

            // Validate basic delivery details
            if (!name || !address || !phone || !payment) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number (e.g., 0712345678).');
                return;
            }

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }

            // If payment method is Credit/Debit Card, validate card details
            if (payment === 'card') {
                const cardNumValue = cardNumber.value.trim();
                const cardExpiryValue = cardExpiry.value.trim();
                const cardCvvValue = cardCvv.value.trim();

                // Validate card number (16 digits, with or without spaces)
                if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumValue)) {
                    alert('Please enter a valid 16-digit card number (e.g., 1234 5678 9012 3456).');
                    return;
                }

                // Validate expiry date (MM/YY format)
                if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardExpiryValue)) {
                    alert('Please enter a valid expiry date in MM/YY format (e.g., 12/25).');
                    return;
                }

                // Validate expiry date is not in the past
                const [month, year] = cardExpiryValue.split('/').map(Number);
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear() % 100; // Get last two digits of year
                const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS
                const expiryYear = parseInt(year);
                const expiryMonth = parseInt(month);

                if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                    alert('Your card has expired. Please use a valid card.');
                    return;
                }

                // Validate CVV (3 or 4 digits)
                if (!/^\d{3,4}$/.test(cardCvvValue)) {
                    alert('Please enter a valid CVV (3 or 4 digits).');
                    return;
                }
            }

            // Simulate order placement
            alert(`Order placed successfully!\n\nDelivery Details:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nPayment Method: ${payment === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}`);
            
            // Clear the cart after successful order
            localStorage.removeItem('cart');
            
            // Redirect to homepage
            window.location.href = '../index.html';
        });
    }
});