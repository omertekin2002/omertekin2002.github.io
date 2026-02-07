document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('geo-float-container');
    if (!container) return;

    const pyramid = container.querySelector('.pyramid');
    const ring = container.querySelector('.ring');
    if (!pyramid && !ring) return;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotionQuery.matches) {
        if (pyramid) {
            pyramid.style.transform = 'rotateX(18deg) rotateY(24deg) rotateZ(-4deg)';
        }
        if (ring) {
            ring.style.transform = 'rotateX(58deg) rotateY(-12deg) rotateZ(24deg)';
        }
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const getMotionProfile = () => {
        if (window.innerWidth <= 768) {
            return {
                pyramidMove: 14,
                ringMove: 10,
                pyramidSpin: 0.012,
                ringSpin: 0.008,
                pyramidFloat: 3.5,
                pyramidDepth: 10
            };
        }

        return {
            pyramidMove: 30,
            ringMove: 20,
            pyramidSpin: 0.02,
            ringSpin: 0.015,
            pyramidFloat: 6,
            pyramidDepth: 18
        };
    };

    let motion = getMotionProfile();
    window.addEventListener('resize', () => {
        motion = getMotionProfile();
    });

    document.addEventListener('mousemove', (e) => {
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        mouseX = (e.clientX - windowCenterX) / windowCenterX;
        mouseY = (e.clientY - windowCenterY) / windowCenterY;
    });

    function animate(now) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        if (pyramid) {
            const driftA = Math.sin(now * 0.00105);
            const driftB = Math.cos(now * 0.00082);
            const driftC = Math.sin(now * 0.00091);

            pyramid.style.transform = `
                translate3d(
                    ${targetX * motion.pyramidMove + driftB * (motion.pyramidFloat * 1.15)}px,
                    ${targetY * motion.pyramidMove + driftA * motion.pyramidFloat}px,
                    ${driftC * motion.pyramidDepth}px
                )
                rotateX(${18 + targetY * 10 + driftA * 8}deg)
                rotateY(${now * motion.pyramidSpin + targetX * 26 + driftB * 12}deg)
                rotateZ(${targetX * 6 + driftC * 9}deg)
            `;
        }

        if (ring) {
            ring.style.transform = `
                translate3d(${targetX * motion.ringMove}px, ${targetY * motion.ringMove}px, 0)
                rotateX(${60 + Math.sin(now * 0.001) * 10}deg)
                rotateY(${-15 + Math.cos(now * 0.001) * 10}deg)
                rotateZ(${now * motion.ringSpin}deg)
            `;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
