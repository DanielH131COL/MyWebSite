const githubUser = "DanielH131COL"
const modal = document.getElementById("projectModal")
const modalContent = document.getElementById("modalContent")
const projectCard = document.getElementById("latestProjectCard")
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
    "contact-btn": "¡Hablemos!",
    "visit-label": "Visitas:",
    "nav-home": "Inicio",
    "nav-about": "Sobre Mí",
    "nav-skills": "Habilidades",
    "nav-projects": "Proyectos",
    "nav-contact": "Contacto"
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
    "contact-btn": "Let's talk!",
    "visit-label": "Visits:",
    "nav-home": "Home",
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-projects": "Projects",
    "nav-contact": "Contact"
  }
}
function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n
    if (translations[lang] && translations[lang][key]) el.innerHTML = translations[lang][key]
  })
}
const typingEl = document.querySelector(".typing")
const fullName = "DanielH131COL"
let typeIndex = 0
function resetTyping() {
  typingEl.textContent = ""
  typeIndex = 0
}
function typeWriter() {
  if (typeIndex < fullName.length) {
    typingEl.textContent += fullName.charAt(typeIndex)
    typeIndex++
    setTimeout(typeWriter, 150)
  }
}
function setLanguage(lang, restartTyping = true) {
  document.documentElement.lang = lang
  localStorage.setItem("lang", lang)
  document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang))
  applyTranslations(lang)
  if (restartTyping) {
    resetTyping()
    setTimeout(typeWriter, 200)
  }
}
const storedLang = localStorage.getItem("lang") || document.documentElement.lang || "es"
setLanguage(storedLang, false)
document.querySelectorAll(".lang-btn").forEach(b => b.addEventListener("click", () => setLanguage(b.dataset.lang)))
function applyTheme(theme) {
  const toggle = document.querySelector(".dark-mode-toggle")
  if (theme === "light") {
    document.documentElement.classList.add("light")
    toggle.textContent = "☀️"
  } else {
    document.documentElement.classList.remove("light")
    toggle.textContent = "🌙"
  }
  localStorage.setItem("theme", theme)
}
const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
applyTheme(storedTheme)
document.querySelector(".dark-mode-toggle").addEventListener("click", () => {
  const newTheme = document.documentElement.classList.contains("light") ? "dark" : "light"
  applyTheme(newTheme)
})
/* Navigation */
const navToggle = document.querySelector(".nav-toggle")
const navLinks = document.querySelector(".nav-links")
navToggle.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open")
  navToggle.setAttribute("aria-expanded", opened)
})
navLinks.querySelectorAll("a").forEach(l => l.addEventListener("click", () => navLinks.classList.remove("open")))
/* Modal */
const modalClose = document.querySelector(".modal-close")
modalClose.addEventListener("click", () => modal.classList.add("hidden"))
modal.addEventListener("click", e => {
  if (!modalContent.contains(e.target)) modal.classList.add("hidden")
})
/* Visit counter */
function updateVisitCount() {
  const counter = document.getElementById("visitCount")
  const url = `https://api.countapi.xyz/hit/danielh131col/mysite?cb=${Date.now()}`
  fetch(url)
    .then(r => { if (!r.ok) throw new Error("bad"); return r.json() })
    .then(d => { counter.textContent = d.value })
    .catch(() => {
      const local = (parseInt(localStorage.getItem("visitCount") || "0", 10) || 0) + 1
      localStorage.setItem("visitCount", local)
      counter.textContent = local
    })
}
/* GitHub repo handling */
const repoCacheKey = "latestRepoCache"
const repoCacheTTL = 43200000 // 12 h
function renderRepo(repo, commit) {
  projectCard.classList.remove("loading")
  const msg = commit?.commit?.message || ""
  const author = commit?.commit?.author?.name || ""
  const date = commit?.commit?.author?.date ? new Date(commit.commit.author.date).toLocaleString() : ""
  projectCard.innerHTML = `
    <h3>${repo.name}</h3>
    <p>${repo.description || "Sin descripción"}</p>
    <div class="commit-info">
      <p>📝 <strong>Último commit:</strong></p>
      <p>"${msg}"</p>
      <p class="commit-author">👤 ${author}</p>
      <p>🕒 ${date}</p>
    </div>
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn-small">Ver en GitHub</a>
  `
}
async function loadLatestRepo() {
  const cached = localStorage.getItem(repoCacheKey)
  if (cached) {
    const data = JSON.parse(cached)
    if (Date.now() - data.timestamp < repoCacheTTL) {
      renderRepo(data.repo, data.commit)
      return
    }
  }
  try {
    const reposRes = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=1`)
    const repos = await reposRes.json()
    if (!Array.isArray(repos) || repos.length === 0) {
      projectCard.innerHTML = "No hay repositorios públicos."
      return
    }
    const repo = repos[0]
    const commitsRes = await fetch(`https://api.github.com/repos/${githubUser}/${repo.name}/commits?per_page=1`)
    const commits = await commitsRes.json()
    const commit = commits[0] || {}
    renderRepo(repo, commit)
    localStorage.setItem(repoCacheKey, JSON.stringify({ timestamp: Date.now(), repo, commit }))
  } catch {
    if (cached) {
      const data = JSON.parse(cached)
      renderRepo(data.repo, data.commit)
    } else {
      projectCard.innerHTML = "Error al cargar los repositorios."
    }
  }
}
/* Back‑to‑top button */
const backToTop = document.querySelector(".back-to-top")
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) backToTop.classList.add("show")
  else backToTop.classList.remove("show")
})
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})
/* Initial load */
window.addEventListener("load", () => {
  modal.classList.remove("hidden")
  loadLatestRepo()
  updateVisitCount()
  setTimeout(typeWriter, 500)
})