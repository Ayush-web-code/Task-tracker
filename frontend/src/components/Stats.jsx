import React from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Clock, Zap, CheckCircle2 } from 'lucide-react';

function Stats({ stats }) {
  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bg: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            className={`p-6 rounded-xl ${stat.bg} flex items-center gap-4 shadow-md`}
            variants={item}
          >
            <div className={`p-4 rounded-full bg-gradient-to-tr ${stat.color} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Stats;
