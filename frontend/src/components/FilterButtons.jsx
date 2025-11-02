import React from 'react';
import { motion } from 'framer-motion';

function FilterButtons({ filter, setFilter, stats }) {
  const filters = [
    { id: 'all', label: 'All Tasks', count: stats.total, color: 'blue' },
    { id: 'pending', label: 'Pending', count: stats.pending, color: 'yellow' },
    { id: 'in-progress', label: 'In Progress', count: stats.inProgress, color: 'purple' },
    { id: 'completed', label: 'Completed', count: stats.completed, color: 'green' },
  ];

  const colorStyles = {
    blue: {
      active: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50',
      inactive: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    },
    yellow: {
      active: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50',
      inactive: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    },
    purple: {
      active: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50',
      inactive: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    },
    green: {
      active: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50',
      inactive: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }
  };

  return (
    <div className="flex gap-4">
      {filters.map((f) => (
        <motion.button
          key={f.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter(f.id)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
            filter === f.id ? colorStyles[f.color].active : colorStyles[f.color].inactive
          }`}
        >
          <span>{f.label}</span>
          <span className="bg-white text-black px-2 py-0.5 rounded-full text-sm">{f.count}</span>
        </motion.button>
      ))}
    </div>
  );
}

export default FilterButtons;
