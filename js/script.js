/* -------------------------
   Datos del perfil (editable)
   ------------------------- */
const profileData = {
    name: 'DanielH131COL',
    description: '💻 Software Developer | ⚡ Tech Enthusiast | 🎮 Game Dev',
    discord: 'danielh131col2',
    github: 'https://github.com/DanielH131COL',
    skills: [
        { icon: 'fab fa-java', color: '#E34F26', label: 'Java' },
        { icon: 'fab fa-android', color: '#007396', label: 'Kotlin' },
        { icon: 'fab fa-php', color: '#777BB4', label: 'PHP' },
        { icon: 'fas fa-database', color: '#4479A1', label: 'MySQL' },
        { icon: 'fab fa-unity', color: '#00A300', label: 'Unity' },
        { icon: 'fab fa-discord', color: '#00A4EF', label: 'Discord Bots' },
        { icon: 'fab fa-git-alt', color: '#F05032', label: 'Git' },
        { icon: 'fab fa-linux', color: '#000000', label: 'Linux' },
        { icon: 'fab fa-minecraft', color: '#00A300', label: 'Minecraft' }
    ],
    projects: [
        { title: 'Bunetix', icon: 'fas fa-server', description: 'Totally free Proxy Core.', url: 'https://github.com/DanielH131COL/Bunetix', public: true, stars: 0 },
        { title: 'DanielH131COL', icon: 'fas fa-user', description: 'No description provided.', url: 'https://github.com/DanielH131COL/DanielH131COL', public: true, stars: 0 },
        { title: 'FreeRank', icon: 'fas fa-star', description: 'Easy is a freerank, that\'s all hehe.', url: 'https://github.com/DanielH131COL/FreeRank', public: true, stars: 0 },
        { title: 'Game1', icon: 'fas fa-gamepad', description: 'It\'s my first game inspired a bit by aim themes.', url: 'https://github.com/DanielH131COL/Game1', public: true, stars: 0 },
        { title: 'MyWebSite', icon: 'fas fa-globe', description: 'Personal website and playground.', url: 'https://github.com/DanielH131COL/MyWebSite', public: true, stars: 0 }
    ]
};

/* -------------------------
   Cargar datos al DOM
   ------------------------- */
function loadProfileData() {
    const aboutText = document.getElementById('about-text');
    if (aboutText) {
        aboutText.innerHTML = `¡Hola! Soy <strong>${profileData.name}</strong>, ${profileData.description}. Este sitio es mi espacio para aprender y experimentar con nuevas tecnologías. Revisa mis <a href="${profileData.github}" target="_blank" rel="noopener">repos</a>.`;
    }

    // Habilidades
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        profileData.skills.forEach(skill => {
            const div = document.createElement('div');
            div.className = 'skill-button';
            div.setAttribute('role', 'listitem');
            div.style.background = hexToRgba(skill.color, 0.08);
            div.innerHTML = `<i class="${skill.icon} text-white"></i><p class="mt-2 text-white font-bold">${skill.label}</p>`;
            skillsContainer.appendChild(div);
        });
    }

    // Proyectos
    const carouselInner = document.getElementById('carousel-inner');
    if (carouselInner) {
        carouselInner.innerHTML = '';
        const publicProjects = profileData.projects.filter(p => p.public !== false);
        carouselInner.innerHTML = publicProjects.map(project => `
            <a href="${project.url}" target="_blank" class="project-card flex-shrink-0 bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 w-[160px] border border-gray-700">
                <h3 class="text-md font-semibold text-blue-400 truncate">${escapeHtml(project.title)}</h3>
                <p class="text-xs text-gray-400">${escapeHtml(project.description || 'Sin descripción')}</p>
                <div class="stars text-gray-400">
                    ${project.stars > 0 ? `<i class="fas fa-star"></i> ${project.stars}` : '0'}
                </div>
            </a>
        `).join('');
        carouselInner.innerHTML += carouselInner.innerHTML; // Scroll infinito
    }

    // Footer y modal info
    const footer = document.getElementById('footer-text');
    if (footer) footer.innerHTML = `<i class="fas fa-copyright mr-2 text-gray-400"></i>&copy; 2025 ${profileData.name}. Discord: <code>${profileData.discord}</code>`;
    const modalP = document.getElementById('discord-info');
    if (modalP) modalP.innerHTML = `Discord: <code>${profileData.discord}</code>`;
}

/* -------------------------
   Helpers
   ------------------------- */
function hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#','').trim();
    if (c.length === 3) c = c.split('').map(ch => ch+ch).join('');
    const r = parseInt(c.substr(0,2),16);
    const g = parseInt(c.substr(2,2),16);
    const b = parseInt(c.substr(4,2),16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(m) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

/* -------------------------
   Modal de contacto
   ------------------------- */
function initModal() {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('contact-btn');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('contact-form');

    if (!modal || !openBtn || !closeBtn || !form) return;

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        playSound('click-sound');
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        playSound('click-sound');
    });

    modal.addEventListener('click', (ev) => {
        if (ev.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            playSound('click-sound');
        }
    });

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) {
            alert('Completa todos los campos.');
            playSound('click-sound');
            return;
        }
        alert('¡Mensaje enviado! Te contactaré pronto vía Discord o email.');
        playSound('click-sound');
        form.reset();
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
}

/* -------------------------
   Sonidos y controles de UI
   ------------------------- */
function playSound(soundId) {
    try {
        const sound = document.getElementById(soundId);
        if (!sound) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    } catch (e) {}
}

function initUIControls() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const stored = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = stored;
    themeIcon.className = stored === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle && themeToggle.addEventListener('click', () => {
        const current = document.body.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = next;
        localStorage.setItem('theme', next);
        themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        playSound('click-sound');
    });

    const playBtn = document.getElementById('play-sound');
    playBtn && playBtn.addEventListener('click', () => {
        const bg = document.getElementById('background-sound');
        if (bg) {
            if (bg.paused) { bg.play().catch(() => {}); } else { bg.pause(); }
        }
        playSound('click-sound');
    });

    document.addEventListener('click', (ev) => {
        const a = ev.target.closest('a');
        if (a) playSound('click-sound');
    });
}

/* -------------------------
   Inicialización general
   ------------------------- */
window.addEventListener('load', () => {
    loadProfileData();
    initUIControls();
    initModal();
});