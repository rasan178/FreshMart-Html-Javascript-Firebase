document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('category-filter');
    const display = document.getElementById('category-display');
    const selectedSpan = document.getElementById('category-selected');
    const dropdown = document.getElementById('category-dropdown');
    const options = document.querySelectorAll('.category-option');

    // Initialize selected value
    selectedSpan.textContent = select.value;

    // Toggle dropdown on display click
    display.addEventListener('click', () => {
        dropdown.classList.toggle('visible');
        display.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            select.value = value;
            selectedSpan.textContent = value;
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            dropdown.classList.remove('visible');
            display.classList.remove('active');
            select.dispatchEvent(new Event('change')); // Trigger filterProducts
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!display.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('visible');
            display.classList.remove('active');
        }
    });
});