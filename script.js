document.getElementById('menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Improved: Add active class to current page link for both .html and extensionless URLs

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
});
