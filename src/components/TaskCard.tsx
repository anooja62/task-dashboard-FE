import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
    transition: "all 0.2s ease",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all duration-200"
    >
      <h3 className="font-semibold text-base sm:text-lg md:text-xl">{task.title}</h3>
      {task.description && (
        <p className="text-sm sm:text-base text-gray-600 mt-1">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
