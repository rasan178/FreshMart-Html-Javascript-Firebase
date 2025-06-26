// Ensure DOM is ready before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js").then(({ initializeApp }) => {
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js").then(({ 
      getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut 
    }) => {
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js").then(({ 
        getFirestore, doc, setDoc 
      }) => {

        // Firebase config
        const firebaseConfig = {
          apiKey: "AIzaSyBgyAI1vbCeAvVMajlIfoeuLcuyIvYxpJA",
          authDomain: "freshmartauth.firebaseapp.com",
          projectId: "freshmartauth",
          storageBucket: "freshmartauth.firebasestorage.app",
          messagingSenderId: "162196322478",
          appId: "1:162196322478:web:13d6f62db12815a70e953f",
          measurementId: "G-2QK4JRYCLV"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // DOM references
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const loginPopup = document.getElementById('login-popup');
        const signupPopup = document.getElementById('signup-popup');
        const closeLogin = document.getElementById('close-login');
        const closeSignup = document.getElementById('close-signup');
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');
        const loginToggle = document.getElementById('login-toggle');

        // Show message
        function showMessage(form, message, isSuccess = false) {
          const messageDiv = document.createElement('p');
          messageDiv.className = `text-sm mt-2 ${isSuccess ? 'text-green-500' : 'text-red-500'}`;
          messageDiv.textContent = message;
          const existingMessage = form.querySelector('p.text-sm');
          if (existingMessage) existingMessage.remove();
          form.appendChild(messageDiv);
          setTimeout(() => messageDiv.remove(), 3000);
        }

        // Signup handler
        if (signupForm) {
          signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Signup form submitted');

            const name = signupForm.querySelector('#name').value;
            const email = signupForm.querySelector('#signup-email').value;
            const password = signupForm.querySelector('#signup-password').value;
            const mobile = signupForm.querySelector('#mbno').value;

            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;

              await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                mobile,
                createdAt: new Date().toISOString()
              });

              console.log('User signed up & data stored:', user.uid);
              showMessage(signupForm, 'Sign up successful!', true);
              signupForm.reset();
              signupPopup.classList.add('hidden');
              loginToggle.textContent = 'Logout';

            } catch (error) {
              console.error('Signup error:', error.code, error.message);
              let errorMessage = 'Error signing up. Please try again.';
              if (error.code === 'auth/email-already-in-use') errorMessage = 'Email already in use.';
              if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email address.';
              if (error.code === 'auth/weak-password') errorMessage = 'Password too weak (min 6 characters).';
              showMessage(signupForm, errorMessage);
            }
          });
        }

        // Login handler
        if (loginForm) {
          loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Login form submitted');

            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;

            try {
              const userCredential = await signInWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;
              console.log('Login successful:', user.uid);
              loginForm.reset();
              loginPopup.classList.add('hidden');
              loginToggle.textContent = 'Logout';

            } catch (error) {
              console.error('Login error:', error.code, error.message);
              let errorMessage = 'Login failed. Please try again.';
              if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password.';
              }
              showMessage(loginForm, errorMessage);
            }
          });
        }

        // Toggle login/signup
        showSignup?.addEventListener('click', () => {
          loginPopup.classList.add('hidden');
          signupPopup.classList.remove('hidden');
          signupPopup.querySelector('div').classList.remove('scale-95', 'opacity-0');
        });

        showLogin?.addEventListener('click', () => {
          signupPopup.classList.add('hidden');
          loginPopup.classList.remove('hidden');
          loginPopup.querySelector('div').classList.remove('scale-95', 'opacity-0');
        });

        closeLogin?.addEventListener('click', () => {
          loginPopup.classList.add('hidden');
          loginForm?.reset();
        });

        closeSignup?.addEventListener('click', () => {
          signupPopup.classList.add('hidden');
          signupForm?.reset();
        });

        // Login/Logout toggle
        loginToggle?.addEventListener('click', async () => {
          if (auth.currentUser) {
            await signOut(auth);
            loginToggle.textContent = 'Login';
          } else {
            loginPopup.classList.remove('hidden');
            loginPopup.querySelector('div').classList.remove('scale-95', 'opacity-0');
          }
        });

        // Monitor auth state
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('User is signed in:', user.uid);
            loginToggle.textContent = 'Logout';
          } else {
            loginToggle.textContent = 'Login';
          }
        });

      }).catch(console.error);
    }).catch(console.error);
  }).catch(console.error);
});
