// ===== Navbar scroll state =====
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const onScroll = () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
};
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Mobile menu =====
const navToggle = document.getElementById('navToggle');
const navMobileMenu = document.getElementById('navMobileMenu');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  navToggle.classList.remove('open');
  navMobileMenu.classList.remove('open');
  navOverlay.classList.remove('open');
}
function toggleMenu() {
  navToggle.classList.toggle('open');
  navMobileMenu.classList.toggle('open');
  navOverlay.classList.toggle('open');
}
navToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', closeMenu);
navMobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ===== Contact form (prototype — no backend) =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.add('show');
    contactForm.reset();
  });
}

// ===== Scroll-reveal =====
const revealTargets = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

// ===== Cursor glow (desktop, motion-safe) =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
if (!prefersReducedMotion && isFinePointer) {
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    window.addEventListener('pointermove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }
}

// ===== Generate floating leaf particles in hero =====
const leafLayer = document.getElementById('leafParticles');
if (leafLayer && !prefersReducedMotion) {
  const leafSVG = (i) => `
    <svg class="leaf-particle" viewBox="0 0 24 24" fill="currentColor"
      style="left:${5 + (i * 8.5) % 92}%; animation-duration:${10 + (i % 5) * 2.4}s; animation-delay:${-(i * 1.7)}s;">
      <path d="M12 2C7 6 4 11 4 15a8 8 0 0 0 16 0c0-4-3-9-8-13Z"/>
    </svg>`;
  let html = '';
  for (let i = 0; i < 12; i++) html += leafSVG(i);
  leafLayer.innerHTML = html;
}
