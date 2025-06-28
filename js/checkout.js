function handleCheckout(event) {
  event.preventDefault();
  const name = document.querySelector('#full-name').value.trim();
  const address = document.querySelector('#delivery-address').value.trim();
  const phone = document.querySelector('#phone-number').value.trim();
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  const cardNumber = document.querySelector('#card-number')?.value.trim();
  const cardExpiry = document.querySelector('#card-expiry')?.value.trim();
  const cardCvv = document.querySelector('#card-cvv')?.value.trim();

  // Basic validation
  if (!name || !address || !phone) {
    alert('Please fill in all required fields (Name, Address, Phone).');
    return;
  }

  // Validate phone number (simple regex for 10-digit numbers)
  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  if (paymentMethod === 'card') {
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }
    if (!cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
      alert('Please enter a valid card expiry date (MM/YY).');
      return;
    }
    if (!cardCvv || !/^\d{3}$/.test(cardCvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }
  }

  // Simulate order placement
  alert('Order placed successfully!');
  localStorage.removeItem('cart'); // Clear cart
  document.querySelector('#checkout-popup').classList.add('hidden');
  window.location.href = 'index.html';
}