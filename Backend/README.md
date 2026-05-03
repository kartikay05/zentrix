# 🛠️ Zentrix Backend — The Powerhouse

The backend core of the **Zentrix AI Incident Response Platform**. Built with **Node.js**, **Express 5**, and **MongoDB**, it handles secure authentication, multi-tenant workspace management, and (soon) the AI analysis engine.

---

## 🚀 Implemented Features

### 🔐 Authentication & Security
- **Full Auth Flow**: Register, Login, Logout, and Current User (`/get-me`) endpoints.
- **JWT + Cookies**: Session management via `HttpOnly` cookies for maximum security.
- **Secure Hashing**: Passwords stored as `bcrypt` hashes with 10 salt rounds.
- **Strict Headers**: `helmet` middleware for secure HTTP headers.
- **CORS Config**: Fine-tuned for local development with the Vite frontend.

### 🗄️ Database Architecture (Mongoose)
- **User Model**: Profile management with `select: false` on sensitive fields and instance methods for safe serialization.
- **Workspace Model**: Multi-tenant support with unique API keys (`zx_` prefix), organizational slugs, and GitHub integration.
- **WorkspaceMember Model**: Granular RBAC (Role-Based Access Control) with `OWNER`, `MEMBER`, and `VIEWER` roles.
- **Automated Validation**: Built-in Mongoose validation and custom logic for all fields.

### ⚙️ Server Infrastructure
- **Modern ES Modules**: Clean `import/export` syntax.
- **Validator Middleware**: Request validation using `express-validator` to ensure data integrity.
- **Detailed Error Handling**: Specific, descriptive error messages for all edge cases (bad credentials, duplicate emails, etc.).
- **Morgan Logging**: Detailed HTTP request logs for debugging.

---

## 📁 Project Structure

```bash
src/
├── config/         # DB connection and environment validation
├── controllers/    # Request handlers (Auth logic)
├── middlewares/    # Custom middlewares (Auth guard)
├── models/         # Mongoose schemas (User, Workspace, Member)
├── routes/         # Express route definitions
├── validators/     # Request validation schemas
└── app.js          # App initialization and middleware stack
server.js           # Server entry point
```

---

## 🛠️ Development Setup

### 1. Prerequisites
- **Node.js** v18+
- **MongoDB Atlas** or a local instance

### 2. Installation
```bash
npm install
```

### 3. Environment Config
Create a `.env` file in the `Backend/` root:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=Development
```

### 4. Run Server
```bash
# Start with hot-reload via nodemon
npm run dev
```

---

## 🛣️ API Documentation (Current)

### Auth Endpoints (`/api/auth`)
- `POST /register` — New account creation.
- `POST /login` — Login and set JWT cookie.
- `POST /logout` — Clear session cookie.
- `GET  /get-me` — Fetch current user data.
