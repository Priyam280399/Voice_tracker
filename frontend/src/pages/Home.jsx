// import React, { useState } from 'react';
// import VoiceInput from '../components/VoiceInput';
// import TaskModal from '../components/TaskModal';
// export default function Home() {
//   const [editing, setEditing] = useState(null);
//   const [open, setOpen] = useState(false);
//   const handleParsed = (payload) => {
//     const { parsed, transcript } = payload;
//     setEditing({ ...parsed, description: transcript });
//     setOpen(true);
//   };
//   return (
//     <div className='container'>
//       <h1>Voice Task Tracker</h1>
//       <p>Click Record, speak naturally, review parsed fields, then save.</p>
//       <div style={{ marginTop:12 }}>
//         <VoiceInput onParsed={handleParsed} onError={(e)=>console.error(e)} />
//         <button style={{ marginLeft:12 }} onClick={()=>{ setEditing({}); setOpen(true); }}>Add Task Manually</button>
//       </div>
//       <TaskModal open={open} initial={editing || {}} onClose={()=>setOpen(false)} onSave={(data)=>{ console.log('Save data', data); setOpen(false); }} />
//     </div>
//   )
// }


// import React, { useState } from 'react';
// import VoiceInput from '../components/VoiceInput';
// import TaskModal from '../components/TaskModal';
// import { createTask } from '../api/api';

// export default function Home() {
//   const [editing, setEditing] = useState(null);
//   const [open, setOpen] = useState(false);

//   // When voice parsing finishes
//   const handleParsed = (payload) => {
//     const { parsed, transcript } = payload;

//     setEditing({
//       ...parsed,
//       description: transcript
//     });

//     setOpen(true);
//   };

//   // Save task to DB
//   const handleSave = async (data) => {
//     try {
//       console.log("Sending to backend:", data);

//       const res = await createTask(data);

//       console.log("Saved to DB:", res.data);

//       alert("Task saved successfully!");

//       setOpen(false);
//       setEditing(null);

//     } catch (err) {
//       console.error("Save failed", err);
//       alert("Could not save task");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Voice Task Tracker</h1>
//       <p>Click Record, speak naturally, review parsed fields, then save.</p>

//       <div style={{ marginTop: 12 }}>
//         <VoiceInput onParsed={handleParsed} onError={(e) => console.error(e)} />

//         <button
//           style={{ marginLeft: 12 }}
//           onClick={() => {
//             setEditing({});
//             setOpen(true);
//           }}
//         >
//           Add Task Manually
//         </button>
//       </div>

//       <TaskModal
//         open={open}
//         initial={editing || {}}
//         onClose={() => setOpen(false)}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import VoiceInput from "../components/VoiceInput";
import TaskModal from "../components/TaskModal";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Load tasks from DB
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Could not load tasks", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // When voice parsing finishes
  const handleParsed = (payload) => {
    const { parsed, transcript } = payload;

    // Open modal with auto-filled info
    setEditing({
      ...parsed,
      description: transcript
    });

    setOpen(true);
  };

  // Save a new or edited task
  const handleSave = async (data) => {
    try {
      if (editing && editing._id) {
        // Update existing
        await updateTask(editing._id, data);
      } else {
        // Create new
        await createTask(data);
      }

      setOpen(false);
      setEditing(null);
      await loadTasks();

      alert("Task saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      alert("Could not save task");
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete task");
    }
  };

  return (
    <div className="container">
      <h1>Voice Task Tracker</h1>
      <p>Click Record to create tasks from your voice. Or manage tasks below.</p>

      {/* Voice Input */}
      <div style={{ marginTop: 12 }}>
        <VoiceInput onParsed={handleParsed} onError={(e) => console.error(e)} />

        <button
          style={{ marginLeft: 12, marginTop: 5  }}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Task Manually
        </button>
      </div>

      {/* Task List */}
      <h2 style={{ marginTop: 5 }}>Your Tasks</h2>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            background: "#fff",
            padding: 12,
            marginTop: 8,
            borderRadius: 6,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <div><strong>{task.title}</strong></div>
          <div>{task.description}</div>
          <div>Status: {task.status}</div>
          <div>Priority: {task.priority}</div>
          <div>Due: {task.dueDate ? new Date(task.dueDate).toLocaleString() : "—"}</div>

          {/* Buttons */}
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                setEditing(task);
                setOpen(true);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              style={{ background: "#e53e3e", color: "white", border: "none", padding: "6px 10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Task Modal */}
      <TaskModal
        open={open}
        initial={editing || {}}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
