// Módulo de Autenticação - NeuroApp

class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.setupLoginForm();
        this.setupRegisterForm();
    }

    loadUsers() {
        const users = localStorage.getItem('neuroapp_users');
        return users ? JSON.parse(users) : [];
    }

    saveUsers() {
        localStorage.setItem('neuroapp_users', JSON.stringify(this.users));
    }

    setupLoginForm() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }

        // Alternar para registro
        const registerLink = document.getElementById('show-register');
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAuthForms();
            });
        }
    }

    setupRegisterForm() {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(e.target);
            });
        }

        // Alternar para login
        const loginLink = document.getElementById('show-login');
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAuthForms();
            });
        }
    }

    toggleAuthForms() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (loginForm && registerForm) {
            loginForm.parentElement.classList.toggle('hidden');
            registerForm.parentElement.classList.toggle('hidden');
        }
    }

    handleLogin(form) {
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!email || !password) {
            app.showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            app.setUser(user);
            app.showNotification(`Bem-vindo(a), ${user.name}!`, 'success');
            form.reset();
        } else {
            app.showNotification('Email ou senha inválidos', 'error');
        }
    }

    handleRegister(form) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const neurodivergence = form.neurodivergence.value;

        // Validações
        if (!name || !email || !password || !confirmPassword) {
            app.showNotification('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (password !== confirmPassword) {
            app.showNotification('As senhas não coincidem', 'error');
            return;
        }

        if (password.length < 6) {
            app.showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            app.showNotification('Este email já está cadastrado', 'error');
            return;
        }

        // Criar novo usuário
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            neurodivergence,
            createdAt: new Date().toISOString(),
            profile: {
                preferences: {},
                progress: {}
            }
        };

        this.users.push(newUser);
        this.saveUsers();
        
        app.showNotification('Conta criada com sucesso!', 'success');
        form.reset();
        this.toggleAuthForms();
    }

    getUserById(id) {
        return this.users.find(u => u.id === id);
    }

    updateUser(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            this.saveUsers();
            
            // Atualizar usuário atual se for o mesmo
            if (app.currentUser && app.currentUser.id === userId) {
                app.currentUser = this.users[userIndex];
                localStorage.setItem('neuroapp_user', JSON.stringify(app.currentUser));
            }
            
            return true;
        }
        return false;
    }
}

// Inicializar gerenciador de autenticação
let authManager;
document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});
