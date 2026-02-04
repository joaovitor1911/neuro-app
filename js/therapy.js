// Módulo de Terapia e Suporte - NeuroApp

class TherapyManager {
    constructor() {
        this.sessions = this.loadSessions();
        this.setupTherapy();
    }

    loadSessions() {
        if (!app.currentUser) return [];
        const key = `neuroapp_therapy_${app.currentUser.id}`;
        const sessions = localStorage.getItem(key);
        return sessions ? JSON.parse(sessions) : [];
    }

    saveSessions() {
        if (!app.currentUser) return;
        const key = `neuroapp_therapy_${app.currentUser.id}`;
        localStorage.setItem(key, JSON.stringify(this.sessions));
    }

    setupTherapy() {
        this.renderTherapyView();
        this.setupTherapyForm();
    }

    setupTherapyForm() {
        const therapyForm = document.getElementById('therapy-form');
        if (therapyForm) {
            therapyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addSession(e.target);
            });
        }
    }

    addSession(form) {
        const mood = form.therapyMood?.value || 'neutro';
        const notes = form.therapyNotes?.value.trim() || '';
        const activities = form.therapyActivities?.value.trim() || '';

        const newSession = {
            id: Date.now(),
            mood,
            notes,
            activities,
            date: new Date().toISOString(),
            userId: app.currentUser.id
        };

        this.sessions.unshift(newSession);
        this.saveSessions();
        this.renderTherapyView();
        form.reset();
        app.showNotification('Sessão registrada!', 'success');
    }

    deleteSession(sessionId) {
        this.sessions = this.sessions.filter(s => s.id !== sessionId);
        this.saveSessions();
        this.renderTherapyView();
    }

    renderTherapyView() {
        const therapyContainer = document.getElementById('therapy-container');
        if (!therapyContainer) return;

        let html = '<div class="therapy-dashboard">';
        html += '<h3>🧠 Jornada de Bem-Estar</h3>';

        if (this.sessions.length === 0) {
            html += '<p class="empty-state">Nenhuma sessão registrada ainda.</p>';
        } else {
            html += this.renderMoodChart();
            html += '<div class="sessions-list">';
            this.sessions.slice(0, 10).forEach(session => {
                html += this.renderSession(session);
            });
            html += '</div>';
        }

        html += '</div>';
        therapyContainer.innerHTML = html;
        this.attachSessionListeners();
    }

    renderMoodChart() {
        const moodCounts = {
            'feliz': 0,
            'neutro': 0,
            'triste': 0,
            'ansioso': 0
        };

        this.sessions.forEach(s => {
            if (moodCounts.hasOwnProperty(s.mood)) {
                moodCounts[s.mood]++;
            }
        });

        let html = '<div class="mood-chart">';
        html += '<h4>Seu Humor Recente</h4>';
        html += '<div class="mood-stats">';
        html += `<div class="mood-item"><span class="mood-icon">😊</span> Feliz: ${moodCounts.feliz}</div>`;
        html += `<div class="mood-item"><span class="mood-icon">😐</span> Neutro: ${moodCounts.neutro}</div>`;
        html += `<div class="mood-item"><span class="mood-icon">😟</span> Triste: ${moodCounts.triste}</div>`;
        html += `<div class="mood-item"><span class="mood-icon">😰</span> Ansioso: ${moodCounts.ansioso}</div>`;
        html += '</div></div>';

        return html;
    }

    renderSession(session) {
        const date = new Date(session.date);
        const formattedDate = date.toLocaleDateString('pt-BR');
        const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const moodIcons = {
            'feliz': '😊',
            'neutro': '😐',
            'triste': '😟',
            'ansioso': '😰'
        };

        return `
            <div class="session-item mood-${session.mood}">
                <div class="session-header">
                    <span class="mood-badge">${moodIcons[session.mood] || '😐'} ${session.mood}</span>
                    <span class="session-date">${formattedDate} ${formattedTime}</span>
                </div>
                ${session.notes ? `<p class="session-notes">${this.escapeHtml(session.notes)}</p>` : ''}
                ${session.activities ? `<p class="session-activities"><strong>Atividades:</strong> ${this.escapeHtml(session.activities)}</p>` : ''}
                <button class="btn-delete-session" data-session-id="${session.id}">×</button>
            </div>
        `;
    }

    attachSessionListeners() {
        document.querySelectorAll('[data-session-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sessionId = parseInt(e.target.dataset.sessionId);
                if (confirm('Deletar esta sessão?')) {
                    this.deleteSession(sessionId);
                }
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getInsights() {
        if (this.sessions.length === 0) return null;

        const recentSessions = this.sessions.slice(0, 7);
        const avgMood = recentSessions.reduce((sum, s) => {
            const moodScores = { 'feliz': 4, 'neutro': 3, 'triste': 2, 'ansioso': 2 };
            return sum + (moodScores[s.mood] || 3);
        }, 0) / recentSessions.length;

        return {
            totalSessions: this.sessions.length,
            recentAverage: avgMood,
            trend: avgMood >= 3.5 ? 'positive' : avgMood >= 2.5 ? 'neutral' : 'needsAttention'
        };
    }
}

let therapyManager;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (app.currentUser) {
            therapyManager = new TherapyManager();
        }
    }, 100);
});
