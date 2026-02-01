const githubUser = "DanielH131COL";
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const container = document.getElementById("latestProjectCard");

const translations = {
  es: {
    "hero-greeting": "Hola, soy ",
    "hero-subtitle": "Developer & Freelancer",
    "btn-projects": "Ver Proyectos",
    "about-title": "Sobre Mí",
    "about-p1": "👋 ¡Hey! Soy un desarrollador apasionado por la tecnología y el desarrollo de videojuegos. Me encanta crear herramientas útiles, sistemas divertidos y experimentar con código creativo.",
    "about-p2": "Actualmente enfocado en Java, PHP y proyectos indie de gaming. Siempre abierto a colaborar o charlar sobre tech.",
    "skills-title": "Habilidades",
    "skill-java-title": "Java",
    "skill-java-desc": "Core, proxies, juegos, Minecraft plugins",
    "skill-php-title": "PHP",
    "skill-php-desc": "Sistemas de licencias, backends web",
    "skill-gamedev-title": "Game Dev",
    "skill-gamedev-desc": "Prototipos y juegos pequeños",
    "skill-other-title": "Otras",
    "skill-other-desc": "Git, MySQL, HTML/CSS/JS básico",
    "projects-title": "Mis Proyectos Destacados",
    "proj-bunetix-desc": "Totally free Proxy Core desarrollado en Java.",
    "proj-stellar-desc": "Sistema de licencias para plugins Minecraft o cualquier uso (PHP).",
    "proj-freerank-desc": "Sistema simple de freerank, fácil y directo (Java).",
    "proj-game-desc": "Mi primer juego inspirado en temas de aim (Java).",
    "proj-btn": "Ver en GitHub",
    "contact-title": "Contacto",
    "contact-p1": "¿Quieres charlar, colaborar o preguntarme algo?",
    "contact-p2": "Encuéntrame en Discord: <strong>danielh131col2</strong>",
    "contact-btn": "¡Hablemos!"
  },
  en: {
    "hero-greeting": "Hi, I'm ",
    "hero-subtitle": "Developer & Freelancer",
    "btn-projects": "View Projects",
    "about-title": "About Me",
    "about-p1": "👋 Hey! I'm a developer passionate about technology and video‑game development. I love creating useful tools, fun systems, and experimenting with creative code.",
    "about-p2": "Currently focused on Java, PHP and indie gaming projects. Always open to collaborate or chat about tech.",
    "skills-title": "Skills",
    "skill-java-title": "Java",
    "skill-java-desc": "Core, proxies, games, Minecraft plugins",
    "skill-php-title": "PHP",
    "skill-php-desc": "License systems, web back‑ends",
    "skill-gamedev-title": "Game Development",
    "skill-gamedev-desc": "Prototypes and small games",
    "skill-other-title": "Other",
    "skill-other-desc": "Git, MySQL, basic HTML/CSS/JS",
    "projects-title": "Featured Projects",
    "proj-bunetix-desc": "Totally free Proxy Core developed in Java.",
    "proj-stellar-desc": "License system for Minecraft plugins or any use (PHP).",
    "proj-freerank-desc": "Simple freerank system, easy and direct (Java).",
    "proj-game-desc": "My first aim‑inspired game (Java).",
    "proj-btn": "View on GitHub",
    "contact-title": "Contact",
    "contact-p1": "Want to chat, collaborate or ask me something?",
    "contact-p2": "Find me on Discord: <strong>danielh131col2</strong>",
    "contact-btn": "Let's talk!"
  }
};

/* ---- Apply translation ---- */
function applyTranslations(lang){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });
}

/* ---- Language switcher ---- */
function setLanguage(lang){
  document.documentElement.lang = lang;
  localStorage.setItem('lang',lang);
  document.querySelectorAll('.lang-btn')
          .forEach(b => b.classList.toggle('active', b.dataset.lang===lang));
  applyTranslations(lang);
}
document.querySelectorAll('.lang-btn')
        .forEach(b => b.addEventListener('click',()=>setLanguage(b.dataset.lang)));

/* ---- Init language on load ---- */
const storedLang = localStorage.getItem('lang') || document.documentElement.lang || 'es';
setLanguage(storedLang);

/* ---- Typewriter animation ---- */
const typingEl = document.querySelector('.typing');
const name = "DanielH131COL";
let i = 0;
function typeWriter(){
  if (i < name.length){
    typingEl.textContent += name.charAt(i);
    i++;
    setTimeout(typeWriter,150);
  }
}

fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    if (!repos || repos.length === 0) {
      container.innerHTML = "No hay repositorios públicos.";
      return;
    }

    const repo = repos[0];

    // 2️⃣ Obtener último commit del repo
    fetch(`https://api.github.com/repos/${githubUser}/${repo.name}/commits?per_page=1`)
      .then(res => res.json())
      .then(commits => {
        const commit = commits[0];
        const message = commit.commit.message;
        const author = commit.commit.author.name;
        const date = new Date(commit.commit.author.date).toLocaleString();

        container.classList.remove("loading");
        container.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Sin descripción"}</p>

          <div class="commit-info">
            <p>📝 <strong>Último commit:</strong></p>
            <p>"${message}"</p>
            <p class="commit-author">👤 ${author}</p>
            <p>🕒 ${date}</p>
          </div>

          <a href="${repo.html_url}" target="_blank" class="btn-small">
            Ver en GitHub
          </a>
        `;
      });
  })
  .catch(() => {
    container.innerHTML = "Error al cargar información de GitHub.";
  });

modal.addEventListener("click", (e) => {
  if (!modalContent.contains(e.target)) {
    modal.classList.add("hidden");
  }
});

window.addEventListener('load',()=>
    modal.classList.remove("hidden"),
    setTimeout(typeWriter,500));