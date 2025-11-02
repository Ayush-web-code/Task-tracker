import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import Stats from './components/Stats';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterButtons from './components/FilterButtons';
import TaskAnalytics from './components/TaskAnalytics'; // ← YE IMPORT ADD KARO
import './index.css';

const API_URL = '/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-12 space-y-6">
      
      {/* Sticky App Title */}
      <div className="sticky top-0 z-50 py-4 mb-9 shadow-sm bg-gradient-to-r from-blue-400 to-indigo-500">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          TaskMaster Pro
        </h1>
        <p className="text-white/90 text-center mt-1">
          Organize, Track, and Accomplish Your Goals
        </p>
      </div>

      <Stats stats={stats} />

      <FilterButtons filter={filter} setFilter={setFilter} stats={stats} />

      {/* ====== YAHA TASKAANALYTICS ADD KARO ====== */}
      {!loading && tasks.length > 0 && (
        <TaskAnalytics tasks={tasks} />
      )}
      {/* ========================================== */}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowForm(!showForm)}
        className="btn-primary w-full md:w-auto px-6 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
      >
        {showForm ? '✕ Close Form' : '+ Add New Task'}
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4"
          >
            <TaskForm
              onSubmit={editingTask ? updateTask : createTask}
              editingTask={editingTask}
              onCancel={handleCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onStatusChange={(id, status) => updateTask(id, { status })}
        />
      )}
    </div>
  );
}

export default App;