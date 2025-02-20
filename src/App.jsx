import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskBoard } from './components/TaskBoard';
import { TaskForm } from './components/TaskForm';
import { PlusIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import './index.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: crypto.randomUUID(), completed: false }]);
    setShowForm(false);
  };

  const handleUpdateTask = (taskId, updates) => {
    if (updates.completed) {
      setTasks(tasks.filter(task => task.id !== taskId));
    } else {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ));
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleMoveTask = (taskId, sourceColumn, destinationColumn) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: destinationColumn } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Manager [EliteFit.Ai]</h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Task
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <TaskForm onSubmit={handleAddTask} />
            </motion.div>
          )}
        </AnimatePresence>

        <TaskBoard
          tasks={tasks}
          onTaskUpdate={handleUpdateTask}
          onTaskDelete={handleDeleteTask}
          onTaskMove={handleMoveTask}
        />
      </main>
    </div>
  );
}

export default App;