class AdminController {
    constructor() {
        this.form = document.getElementById('portfolioForm');
        this.projectsContainer = document.getElementById('projectsContainer');
        this.socialsContainer = document.getElementById('socialsContainer');
        this.projectTemplate = document.getElementById('projectTemplate');
        this.socialTemplate = document.getElementById('socialTemplate');
        
        this.loadData();
        this.setupEventListeners();
    }

    loadData() {
        this.data = DataService.getPortfolioData();
        this.populateForm();
    }

    populateForm() {
        // Información principal
        document.getElementById('name').value = this.data.name;
        document.getElementById('jobTitle').value = this.data.jobTitle;
        document.getElementById('heroImage').value = this.data.heroImage;

        // Proyectos
        this.projectsContainer.innerHTML = '';
        this.data.projects.forEach(project => {
            this.addProject(project);
        });

        // Redes sociales
        this.socialsContainer.innerHTML = '';
        this.data.socials.forEach(social => {
            this.addSocial(social);
        });
    }

    addProject(projectData = {}) {
        const clone = this.projectTemplate.content.cloneNode(true);
        const projectItem = clone.querySelector('.project-item');
        
        if(projectData.title) {
            projectItem.querySelector('.project-title').value = projectData.title;
            projectItem.querySelector('.project-description').value = projectData.description;
            projectItem.querySelector('.project-image').value = projectData.image;
            projectItem.querySelector('.project-tech').value = projectData.tech.join(', ');
        }
        
        this.projectsContainer.appendChild(clone);
    }

    addSocial(socialData = {}) {
        const clone = this.socialTemplate.content.cloneNode(true);
        const socialItem = clone.querySelector('.social-item');
        
        if(socialData.platform) {
            socialItem.querySelector('.social-platform').value = socialData.platform;
            socialItem.querySelector('.social-url').value = socialData.url;
        }
        
        this.socialsContainer.appendChild(clone);
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveData();
        });
    }

    saveData() {
        const formData = {
            name: document.getElementById('name').value,
            jobTitle: document.getElementById('jobTitle').value,
            heroImage: document.getElementById('heroImage').value,
            projects: [],
            socials: []
        };

        // Recopilar proyectos
        document.querySelectorAll('.project-item').forEach(item => {
            formData.projects.push({
                title: item.querySelector('.project-title').value,
                description: item.querySelector('.project-description').value,
                image: item.querySelector('.project-image').value,
                tech: item.querySelector('.project-tech').value.split(',').map(t => t.trim())
            });
        });

        // Recopilar redes sociales
        document.querySelectorAll('.social-item').forEach(item => {
            formData.socials.push({
                platform: item.querySelector('.social-platform').value,
                url: item.querySelector('.social-url').value
            });
        });

        localStorage.setItem('portfolioData', JSON.stringify(formData));
        alert('Datos guardados exitosamente!');
    }
}

// Funciones globales para los botones
function addProject() {
    const admin = new AdminController();
    admin.addProject();
}

function removeProject(button) {
    button.closest('.project-item').remove();
}

function addSocial() {
    const admin = new AdminController();
    admin.addSocial();
}

function removeSocial(button) {
    button.closest('.social-item').remove();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new AdminController();
});