// import React, { useState, useEffect } from 'react';
// export default function TaskModal({ open, initial = {}, onClose, onSave }) {
//   const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', status: 'To Do', dueDate: '' });
//   useEffect(() => {
//     if (initial) setForm({
//       title: initial.title || '',
//       description: initial.description || '',
//       priority: initial.priority || 'Medium',
//       status: initial.status || 'To Do',
//       dueDate: initial.dueDate ? new Date(initial.dueDate).toISOString().slice(0,16) : ''
//     });
//   }, [initial]);
//   if (!open) return null;
//   return (
//     <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.4)' }}>
//       <div style={{ background:'white', padding:16, width:520, borderRadius:8 }}>
//         <h3>{initial._id ? 'Edit Task' : 'Create Task'}</h3>
//         <div style={{ marginTop:8 }}>
//           <label>Title</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{ width:'100%', padding:8, marginTop:4 }} />
//         </div>
//         <div style={{ marginTop:8 }}>
//           <label>Description</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{ width:'100%', padding:8, marginTop:4 }} />
//         </div>
//         <div style={{ display:'flex', gap:8, marginTop:8 }}>
//           <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
//           <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>To Do</option><option>In Progress</option><option>Done</option></select>
//           <input type='datetime-local' value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})} />
//         </div>
//         {initial.description && <div style={{ marginTop:8, padding:8, background:'#F7FAFC', borderRadius:6 }}><strong>Captured transcript:</strong><div style={{ marginTop:6 }}>{initial.description}</div></div>}
//         <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:12 }}>
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={()=>onSave({ ...form, dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null })} style={{ background:'#3182ce', color:'white', border:'none', padding:'8px 12px', borderRadius:6 }}>Save</button>
//         </div>
//       </div>
//     </div>
//   )
// }



// import React, { useState, useEffect } from 'react';

// export default function TaskModal({ open, initial = {}, onClose, onSave }) {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     priority: 'Medium',
//     status: 'To Do',
//     dueDate: ''
//   });

//   useEffect(() => {
//     if (initial) {
//       setForm({
//         title: initial.title || '',
//         description: initial.description || '',
//         priority: initial.priority || 'Medium',
//         status: initial.status || 'To Do',
//         dueDate: initial.dueDate ? new Date(initial.dueDate).toISOString().slice(0, 16) : ''
//       });
//     }
//   }, [initial]);

//   if (!open) return null;

//   return (
//     <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
//       <div style={{ background: 'white', padding: 16, width: 520, borderRadius: 8 }}>
//         <h3>{initial._id ? 'Edit Task' : 'Create Task'}</h3>

//         <div style={{ marginTop: 8 }}>
//           <label>Title</label>
//           <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
//         </div>

//         <div style={{ marginTop: 8 }}>
//           <label>Description</label>
//           <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
//         </div>

//         <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//           <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//             <option>Critical</option>
//           </select>

//           <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
//             <option>To Do</option>
//             <option>In Progress</option>
//             <option>Done</option>
//           </select>

//           <input type="datetime-local" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
//         </div>

//         {initial.description && (
//           <div style={{ marginTop: 8, padding: 8, background: '#F7FAFC', borderRadius: 6 }}>
//             <strong>Captured transcript:</strong>
//             <div style={{ marginTop: 6 }}>{initial.description}</div>
//           </div>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={() =>
//               onSave({
//                 ...form,
//                 dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null
//               })
//             }
//             style={{ background: '#3182ce', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 6 }}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from 'react';

export default function TaskModal({ open, initial = {}, onClose, onSave }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: ''
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        description: initial.description || '',
        priority: initial.priority || 'Medium',
        status: initial.status || 'To Do',
        dueDate: initial.dueDate
          ? new Date(initial.dueDate).toISOString().slice(0, 16)
          : ''
      });
    }
  }, [initial]);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: 20, width: 520, borderRadius: 8 }}>
        <h3>{initial._id ? 'Edit Task' : 'Create Task'}</h3>

        <label>Title</label>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ width: '100%', padding: 8 }} />

        <label>Description</label>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', padding: 8 }} />

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
          </select>

          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option>To Do</option><option>In Progress</option><option>Done</option>
          </select>

          <input type="datetime-local" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => onSave({
              ...form,
              dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null
            })}
            style={{ background: '#3182ce', color: 'white', padding: '8px 12px', borderRadius: 6 }}
          >Save</button>
        </div>
      </div>
    </div>
  )
}
