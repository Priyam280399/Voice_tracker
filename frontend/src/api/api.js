import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:5000/api' });
export const parseAudio = (formData) => api.post('/parse/audio', formData);
export const parseText = (text) => api.post('/parse', { text });


// Task CRUD
export const createTask = (task) => api.post('/tasks', task);
export const getTasks = () => api.get('/tasks');
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;




// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000'
// });

// // Parsing
// export const parseAudio = (formData) => api.post('/parse/audio', formData);
// export const parseText = (text) => api.post('/parse', { text });

// // Task CRUD
// export const createTask = (task) => api.post('/api/tasks', task);
// export const getTasks = () => api.get('/api/tasks');
// export const updateTask = (id, task) => api.put(`/api/tasks/${id}`, task);
// export const deleteTask = (id) => api.delete(`/api/tasks/${id}`);

// export default api;
