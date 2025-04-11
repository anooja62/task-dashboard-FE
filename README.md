# 📝 Task Management Dashboard

A responsive Kanban-style task board built with **React**, **TypeScript**, **Tailwind CSS**, and **@dnd-kit** for smooth drag-and-drop task management.

## 🚀 Features

- 📌 Create tasks with title, description, and status
- 🟦 Columns for "To Do", "In Progress", and "Done"
- 🔀 Drag-and-drop tasks between columns
- 🔧 Persist task data with a JSON backend (`json-server`)
- 📱 Fully responsive layout for mobile and desktop

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Drag-and-Drop**: [`@dnd-kit/core`](https://docs.dndkit.com/)
- **Backend**: `json-server` for local mock API
- **State Management**: Local state with hooks

---

## 🧱 Architecture

src/ │ ├── components/ // UI components (Button, Column, TaskCard, etc.) ├── pages/ // Main board page ├── types/ // Shared TypeScript types ├── App.tsx // Root component ├── main.tsx // Entry point └── db.json // Mock database (used with json-server)


### Drag-and-Drop Flow

1. `DndContext` wraps the board and listens for drag events
2. Each `Column` is a droppable zone (`useDroppable`)
3. Each `TaskCard` is draggable (`useDraggable`)
4. On drop, task's `status` is updated in local state + backend (`json-server`)

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com:anooja62/task-dashboard-FE.git
cd task-manager-dashboard

2. Install dependencies
npm install

3. Start the mock backend (JSON Server)
Make sure db.json is present in the root folder.

npx json-server --watch db.json --port 3000

4. Start the React app
npm run dev

📂 Example JSON Format (db.json)
{
  "tasks": [
    {
      "id": "1",
      "title": "Design wireframes",
      "description": "Create wireframes for dashboard UI",
      "status": "To Do"
    }
  ]
}
