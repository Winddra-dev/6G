// 1. Navigation
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    navMenu.classList.toggle('active'); 
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) { 
        navMenu.classList.remove('active'); 
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        navMenu.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

function scrollToSlide(id) { 
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); 
}

// 2. Observer (Animation on Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) entry.target.classList.add('visible'); 
    });
}, { threshold: 0.2 });

document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));

// 3. LOGIC PROFIL (Standby State & Locking)
let isLocked = false;
const defaultHTML = `
    <div class="profile-placeholder">👥</div>
    <h3 style="color: var(--sage-green); margin-bottom:5px;">Tim Kelompok 6</h3>
    <p style="color: var(--soft-orange); font-weight: 700; margin-bottom: 1rem;">Kelas / Jurusan</p>
    <p style="line-height: 1.6; color: var(--text-light);">
        Arahkan kursor ke nama anggota di sebelah kiri untuk melihat detail tugas masing-masing.
    </p>
`;

function updateProfileContent(name, role, desc) {
    const content = document.getElementById('profileContent');
    content.classList.remove('fade-in');
    void content.offsetWidth; // Trigger reflow
    content.classList.add('fade-in');

    content.innerHTML = `
        <div class="profile-placeholder">👤</div>
        <h3 style="color: var(--sage-green); margin-bottom:5px;">${name}</h3>
        <p style="color: var(--soft-orange); font-weight: 700; margin-bottom: 1rem;">${role}</p>
        <p style="line-height: 1.6; color: var(--text-light);">${desc}</p>
    `;
}

function hoverProfile(name, role, desc, element) {
    if (isLocked) return; 
    updateProfileContent(name, role, desc);
}

function clearProfile() {
    if (isLocked) return;
    const content = document.getElementById('profileContent');
    content.innerHTML = defaultHTML;
}

function lockProfile(name, role, desc, element) {
    document.querySelectorAll('.member-card').forEach(c => c.classList.remove('locked'));
    isLocked = true;
    updateProfileContent(name, role, desc);
    document.getElementById('closeProfileBtn').style.display = 'inline-block';
    element.classList.add('locked');
}

function unlockProfile() {
    isLocked = false;
    document.getElementById('profileContent').innerHTML = defaultHTML;
    document.getElementById('closeProfileBtn').style.display = 'none';
    document.querySelectorAll('.member-card').forEach(c => c.classList.remove('locked'));
}

// 4. Food Interactions
let currentOpenFood = null;
function toggleFood(stageId) {
    const stage = document.getElementById(stageId);
    
    // Jika diklik saat sedang terbuka, maka tutup
    if (currentOpenFood === stageId) { 
        stage.classList.remove('active'); 
        currentOpenFood = null; 
        return; 
    }
    
    // Jika ada yang terbuka lain, tutup dulu
    if (currentOpenFood) { 
        document.getElementById(currentOpenFood).classList.remove('active'); 
    }
    
    stage.classList.add('active'); 
    currentOpenFood = stageId;
}

// 5. FULL ARTICLE MODAL
function toggleFullArticle() {
    const modal = document.getElementById('fullArticleModal');
    modal.classList.toggle('active');
}