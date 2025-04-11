import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-3 sm:p-4 rounded shadow hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200"
    >
      <h3 className="font-semibold text-base sm:text-lg">{task.title}</h3>
      {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
    </div>
  );
};

export default TaskCard;
