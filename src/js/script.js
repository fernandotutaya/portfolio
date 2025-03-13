// Datos dinámicos
const projectsData = [
    {
        title: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico full stack',
        image: './src/assets/project1.jpg',
        tech: ['fab fa-react', 'fab fa-node', 'fas fa-database'],
        link: 'https://ecommerce-demo.example.com',
        githubLink: 'https://github.com/Nightmarespirits/ecommerce-platform'
    },
    {
        title: 'Sistema de Gestion de Procesos Internos',
        description: 'Aplicación de gestión de procesos internos de Lavanderias',
        image: './src/assets/app_gestion_operaciones.png',
        tech: ['fab fa-vuejs', 'fab fa-python', 'fas fa-server', 'fab fa-node', 'fas fa-database'],
        link: 'https://washspeed.netlify.app/login',
        githubLink: 'https://github.com/Nightmarespirits/slc_Gestion_Operaciones'
    },
    {
        title: 'Portfolio Website',
        description: 'Sitio web personal responsive',
        image: 'https://source.unsplash.com/random/800x600?portfolio',
        tech: ['fab fa-html5', 'fab fa-css3', 'fab fa-js'],
        link: 'https://portfolio.example.com',
        githubLink: 'https://github.com/Nightmarespirits/portfolio'
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupEventListeners();
    setupScrollAnimations();
    animateSkills();
    
    // Inicialización de AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Typed.js para el efecto de escritura
    new Typed('#typed-text', {
        strings: [
            'Analista de Sistemas',
            'Desarrollador Full Stack',
            'Analista de Datos',
            'Creador de Soluciones Informaticás'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
});

// Funciones principales
function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    if (grid) {
        grid.innerHTML = projectsData.map(project => `
            <article class="project-card" data-aos="fade-up">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.link}" target="_blank" rel="noopener" aria-label="Ver demo"><i class="fas fa-external-link-alt"></i></a>
                            <a href="${project.githubLink}" target="_blank" rel="noopener" aria-label="Ver código"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(icon => `<span><i class="${icon}"></i></span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
    }
}

function setupEventListeners() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validación de formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Simulación de envío
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            try {
                // Simular delay de envío
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Mostrar mensaje de éxito
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            } catch (error) {
                alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(element => {
        observer.observe(element);
    });
}

function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, options);

    skillItems.forEach(item => {
        item.style.transform = 'translateY(20px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}