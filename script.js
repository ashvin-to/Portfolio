document.addEventListener('DOMContentLoaded', function() {
    let currentPath = window.location.pathname;
    // Remove leading slash
    if (currentPath.startsWith('/')) currentPath = currentPath.slice(1);
    // Remove trailing slash
    if (currentPath.endsWith('/')) currentPath = currentPath.slice(0, -1);
    // If empty, it's home
    if (!currentPath) currentPath = 'index.html';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        let linkHref = link.getAttribute('href');
        // Remove leading slash
        if (linkHref.startsWith('/')) linkHref = linkHref.slice(1);
        // Match if currentPath and linkHref are the same, or if their .html-less versions match
        if (
            currentPath === linkHref ||
            currentPath.replace('.html', '') === linkHref.replace('.html', '')
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle menu toggle for smaller screens
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Handle side navigation clicks
    const navBullets = document.querySelectorAll('.side-nav .nav-bullet');

    navBullets.forEach(bullet => {
        bullet.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target-page');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });

    // Highlight active bullet on page load
    function highlightActiveBullet() {
        let currentPath = window.location.pathname.split('/').pop();
        if (!currentPath) currentPath = 'index.html'; // Default for index page

        navBullets.forEach(bullet => {
            bullet.classList.remove('current');
            const targetPage = bullet.getAttribute('data-target-page');
            if (targetPage && (currentPath === targetPage || currentPath === targetPage.replace('.html', ''))) {
                bullet.classList.add('current');
            }
        });
    }

    // Call highlight function on page load
    highlightActiveBullet();

    // Cursor-following circle with smooth chase and snap on stop
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    let moving = false;
    let stopTimeout;
    let isTransitioning = false;

    const cursorCircle = document.querySelector('.cursor-circle');

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        moving = true;
        clearTimeout(stopTimeout);
        stopTimeout = setTimeout(() => {
            moving = false;
        }, 60);
    }
    // Only add event listener if cursorCircle exists
    if (cursorCircle) {
        document.addEventListener('mousemove', onMouseMove);
    }

    function animateCircle() {
        if (moving) {
            // Remove transition for instant following
            if (isTransitioning) {
                cursorCircle.style.transition = 'none';
                isTransitioning = false;
            }
            const speed = 0.02;
            circleX += (mouseX - circleX) * speed;
            circleY += (mouseY - circleY) * speed;
            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;
        } else {
            if (!isTransitioning) {
                cursorCircle.style.transition = 'left 0.4s cubic-bezier(.4,0,.2,1), top 0.4s cubic-bezier(.4,0,.2,1)';
                isTransitioning = true;
            }
            cursorCircle.style.left = `${mouseX}px`;
            cursorCircle.style.top = `${mouseY}px`;
        }
        requestAnimationFrame(animateCircle);
    }

    if (cursorCircle) {
        animateCircle();
    }

});