/* auth.js - FreshMart Authentication Logic */
/* Last Updated: May 19, 2025, 11:18 PM +0530 */

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjOm18RJrGcRVbf8lbEa8ITx19qhfzEsw",
  authDomain: "freshmartweb-178.firebaseapp.com",
  projectId: "freshmartweb-178",
  storageBucket: "freshmartweb-178.firebasestorage.app",
  messagingSenderId: "75942703283",
  appId: "1:75942703283:web:24086cd6d980e16541c0c6"
};

// Global variables
let app;
let db;
let auth;

// Initialize Firebase with a simpler, more reliable approach
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Firebase');
    initializeFirebase();
});

function initializeFirebase() {
    try {
        // Wait for Firebase to be available
        if (typeof firebase === 'undefined') {
            console.log('Firebase not yet available, retrying in 100ms');
            setTimeout(initializeFirebase, 100);
            return;
        }
        
        // Initialize Firebase if not already initialized
        if (!firebase.apps || firebase.apps.length === 0) {
            console.log('Initializing Firebase');
            app = firebase.initializeApp(firebaseConfig);
        } else {
            console.log('Firebase already initialized');
            app = firebase.app();
        }
        
        // Initialize Firebase services
        auth = firebase.auth();
        db = firebase.firestore();
        
        console.log('Firebase services initialized successfully');
        
        // Setup authentication listeners and form handlers
        setupAuthFunctionality();
        
    } catch (error) {
        console.error('Firebase initialization error:', error);
        // Retry initialization after a delay
        setTimeout(initializeFirebase, 500);
    }
}

function setupAuthFunctionality() {
    console.log('Setting up auth functionality');

    // Update UI based on authentication state
    auth.onAuthStateChanged((user) => {
        console.log('Auth state changed:', user ? user.email : 'No user');
        updateNavbar(user);
        const authStatus = document.getElementById('auth-status');
        if (authStatus) {
            authStatus.textContent = user ? `Authenticated as: ${user.email}` : 'Not authenticated';
        }
    });

    // Handle signup form
    setupSignupForm();
    
    // Handle signin form
    setupSigninForm();
    
    // Handle logout
    setupLogout();
    
    // Handle profile page
    setupProfilePage();
}

function updateNavbar(user) {
    const authLinks = document.getElementById('auth-links');
    const userDropdown = document.getElementById('user-dropdown');
    const userInfo = document.getElementById('user-info');
    
    if (user) {
        if (authLinks) authLinks.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'block';
        if (userInfo) userInfo.textContent = user.email || 'User';
    } else {
        if (authLinks) authLinks.style.display = 'flex';
        if (userDropdown) userDropdown.style.display = 'none';
    }
}

function setupSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const authStatus = document.getElementById('auth-status');
    
    if (!signupForm) {
        console.log('Signup form not found in DOM, skipping setup');
        return;
    }
    
    console.log('Signup form found, attaching event listener');
    
    // Clear any existing event listeners to prevent duplicates
    const newForm = signupForm.cloneNode(true);
    signupForm.parentNode.replaceChild(newForm, signupForm);
    
    // Add submit event handler to the new form
    newForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Signup form submission triggered');
        
        if (authStatus) {
            authStatus.textContent = 'Processing signup...';
            authStatus.style.color = 'blue';
        }
        
        // Validate form
        if (!newForm.checkValidity()) {
            console.error('Form validation failed:', newForm.validationMessage);
            if (authStatus) {
                authStatus.textContent = 'Please correct the form errors.';
                authStatus.style.color = 'red';
            }
            newForm.reportValidity();
            return;
        }
        
        // Get form data
        const username = newForm.username.value.trim();
        const email = newForm.email.value.trim();
        const password = newForm.password.value.trim();
        const phone = newForm.phone.value.trim();
        
        console.log('Form data collected:', { username, email, phone: phone });
        
        if (!username || !email || !password || !phone) {
            console.error('Missing required fields');
            if (authStatus) {
                authStatus.textContent = 'Please fill in all fields.';
                authStatus.style.color = 'red';
            }
            return;
        }
        
        try {
            // Create the user
            console.log('Creating user in Firebase Auth');
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User created successfully:', user.uid);
            
            // Store user data in Firestore
            console.log('Saving user data to Firestore');
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                phone: phone,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            console.log('User data successfully written to Firestore');
            
            // Show success message
            if (authStatus) {
                authStatus.textContent = `Success! Signed up as: ${email}`;
                authStatus.style.color = 'green';
            }
            
            // Clear the form
            newForm.reset();
            
            // Redirect to signin page
            console.log('Signup successful, redirecting to signin');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1000);
            
        } catch (error) {
            console.error('Signup failed:', error);
            if (authStatus) {
                authStatus.textContent = `Error: ${error.message}`;
                authStatus.style.color = 'red';
            }
        }
    });
    
    // Add click handler to the submit button as a fallback
    const signupButton = newForm.querySelector('button[type="submit"]');
    if (signupButton) {
        signupButton.addEventListener('click', (e) => {
            // Submit the form if it's valid
            if (newForm.checkValidity()) {
                if (!e.handled) {
                    e.handled = true;
                    // Form will handle the submission
                    newForm.dispatchEvent(new Event('submit'));
                }
            } else {
                newForm.reportValidity();
            }
        });
        console.log('Added backup click handler to signup button');
    }
}

function setupSigninForm() {
    const signinForm = document.getElementById('signin-form');
    const authStatus = document.getElementById('auth-status');
    
    if (!signinForm) {
        console.log('Signin form not found, skipping setup');
        return;
    }
    
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = signinForm.email.value;
        const password = signinForm.password.value;
        
        console.log('Signin attempt started with:', { email });
        
        if (authStatus) authStatus.textContent = 'Signing in...';
        
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User signed in:', user.uid, user.email);
            
            if (authStatus) authStatus.textContent = `Signed in as: ${user.email}`;
            signinForm.reset();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        } catch (error) {
            console.error('Signin failed:', error);
            if (authStatus) {
                authStatus.textContent = `Error: ${error.message}`;
                authStatus.style.color = 'red';
            }
        }
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logout');
    const authStatus = document.getElementById('auth-status');
    
    if (!logoutBtn) {
        console.log('Logout button not found, skipping setup');
        return; 
    }
    
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await auth.signOut();
            console.log('User logged out successfully');
            
            if (authStatus) {
                authStatus.textContent = 'Logged out successfully';
                authStatus.style.color = 'green';
            }
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        } catch (error) {
            console.error('Logout failed:', error);
            if (authStatus) {
                authStatus.textContent = `Error: ${error.message}`;
                authStatus.style.color = 'red';
            }
        }
    });
}

function setupProfilePage() {
    const profileDetails = document.getElementById('profile-details');
    
    if (!profileDetails) {
        console.log('Profile details element not found, skipping setup');
        return;
    }
    
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log('Fetching profile data for user:', user.uid);
            fetchProfileData(user, profileDetails);
        } else {
            console.log('No user authenticated, redirecting to signin');
            alert('Please sign in to view your profile!');
            window.location.href = 'signin.html';
        }
    });
}

async function fetchProfileData(user, profileDetails) {
    try {
        const doc = await db.collection('users').doc(user.uid).get();
        
        if (doc.exists) {
            const userData = doc.data();
            console.log('Profile data fetched:', userData);
            
            profileDetails.innerHTML = `
                <p><strong>Username:</strong> ${userData.username || 'N/A'}</p>
                <p><strong>Email:</strong> ${userData.email || user.email}</p>
                <p><strong>Phone:</strong> ${userData.phone || 'N/A'}</p>
            `;
        } else {
            console.warn('No user data found in Firestore for UID:', user.uid);
            profileDetails.innerHTML = `<p>No user data found. Please contact support.</p>`;
        }
    } catch (error) {
        console.error('Error fetching user data from Firestore:', error);
        profileDetails.innerHTML = `<p>Error fetching user data: ${error.message}</p>`;
    }
}