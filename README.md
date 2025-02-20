# Task Manager

A high-performance task management application built with React, featuring an intuitive UI, dynamic animations, and smooth interactions. The app provides offline support through localStorage and includes both Kanban board and list views for efficient task organization.

## Features

### 🎯 Core Functionality
- **Dual View System**: Toggle between Kanban board and list views
- **Task Management**: Create, edit, delete, and complete tasks
- **Drag & Drop**: Intuitive task organization across status columns
- **Priority Levels**: Categorize tasks as High, Medium, or Low
- **Smart Filtering**: Search and filter tasks by priority
- **Dark Mode**: Toggle between light and dark themes
- **Offline Support**: Full functionality without internet connection

### 💫 User Experience
- Smooth animations and transitions
- Responsive design for all devices
- Interactive hover effects
- Real-time updates
- Persistent data storage

## Technology Stack

- **React**: Frontend framework
- **Tailwind CSS**: Styling and dark mode
- **Framer Motion**: Animations
- **React Beautiful DND**: Drag and drop functionality
- **Hero Icons**: UI icons
- **LocalStorage**: Offline data persistence
- **Date-fns**: Date formatting

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   ```

2. Install dependencies:
   ```bash
   cd task-manager
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating Tasks
1. Click the "Add Task" button
2. Fill in the task details:
   - Title (required)
   - Description
   - Priority level
   - Due date
   - Status

### Managing Tasks
- **Complete Task**: Click the checkmark icon (task will be removed)
- **Delete Task**: Click the trash icon
- **Move Task**: Drag and drop between status columns
- **View Toggle**: Switch between board and list views
- **Filter Tasks**: Use the search bar or priority filter
- **Dark Mode**: Toggle theme using the sun/moon icon

## Project Structure

```
src/
├── components/
│   ├── TaskBoard.jsx    # Main board component
│   └── TaskForm.jsx     # Task creation/editing form
├── hooks/
│   └── useLocalStorage.js # Local storage management
├── App.jsx              # Main application component
└── main.jsx            # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the build tooling
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Hero Icons](https://heroicons.com/) for the beautiful icons

---

Made with ❤️ by [Your Name]