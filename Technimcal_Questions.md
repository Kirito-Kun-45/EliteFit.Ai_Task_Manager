# Answers to Technical Questions

## 1. How long did you spend on the coding test?
#### I dedicated about 4 hours to building this project from scratch. Honestly, I would’ve loved to spend more time polishing it and adding cool features—like generating task descriptions using AI—but my mid-semester exams had other plans. Since they’re happening on consecutive days, I had to strike a balance between coding and cramming.  

#### So, while I was debugging errors here, I was also debugging calculus problems over there. Multitasking at its finest! 😅 

## 2. What was the most useful feature that was added to the latest version of your chosen language?  
#### One of the most useful features in the latest version of React (React 18) is Concurrent Rendering, which improves UI responsiveness by allowing React to prepare multiple UI updates simultaneously without blocking the main thread. This makes apps feel smoother, especially when handling large data sets or animations.

#### Since I used Vite as my build tool, which is incredibly fast thanks to its ES module-based hot reloading, combining it with React 18’s concurrent features made the development experience even better. 

```javascript
import { useState, useTransition } from "react";

function TaskList({ tasks }) {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (query) => {
    startTransition(() => {
      setFilteredTasks(tasks.filter(task => task.name.includes(query)));
    });
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        onChange={(e) => handleSearch(e.target.value)} 
      />
      {isPending ? <p>Loading...</p> : (
        <ul>
          {filteredTasks.map(task => <li key={task.id}>{task.name}</li>)}
        </ul>
      )}
    </div>
  );
}
```

## 3. How would you track down a performance issue in production? Have you ever had to do this?
#### Tracking down performance issues in production is all about detective work. I’d start by identifying slow endpoints, memory leaks, or inefficient queries using DevTools, Lighthouse, or server-side profiling tools like New Relic. Logs and metrics help pinpoint bottlenecks quickly.

#### During my internships, no one was about to hand me production access—and honestly, I don’t blame them. Imagine an intern accidentally bringing down the system. 😅

#### But while building my own SaaS apps, I had to deal with real-world issues—slow APIs, unoptimized queries, and memory leaks that crashed my app at the worst times. Debugging those forced me to dive into profiling, caching, and optimizing queries to keep things running. So yeah, no one trusted me with production, but when it’s your own project, every bug is your problem. 

## 4. If you had more time, what additional features or improvements would you consider adding to the task management application?
#### Well the next thing is to integrate it with backend so that it can be used by multiple users and also add authentication so that each user can have their own tasks and also add a nice UI and animation when the task is completed

#### With more time, I’d add AI-generated task descriptions, priority-based sorting, and real-time collaboration for better team workflow. A Kanban view and reminder notifications would also enhance usability.
