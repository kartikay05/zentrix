# 🎨 Zentrix Frontend — Premium AI Experience

The sleek, responsive, and state-of-the-art frontend for the **Zentrix AI Incident Response Platform**. Built with **React 19**, **Vite 6**, and **Tailwind CSS v4**, featuring a high-end "Cyber-Precision" dark aesthetic.

---

## 🚀 Implemented Features

### 🌌 Premium Design System
- **Tailwind CSS v4**: Utilizing the latest engine for ultra-fast styling.
- **Deep Space Theme**: A curated dark mode palette with custom design tokens for surfaces, borders, and neon glows.
- **Micro-Animations**: Smooth transitions, focus-ring glows, and interactive hover effects.
- **Responsive Layout**: Designed for seamless use across desktop, tablet, and mobile.

### 🔐 Authentication Pages
- **Login**: Elegant form with icon inputs, password visibility toggle, and secure state handling.
- **Register**: Step-by-step account creation with a **live password strength meter** (Weak / Good / Strong).
- **Error Handling**: Real-time validation and clear, descriptive alerts for backend errors.

### 🧠 State Management & Data
- **Redux Toolkit**: Centralized global store for managing `user`, `loading`, and `error` states.
- **Custom `useAuth` Hook**: A powerful hook that encapsulates all authentication logic (`handleLogin`, `handleRegister`, `fetchUser`, `handleLogout`).
- **Axios Service Layer**: Dedicated API module with interceptors and a configured Vite proxy for seamless backend communication.

---

## 🏗️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** | Modern UI framework |
| **Vite 6** | Lightning-fast build tool |
| **Tailwind v4** | Next-gen utility-first styling |
| **Redux Toolkit** | Global state management |
| **React Router v7** | Declarative client-side routing |
| **Axios** | API request handling |

---

## 📁 Project Structure

```bash
src/
├── app/            # App entry, Redux store, and route definitions
├── features/       # Feature-based architecture
│   └── auth/       # Auth pages, hook, slice, and API services
├── components/     # Global reusable UI components (Planned)
├── index.css       # Tailwind theme and custom global styles
└── main.jsx        # App mounting point with Providers
```

---

## 🛠️ Development Setup

### 1. Installation
```bash
npm install
```

### 2. Vite Proxy Configuration
The frontend is pre-configured in `vite.config.js` to proxy `/api` requests to `http://localhost:3000`. Ensure your backend is running on this port.

### 3. Run Development Server
```bash
npm run dev
```

---

## 🛣️ Roadmap (Upcoming)
- [ ] **Dashboard Home**: Real-time metrics and incident overview.
- [ ] **Incident List**: Interactive data table with sorting and filtering.
- [ ] **AI Analysis Console**: Glowing UI for interacting with AI root cause analysis.
- [ ] **Real-time Notifications**: Toast system for live incident alerts.
