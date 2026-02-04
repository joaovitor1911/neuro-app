require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas básicas do MVP
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NeuroApp API is running!' });
});

// Rota de teste para tarefas
app.get('/api/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Tomar medicação', completed: false, priority: 'alta' },
    { id: 2, title: 'Exercício físico 10min', completed: false, priority: 'média' },
    { id: 3, title: 'Respiração 5-4-3-2-1', completed: true, priority: 'baixa' }
  ]);
});

// Rota para perfil do usuário
app.get('/api/profile', (req, res) => {
  res.json({
    username: 'Usuário Teste',
    neurodivergence: ['TDAH', 'Superdotação'],
    preferences: {
      darkMode: true,
      fontSize: 'medium',
      soundEnabled: false
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🧠 NeuroApp Backend - MVP`);
});