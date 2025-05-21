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
document.addEventListener('mousemove', onMouseMove);

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
    const offset = 100;
    cursorCircle.style.left = `${circleX + offset}px`;
    cursorCircle.style.top = `${circleY + offset}px`;
  } else {
    // Add transition for smooth glide
    if (!isTransitioning) {
      cursorCircle.style.transition = 'left 0.4s cubic-bezier(.4,0,.2,1), top 0.4s cubic-bezier(.4,0,.2,1)';
      isTransitioning = true;
    }
    cursorCircle.style.left = `${mouseX}px`;
    cursorCircle.style.top = `${mouseY}px`;
    // No need to animate, let CSS handle it
  }
  requestAnimationFrame(animateCircle);
}
animateCircle();

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
