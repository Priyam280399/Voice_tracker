Voice-Enabled Task Tracker

A full-stack task management system with voice input, NLP-based task extraction, manual task creation, List + Kanban views, drag-and-drop status updates, and full CRUD over API.

🧩 1. Project Setup
1.1 Prerequisites

Make sure the following are installed:

Tool	Version
Node.js	v18+ (recommended v20)
npm	9+
MongoDB	Local or Atlas
(Optional)	AssemblyAI API Key (for voice STT)
(Optional)	SMTP Email Credentials
1.2 Installation Steps
1.2.1 Clone the project
git clone <your-repo-url>
cd voice-task-tracker

1.2.2 Install Backend
cd backend
npm install

1.2.3 Install Frontend
cd ../frontend
npm install

1.3 Environment Setup

Create a file:

backend/.env


Add:

PORT=5000

# MongoDB (make sure DB name is included)
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/tasktracker

# Speech-to-Text (optional)
ASSEMBLYAI_API_KEY=assemblyai_xxxxx

# Email (optional)
EMAIL_USER=your@email
EMAIL_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

1.4 Email Configuration (Optional)

If enabling email:

Use Nodemailer

Gmail requires an App Password

SMTP values already included in .env

1.5 Running the Project Locally
Start Backend
cd backend
npm install
npm run dev


Backend runs on:

http://localhost:5000

Start Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000

1.6 Seed Data (Optional)

Add sample tasks using:

node backend/seed.js

🛠️ 2. Tech Stack
Frontend

React (Vite)

Axios

React Beautiful DnD (Kanban)

TailwindCSS (optional)

Backend

Node.js

Express

Mongoose (MongoDB ODM)

Multer (audio upload)

Axios (AssemblyAI requests)

Database

MongoDB (Local or Atlas)

AI/NLP

AssemblyAI (Speech-to-Text)

Chrono-node (Date parsing)

Custom keyword heuristics (priority, status)

Email

Nodemailer

📡 3. API Documentation

Base URL:

http://localhost:5000/api

3.1 Create Task

POST /tasks

Request Body:
{
  "title": "Buy milk",
  "description": "From supermarket",
  "priority": "High",
  "status": "To Do",
  "dueDate": "2025-01-10"
}

Success (201):
{
  "message": "Task created",
  "task": { ... }
}

Error (400):
{ "error": "Title is required" }

3.2 Get All Tasks

GET /tasks

Success:
[
  { "_id": "...", "title": "Task 1", ... }
]

3.3 Get Single Task

GET /tasks/:id

3.4 Update Task

PUT /tasks/:id

Request:
{
  "status": "In Progress"
}

3.5 Delete Task

DELETE /tasks/:id

Success:
{ "message": "Task deleted" }

3.6 Parse Text (Voice → Text → Task Fields)

POST /parse

Request:
{ "text": "Create a high priority task to submit assignment by tomorrow" }

Response:
{
  "transcript": "...",
  "parsed": {
    "title": "Submit Assignment",
    "priority": "High",
    "dueDate": "2025-01-12"
  }
}

3.7 Parse Audio

POST /parse/audio

Multipart Form Data:
audio: (file)

Response:
{
  "transcript": "Buy milk tomorrow",
  "parsed": { ... }
}

🧠 4. Decisions & Assumptions
✔ Task Saving Flow

Voice → STT → NLP parse → Show Modal → User reviews → Save to DB.

✔ Date Parsing

Uses chrono-node for:

tomorrow morning

next Friday

20th January

in 2 hours

✔ Status Keywords

“start”, “begin” → In Progress

“finish”, “completed” → Done

✔ Priority Keywords

urgent / high → High

normal → Medium

low → Low

✔ No Authentication

Assignment scope = Single-user system.

✔ Audio Upload

Handled via Multer → uploaded to AssemblyAI → temporary file deleted.

🤖 5. AI Tools Usage
Tools Used:

ChatGPT – code generation, debugging, readme, API structuring

GitHub Copilot – boilerplate & small utility snippets

AssemblyAI – STT conversion

Chrono-node – NLP date extraction

What AI Helped With:

Designing clean CRUD routes

Building frontend modals & task list

Parsing logic for voice input

Fixing API errors and CORS issues

Writing this README 😄

Learnings:

Voice → NLP → Task pipeline must be modular

STT quality drastically affects parsing

Heuristics + chrono-node gives good results without needing LLMs

🎯 6. Features Overview

✔ Voice task creation
✔ Manual task creation
✔ List view
✔ Kanban board (drag & drop)
✔ Task editing
✔ Task deletion
✔ Filters + Search
✔ Full CRUD API
