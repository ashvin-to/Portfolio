document.getElementById("current-year").textContent = new Date().getFullYear();

let index = 0;
const wrappers = document.querySelectorAll(".certificate-wrapper");
const certificates = document.querySelectorAll(".certificate");
const slider = document.getElementById("certificate-slider");
const total = wrappers.length;

// Set the width of the slider based on the number of certificates
slider.style.width = `${total * 100}%`;

// Log the calculated slider width to the console for debugging
console.log('Certificate Slider Width:', slider.style.width);

function showSlide(i) {
  wrappers.forEach((wrap, idx) => {
    wrap.style.transform = `translateX(${100 * (idx - i)}%)`;
  });
}

function showNext() {
  index = (index + 1) % total;
  showSlide(index);
}

function showPrev() {
  index = (index - 1 + total) % total;
  showSlide(index);
}

showSlide(index);

// Fullscreen Modal Logic
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

certificates.forEach((cert, i) => {
    cert.addEventListener("click", () => {
      // Show in modal as before
      modal.style.display = "block";
      modalImg.src = cert.src;
  
      // Highlight the wrapper
      wrappers.forEach((wrap, j) => {
        wrap.classList.toggle("active", j === i);
      });
    });
  });

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Mobile swipe support
let startX = 0;

slider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive: true });

slider.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    showNext();
  } else if (endX - startX > 50) {
    showPrev();
  }
}, { passive: true });
