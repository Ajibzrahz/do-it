# 📝 Task Manager API

A **Task Management (To-Do) application backend** built with **Node.js, Express, and MongoDB**.  
It allows users to **create, update, delete, and categorize tasks**, set deadlines, and mark them as **complete or incomplete**.  

---

## 🚀 Features
- 👤 **User Authentication** (Register, Login, Profile, Update, Delete)
- ✅ **CRUD operations for tasks**
- 🗂️ **Task categorization** (work, school, personal, etc.)
- ⏰ **Deadlines & status updates**
- 📊 **Automatic marking of tasks as incomplete** if deadlines are missed
- 🔒 **User-specific tasks** (private to the task owner)

---

## 🛠️ Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **SendGrid** (Email notifications)
- **Joi** (Validation)

---

## 📂 Project Structure
task-manager/
- controllers/       # Business logic
- models/            # Mongoose schemas
- routes/            # API endpoints
- middlewares/       # Error handling & authentication
- utils/             # Helpers (email service, etc.)
- app.js             # Main entry point
- server.js          # Server bootstrap

## env
Copy code
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_key
PORT=5000

## 👨‍💻 Author
Ajibona Raheem
📧 ajibonaraheem@gmail.com





