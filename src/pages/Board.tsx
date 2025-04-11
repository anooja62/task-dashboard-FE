import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import axios from "axios";
import { Button } from "../components/Button";
import TaskModal from "../components/TaskModal";
import Column from "../components/Column";
import { Task } from "../types/task";

const STATUSES = ["To Do", "In Progress", "Done"];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    setTasks(res.data);
  };

  const addTask = async (task: Task) => {
    const res = await axios.post("http://localhost:3000/tasks", task);
    setTasks([...tasks, res.data]);
  };

  const updateTaskStatus = async (id: number, status: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = { ...task, status };
    await axios.put(`http://localhost:3000/tasks/${id}`, updated);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;

    const taskId = Number(active.id);
    const newStatus = over.id.toString(); // Column ID = status

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Button onClick={() => setModalOpen(true)}>Add New Task</Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4 max-h-[80vh] overflow-y-auto pb-2">
          {STATUSES.map((status) => (
            <Column
              key={status}
              title={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DndContext>

      {isModalOpen && <TaskModal onClose={() => setModalOpen(false)} onSave={addTask} />}
    </div>
  );
}
