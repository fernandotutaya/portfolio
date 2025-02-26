class DataService {
    static getPortfolioData() {
        const savedData = localStorage.getItem('portfolioData');
        return savedData ? JSON.parse(savedData) : this.getDefaultData();
    }

    static getDefaultData() {
        return {
            name: 'Tu Nombre',
            jobTitle: 'Desarrollador Web',
            heroImage: 'https://source.unsplash.com/random/1920x1080',
            projects: [
                {
                    title: 'Proyecto Ejemplo',
                    description: 'Descripción del proyecto',
                    image: 'https://source.unsplash.com/random/800x600',
                    tech: ['fab fa-html5', 'fab fa-css3-alt', 'fab fa-js']
                }
            ],
            socials: [
                { platform: 'github', url: '#' },
                { platform: 'linkedin', url: '#' }
            ]
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const data = DataService.getPortfolioData();
    
    // Actualizar el DOM con los datos
    document.querySelector('.hero-content h1').textContent = data.name;
    document.querySelector('.hero-content p').textContent = data.jobTitle;
    document.querySelector('.hero').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${data.heroImage})`;
    
    // Cargar proyectos
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = data.projects.map(project => `
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

    // Cargar redes sociales
    const socialLinks = document.querySelector('.social-links');
    socialLinks.innerHTML = data.socials.map(social => `
        <a href="${social.url}" class="social-btn" target="_blank">
            <i class="fab fa-${social.platform}"></i>
        </a>
    `).join('');
});