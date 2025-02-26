// Datos dinámicos
const projectsData = [
    {
        title: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico full stack',
        image: 'https://source.unsplash.com/random/800x600?ecommerce',
        tech: ['fab fa-react', 'fab fa-node', 'fas fa-database']
    },
    {
        title: 'Task Manager',
        description: 'Aplicación de gestión de tareas',
        image: 'https://source.unsplash.com/random/800x600?task',
        tech: ['fab fa-vuejs', 'fab fa-python', 'fas fa-server']
    },
    {
        title: 'Portfolio Website',
        description: 'Sitio web personal responsive',
        image: 'https://source.unsplash.com/random/800x600?portfolio',
        tech: ['fab fa-html5', 'fab fa-css3', 'fab fa-js']
    }
];

const skillsData = [
    { icon: 'fab fa-html5', title: 'HTML5' },
    { icon: 'fab fa-css3-alt', title: 'CSS3' },
    { icon: 'fab fa-js', title: 'JavaScript' },
    { icon: 'fab fa-react', title: 'React' },
    { icon: 'fab fa-node', title: 'Node.js' },
    { icon: 'fas fa-database', title: 'SQL' }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadSkills();
    setupEventListeners();
    setupScrollAnimations();
});

// Funciones principales
function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = projectsData.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(icon => `<i class="${icon}"></i>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function loadSkills() {
    const grid = document.querySelector('.skills-grid');
    grid.innerHTML = skillsData.map(skill => `
        <div class="skill-card">
            <i class="${skill.icon}"></i>
            <h3>${skill.title}</h3>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Menú móvil
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Botón back-to-top
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top');
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    // Validación de formulario
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí iría la lógica de envío
        alert('Mensaje enviado con éxito!');
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-card').forEach(element => {
        observer.observe(element);
    });
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}