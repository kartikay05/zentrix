# 🎨 Zentrix Frontend — Premium AI Experience

The sleek, responsive, and state-of-the-art frontend for the **Zentrix AI Incident Response Platform**. Built with **React 19**, **Vite 6**, and **Tailwind CSS v4**, featuring a high-end "Cyber-Precision" dark aesthetic.

---

## 🚀 Implemented Features

### 🌌 Premium Design System
- **Tailwind CSS v4**: Utilizing the latest engine for ultra-fast styling.
- **Deep Space Theme**: A curated dark mode palette (`#030712`, `#0d1117`, `#0b0f1a`) with custom design tokens for surfaces, borders, and neon glows.
- **Micro-Animations**: Smooth transitions, focus-ring glows, interactive hover effects, and pulsing status indicators.
- **100% Responsive Layout**: Fully optimized for Desktop, Tablets (iPad), and Mobile Phones.
- **Custom Scrollbar**: Elegant dark-themed scrollbars configured globally.

### 🔐 Authentication & Security
- **Login/Register Flows**: Elegant forms with icon inputs, password visibility toggle, and secure state handling.
- **Live Password Strength Meter**: Provides real-time feedback (Weak / Good / Strong) during registration.
- **Persistent Sessions**: Silent, background session restoration using `HttpOnly` cookies. The `App.jsx` root validates the session seamlessly on page reload without jarring redirects.
- **Protected Routing**: Specialized `ProtectedRoute` component that safeguards private pages and shows a custom Zentrix splash screen during initial authentication checks.

### 🖥️ Dashboard Architecture
- **Nested Routing Layout**: Implemented `DashboardLayout` combining a persistent Sidebar and Header, wrapping around dynamic page content.
- **Smart Sidebar**: Collapsible mobile drawer with backdrop overlay, and a fixed navigation menu for desktops. Includes active path highlighting and user profile integration.
- **Dynamic Header**: Features page titles, a live clock, command-palette style search, system health badge, and a populated notification dropdown.
- **Dashboard Home Page**: A comprehensive command center featuring:
  - Personalized welcome banner.
  - Glowing, color-coded **Stats Cards** (Incidents, Resolved, Uptime, AI Actions).
  - Responsive **Incident Table** (converts to a stackable Card List on mobile to prevent horizontal scrolling).
  - Timeline-style **Activity Feed** with colored icons and connecting lines.
  - **System Status Panel** featuring an SVG health ring and pulsing service indicators.

### 🧠 State Management & Data
- **Redux Toolkit**: Centralized global store managing `auth` state, including `user`, `loading`, `error`, and `isInitialized` flags.
- **Custom `useAuth` Hook**: Encapsulates all authentication logic (`handleLogin`, `handleRegister`, `fetchUser`, `handleLogout`) into easy-to-use functions.
- **Axios Service Layer**: Dedicated API module configured with `withCredentials: true` and a Vite proxy for seamless, CORS-compliant backend communication.

---

## 🏗️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** | Modern UI framework |
| **Vite 6** | Lightning-fast build tool |
| **Tailwind v4** | Next-gen utility-first styling |
| **Redux Toolkit** | Global state management |
| **React Router v7** | Declarative client-side nested routing |
| **Axios** | Secure API request handling |

---

## 📁 Project Structure

```bash
src/
├── app/                  # App entry (App.jsx), Redux store, and route definitions
├── assets/               # Static assets (images, icons, etc.)
├── components/           
│   └── layout/           # Shared DashboardLayout, Sidebar, and Header
├── features/             # Feature-based architecture
│   ├── auth/             # Auth pages (Login/Register), hook, slice, and API
│   └── dashboard/        # Dashboard Home, StatsCard, IncidentTable, ActivityFeed, SystemStatus
├── index.css             # Tailwind theme and custom global styles
└── main.jsx              # App mounting point with Providers
```

---

## 🛠️ Development Setup

### 1. Installation
```bash
npm install
```

### 2. Vite Proxy Configuration
The frontend is pre-configured in `vite.config.js` to proxy `/api` requests to `http://localhost:3000`. Ensure your backend is running on this port for authentication to work smoothly.

### 3. Run Development Server
```bash
npm run dev
```

---

## 🛣️ Roadmap (Upcoming)
- [ ] **Incident Management API**: Hook up the mock incident table data to the actual MongoDB backend.
- [ ] **AI Analysis Console**: Glowing UI for interacting with AI root cause analysis.
- [ ] **Team & Settings**: Implementing user management and platform configurations.
- [ ] **WebSockets**: Transitioning activity feed and system status to real-time socket connections.
