document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.querySelector('#search-bar');
  const suggestionsContainer = document.querySelector('#search-suggestions');
  const productGrid = document.querySelector('#product-grid');
  const noResults = document.querySelector('#no-results');

  const products = [
    'Red Rice', 'Mysore Dhal', 'Fresh Coconut', 'Curry Powder', 'Tomatoes',
    'Green Beans', 'Mung Beans', 'Turmeric Powder', 'Bananas', 'Onions',
    'Chickpeas', 'Chili Powder', 'Mangoes', 'Garlic', 'Papaya'
  ];

  function filterProducts(query) {
    const productCards = productGrid.querySelectorAll('.product-card');
    let hasMatches = false;

    productCards.forEach(card => {
      const productName = card.querySelector('h3').textContent.toLowerCase();
      if (query.length < 2 || productName.includes(query.toLowerCase())) {
        card.classList.remove('hidden');
        if (query.length >= 2 && productName.includes(query.toLowerCase())) {
          hasMatches = true;
        }
      } else {
        card.classList.add('hidden');
      }
    });

    if (query.length >= 2 && !hasMatches) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  function showSuggestions(query) {
    suggestionsContainer.innerHTML = '';
    if (query.length < 2) {
      suggestionsContainer.classList.add('hidden');
      return;
    }

    const filteredProducts = products.filter(product =>
      product.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      suggestionsContainer.classList.add('hidden');
      return;
    }

    filteredProducts.forEach(product => {
      const suggestion = document.createElement('div');
      suggestion.className = 'px-4 py-2 text-gray-800 hover:bg-green-100 hover:text-green-600 cursor-pointer transition-colors duration-200';
      suggestion.textContent = product;
      suggestion.addEventListener('click', () => {
        searchBar.value = product;
        suggestionsContainer.classList.add('hidden');
        filterProducts(product);
      });
      suggestionsContainer.appendChild(suggestion);
    });

    suggestionsContainer.classList.remove('hidden');
  }

  searchBar.addEventListener('input', () => {
    const query = searchBar.value;
    showSuggestions(query);
    if (query.length === 0) {
      filterProducts(''); // Reset grid when search bar is cleared
    }
  });

  searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      suggestionsContainer.classList.add('hidden');
      filterProducts(searchBar.value);
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.classList.add('hidden');
    }
  });
});