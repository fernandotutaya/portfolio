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
    animateSkills();
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
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botón back-to-top
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top');
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });

    // Validación de formulario
    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch para enviar a un backend

        // Simulación de envío
        const submitBtn = document.getElementById('contactForm').querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            // Simular delay de envío
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito!');
            document.getElementById('contactForm').reset();
        } catch (error) {
            alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
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

function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-item');
    
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

    skillBars.forEach(bar => {
        bar.style.transform = 'translateY(20px)';
        bar.style.opacity = '0';
        bar.style.transition = 'all 0.6s ease-out';
        observer.observe(bar);
    });
}

// Inicialización de AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Typed.js para el efecto de escritura
const typedText = new Typed('#typed-text', {
    strings: [
        'Desarrollador Full Stack',
        'Especialista en React',
        'Diseñador de UI/UX',
        'Creador de Soluciones Web'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Navegación suave
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

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Navbar transparente/sólida según el scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cambiar estilo de navbar
    if (currentScroll > 100) {
        navbar.style.background = 'var(--background-color)';
        navbar.style.boxShadow = 'var(--box-shadow)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Ocultar/mostrar navbar
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Efecto parallax en la sección hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});