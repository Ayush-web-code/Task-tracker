import React from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';

function TaskItem({ task, index, onEdit, onDelete, onStatusChange }) {
  const statusConfig = {
    pending: {
      color: 'from-yellow-400 to-orange-400',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      icon: '📋'
    },
    'in-progress': {
      color: 'from-purple-400 to-pink-400',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      icon: '⚡'
    },
    completed: {
      color: 'from-green-400 to-emerald-400',
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: '✅'
    }
  };

  const priorityConfig = {
    low: { color: 'text-slate-600', bg: 'bg-slate-100', icon: '🟢' },
    medium: { color: 'text-orange-600', bg: 'bg-orange-100', icon: '🟡' },
    high: { color: 'text-red-600', bg: 'bg-red-100', icon: '🔴' }
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const currentStatus = statusConfig[task.status];
  const currentPriority = priorityConfig[task.priority];

  return (
    <div
      className={`rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ${currentStatus.bg} border-l-4  hover:bg-white/70 backdrop-blur-sm`}
      style={{
        borderLeftColor:
          task.status === 'completed'
            ? '#10b981'
            : task.status === 'in-progress'
            ? '#a855f7'
            : '#f59e0b'
      }}
    >
      {/* Task Info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          {currentStatus.icon} {task.title}
        </h3>
        {task.description && (
          <p className="text-gray-600 mt-1">{task.description}</p>
        )}
      </div>

      {/* Status, Priority, Due Date */}
      <div className="flex items-center justify-between mb-4 text-sm font-medium">
        <span className={`${currentStatus.text}`}>
          Status: {task.status.replace('-', ' ')}
        </span>
        <span className={`${currentPriority.color}`}>
          {currentPriority.icon} {task.priority}
        </span>
        <span className="flex items-center gap-1 text-gray-500">
          <Calendar className="w-4 h-4" /> {formatDate(task.dueDate)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer hover:shadow-sm"
        >
          <option value="pending">📋 Pending</option>
          <option value="in-progress">⚡ In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>

        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md flex items-center justify-center gap-2 font-semibold  active:scale-95 cursor-pointer"
        >
          <Edit2 className="w-4 h-4" /> Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center justify-center gap-2 font-semibold active:scale-95 
          cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
