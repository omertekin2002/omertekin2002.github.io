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

        // Apply rotation to container or shapes
        // We'll rotate the shapes slightly based on mouse position
        const shapes = document.querySelectorAll('.geo-shape');

        shapes.forEach((shape, index) => {
            // Base rotation (continuous)
            const time = Date.now() * 0.001;
            const baseRotX = time * 10 + (index * 45);
            const baseRotY = time * 15 + (index * 45);

            // Mouse tilt interaction
            const tiltX = targetY * 20; // Max 20deg tilt
            const tiltY = targetX * 20;

            shape.style.transform = `
                rotateX(${baseRotX + tiltX}deg) 
                rotateY(${baseRotY + tiltY}deg)
            `;
        });

        requestAnimationFrame(animate);
    }

    animate();
});
