// Données des compétences
const skillsData = {
    html: {
        name: "HTML5",
        description: "HTML5 (HyperText Markup Language) est le langage de balisage standard pour créer des pages web. Il fournit la structure de base des sites et est utilisé conjointement avec CSS et JavaScript."
    },
    css: {
        name: "CSS3",
        description: "CSS3 (Cascading Style Sheets) permet de styliser le contenu HTML. Avec CSS3, on peut créer des designs responsives, des animations et des effets visuels avancés sans JavaScript."
    },
    js: {
        name: "JavaScript",
        description: "JavaScript est un langage de programmation qui permet de créer du contenu mis à jour dynamiquement, d'animer des images, de contrôler le multimédia et tout ce à quoi on peut penser."
    },
    wp: {
        name: "WordPress",
        description: "WordPress est un système de gestion de contenu (CMS) open-source. Il permet de créer et gérer facilement des sites web et des blogs sans connaissances approfondies en programmation."
    },
    git: {
        name: "Git",
        description: "Git est un système de contrôle de version distribué qui permet de suivre les modifications apportées au code source pendant le développement logiciel."
    },
    responsive: {
        name: "Responsive Design",
        description: "Le Responsive Design est une approche de conception web qui vise à offrir une expérience de visualisation optimale sur une large gamme d'appareils (des mobiles aux écrans d'ordinateur)."
    },
    ui: {
        name: "UI/UX Design",
        description: "L'UI (User Interface) et l'UX (User Experience) Design se concentrent sur l'optimisation de l'interface et de l'expérience utilisateur pour rendre les produits plus utilisables et accessibles."
    }
};

// Initialisation des compteurs depuis localStorage
let skillCounters = JSON.parse(localStorage.getItem('skillCounters')) || {};
if (Object.keys(skillCounters).length === 0) {
    // Initialiser tous les compteurs à 0 si vide
    for (const skill in skillsData) {
        skillCounters[skill] = 0;
    }
}

// Mettre à jour l'affichage des compteurs
function updateCountersDisplay() {
    const counterList = document.getElementById('skill-counter');
    counterList.innerHTML = '';
    
    for (const skill in skillCounters) {
        const li = document.createElement('li');
        li.innerHTML = `${skillsData[skill].name} (<span class="counter-value">${skillCounters[skill]}</span> clic${skillCounters[skill] !== 1 ? 's' : ''})`;
        counterList.appendChild(li);
    }
}

// Afficher la description d'une compétence
function showSkillDescription(skillId) {
    const skill = skillsData[skillId];
    const descriptionElement = document.getElementById('skill-description');
    
    descriptionElement.innerHTML = `
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
    `;
    
    // Incrémenter le compteur
    skillCounters[skillId]++;
    localStorage.setItem('skillCounters', JSON.stringify(skillCounters));
    updateCountersDisplay();
    
    // Animation
    descriptionElement.style.animation = 'none';
    setTimeout(() => {
        descriptionElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Gestionnaire d'événement pour les boutons de compétences
document.querySelectorAll('.skill-btn').forEach(button => {
    button.addEventListener('click', function() {
        const skillId = this.getAttribute('data-skill');
        showSkillDescription(skillId);
        
        // Animation du bouton
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Gestionnaire pour le formulaire de contact
document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulation d'envoi
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Envoyé!';
        
        // Réinitialiser après 2 secondes
        setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Afficher une notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = 'Message envoyé avec succès!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        }, 2000);
    }, 1500);
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    updateCountersDisplay();
    
    // Si hash dans l'URL, faire défiler vers la section correspondante
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
});

// Ajout de styles dynamiques pour la notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.5s ease forwards;
    }
    
    .fade-out {
        animation: fadeOut 0.5s ease forwards;
    }
    
    @keyframes slideIn {
        from { bottom: -50px; opacity: 0; }
        to { bottom: 20px; opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { bottom: 20px; opacity: 1; }
        to { bottom: -50px; opacity: 0; }
    }
`;
document.head.appendChild(style);