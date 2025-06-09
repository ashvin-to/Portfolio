// Sequential fade-in for h2s
const hides = document.querySelectorAll('.hide');
function fadeInText() {
  hides.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 400);
  });
}
window.addEventListener('DOMContentLoaded', fadeInText);

// Optional: fade out everything on click (if you want to hide intro on click)
function fadeOutAndNavigate() {
  const intro = document.querySelector('.intro');
  intro.style.opacity = 0;
  intro.style.pointerEvents = 'none';
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 500); // match fade duration
}

const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', fadeOutAndNavigate);
}
