FreshMart - Online Grocery Delivery in Sri Lanka
FreshMart is a responsive online grocery delivery website tailored for Sri Lankan customers. It offers a seamless shopping experience for groceries like rice, spices, vegetables, and fruits, with features such as a shopping cart, checkout system, user authentication, and a profile page. The site also includes a popup advertisement on page load to promote special offers.
Features

Homepage: Displays a hero banner and featured products with an "Add to Cart" option.
Products Page: Lists all available products with filtering by category and a search bar.
Cart Page: Shows items added to the cart with quantity adjustments and total price.
Checkout Page: Collects delivery details (name, address, phone) and payment method for order placement. Supports two payment methods:
Cash on Delivery: Processes the order directly.
Credit/Debit Card: Reveals fields for card number, expiry date, and CVV, with client-side validation for card details (16-digit card number, MM/YY expiry format, 3- or 4-digit CVV, and expiry date check).
Guest Checkout: Allows non-logged-in users to proceed with checkout by providing delivery details, with an option to sign up or sign in for a better experience.


About Page: Provides information about FreshMart's mission and services.
User Authentication:
Sign Up: Register with a username, email, password, and phone number.
Sign In: Log in using email and password.
Logout: Log out from the session.


Profile Page: Displays user details (username, email, phone) after logging in.
Navbar Updates: Shows "Sign In" and "Sign Up" links when logged out; displays "Logged in as [Username]", "Profile", and "Logout" when logged in.
Popup Ad: Displays a promotional offer (10% off with code FRESH10) when the site loads, with a close button.
Responsive Design: Fully responsive layout with a mobile-friendly navbar toggle.
Local Storage: Stores cart items, user data, and session information using localStorage.

File Structure
freshmart/
├── assets/
│   ├── icons/
│   │   └── cart.svg
│   └── images/
│       ├── banner.jpg
│       ├── logo.png
│       └── products/
│           ├── banana.jpg
│           ├── chickpea.jpg
│           ├── chili-powder.jpg
│           ├── coconut.jpg
│           ├── curry-powder.jpg
│           ├── dhal.jpg
│           ├── garlic.jpg
│           ├── green-beans.jpg
│           ├── mango.jpg
│           ├── mung-beans.jpg
│           ├── onion.jpg
│           ├── papaya.jpg
│           ├── red-rice.jpg
│           ├── tomato.jpg
│           └── turmeric-powder.jpg
├── css/
│   ├── reset.css
│   └── styles.css
├── js/
│   ├── auth.js
│   ├── cart.js
│   ├── checkout.js
│   ├── main.js
│   └── product.js
├── pages/
│   ├── about.html
│   ├── cart.html
│   ├── checkout.html
│   └── products.html
├── index.html
├── profile.html
├── signin.html
├── signup.html
└── README.md

Setup

Clone or Download the Project:

Clone the repository or download the project files to your local machine.


Open the Project:

Navigate to the project directory (freshmart/).


Run the Website:

Open index.html directly in a web browser (e.g., Chrome, Firefox).
Alternatively, you can use a local server for a better experience:
If you have Python installed, run python -m http.server 8000 in the project directory and access the site at http://localhost:8000.
Or use a tool like VS Code's Live Server extension to serve the files.




Test the Features:

Browse the homepage, add products to the cart, sign up, sign in, and proceed to checkout.
Test responsiveness by resizing the browser or using mobile view in developer tools.
Test guest checkout by adding items to the cart and proceeding without logging in.



Notes

Assets: Ensure all images in the assets/images/ and assets/images/products/ directories are present, as they are referenced in the HTML files.
Local Storage: The project uses localStorage to persist cart items, user data, and session information. Clearing the browser's local storage will reset the cart and user data.
External Dependency: The project uses Font Awesome for icons, loaded via a CDN (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css).
Browser Compatibility: Tested on modern browsers (Chrome, Firefox, Edge). Some features may not work as expected on older browsers due to the use of modern JavaScript (e.g., fetch, localStorage).

Last Updated

Date: May 19, 2025
Time: 02:01 PM +0530

