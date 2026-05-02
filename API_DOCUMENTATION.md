# Team Task Manager API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### 1. User Signup
**POST** `/auth/signup`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "member" // optional, defaults to "member"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

### 2. User Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

### 3. Get Current User
**GET** `/auth/me` 🔒

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Update Profile
**PUT** `/auth/profile` 🔒

**Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

---

## 👥 User Management Endpoints

### 1. Get All Users
**GET** `/users` 🔒 (Admin only)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "user-id-1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single User
**GET** `/users/:id` 🔒

### 3. Update User Role
**PUT** `/users/:id/role` 🔒 (Admin only)

**Body:**
```json
{
  "role": "admin"
}
```

### 4. Delete User
**DELETE** `/users/:id` 🔒 (Admin only)

---

## 📁 Project Endpoints

### 1. Get All Projects
**GET** `/projects` 🔒

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "project-id",
      "title": "Website Redesign",
      "description": "Complete redesign of company website",
      "members": [
        {
          "user": {
            "_id": "user-id",
            "name": "John Doe",
            "email": "john@example.com"
          },
          "role": "owner",
          "joinedAt": "2024-01-01T00:00:00.000Z"
        }
      ],
      "createdBy": {
        "_id": "user-id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Project
**GET** `/projects/:id` 🔒

### 3. Create Project
**POST** `/projects` 🔒

**Body:**
```json
{
  "title": "New Project",
  "description": "Project description"
}
```

### 4. Update Project
**PUT** `/projects/:id` 🔒 (Owner/Admin only)

### 5. Delete Project
**DELETE** `/projects/:id` 🔒 (Owner only)

---

## ✅ Task Endpoints

### 1. Get All Tasks
**GET** `/tasks` 🔒

**Query Parameters:**
- `projectId` - Filter by project ID
- `status` - Filter by status (todo, inprogress, done)
- `assignedTo` - Filter by assigned user ID

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "task-id",
      "title": "Design Homepage",
      "description": "Create mockups for homepage",
      "status": "todo",
      "priority": "high",
      "assignedTo": {
        "_id": "user-id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "projectId": {
        "_id": "project-id",
        "title": "Website Redesign"
      },
      "createdBy": {
        "_id": "user-id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "dueDate": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Task
**GET** `/tasks/:id` 🔒

### 3. Create Task
**POST** `/tasks` 🔒

**Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "assignedTo": "user-id",
  "projectId": "project-id",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

### 4. Update Task
**PUT** `/tasks/:id` 🔒

### 5. Delete Task
**DELETE** `/tasks/:id` 🔒

---

## 📊 Data Models

### User Model
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['admin', 'member'], default: 'member'),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  title: String (required, 3-100 chars),
  description: String (optional, max 500 chars),
  members: [{
    user: ObjectId (ref: User),
    role: String (enum: ['owner', 'admin', 'member']),
    joinedAt: Date
  }],
  createdBy: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required, 3-100 chars),
  description: String (optional, max 500 chars),
  status: String (enum: ['todo', 'inprogress', 'done'], default: 'todo'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  assignedTo: ObjectId (ref: User, optional),
  projectId: ObjectId (ref: Project, required),
  dueDate: Date (optional),
  createdBy: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Authentication & Authorization

### Password Requirements
- Minimum 6 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter  
- Must contain at least one number

### JWT Token
- Expires in 30 days
- Include in Authorization header: `Bearer <token>`

### Role-based Access
- **Admin**: Full access to all resources
- **Member**: Access to assigned projects and tasks

---

## ⚠️ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "message": "User role member is not authorized to access this route"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server Error",
  "error": "Error details (development only)"
}
```

---

## 🧪 Testing the API

### Using cURL

**1. Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**3. Create a project (with token):**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Project",
    "description": "This is my first project"
  }'
```

**4. Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Design Homepage",
    "description": "Create homepage mockups",
    "projectId": "PROJECT_ID_HERE",
    "priority": "high"
  }'
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables in `.env`**

3. **Start the server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   - Visit http://localhost:5000 for basic info
   - Visit http://localhost:5000/health for health check
   - Use the endpoints above to interact with the API

The authentication system is now fully functional with JWT tokens, password hashing, and role-based access control! 🎉