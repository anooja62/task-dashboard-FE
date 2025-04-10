import React, { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import axios from "axios";
import { Button } from "../components/Button";
import TaskModal from "../components/TaskModal";
import Column from "../components/Column";
import { Task } from "../types/task"

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id;
    updateTaskStatus(Number(active.id), newStatus);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Button onClick={() => setModalOpen(true)}>Add New Task</Button>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUSES.map((status) => (
            <SortableContext
              key={status}
              items={tasks.filter((task) => task.status === status).map((t) => t.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              <Column
                title={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
      {isModalOpen && <TaskModal onClose={() => setModalOpen(false)} onSave={addTask} />}
    </div>
  );
}
