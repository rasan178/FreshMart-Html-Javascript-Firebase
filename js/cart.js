/* cart.js - FreshMart Cart Management */
/* Last Updated: May 19, 2025, 09:26 PM +0530 */

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const id = card.dataset.id;
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    const cartItems = document.querySelector('#cart-items');
    const checkoutCart = document.querySelector('#checkout-cart');
    const updateCartDisplay = () => {
        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    <img src="../assets/images/products/${item.name.toLowerCase().replace(' ', '-')}.jpg" alt="${item.name}">
                    <span>${item.name}</span>
                    <span>LKR ${item.price}</span>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                `;
                cartItems.appendChild(div);
            });
        }

        if (checkoutCart) {
            checkoutCart.innerHTML = '<h3>Order Summary</h3>';
            cart.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>LKR ${item.price * item.quantity}</span>
                `;
                checkoutCart.appendChild(div);
            });
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (document.querySelector('#cart-total')) {
            document.querySelector('#cart-total').textContent = total.toFixed(2);
        }
    };

    if (cartItems) {
        cartItems.addEventListener('change', (e) => {
            if (e.target.tagName === 'INPUT') {
                const id = e.target.dataset.id;
                const quantity = parseInt(e.target.value);
                const item = cart.find(item => item.id === id);
                if (quantity > 0) {
                    item.quantity = quantity;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateCartDisplay();
            }
        });

        cartItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const id = e.target.dataset.id;
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateCartDisplay();
            }
        });
    }

    updateCartCount();
    updateCartDisplay();
});