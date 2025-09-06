// Année automatique
document.getElementById('year').textContent = new Date().getFullYear();
const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("main section");

// Menu mobile
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger?.addEventListener('click', () => drawer.classList.toggle('open'));
drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener('click', e => {
const target = document.querySelector(link.getAttribute('href'));
if(target){
e.preventDefault();
target.scrollIntoView({behavior:'smooth'});
}
});
});

// Révélations au scroll
const io = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('show');
io.unobserve(entry.target);
}
});
}, {threshold:.12});
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Validation simple du formulaire (demo)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
e.preventDefault();
const formData = new FormData(form);
const name = String(formData.get('name')||'').trim();
const prenom = String(formData.get('prenom')||'').trim();
const sujet = String(formData.get('sujet')||'').trim();
const message = String(formData.get('message')||'').trim();


if(!name || !prenom || !sujet || !message){
 status.textContent = 'Merci de remplir tous les champs.';
  status.style.color = '#fca5a5';
  return;
}
// Ici vous pouvez envoyer avec fetch() vers votre backend / service (Formspree, Netlify, etc.)
status.textContent = 'Message envoyé ✔ (démo)';
status.style.color = '#86efac';
form.reset();
});

// Fonction pour désactiver tous les liens actifs
function deactivateLinks() {
  navLinks.forEach(link => link.classList.remove("active"));
}

// Fonction pour activer le lien correspondant à la section visible
function activateLink(idx) {
  deactivateLinks();
  navLinks[idx].classList.add("active");
}

// Smooth scroll et activation au clic
navLinks.forEach((link, idx) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le saut instantané
    sections[idx].scrollIntoView({ behavior: "smooth", block: "start" });
    activateLink(idx);
  });
});

// Activation automatique du lien en fonction du scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const idx = Array.from(sections).indexOf(entry.target);
      activateLink(idx);
    }
  });
}, {
  threshold: 0.5 // la section doit être visible à 50%
});

// Observer chaque section
sections.forEach(section => observer.observe(section));