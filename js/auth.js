function handleSignIn(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  // Simulate authentication
  if (email && password) {
    alert('Sign in successful!'); // Replace with actual auth logic
    window.location.href = 'profile.html';
  } else {
    alert('Please fill in all fields.');
  }
}

function handleSignUp(event) {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
  if (name && email && password) {
    alert('Sign up successful!'); // Replace with actual auth logic
    window.location.href = 'profile.html';
  } else {
    alert('Please fill in all fields.');
  }
}