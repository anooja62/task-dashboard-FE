import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Task } from "../types/task";

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
}

const getColumnColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "bg-blue-50";
    case "In Progress":
      return "bg-yellow-50";
    case "Done":
      return "bg-green-50";
    default:
      return "bg-gray-100";
  }
};

const Column: React.FC<ColumnProps> = ({ title, status, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const bgColor = getColumnColor(status);

  return (
    <div className={`rounded-lg p-3 sm:p-4 shadow-md min-w-[280px] flex-shrink-0 ${bgColor}`}>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] space-y-2 rounded transition-colors ${
          isOver ? "ring-2 ring-blue-400 bg-white" : ""
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
