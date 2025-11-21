/* ========================
   Datos del perfil
   ======================== */
const profileData = {
    name: 'DanielH131COL',
    description: 'Software Developer | Tech Enthusiast | Game Dev',
    discord: 'danielh131col2',
    github: 'https://github.com/DanielH131COL',
    skills: [
        { icon: 'fab fa-java', color: '#E34F26', label: 'Java' },
        { icon: 'fab fa-android', color: '#3DDC84', label: 'Kotlin' },
        { icon: 'fab fa-php', color: '#777BB4', label: 'PHP' },
        { icon: 'fas fa-database', color: '#4479A1', label: 'MySQL' },
        { icon: 'fab fa-unity', color: '#000000', label: 'Unity' },
        { icon: 'fab fa-discord', color: '#5865F2', label: 'Discord Bots' },
        { icon: 'fab fa-git-alt', color: '#F05032', label: 'Git' },
        { icon: 'fab fa-linux', color: '#FCC624', label: 'Linux' },
        { icon: 'fas fa-cube', color: '#8BC34A', label: 'Minecraft' }
    ],
    projects: [
        'Bunetix',
        'FreeRank',
        'Game1',
        'MyWebSite',
        'DanielH131COL'
    ]
};

/* ========================
   Cargar datos
   ======================== */
async function loadProfileData() {
    document.getElementById('about-text').innerHTML = 
        `¡Hola! Soy <strong>${profileData.name}</strong>, ${profileData.description}. 
        Me apasiona crear soluciones con Java, Unity y bots de Discord. 
        Este es mi espacio personal para aprender y compartir. 
        Visita mis <a href="${profileData.github}" target="_blank" rel="noopener" class="text-blue-400 hover:underline">repositorios en GitHub</a>.`;

    loadSkills();
    await loadProjectsWithStars();

    document.getElementById('footer-text').innerHTML = 
        `&copy; 2025 ${profileData.name} • Discord: <code class="bg-gray-700 px-2 py-1 rounded">${profileData.discord}</code>`;
    document.getElementById('discord-info').innerHTML = 
        `También puedes contactarme en Discord: <code class="bg-gray-700 px-2 py-1 rounded">${profileData.discord}</code>`;
}

function loadSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    profileData.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-button text-center';
        div.setAttribute('role', 'listitem');
        div.setAttribute('aria-label', `Habilidad en ${skill.label}`);
        div.style.background = hexToRgba(skill.color, 0.1);
        div.innerHTML = `
            <i class="${skill.icon} text-4xl" aria-hidden="true"></i>
            <p class="mt-3 font-bold text-sm">${skill.label}</p>
        `;
        container.appendChild(div);
    });
}

async function loadProjectsWithStars() {
    const carousel = document.getElementById('carousel-inner');
    carousel.innerHTML = '<p class="text-gray-400">Cargando proyectos...</p>';

    let projectsHTML = '';
    for (const repo of profileData.projects) {
        try {
            const res = await fetch(`https://api.github.com/repos/DanielH131COL/${repo}`);
            const data = await res.json();
            const stars = data.stargazers_count || 0;
            const desc = data.description || 'Sin descripción';
            const url = data.html_url || `https://github.com/DanielH131COL/${repo}`;

            projectsHTML += `
                <a href="${url}" target="_blank" rel="noopener" class="project-card flex-shrink-0 bg-gray-800 rounded-lg shadow-md hover:shadow-2xl hover:bg-gray-700 transition-all duration-300 w-48 border border-gray-700 p-4 text-left">
                    <h3 class="text-lg font-bold text-blue-400 truncate">${data.name}</h3>
                    <p class="text-xs text-gray-400 mt-1 line-clamp-3">${escapeHtml(desc)}</p>
                    <div class="mt-3 text-xs text-yellow-400 flex items-center gap-1">
                        <i class="fas fa-star"></i> ${stars}
                    </div>
                </a>`;
        } catch (e) {
            projectsHTML += `<div class="text-red-400 text-xs">Error cargando ${repo}</div>`;
        }
    }

    carousel.innerHTML = projectsHTML + projectsHTML; // Duplicar para scroll infinito
}

/* ========================
   Helpers
   ======================== */
function hexToRgba(hex, alpha = 1) {
    const c = hex.replace('#', '');
    const r = parseInt(c.length === 3 ? c[0]+c[0] : c.substr(0,2), 16);
    const g = parseInt(c.length === 3 ? c[1]+c[1] : c.substr(2,2), 16);
    const b = parseInt(c.length === 3 ? c[2]+c[2] : c.substr(4,2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) sound.currentTime = 0, sound.play().catch(() => {});
}

/* ========================
   Modal + EmailJS
   ======================== */
function initModal() {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('contact-btn');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('contact-form');

    // EmailJS: reemplaza con tus claves reales en https://emailjs.com
    emailjs.init("M5-rH45F7Qr2BLDCd"); // <-- ¡CÁMBIALO!

    openBtn.onclick = () => { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; playSound('click-sound'); };
    closeBtn.onclick = () => { modal.style.display = 'none'; document.body.style.overflow = ''; playSound('click-sound'); };
    modal.onclick = (e) => { if (e.target === modal) closeBtn.click(); };
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBtn.click(); });

    form.onsubmit = function(e) {
        e.preventDefault();
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_m95adzn', 'template_yz84jqm', templateParams)
            .then(() => {
                alert('¡Mensaje enviado con éxito! Te responderé pronto.');
                form.reset();
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, () => {
                alert('Error al enviar. Usa Discord: danielh131col2');
            });
        playSound('click-sound');
    };
}

/* ========================
   UI Controls
   ======================== */
function initUIControls() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const stored = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = stored;
    themeIcon.className = stored === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.onclick = () => {
        const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = next;
        localStorage.setItem('theme', next);
        themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        playSound('click-sound');
    };

    document.getElementById('play-sound').onclick = () => {
        const bg = document.getElementById('background-sound');
        if (bg.paused) bg.play().catch(() => alert('Reproduce sonido manualmente'));
        else bg.pause();
        playSound('click-sound');
    };

    // Pausar carrusel al hover
    const carousel = document.getElementById('carousel-inner');
    carousel.addEventListener('mouseenter', () => carousel.style.animationPlayState = 'paused');
    carousel.addEventListener('mouseleave', () => carousel.style.animationPlayState = 'running');
}

/* ========================
   Init
   ======================== */
window.onload = () => {
    loadProfileData();
    initUIControls();
    initModal();
};