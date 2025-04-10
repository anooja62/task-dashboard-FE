import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

import { Task } from "../types/task";

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, status, tasks }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md" ref={setNodeRef}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;