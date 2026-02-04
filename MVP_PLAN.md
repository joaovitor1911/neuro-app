# NeuroApp - MVP Completo
## Plano de Implementação Detalhado

### 🎯 Visão Geral
Aplicativo completo para neurodivergentes (TDAH, Autismo, Superdotação) com suporte de IA, gestão de tarefas baseada em TCC, e ferramentas terapêuticas.

---

## 📦 Funcionalidades do MVP

### 1. 🔐 Sistema de Autenticação
- **Login/Cadastro Simples**
  - Email + Senha (sem validação complexa por enquanto)
  - Armazenamento em LocalStorage/IndexedDB
  - Sessão persistente

### 2. 📋 Questionário Inicial de Perfil
**Objetivo**: Entender o perfil neurodivergente do usuário

**Perguntas:**
1. Qual sua neurodivergência? (TDAH, Autismo, Superdotação, Múltiplas)
2. Quais suas maiores dificuldades diárias?
   - Iniciar tarefas
   - Manter foco
   - Organizar pensamentos
   - Gerenciar emoções
   - Completar projetos
   - Relações sociais
3. Em que horário você tem mais energia? (Manhã, Tarde, Noite)
4. Quais gatilhos te distraem mais?
5. Você tem apoio terapêutico atual? (Sim/Não)
6. O que você gostaria de alcançar com este app?

**Saída**: Perfil personalizado que guia as sugestões da IA

### 3. 🏠 Dashboard Principal

**Módulos Disponíveis:**
- ✅ Gestão de Tarefas (TCC)
- 🧠 Chat Terapêutico com IA
- 📊 Rastreamento de Humor/Energia
- 📝 Organização de Sentimentos
- 🎯 Metas e Objetivos
- 📅 Rotina Diária
- 📖 Diário de Progresso

### 4. ✅ Sistema de Tarefas com TCC

**Funcionalidades:**
- Criar tarefas com níveis de prioridade
- Quebrar tarefas grandes em subtarefas (técnica TCC)
- Timer Pomodoro integrado
- Identificação de bloqueios cognitivos
- Sugestões de desbloqueio da IA
- Tags/categorias personalizadas
- Notificações gentis (não agressivas)
- Histórico de conclusão

**TCC Features:**
- "Por que não consigo começar?" - Análise cognitiva
- Reformulação de pensamentos negativos
- Passos micro ("Apenas 5 minutos")
- Recompensas por conclusão

### 5. 🧠 Chat Terapêutico com IA

**Capacidades:**
- Conversa natural sobre dificuldades
- Identificação de padrões de pensamento
- Técnicas de TCC aplicadas
- Sugestões de atividades
- Exercícios de grounding
- Validação emocional
- Histórico de conversas

**Prompts Especializados:**
- "Estou travado em [tarefa]" → Desbloqueio cognitivo
- "Não sei por onde começar" → Quebra em etapas
- "Estou sobrecarregado" → Priorização e respiração
- "Meus sentimentos estão confusos" → Organização emocional

### 6. 📊 Rastreamento de Humor e Energia

**Registro Diário:**
- Nível de energia (1-10)
- Estado emocional (escolha entre 20+ emoções)
- Qualidade do sono
- Medicação tomada (se aplicável)
- Notas livres

**Visualizações:**
- Gráficos de tendência
- Identificação de padrões
- Correlações (ex: sono x produtividade)
- Relatório semanal/mensal

### 7. 📝 Organização de Sentimentos

**Ferramentas:**
- Nomear emoções (roda das emoções)
- Identificar gatilhos
- Escrever livremente (journal)
- IA ajuda a processar e organizar
- Sugestões de ações

### 8. 👑 Painel de Admin

**Configurações Disponíveis:**

#### IA Configuration:
- Escolher provedor (OpenAI, Anthropic, Local)
- Inserir API Key
- Configurar temperatura/criatividade
- Modelo a usar (GPT-4, Claude, etc)
- Custo estimado por uso

#### Pagamentos (Preparado):
- Ativar/Desativar pagamentos
- Escolher gateway (Stripe, PayPal)
- Configurar planos
- Webhooks

#### Customização:
- Temas/cores
- Idioma
- Notificações
- Backup de dados

---

## 🛠️ Stack Tecnológica

### Frontend:
- **HTML5 + CSS3 + JavaScript Vanilla**
- **LocalStorage/IndexedDB** para persistência
- **Design Responsivo** (Mobile-first)
- **Accessibility (A11y)** para neurodivergentes

### Backend (Futuro):
- **Node.js + Express**
- **PostgreSQL/Supabase**
- **API RESTful**
- **JWT Authentication**

### IA Integration:
- **OpenAI API** (GPT-4)
- **Anthropic Claude** (alternativa)
- Sistema de fallback

### Deploy:
- **Vercel** (Frontend + Serverless Functions)
- **GitHub** (Código)

---

## 📅 Roadmap de Implementação

### Fase 1 - MVP Básico (Atual) 
✅ Sistema de Login/Cadastro
✅ Questionário de Perfil
✅ Dashboard Simples
✅ Gestão de Tarefas Básica
✅ Chat de IA (simulado com respostas pré-programadas)

### Fase 2 - MVP Completo (Próxima)
🔄 Integração real com IA (OpenAI/Claude)
🔄 Sistema de tarefas avançado com TCC
🔄 Rastreamento de humor
🔄 Organização de sentimentos
🔄 Painel de Admin

### Fase 3 - Backend Real
📦 API Node.js + PostgreSQL
📦 Autenticação JWT
📦 Sincronização multi-dispositivo
📦 Sistema de pagamentos (Stripe)

### Fase 4 - Avançado
🚀 App mobile (React Native)
🚀 Notificações push
🚀 Modo offline
🚀 Relatórios para terapeut as
🚀 Comunidade de usuários

---

## ✨ Diferenciais do NeuroApp

1. **Foco em Neurodivergência**: Não é um app genérico adaptado
2. **IA Terapêutica**: Treinada especificamente para TDAH/Autismo/Superdotação
3. **Técnicas de TCC**: Integradas nativamente
4. **Sem Julgamento**: Linguagem validante e encorajadora
5. **Customizável**: Cada cérebro funciona diferente
6. **Privacy-First**: Dados do usuário protegidos
7. **Acessível**: Design pensado para neurodivergentes

---

## 📝 Próximos Passos

1. **Aprovar este plano**
2. **Implementar versão SPA completa** (Single Page Application em HTML/JS)
3. **Testar localmente**
4. **Deploy no Vercel**
5. **Coletar feedback inicial**
6. **Iterar e melhorar**

---

**Criado em**: 04/02/2026
**Última atualização**: 04/02/2026
**Status**: 🟡 Em desenvolvimento
