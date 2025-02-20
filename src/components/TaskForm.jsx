import { useState } from 'react';
import { motion } from 'framer-motion';

export function TaskForm({ onSubmit, initialTask = null }) {
  const [task, setTask] = useState(initialTask || {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
    status: 'To Do'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    if (!initialTask) {
      setTask({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'To Do'
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary dark:focus:border-primary-hover focus:ring-primary dark:focus:ring-primary-hover dark:bg-gray-700 dark:text-gray-100"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary dark:focus:border-primary-hover focus:ring-primary dark:focus:ring-primary-hover dark:bg-gray-700 dark:text-gray-100"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <select
              id="priority"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary dark:focus:border-primary-hover focus:ring-primary dark:focus:ring-primary-hover dark:bg-gray-700 dark:text-gray-100"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary dark:focus:border-primary-hover focus:ring-primary dark:focus:ring-primary-hover dark:bg-gray-700 dark:text-gray-100"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary dark:focus:border-primary-hover focus:ring-primary dark:focus:ring-primary-hover dark:bg-gray-700 dark:text-gray-100"
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
          >
            {initialTask ? 'Update Task' : 'Add Task'}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}