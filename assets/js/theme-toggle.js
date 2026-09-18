document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    const root = document.documentElement;
    const body = document.body;
    const transitionDuration = 400;

    const applyTheme = (isDark) => {
        root.classList.toggle('dark', isDark);
        if (isDark) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        toggleButtons.forEach((button) => {
            button.setAttribute('aria-pressed', String(isDark));
            button.dataset.theme = isDark ? 'dark' : 'light';
        });
    };

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark');

    const toggleTheme = async (button) => {
        const nextIsDark = !body.hasAttribute('data-theme');

        if (typeof document.startViewTransition !== 'function') {
            applyTheme(nextIsDark);
            return;
        }

        const transition = document.startViewTransition(() => {
            applyTheme(nextIsDark);
        });

        await transition.ready;

        const { top, left, width, height } = button.getBoundingClientRect();
        const x = left + (width / 2);
        const y = top + (height / 2);
        const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        root.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: transitionDuration,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
            }
        );
    };

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            toggleTheme(button);
        });
    });
});
