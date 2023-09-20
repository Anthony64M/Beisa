let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

setInterval(() => {
  // Remove active class from all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Add active class to next slide
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  slides[slideIndex].classList.add('active');
}, 5000);