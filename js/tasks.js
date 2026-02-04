// Módulo de Gerenciamento de Tarefas - NeuroApp

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.setupTaskForm();
        this.renderTasks();
    }

    loadTasks() {
        if (!app.currentUser) return [];
        const key = `neuroapp_tasks_${app.currentUser.id}`;
        const tasks = localStorage.getItem(key);
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks() {
        if (!app.currentUser) return;
        const key = `neuroapp_tasks_${app.currentUser.id}`;
        localStorage.setItem(key, JSON.stringify(this.tasks));
    }

    setupTaskForm() {
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask(e.target);
            });
        }
    }

    addTask(form) {
        const title = form.taskTitle.value.trim();
        const description = form.taskDescription?.value.trim() || '';
        const priority = form.taskPriority?.value || 'media';
        const dueDate = form.taskDueDate?.value || '';

        if (!title) {
            app.showNotification('Por favor, adicione um título para a tarefa', 'error');
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString(),
            userId: app.currentUser.id
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        this.renderTasks();
        form.reset();
        app.showNotification('Tarefa adicionada com sucesso!', 'success');
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
        app.showNotification('Tarefa removida', 'info');
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    editTask(taskId, updates) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
            this.saveTasks();
            this.renderTasks();
            app.showNotification('Tarefa atualizada', 'success');
        }
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        if (!taskList) return;

        if (this.tasks.length === 0) {
            taskList.innerHTML = '<div class="empty-state"><p>✏️ Nenhuma tarefa ainda. Crie sua primeira tarefa!</p></div>';
            return;
        }

        const tasksByStatus = {
            pending: this.tasks.filter(t => !t.completed),
            completed: this.tasks.filter(t => t.completed)
        };

        let html = '';

        if (tasksByStatus.pending.length > 0) {
            html += '<div class="task-section"><h3>📋 Tarefas Pendentes</h3>';
            html += this.renderTaskList(tasksByStatus.pending);
            html += '</div>';
        }

        if (tasksByStatus.completed.length > 0) {
            html += '<div class="task-section"><h3>✅ Tarefas Concluídas</h3>';
            html += this.renderTaskList(tasksByStatus.completed);
            html += '</div>';
        }

        taskList.innerHTML = html;
        this.attachTaskListeners();
    }

    renderTaskList(tasks) {
        return tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}" data-task-id="${task.id}">
                <div class="task-checkbox">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} data-action="toggle" data-task-id="${task.id}">
                </div>
                <div class="task-content">
                    <h4>${this.escapeHtml(task.title)}</h4>
                    ${task.description ? `<p>${this.escapeHtml(task.description)}</p>` : ''}
                    <div class="task-meta">
                        <span class="priority-badge">${this.getPriorityLabel(task.priority)}</span>
                        ${task.dueDate ? `<span class="due-date">📅 ${this.formatDate(task.dueDate)}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-icon" data-action="delete" data-task-id="${task.id}" title="Deletar">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    attachTaskListeners() {
        document.querySelectorAll('[data-action="toggle"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = parseInt(e.target.dataset.taskId);
                this.toggleTask(taskId);
            });
        });

        document.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.dataset.taskId);
                if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
                    this.deleteTask(taskId);
                }
            });
        });
    }

    getPriorityLabel(priority) {
        const labels = {
            'alta': '🔴 Alta',
            'media': '🟡 Média',
            'baixa': '🟢 Baixa'
        };
        return labels[priority] || labels['media'];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getTaskStats() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            pending: this.tasks.filter(t => !t.completed).length
        };
    }
}

let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar inicialização do app
    setTimeout(() => {
        if (app.currentUser) {
            taskManager = new TaskManager();
        }
    }, 100);
});
