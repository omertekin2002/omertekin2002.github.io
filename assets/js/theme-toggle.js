document.addEventListener('DOMContentLoaded', () => {
    // Select ALL theme toggle buttons (desktop and mobile)
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');
    const body = document.body;

    // Function to update all icons
    const updateIcons = (isDark) => {
        toggleBtns.forEach(btn => {
            const iconSpan = btn.querySelector('.icon');
            if (iconSpan) {
                iconSpan.textContent = isDark ? '🌙' : '☀️';
            }
        });
    };

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateIcons(true);
    }

    // Add click event to ALL buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                updateIcons(false);
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                updateIcons(true);
                localStorage.setItem('theme', 'dark');
            }
        });
    });
});
