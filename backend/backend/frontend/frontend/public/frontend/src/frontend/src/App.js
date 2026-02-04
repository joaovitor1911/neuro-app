import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados da API (backend)
    fetchProfile();
    fetchTasks();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.log('Erro ao buscar perfil:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log('Erro ao buscar tarefas:', error);
      setLoading(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  if (loading) {
    return <div className="loading">🧠 Carregando NeuroApp...</div>;
  }

  return (
    <div className="App">
      <header className="header">
        <h1>🧠 NeuroApp</h1>
        {profile && (
          <div className="profile">
            <p>👋 Olá, {profile.username}!</p>
            <span className="badge">{profile.neurodivergence.join(' + ')}</span>
          </div>
        )}
      </header>

      <main className="main">
        <section className="dashboard">
          <h2>🎯 Meu Dia</h2>
          <div className="task-list">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority}`}
                onClick={() => toggleTask(task.id)}
              >
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => {}} 
                />
                <span className="task-title">{task.title}</span>
                <span className="priority-badge">{task.priority}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="info">
          <div className="card">
            <h3>✨ Bem-vindo ao MVP!</h3>
            <p>Este é o MVP do NeuroApp - um app personalizado para neurodivergentes.</p>
            <ul>
              <li>✅ Backend Node.js + Express funcionando</li>
              <li>✅ Frontend React conectado</li>
              <li>✅ Design dark mode e acessível</li>
              <li>🚧 Em desenvolvimento: timers, IA, gamificação</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;