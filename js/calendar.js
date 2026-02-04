// Módulo de Calendário e Rotina - NeuroApp

class CalendarManager {
    constructor() {
        this.events = this.loadEvents();
        this.setupCalendar();
    }

    loadEvents() {
        if (!app.currentUser) return [];
        const key = `neuroapp_events_${app.currentUser.id}`;
        const events = localStorage.getItem(key);
        return events ? JSON.parse(events) : [];
    }

    saveEvents() {
        if (!app.currentUser) return;
        const key = `neuroapp_events_${app.currentUser.id}`;
        localStorage.setItem(key, JSON.stringify(this.events));
    }

    setupCalendar() {
        this.renderCalendar();
        this.setupEventForm();
    }

    setupEventForm() {
        const eventForm = document.getElementById('event-form');
        if (eventForm) {
            eventForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addEvent(e.target);
            });
        }
    }

    addEvent(form) {
        const title = form.eventTitle.value.trim();
        const date = form.eventDate.value;
        const time = form.eventTime?.value || '';
        const type = form.eventType?.value || 'other';

        if (!title || !date) {
            app.showNotification('Preencha título e data', 'error');
            return;
        }

        const newEvent = {
            id: Date.now(),
            title,
            date,
            time,
            type,
            createdAt: new Date().toISOString()
        };

        this.events.push(newEvent);
        this.saveEvents();
        this.renderCalendar();
        form.reset();
        app.showNotification('Evento adicionado!', 'success');
    }

    deleteEvent(eventId) {
        this.events = this.events.filter(e => e.id !== eventId);
        this.saveEvents();
        this.renderCalendar();
    }

    renderCalendar() {
        const calendarView = document.getElementById('calendar-view');
        if (!calendarView) return;

        const today = new Date();
        const upcomingEvents = this.events
            .filter(e => new Date(e.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        let html = '<div class="calendar-container">';
        html += '<h3>📅 Próximos Eventos</h3>';

        if (upcomingEvents.length === 0) {
            html += '<p class="empty-state">Nenhum evento agendado</p>';
        } else {
            html += '<div class="event-list">';
            upcomingEvents.forEach(event => {
                html += this.renderEvent(event);
            });
            html += '</div>';
        }

        html += '</div>';
        calendarView.innerHTML = html;
        this.attachEventListeners();
    }

    renderEvent(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('pt-BR');
        
        return `
            <div class="event-item event-${event.type}">
                <div class="event-date">
                    <span class="day">${eventDate.getDate()}</span>
                    <span class="month">${eventDate.toLocaleDateString('pt-BR', { month: 'short' })}</span>
                </div>
                <div class="event-details">
                    <h4>${this.escapeHtml(event.title)}</h4>
                    <p>${formattedDate} ${event.time ? `às ${event.time}` : ''}</p>
                </div>
                <button class="btn-delete" data-event-id="${event.id}">×</button>
            </div>
        `;
    }

    attachEventListeners() {
        document.querySelectorAll('[data-event-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = parseInt(e.target.dataset.eventId);
                if (confirm('Deletar este evento?')) {
                    this.deleteEvent(eventId);
                }
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let calendarManager;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (app.currentUser) {
            calendarManager = new CalendarManager();
        }
    }, 100);
});
