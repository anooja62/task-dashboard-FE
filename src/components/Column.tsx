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
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded-lg p-3 sm:p-4 shadow-md min-w-[280px] flex-shrink-0 ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
