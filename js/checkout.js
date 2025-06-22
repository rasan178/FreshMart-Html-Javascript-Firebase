function handleCheckout(event) {
  event.preventDefault();
  const name = document.querySelector('#full-name').value;
  const address = document.querySelector('#delivery-address').value;
  const phone = document.querySelector('#phone-number').value;
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
  if (name && address && phone && paymentMethod) {
    alert('Order placed successfully!'); // Replace with actual checkout logic
    window.location.href = 'index.html';
  } else {
    alert('Please fill in all required fields.');
  }
}