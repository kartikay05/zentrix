# 🛡️ Zentrix — AI Incident Response Platform

Zentrix is a state-of-the-art, AI-driven platform designed to automate and streamline incident response for modern engineering teams. It integrates with your existing tools to detect, analyze, and resolve infrastructure and security incidents using advanced AI workflows.

---

## 🚀 Current Status: Authentication Complete

The full authentication foundation — backend APIs, database models, frontend UI, and global state management — is production-ready and fully integrated.

---

## ✅ What Has Been Built

### 🖥️ Backend (Node.js + Express + MongoDB)

#### Project Setup
- Initialized Node.js with **ES Modules** (`"type": "module"`)
- Environment configuration via `dotenv` with strict validation (crashes on missing vars)
- **Nodemon** for hot-reload development

#### Database & Models
- **MongoDB Atlas** connected via Mongoose
- **User Model** (`user.model.js`):
  - Fields: `name`, `email`, `password`, `avatar`, `isVerified`, `lastLoginAt`, `verificationToken`, `resetPasswordToken`, `resetPasswordExpires`
  - Password hashed automatically using `bcryptjs` via a `pre('save')` hook
  - `password` field has `select: false` to prevent accidental exposure
  - Instance methods: `comparePassword()`, `toSafeObject()`
- **Workspace Model** — Multi-tenant workspace support with unique API keys (`zx_` prefix), slugs, and GitHub repo integration
- **WorkspaceMember Model** — RBAC with `OWNER`, `MEMBER`, `VIEWER` roles and granular permissions

#### Authentication API (`/api/auth`)
- `POST /api/auth/register` — Registers a new user with detailed if/else validation
- `POST /api/auth/login` — Authenticates user, returns a `HttpOnly` JWT cookie
- `POST /api/auth/logout` — Clears the JWT cookie
- `GET  /api/auth/get-me` — Returns the authenticated user (protected by `isAuthenticated` middleware)

#### Security
- `helmet` — HTTP security headers
- `cors` — Configured to allow both `localhost:5173` and `localhost:5174` with credentials
- `bcryptjs` — Password hashing (salt rounds: 10)
- **JWT** — 7-day session tokens stored in `HttpOnly` cookies
- `morgan` — HTTP request logging in development

#### Middleware
- `isAuthenticated` — Verifies JWT from cookie, attaches `userId` to `req`

---

### 🎨 Frontend (React + Vite + Tailwind CSS v4 + Redux)

#### Project Setup
- Vite 6 + React 19
- **Tailwind CSS v4** with custom design tokens (`@theme` block in `index.css`)
- **Inter** font from Google Fonts
- **Vite proxy** configured to forward `/api` → `http://localhost:3000`

#### Design System
Custom CSS variables defined in `index.css`:
```
--color-zentrix-bg, --color-zentrix-surface, --color-zentrix-surface-2
--color-zentrix-border, --color-zentrix-primary, --color-zentrix-primary-hover
--color-zentrix-primary-light, --color-zentrix-muted, --color-zentrix-text, --color-zentrix-error
```

#### Pages
- **Login Page** (`/login`) — Premium dark UI with email + password fields, icon inputs, password toggle, glowing submit button, error alerts, and navigation link to Register
- **Register Page** (`/register`) — Same premium UI with name field, live password strength meter (Weak / Good / Strong), and navigation link to Login

#### State Management (Redux Toolkit)
- `app.store.js` — Configured Redux store
- `auth.slice.js` — Auth slice with `user`, `loading`, `error` state and `setUser`, `setLoading`, `setError` actions

#### Auth Service Layer
- `auth.api.js` — Axios instance (`baseURL: '/api'`, `withCredentials: true`) with functions:
  - `registerUser()`, `loginUser()`, `getMe()`, `logoutUser()`

#### `useAuth` Custom Hook
- `hook/useAuth.js` — Encapsulates all auth logic using `useDispatch` and `useSelector`
- Exposes: `handleRegister`, `handleLogin`, `fetchUser`, `handleLogout`, `user`, `loading`, `error`
- Smart error extraction supporting both `{ message }` and `{ errors: [{ message }] }` response formats

#### Routing
- `react-router` v7 with `createBrowserRouter`
- Routes: `/login`, `/register`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 19 + Vite 6 |
| Styling | Tailwind CSS v4 + Custom Design Tokens |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| Routing | React Router v7 |
| Backend | Node.js + Express 5 |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT + HttpOnly Cookies |
| Password Hashing | bcryptjs |
| Security | Helmet + CORS |
| Dev Tools | Nodemon + Morgan |

---

## 📂 Project Structure

```
zentrix/
├── Backend/
│   ├── src/
│   │   ├── config/         # database.js, config.js
│   │   ├── controllers/    # auth.controller.js
│   │   ├── middlewares/    # auth.middleware.js
│   │   ├── models/         # user.model.js, workspace.model.js, workspaceMember.model.js
│   │   ├── routes/         # auth.routes.js
│   │   ├── validators/     # auth.validator.js
│   │   └── app.js          # Express app + middleware setup
│   ├── server.js           # Entry point
│   ├── .env                # Environment variables
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── app/            # App.jsx, app.routes.jsx, app.store.js
    │   ├── features/
    │   │   └── auth/
    │   │       ├── hook/       # useAuth.js
    │   │       ├── pages/      # Login.jsx, Register.jsx
    │   │       ├── services/   # auth.api.js
    │   │       └── auth.slice.js
    │   ├── index.css       # Global styles + Tailwind theme
    │   └── main.jsx        # React entry + Redux Provider
    ├── vite.config.js      # Vite + Proxy config
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd zentrix
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
NODE_ENV=Development
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies `/api` → `http://localhost:3000`.

---

## 🛣️ Roadmap

- [x] **Backend Auth API** — Register, Login, Logout, GetMe
- [x] **Frontend Auth UI** — Login & Register pages with premium dark theme
- [x] **Redux State Management** — Global auth state with `useAuth` hook
- [x] **Vite Proxy** — Seamless frontend ↔ backend communication
- [ ] **Protected Routes** — Redirect unauthenticated users to login
- [ ] **Dashboard Layout** — Sidebar, header, and navigation
- [ ] **Incident Management** — Create, view, and resolve incidents
- [ ] **AI Engine** — Root cause analysis powered by LLMs
- [ ] **Real-time Updates** — WebSocket/Socket.io for live incident feed
- [ ] **Integrations** — GitHub, Slack, PagerDuty connectors
