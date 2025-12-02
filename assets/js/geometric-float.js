document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('geo-float-container');
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Window center
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowCenterX) / windowCenterX;
        mouseY = (e.clientY - windowCenterY) / windowCenterY;
    });

    function animate() {
        // Smooth interpolation
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        const time = Date.now();

        // Pyramid Rotation (Y-axis spin + slight X-tilt)
        const pyramid = document.querySelector('.pyramid');
        if (pyramid) {
            pyramid.style.transform = `
                translate3d(${targetX * 30}px, ${targetY * 30}px, 0)
                rotateX(15deg)
                rotateY(${time * 0.02}deg)
            `;
        }

        // Ring Rotation (Complex multi-axis spin)
        const ring = document.querySelector('.ring');
        if (ring) {
            ring.style.transform = `
                translate3d(${targetX * 20}px, ${targetY * 20}px, 0)
                rotateX(${60 + Math.sin(time * 0.001) * 10}deg)
                rotateY(${-15 + Math.cos(time * 0.001) * 10}deg)
                rotateZ(${time * 0.015}deg)
            `;
        }

        requestAnimationFrame(animate);
    }

    animate();
});
