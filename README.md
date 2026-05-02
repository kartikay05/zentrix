# 🛡️ Zentrix - AI Incident Response Platform

Zentrix is a state-of-the-art, AI-driven platform designed to automate and streamline incident response for modern engineering teams. It integrates with your existing tools to detect, analyze, and resolve infrastructure and security incidents using advanced AI workflows.

---

## 🚀 Current Status: Foundation Phase

We have successfully initialized the core infrastructure and data models for the platform.

### ✅ Completed Milestones

#### 🖥️ Backend (Express + Mongoose)
- **Project Setup**: Initialized Node.js environment with ES Modules.
- **Database Architecture**: 
  - **User Model**: Secure authentication with `bcryptjs` password hashing, profile management, and verification tokens.
  - **Workspace Model**: Multi-tenant architecture support with unique API keys (`zx_` prefix), organizational slugs, and GitHub repository integration.
  - **Workspace Member Model**: Comprehensive Role-Based Access Control (RBAC) with `OWNER`, `MEMBER`, and `VIEWER` roles and granular permissions.
- **Infrastructure**:
  - Secure environment configuration via `dotenv`.
  - Automated database connection handling in `src/config/database.js`.
  - Health check endpoints and basic Express app setup.

#### 🎨 Frontend (React + Vite)
- **Project Scaffolding**: Initialized using Vite with React.
- **HMR & ESLint**: Optimized development environment with Hot Module Replacement and production-ready linting rules.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Vanilla CSS (Premium Aesthetics)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Bcrypt.js, Helmet, JWT (Planned)
- **AI Integration**: Custom workflows (Planned)

---

## 📂 Project Structure

```bash
zentrix/
├── Backend/          # Node.js Express Server
│   ├── src/
│   │   ├── models/   # Mongoose Schemas (User, Workspace, Member)
│   │   ├── config/   # DB and Environment config
│   │   └── app.js    # Express App initialization
│   └── server.js     # Entry point
└── Frontend/         # React Application (Vite)
```

---

## 🛣️ Roadmap

- [ ] **Authentication**: JWT-based login/signup flows.
- [ ] **AI Incident Engine**: First version of the AI analysis pipeline.
- [ ] **Dashboard**: Real-time incident monitoring UI.
- [ ] **Integrations**: GitHub, Slack, and PagerDuty connectors.
