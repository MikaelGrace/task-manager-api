// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

import { useEffect, useState } from "react";
import API from "./services/api";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // GET TASKS
  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks...");
      const response = await API.get("/tasks");
      console.log("Tasks received:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // CREATE TASK
  const createTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      const newTask = {
        title: title.trim(),
        description: "",
        dueDate: new Date().toISOString(),
        isCompleted: false
      };

      console.log("Sending task:", newTask);
      const response = await API.post("/tasks", newTask);
      console.log("Response:", response);

      setTitle("");
      fetchTasks();

    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task: " + error.message);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };

    loadTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button style={{marginLeft : "10px"}} onClick={createTask}>
        Add Task
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>

            {task.title}

            <button style={{marginLeft : "10px"}} onClick={() => deleteTask(task.id)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
