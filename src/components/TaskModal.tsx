import React, { useState } from "react";
import { Task, TaskStatus } from "../types/task";
import { v4 as uuidv4 } from "uuid";
interface TaskModalProps {
  onClose: () => void;
  onSave: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("To Do");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status,
    };
    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm sm:text-base">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-sm sm:text-base">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2 text-sm"
              rows={3}
            ></textarea>
          </div>
          <div>
            <label className="block font-medium text-sm sm:text-base">Status</label>
            <select
  value={status}
  onChange={(e) => setStatus(e.target.value as TaskStatus)} 
  className="w-full mt-1 border rounded px-3 py-2 text-sm"
>
  <option value="To Do">To Do</option>
  <option value="In Progress">In Progress</option>
  <option value="Done">Done</option>
</select>

          </div>
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-sm rounded w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
