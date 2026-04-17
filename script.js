// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em qualquer link
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth scroll com offset para o header fixo
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const offset = 85;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
    }
  });
});

// Scroll Reveal com Intersection Observer
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });

fadeElements.forEach(el => observer.observe(el));

window.addEventListener('load', () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
      observer.unobserve(el);
    }
  });
});

// Animação extra nas skills
const movingSpans = document.querySelectorAll('.skill-list span');
movingSpans.forEach((span, idx) => {
  span.classList.add('moving-badge');
  span.style.animationDelay = `${idx * 0.1}s`;
});

// Efeito no header ao rolar
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 20) {
    header.style.background = 'rgba(8, 10, 18, 0.85)';
    header.style.backdropFilter = 'blur(16px)';
  } else {
    header.style.background = 'rgba(10, 12, 18, 0.75)';
  }
});

// Formulário WhatsApp
const whatsappForm = document.getElementById('whatsappForm');
const waNameInput = document.getElementById('waName');
const waMessageInput = document.getElementById('waMessage');
const PHONE_NUMBER = '558681867881';  // Substitua pelo número real do WhatsApp (código país + DDD + número)

whatsappForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let name = waNameInput.value.trim();
  if (name === "") {
    alert("Por favor, preencha o seu nome para continuar.");
    waNameInput.focus();
    return;
  }
  
  let message = waMessageInput.value.trim();
  let finalText = "";
  
  if (message !== "") {
    finalText = `Olá! Meu nome é ${name}. ${message}`;
  } else {
    finalText = `Olá! Meu nome é ${name}. Gostaria de saber mais sobre seus serviços e portfólio.`;
  }
  
  const encodedText = encodeURIComponent(finalText);
  const whatsappURL = `https://wa.me/${PHONE_NUMBER}?text=${encodedText}`;
  
  window.open(whatsappURL, '_blank');
});