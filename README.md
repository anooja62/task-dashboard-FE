# 📝 Task Management Dashboard

A Kanban-style task board built with **React**, **TypeScript**, **Tailwind CSS**, and **@dnd-kit** — integrated with a hosted fake REST API via JSON Server on **Render**.

---

## 🚀 Features

- ✅ Add new tasks with title, description, and status
- 🔁 Drag and drop tasks between columns ("To Do", "In Progress", "Done")
- 🧠 Task state is synced with backend (using Axios)
- 📱 Fully responsive layout

---

## 🧱 Project Structure

task-dashboard/ ├── src/ │ ├── components/ # Reusable UI (Button, Column, TaskCard, Modal) │ ├── pages/ # Board view │ ├── types/ # Shared TS interfaces │ ├── utils/api.ts # Axios instance │ └── App.tsx ├── public/ ├── db.json # Used only for local testing (optional) ├── server.js # For JSON Server (Render) └── package.json

## 🧑‍💻 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com:anooja62/task-dashboard-FE.git
cd task-dashboard

2. Install dependencies

npm install

3. Start the app locally (uses Render for backend)

npm run dev

The app runs on: http://localhost:5173
API calls are sent to: https://tasks-api-0wyn.onrender.com

🌐 Backend API (Hosted on Render)
Deployed at: https://tasks-api-0wyn.onrender.com

Powered by json-server

Example endpoint:

GET https://tasks-api-0wyn.onrender.com/tasks


