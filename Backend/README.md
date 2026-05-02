# Zentrix Backend

The powerhouse of the **Zentrix AI Incident Response Platform**. This is a Node.js Express server integrated with MongoDB.

## 🚀 Current Implementation

### 🛡️ Core Models
- **User**: Secure auth with `bcryptjs` hashing.
- **Workspace**: Multi-tenant support with API keys and GitHub integration.
- **WorkspaceMember**: RBAC system with Owner/Member/Viewer roles.

### ⚙️ Architecture
- **Mongoose ODM**: Structured data modeling with validation and hooks.
- **ES Modules**: Modern JavaScript syntax (`import/export`).
- **Config-driven**: Environment variables managed via `dotenv`.

## 🛠️ Development

### Prerequisites
- Node.js (v18+)
- MongoDB (Running instance)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   Create a `.env` file based on the config.
3. Start the server:
   ```bash
   npm run dev
   ```

---

For the full project documentation, see the [Root README](../README.md).
