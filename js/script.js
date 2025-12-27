/* ---------- UTILIDADES ---------- */
function hexToRgba(hex, a = 1) {
  const c = hex.replace('#', '');
  const r = parseInt(c.length === 3 ? `${c[0]}${c[0]}` : c.slice(0, 2), 16);
  const g = parseInt(c.length === 3 ? `${c[1]}${c[1]}` : c.slice(2, 4), 16);
  const b = parseInt(c.length === 3 ? `${c[2]}${c[2]}` : c.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function escapeHtml(txt) {
  const d = document.createElement('div');
  d.textContent = txt;
  return d.innerHTML;
}
function playSound(id) {
  const s = document.getElementById(id);
  if (s) { s.currentTime = 0; s.play().catch(() => {}); }
}
function showToast(msg, type = 'info', dur = 3000) {
  const toast = document.getElementById('toast');
  const txt   = document.getElementById('toast-msg');
  toast.className = '';
  txt.textContent = msg;
  toast.classList.remove('bg-blue-600','bg-green-600','bg-red-600');
  toast.classList.add(type === 'success' ? 'bg-green-600'
                : type === 'error'  ? 'bg-red-600'
                : 'bg-blue-600');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), dur);
}

/* ---------- DATOS DEL PERFIL ---------- */
const profileData = {
  name: 'DanielH131COL',
  description: 'Software Developer | Tech Enthusiast | Game Dev',
  discord: 'danielh131col2',
  github: 'https://github.com/DanielH131COL',
  skills: [
    { icon: 'fab fa-java',       color: '#E34F26', label: 'Java' },
    { icon: 'fab fa-android',    color: '#3DDC84', label: 'Kotlin' },
    { icon: 'fab fa-php',       color: '#777BB4', label: 'PHP' },
    { icon: 'fas fa-database',  color: '#4479A1', label: 'MySQL' },
    { icon: 'fab fa-unity',     color: '#000000', label: 'Unity' },
    { icon: 'fab fa-discord',   color: '#5865F2', label: 'Discord Bots' },
    { icon: 'fab fa-git-alt',   color: '#F05032', label: 'Git' },
    { icon: 'fab fa-linux',     color: '#FCC624', label: 'Linux' },
    { icon: 'fas fa-cube',      color: '#8BC34A', label: 'Minecraft' }
  ],
  projects: ['Bunetix','FreeRank','Game1','MyWebSite','DanielH131COL'],
  timeline: [
    { year: '2019 - 2020', title: 'Cree servidor de Minecraft',
      desc: 'Fue el primer servidor de Minecraft con que comencé con la programación, DixPvP Network.' },
    { year: '2021 - 2025', title: 'Programas',
      desc: 'Comencé a hacer programas simples para mí mismo, con juegos, aplicaciones móviles y cosas randoms.' },
    { year: '2022 - 2025', title: 'Servidores de Minecraft',
      desc: 'Ahí fue donde comencé a hacerme un poquito reconocido por hacer o ayudar a programar servidores de Minecraft.' },
  ]
};

/* ---------- CARGA DE CONTENIDO ---------- */
function loadAbout() {
  const txt = `¡Hola! Soy <strong>${profileData.name}</strong>, ${profileData.description}. 
    Me apasiona crear soluciones con Java, Unity y bots de Discord. 
    Visita mis <a href="${profileData.github}" target="_blank" rel="noopener"
    class="text-blue-400 hover:underline">repositorios en GitHub</a>.`;
  document.getElementById('about-text').innerHTML = txt;
}
function loadSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = '';
  profileData.skills.forEach(s => {
    const lvl = Math.floor(Math.random() * 40) + 60; // 60‑100 %
    const li = document.createElement('li');
    li.className = 'skill-button text-center';
    li.setAttribute('role','listitem');
    li.setAttribute('aria-label',`Habilidad ${s.label} – nivel ${lvl}%`);
    li.style.background = hexToRgba(s.color,0.1);
    li.innerHTML = `
      <i class="${s.icon}" aria-hidden="true" title="${s.label}"></i>
      <p class="mt-3 font-bold text-sm">${s.label}</p>
      <div class="skill-progress mt-2"><div class="skill-fill" style="width:${lvl}%;background:${s.color}"></div></div>
    `;
    container.appendChild(li);
  });
}
async function fetchRepo(repo) {
  const r = await fetch(`https://api.github.com/repos/DanielH131COL/${repo}`);
  if (!r.ok) throw new Error('GitHub error');
  return await r.json();
}
async function loadProjects() {
  const inner = document.getElementById('carousel-inner');
  inner.innerHTML = '<p class="text-gray-400 px-4">Cargando proyectos…</p>';
  const cards = [];
  for (const repo of profileData.projects) {
    try {
      const data = await fetchRepo(repo);
      const stars = data.stargazers_count ?? 0;
      const desc  = data.description ?? 'Sin descripción';
      const url   = data.html_url ?? `https://github.com/DanielH131COL/${repo}`;
      cards.push(`
        <a href="${url}" target="_blank" rel="noopener"
           class="project-card flex-shrink-0 border border-gray-700 p-4 text-left hover:bg-gray-700 transition-all duration-300"
           role="listitem">
          <h3 class="text-lg font-bold text-blue-600 truncate">${data.name}</h3>
          <p class="text-xs text-gray-400 mt-1 line-clamp-3">${escapeHtml(desc)}</p>
          <div class="mt-3 text-xs text-yellow-400 flex items-center gap-1"><i class="fas fa-star"></i> ${stars}</div>
          <div class="overlay"><p>Ver en GitHub</p></div>
        </a>
      `);
    } catch (e) {
      console.error(e);
      cards.push(`<div class="text-red-400 text-xs px-4">Error al cargar ${repo}</div>`);
    }
  }
  inner.innerHTML = cards.concat(cards).join(''); // duplicado para scroll infinito
}
function loadTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';
  profileData.timeline.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <h4 class="font-semibold text-lg text-gray-100">${ev.year} – ${ev.title}</h4>
      <p class="text-sm text-gray-300 mt-1">${ev.desc}</p>
    `;
    container.appendChild(div);
  });
}

/* ---------- INTERACCIÓN UI ---------- */
function initThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const stored = localStorage.getItem('theme') ||
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.body.dataset.theme = stored;
  icon.className = stored === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  btn.setAttribute('aria-pressed', stored !== 'dark');

  btn.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('theme', next);
    icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    btn.setAttribute('aria-pressed', next !== 'dark');
    playSound('click-sound');
  });
}
function initAudio() {
  document.getElementById('play-sound').addEventListener('click', () => {
    const bg = document.getElementById('background-sound');
    if (bg.paused) bg.play().catch(() => alert('Reproduce el sonido manualmente.'));
    else bg.pause();
    playSound('click-sound');
  });
}
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => btn.classList.toggle('hidden', window.scrollY < 300));
  btn.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
    playSound('click-sound');
  });
}
function initHeaderShrink() {
  const hdr = document.getElementById('site-header');
  window.addEventListener('scroll', () => hdr.classList.toggle('header-scrolled', window.scrollY > 50));
}
function initScrollReveal() {
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:0.2 });
  document.querySelectorAll('.animate-reveal').forEach(el => obs.observe(el));
}
function initTypewriter() {
  const words = ['Desarrollador Java','Entusiasta Unity','Creador de bots Discord'];
  const target = document.getElementById('typewriter');
  let i = 0, j = 0, cur = '';
  function type() {
    if (i >= words.length) i = 0;
    cur = words[i];
    if (j < cur.length) { target.textContent += cur.charAt(j); j++; setTimeout(type,120); }
    else setTimeout(erase,1500);
  }
  function erase() {
    if (j > 0) { target.textContent = cur.substring(0,j-1); j--; setTimeout(erase,60); }
    else { i++; setTimeout(type,500); }
  }
  type();
}

/* ---------- PARTICULAS ----------
   *Se corrigió el error de sintaxis que provocaba el crash. */
function initParticles() {
  tsParticles.load('particles-canvas', {
    fullscreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 80 },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.8 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: 'repulse' } },
      modes: { repulse: { distance: 100 } }
    }
  });
}

/* ---------- CARRUSEL ---------- */
function initCarousel() {
  const inner = document.getElementById('carousel-inner');
  const prev  = document.getElementById('carousel-prev');
  const next  = document.getElementById('carousel-next');
  const container = inner.parentElement; // .carousel

  // pausa automática al hover
  container.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
  container.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');

  const step = 260; // ancho aproximado de una tarjeta + gap
  prev.addEventListener('click', () => {
    container.scrollBy({ left: -step, behavior: 'smooth' });
    playSound('click-sound');
  });
  next.addEventListener('click', () => {
    container.scrollBy({ left: step, behavior: 'smooth' });
    playSound('click-sound');
  });
}

/* ---------- MODAL DE CONTACTO ----------
   Funciona con los dos botones (flotante y de la barra). */
function initContactModal() {
  const modal   = document.getElementById('contact-modal');
  const opens   = document.querySelectorAll('#contact-btn, #contact-btn-desktop');
  const closeBtn = document.getElementById('close-modal');
  const form    = document.getElementById('contact-form');

  // Texto Discord
  document.getElementById('discord-info').innerHTML =
    `También puedes escribir en Discord: <code class="bg-gray-700 px-2 py-1 rounded">${profileData.discord}</code>`;

  function open() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    document.getElementById('name').focus();
    playSound('click-sound');
  }
  function close() {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    playSound('click-sound');
  }

  opens.forEach(b => b.addEventListener('click', open));
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Envío con EmailJS (añade tu clave pública)
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const params = {
      from_name : document.getElementById('name').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      message   : document.getElementById('message').value.trim()
    };

    // validación mínima de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.from_email)) {
      showToast('Introduce un correo válido', 'error');
      return;
    }

    // Envío (cambia la clave con la tuya)
    emailjs.init('M5-rH45F7Qr2BLDCd');   // <-- REEMPLÁZALA
    await emailjs.send('service_m95adzn', 'template_yz84jqm', params);

    showToast('¡Mensaje enviado con éxito! 🎉', 'success');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    form.reset();
    close();
    playSound('click-sound');
  });
}

/* ---------- INICIALIZACIÓN ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadAbout();
  loadSkills();
  loadProjects();
  loadTimeline();

  initThemeToggle();
  initAudio();
  initBackToTop();
  initHeaderShrink();
  initScrollReveal();
  initTypewriter();
  initParticles();      // ← línea corregida
  initCarousel();
  initContactModal();

  // Footer
  document.getElementById('footer-text').innerHTML =
    `&copy; 2025 ${profileData.name} • Discord: <code class="bg-gray-700 px-2 py-1 rounded">${profileData.discord}</code>`;
});