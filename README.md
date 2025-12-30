📌 Task Management API Documentation

🔐 Authentication APIs
➤ Register User

POST /auth/sign-up
Request Body
{
  "name": "Pratham",
  "email": "pratham@example.com",
  "password": "password123"
}

Response
{
  "message": "User registered successfully"
}

➤ Login User
POST /auth/sign-in
Request Body
{
  "email": "pratham@example.com",
  "password": "password123"
}

Response
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "_id": "userId",
    "name": "Pratham",
    "email": "pratham@example.com"
  }
}

➤ Refresh Access Token
POST /auth/refresh-token
Request Body
{
  "refreshToken": "jwt_refresh_token"
}

Response
{
  "accessToken": "new_jwt_access_token"
}

🔒 Authentication Header (Required for Tasks APIs)
Authorization: Bearer <ACCESS_TOKEN>

📝 Task APIs (Protected)
➤ Create Task
POST /tasks
Headers
Authorization: Bearer <ACCESS_TOKEN>
Request Body
{
  "title": "Learn React",
  "description": "Practice hooks and state management"
}

Response
{
  "_id": "taskId",
  "title": "Learn React",
  "description": "Practice hooks and state management",
  "completed": false,
  "user": "userId",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

➤ Get All Tasks
GET /tasks
Headers
Authorization: Bearer <ACCESS_TOKEN>

Response
[
  {
    "_id": "taskId",
    "title": "Learn React",
    "description": "Practice hooks",
    "completed": false
  }
]

➤ Get Single Task
GET /tasks/:id
Headers
Authorization: Bearer <ACCESS_TOKEN>

➤ Update Task
PUT /tasks/:id
Headers
Authorization: Bearer <ACCESS_TOKEN>
Request Body
{
  "title": "Learn MERN",
  "completed": true
}

➤ Delete Task
DELETE /tasks/:id
Headers
Authorization: Bearer <ACCESS_TOKEN>

Response
{
  "message": "Task deleted successfully"
}

 Database Models
User Model
{
  name: String,
  email: String,
  password: String,
  refreshToken: String
}

Task Model
{
  title: String,
  description: String,
  user: ObjectId,
  completed: Boolean
}

📝 Scaling Note:
For production, the frontend and backend can be scaled independently.
The backend can be containerized using Docker and deployed behind a load balancer,
while JWT-based authentication allows stateless scaling.
API calls can be optimized using caching (Redis),
and the frontend can be deployed on a CDN-backed platform like Vercel for global performance.


