import{ useEffect, useState } from "react";
import { DndContext, pointerWithin, DragEndEvent } from "@dnd-kit/core";
import axios from "axios";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import { Button } from "../components/Button";
import { Task, TaskStatus } from "../types/task"; 

const STATUSES = ["To Do", "In Progress", "Done"];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get<Task[]>("http://localhost:3000/tasks");
    setTasks(res.data);
  };
  

  const addTask = async (task: Task) => {
    const res = await axios.post<Task>("http://localhost:3000/tasks", {
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setTasks((prev) => [...prev, res.data]);
  };
  

  const updateTaskStatus = async (id: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === newStatus) return;
  
    const updatedTask: Task = {
      ...task,
      status: newStatus as TaskStatus, // ✅ cast to TaskStatus
    };
  
    await axios.put<Task>(`http://localhost:3000/tasks/${id}`, updatedTask);
  
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? updatedTask : t))
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id.toString();
    const dropZoneId = over.id.toString();

    console.log("Dragged ID:", draggedId);
    console.log("Dropped over:", dropZoneId);

    updateTaskStatus(draggedId, dropZoneId);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <Button onClick={() => setModalOpen(true)}>Add Task</Button>
      </div>

      {/* Drag-and-Drop Context */}
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4 overflow-y-auto md:overflow-visible max-h-[80vh] pb-2">
          {STATUSES.map((status) => (
            <Column
              key={status}
              title={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
            />
          ))}
        </div>
      </DndContext>

      {/* Modal */}
      {isModalOpen && <TaskModal onClose={() => setModalOpen(false)} onSave={addTask} />}
    </div>
  );
}
