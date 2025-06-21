// Project Manager Class
class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentId = 0;
        this.init();
    }

    init() {
        // Load projects from localStorage
        this.loadProjects();
        
        // Initialize DOM elements
        this.initDomElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Render projects
        this.renderProjects();
    }

    initDomElements() {
        this.projectsContainer = document.getElementById('projects-container');
        this.emptyState = document.getElementById('empty-state');
        this.projectForm = document.getElementById('project-form');
        this.projectFormElement = document.getElementById('project-form-element');
        this.formTitle = document.getElementById('form-title');
        this.projectIdInput = document.getElementById('project-id');
        this.projectNameInput = document.getElementById('project-name');
        this.projectDescriptionInput = document.getElementById('project-description');
        this.projectStartDateInput = document.getElementById('project-start-date');
        this.projectEndDateInput = document.getElementById('project-end-date');
        this.projectStatusInput = document.getElementById('project-status');
        this.addProjectBtn = document.getElementById('add-project-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.emptyAddBtn = document.getElementById('empty-add-btn');
        this.notification = document.getElementById('notification');
    }

    setupEventListeners() {
        // Add project buttons
        this.addProjectBtn.addEventListener('click', () => this.showAddProjectForm());
        this.emptyAddBtn.addEventListener('click', () => this.showAddProjectForm());
        
        // Cancel button
        this.cancelBtn.addEventListener('click', () => this.hideProjectForm());
        
        // Form submission
        this.projectFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });
    }

    loadProjects() {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            this.projects = JSON.parse(storedProjects);
            
            // Find the highest ID to set the next ID
            if (this.projects.length > 0) {
                const maxId = Math.max(...this.projects.map(project => project.id));
                this.currentId = maxId + 1;
            }
        }
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    renderProjects() {
        if (this.projects.length === 0) {
            this.projectsContainer.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.projectsContainer.style.display = 'grid';
        this.emptyState.style.display = 'none';
        
        this.projectsContainer.innerHTML = '';
        this.projects.forEach(project => this.createProjectCard(project));
    }

    createProjectCard(project) {
        const statusClass = this.getStatusClass(project.status);
        const formattedStartDate = this.formatDate(project.startDate);
        const formattedEndDate = this.formatDate(project.endDate);
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-card-header">
                <h3>${project.name}</h3>
                <span class="project-status ${statusClass}">${project.status}</span>
            </div>
            <div class="project-card-body">
                <p class="project-description">${project.description || 'Aucune description'}</p>
                <div class="project-dates">
                    <span>Début: ${formattedStartDate}</span>
                    <span>Fin: ${formattedEndDate}</span>
                </div>
                <div class="project-actions">
                    <button class="btn btn-warning edit-btn" data-id="${project.id}">Modifier</button>
                    <button class="btn btn-danger delete-btn" data-id="${project.id}">Supprimer</button>
                </div>
            </div>
        `;
        
        this.projectsContainer.appendChild(projectCard);
        
        // Add event listeners to the buttons
        const editBtn = projectCard.querySelector('.edit-btn');
        const deleteBtn = projectCard.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', () => this.showEditProjectForm(project.id));
        deleteBtn.addEventListener('click', () => this.deleteProject(project.id));
    }

    getStatusClass(status) {
        switch (status) {
            case 'En attente':
                return 'status-pending';
            case 'En cours':
                return 'status-in-progress';
            case 'Terminé':
                return 'status-completed';
            default:
                return '';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    }

    showAddProjectForm() {
        this.formTitle.textContent = 'Ajouter un projet';
        this.projectIdInput.value = '';
        this.projectFormElement.reset();
        
        // Set default dates
        const today = new Date().toISOString().split('T')[0];
        this.projectStartDateInput.value = today;
        
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        this.projectEndDateInput.value = nextMonth.toISOString().split('T')[0];
        
        this.projectForm.classList.add('active');
    }

    showEditProjectForm(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;
        
        this.formTitle.textContent = 'Modifier le projet';
        this.projectIdInput.value = project.id;
        this.projectNameInput.value = project.name;
        this.projectDescriptionInput.value = project.description || '';
        this.projectStartDateInput.value = project.startDate;
        this.projectEndDateInput.value = project.endDate;
        this.projectStatusInput.value = project.status;
        
        this.projectForm.classList.add('active');
    }

    hideProjectForm() {
        this.projectForm.classList.remove('active');
    }

    saveProject() {
        const projectId = this.projectIdInput.value;
        const name = this.projectNameInput.value.trim();
        const description = this.projectDescriptionInput.value.trim();
        const startDate = this.projectStartDateInput.value;
        const endDate = this.projectEndDateInput.value;
        const status = this.projectStatusInput.value;
        
        if (!name || !startDate || !endDate) {
            this.showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            this.showNotification('La date de fin doit être ultérieure à la date de début', 'error');
            return;
        }
        
        if (projectId) {
            // Update existing project
            const index = this.projects.findIndex(p => p.id === parseInt(projectId));
            if (index !== -1) {
                this.projects[index] = {
                    id: parseInt(projectId),
                    name,
                    description,
                    startDate,
                    endDate,
                    status
                };
                this.showNotification('Projet mis à jour avec succès', 'success');
            }
        } else {
            // Add new project
            const newProject = {
                id: this.currentId++,
                name,
                description,
                startDate,
                endDate,
                status
            };
            this.projects.push(newProject);
            this.showNotification('Projet ajouté avec succès', 'success');
        }
        
        this.saveProjects();
        this.renderProjects();
        this.hideProjectForm();
    }

    deleteProject(projectId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.saveProjects();
            this.renderProjects();
            this.showNotification('Projet supprimé avec succès', 'success');
        }
    }

    showNotification(message, type) {
        this.notification.textContent = message;
        this.notification.className = `notification notification-${type}`;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize the project manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});