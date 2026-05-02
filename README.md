# 🚀 Team Task Manager

A simple full-stack task management application built with React, Node.js, and MongoDB.

## ✨ Features

- **User Authentication** - Login/Signup with JWT
- **Role-Based Access** - Admin can create projects/tasks, Members can update status
- **Dashboard** - View task statistics (Total, Pending, In Progress, Completed)
- **Project Management** - Create and organize projects
- **Task Management** - Create, assign, and track tasks with priority levels
- **Responsive Design** - Works on all devices

## 🛠 Tech Stack

- **Frontend:** React + Vite + React Router + Axios
- **Backend:** Node.js + Express + JWT Authentication
- **Database:** MongoDB Atlas + Mongoose
- **Styling:** Custom CSS

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/team-task-manager.git
   cd team-task-manager
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the app at** http://localhost:5173

## 📝 Environment Variables

Create `.env` file in backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---
**Built with ❤️ using React, Node.js, and MongoDB**