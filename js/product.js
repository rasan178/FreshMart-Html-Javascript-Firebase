/* product.js - FreshMart Product Filtering and Search */
/* Last Updated: May 19, 2025, 09:52 PM +0530 */

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('#search-bar');
    const categoryFilter = document.querySelector('#category-filter');
    const productGrid = document.querySelector('#product-grid');
    const products = Array.from(productGrid.children);

    const filterProducts = () => {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        products.forEach(product => {
            const name = product.querySelector('.product-title').textContent.toLowerCase();
            const category = product.dataset.category;

            const matchesSearch = name.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    };

    searchBar.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
});