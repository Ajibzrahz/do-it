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
│── controllers/ # Business logic
│── models/ # Mongoose schemas
│── routes/ # API endpoints
│── middlewares/ # Error handling & auth
│── utils/ # Helpers (e.g. email service)
│── app.js # Main entry point
