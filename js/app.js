// NeuroApp - Aplicativo para Pessoas Neurodivergentes
// Controlador Principal da Aplicação

class NeuroApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'login';
        this.init();
    }

    init() {
        // Verificar se há usuário logado
        const savedUser = localStorage.getItem('neuroapp_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        } else {
            this.showLogin();
        }

        // Configurar event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                e.preventDefault();
                const view = e.target.dataset.nav;
                this.navigateTo(view);
            }
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    navigateTo(view) {
        this.currentView = view;
        
        // Esconder todas as views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
        });

        // Mostrar view selecionada
        const targetView = document.getElementById(`${view}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Atualizar navegação ativa
        document.querySelectorAll('[data-nav]').forEach(nav => {
            nav.classList.remove('active');
        });
        document.querySelector(`[data-nav="${view}"]`)?.classList.add('active');
    }

    showLogin() {
        const loginView = document.getElementById('login-view');
        const dashboardView = document.getElementById('dashboard-view');
        
        if (loginView) loginView.classList.add('active');
        if (dashboardView) dashboardView.classList.remove('active');
    }

    showDashboard() {
        const loginView = document.getElementById('login-view');
        const dashboardView = document.getElementById('dashboard-view');
        
        if (loginView) loginView.classList.remove('active');
        if (dashboardView) dashboardView.classList.add('active');
        
        this.navigateTo('tasks');
    }

    setUser(user) {
        this.currentUser = user;
        localStorage.setItem('neuroapp_user', JSON.stringify(user));
        this.showDashboard();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('neuroapp_user');
        this.showLogin();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar app quando o DOM estiver pronto
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NeuroApp();
});
