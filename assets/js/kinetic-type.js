document.addEventListener('DOMContentLoaded', () => {
    initMagneticText();
    initScrollReveal();
});

function initMagneticText() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    // Split text into spans
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';

    // Wrap each character in a span
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'magnetic-char';
        if (char === ' ') span.style.marginRight = '0.3em'; // Preserve spaces
        heroTitle.appendChild(span);
    });

    const chars = document.querySelectorAll('.magnetic-char');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        chars.forEach(char => {
            const rect = char.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const dist = distance(mouseX, mouseY, charX, charY);

            // Interaction radius
            const radius = 200;

            if (dist < radius) {
                // Calculate attraction
                const strength = (radius - dist) / radius;
                const pull = strength * 20; // Max movement in pixels

                const dx = (mouseX - charX) * strength * 0.3;
                const dy = (mouseY - charY) * strength * 0.3;

                char.style.transform = `translate(${dx}px, ${dy}px)`;
                char.style.color = 'var(--accent-secondary)'; // Highlight color
            } else {
                char.style.transform = 'translate(0, 0)';
                char.style.color = ''; // Reset color
            }
        });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        chars.forEach(char => {
            char.style.transform = 'translate(0, 0)';
            char.style.color = '';
        });
    });
}

function initScrollReveal() {
    const sections = document.querySelectorAll('.section h2, .hero-subtitle, .cv-card');

    // Add reveal class
    sections.forEach(el => el.classList.add('reveal-text'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(el => observer.observe(el));
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
