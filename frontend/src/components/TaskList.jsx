import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import { FileX } from 'lucide-react';

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-2">
        <FileX className="w-12 h-12 mx-auto mb-2" />
        <h2 className="text-xl font-semibold">No tasks found</h2>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <TaskItem
            key={task._id}
            task={task}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;
