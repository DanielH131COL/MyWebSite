// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));

// Typewriter
const typewriter = document.getElementById('typewriter');
const texts = ["SYSTEM ONLINE...", "JAVA → KOTLIN → MINECRAFT", "CODING THE FUTURE...", "NEON IS ETERNAL"];
let i = 0, isDeleting = false, txt = '';

function type() {
  const current = texts[i];
  typewriter.textContent = isDeleting ? current.substring(0, txt.length - 1) : current.substring(0, txt.length + 1);
  txt = typewriter.textContent;

  if (!isDeleting && txt === current) setTimeout(() => isDeleting = true, 1800);
  if (isDeleting && txt === '') { isDeleting = false; i = (i + 1) % texts.length; }

  setTimeout(type, isDeleting ? 40 : 80);
}
setTimeout(type, 800);

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.documentElement.dataset.theme = 
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Scroll Top
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('visible', window.scrollY > 500);
});
scrollBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Carousel automático de proyectos
const slides = document.querySelectorAll('.project-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev');
    if (i === index) {
      slide.classList.add('active');
    } else if (i === currentSlide) {
      slide.classList.add('prev');
    }
  });
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

// Inicia el carousel
if (slides.length > 0) {
  showSlide(0); // muestra el primero
  setInterval(nextSlide, 5000); // cambia cada 5 segundos
}

// Opcional: pause al hover
const carousel = document.querySelector('.projects-carousel');
if (carousel) {
  carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
  carousel.addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, 5000));
}
let intervalId = setInterval(nextSlide, 5000);