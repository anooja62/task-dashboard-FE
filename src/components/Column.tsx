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
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="bg-gray-100 rounded-lg p-3 sm:p-4 shadow-md min-w-[280px] flex-shrink-0">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] space-y-2 rounded transition-colors ${
          isOver ? "ring-2 ring-blue-400 bg-blue-50" : ""
        }`}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
