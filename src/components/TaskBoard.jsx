import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { 
  CheckCircleIcon, 
  TrashIcon, 
  PencilIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { TaskForm } from './TaskForm'; // Added import

const priorityColors = {
  High: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  Medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  Low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
};

const columns = {
  'To Do': { id: 'todo', order: 1 },
  'In Progress': { id: 'inProgress', order: 2 },
  'Done': { id: 'done', order: 3 }
};

export function TaskBoard({ tasks, onTaskUpdate, onTaskDelete, onTaskMove }) {
  const [viewMode, setViewMode] = useState('board');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;
    const taskId = result.draggableId;
    
    onTaskMove(taskId, sourceColumn, destinationColumn);
  };

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, Object.keys(columns).reduce((acc, col) => ({ ...acc, [col]: [] }), {}));

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-4 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-hover bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm dark:shadow-inner transition-colors placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-hover bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-colors"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button
          onClick={() => setViewMode(prev => prev === 'board' ? 'list' : 'board')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
        >
          {viewMode === 'board' ? (
            <ListBulletIcon className="w-6 h-6" />
          ) : (
            <Squares2X2Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {viewMode === 'board' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(columns).map(([columnTitle, { id }]) => (
              <div key={id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">{columnTitle}</h3>
                <Droppable droppableId={columnTitle}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      <AnimatePresence>
                        {groupedTasks[columnTitle].map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border dark:border-gray-600"
                                onClick={() => setEditingTask(task)}
                              >
                                <TaskCard task={task} onUpdate={onTaskUpdate} onDelete={onTaskDelete} />
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border dark:border-gray-600"
              onClick={() => setEditingTask(task)}
            >
              <TaskCard task={task} onUpdate={onTaskUpdate} onDelete={onTaskDelete} />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={() => setEditingTask(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Task</h2>
                <button
                  onClick={() => setEditingTask(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <TaskForm
                initialTask={editingTask}
                onSubmit={(updatedTask) => {
                  onTaskUpdate(editingTask.id, updatedTask);
                  setEditingTask(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TaskCard({ task, onUpdate, onDelete }) {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent opening edit modal when clicking buttons
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
        </div>
        <div className="flex gap-2" onClick={handleClick}>
          <button
            onClick={() => onUpdate(task.id, { completed: !task.completed })}
            className="p-1 hover:text-primary dark:hover:text-primary-hover transition-colors"
          >
            <CheckCircleIcon className={`w-5 h-5 ${task.completed ? 'text-primary dark:text-primary-hover' : ''}`} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
        </span>
      </div>
    </div>
  );
}