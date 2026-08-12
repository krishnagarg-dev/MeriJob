# 🚀 MeriJob

MeriJob is a full-stack job search and application platform designed to help users discover jobs, manage applications, save interesting opportunities, and track their job-search journey from one place.

The project is being developed using the MERN stack with MongoDB Atlas as the cloud database and Node.js/Express.js for the backend API.

---

## 📌 Project Status

> 🚧 **Currently in Development**

The backend foundation and authentication system are implemented and tested successfully.

Job management, external job API integration, applications, saved jobs, frontend development, and deployment are planned as the next development phases.

---

## ✨ Current Features

### Backend

- Express.js REST API
- MongoDB Atlas integration
- Mongoose ODM
- Environment variable configuration
- CORS support
- JSON request handling
- Health check endpoint
- User registration
- User login
- Password hashing using bcrypt
- JWT authentication
- Separate `merijob` database
- Dedicated MongoDB database user for MeriJob

### Authentication

- User registration
- Duplicate email detection
- Password hashing
- Password verification
- JWT token generation
- JWT token expiration
- Authentication error handling
- Secure user response without exposing passwords

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv
- Nodemon

## Frontend

> 🚧 Frontend development is in progress.

Planned technologies:

- React.js
- HTML5
- CSS3
- JavaScript

## External APIs

- Adzuna Jobs API

---

# 🏗️ Project Structure

```text
MeriJob/
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── services/
│   │
│   ├── src/
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── README.md
└── .gitignore
```

---

# 🔐 Authentication

MeriJob uses JWT-based authentication with bcrypt password hashing.

## Registration Flow

```text
Client
   ↓
POST /api/auth/register
   ↓
Validate user input
   ↓
Check whether email already exists
   ↓
Hash password using bcrypt
   ↓
Create user in MongoDB
   ↓
Generate JWT
   ↓
Return user information + token
```

## Login Flow

```text
Client
   ↓
POST /api/auth/login
   ↓
Find user by email
   ↓
Compare password using bcrypt
   ↓
Generate JWT
   ↓
Return user information + token
```

---

# 🗄️ Database Architecture

MeriJob uses MongoDB Atlas for cloud database storage.

## Cluster

```text
Main-Project-Cluster
```

## Database

```text
merijob
```

## Current Collection

```text
merijob
└── users
```

The MeriJob application uses a dedicated MongoDB database user:

```text
merijob-admin
```

This keeps MeriJob credentials separate from other databases and applications within the Atlas project.

---

# 🔌 API Endpoints

## Root Endpoint

### `GET /`

Returns the API status.

### Response

```json
{
  "message": "MeriJob API is running"
}
```

---

## Health Check

### `GET /api/health`

Checks whether the API is running correctly.

### Response

```json
{
  "success": true,
  "message": "MeriJob API is running"
}
```

---

# 🔑 Authentication APIs

## Register User

### `POST /api/auth/register`

Creates a new MeriJob user account.

### Request

```json
{
  "name": "Krishna",
  "email": "test@merijob.com",
  "password": "test1234"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "<USER_ID>",
    "name": "Krishna",
    "email": "test@merijob.com"
  }
}
```

---

## Login User

### `POST /api/auth/login`

Authenticates an existing user.

### Request

```json
{
  "email": "test@merijob.com",
  "password": "test1234"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "<USER_ID>",
    "name": "Krishna",
    "email": "test@merijob.com"
  }
}
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>

JWT_SECRET=your_jwt_secret

ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
```

### Example Structure

```text
server/
└── .env
```

> ⚠️ Never commit `.env` to GitHub. It contains sensitive database credentials, JWT secrets, and API keys.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/krishnagarg-dev/MeriJob.git
```

## 2. Navigate to the Project

```bash
cd MeriJob
```

## 3. Navigate to the Backend

```bash
cd server
```

## 4. Install Dependencies

```bash
npm install
```

## 5. Configure Environment Variables

Create:

```text
server/.env
```

Add the required environment variables.

## 6. Start Development Server

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

# 🧪 API Testing

The currently implemented APIs have been tested successfully using `curl`.

## Root API

```bash
curl http://localhost:5000/
```

## Health Check

```bash
curl http://localhost:5000/api/health
```

## Register

### Windows CMD

```cmd
curl.exe -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Krishna\",\"email\":\"test@merijob.com\",\"password\":\"test1234\"}"
```

## Login

### Windows CMD

```cmd
curl.exe -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@merijob.com\",\"password\":\"test1234\"}"
```

---

# 📊 Current Backend Flow

```text
                    ┌──────────────────┐
                    │      Client      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Express API    │
                    │   Port: 5000     │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     ┌─────────────────┐          ┌─────────────────┐
     │ Authentication  │          │  Job Management │
     │     APIs        │          │      APIs       │
     └────────┬────────┘          └────────┬────────┘
              │                            │
              └──────────────┬─────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   MongoDB Atlas  │
                    │                  │
                    │     merijob      │
                    │        ↓         │
                    │      users       │
                    └──────────────────┘
```

---

# 🗺️ Development Roadmap

## Phase 1 — Backend Foundation

- [x] Node.js project setup
- [x] Express server
- [x] MongoDB Atlas setup
- [x] MongoDB connection
- [x] Environment configuration
- [x] CORS configuration
- [x] Health check API

## Phase 2 — Authentication

- [x] User model
- [x] User registration
- [x] Duplicate email validation
- [x] Password hashing
- [x] User login
- [x] Password verification
- [x] JWT generation
- [x] JWT expiration

## Phase 3 — Job Management

- [ ] Job model
- [ ] Job CRUD APIs
- [ ] Job listing
- [ ] Job details
- [ ] Job search
- [ ] Job filtering
- [ ] Pagination
- [ ] Adzuna API integration

## Phase 4 — User Job Features

- [ ] JWT authentication middleware
- [ ] Protected routes
- [ ] Save jobs
- [ ] Unsave jobs
- [ ] Apply for jobs
- [ ] Application model
- [ ] Application tracking
- [ ] Application status management

## Phase 5 — Frontend

- [ ] React application
- [ ] Login page
- [ ] Registration page
- [ ] Homepage
- [ ] Job listing page
- [ ] Job search
- [ ] Job filters
- [ ] Job details page
- [ ] Apply functionality
- [ ] Saved jobs
- [ ] Applications dashboard
- [ ] User profile
- [ ] Logout functionality

## Phase 6 — Production

- [ ] Production environment configuration
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] API security improvements
- [ ] Error handling
- [ ] Production testing
- [ ] Performance optimization

---

# 📈 Development Progress

| Module | Status |
|---|---|
| Backend Setup | ✅ Complete |
| MongoDB Atlas | ✅ Complete |
| Database Configuration | ✅ Complete |
| Authentication | ✅ Complete |
| JWT | ✅ Complete |
| Job Management | 🚧 In Progress |
| Adzuna Integration | 📋 Planned |
| Applications | 📋 Planned |
| Saved Jobs | 📋 Planned |
| Frontend | 📋 Planned |
| Deployment | 📋 Planned |

---

# 🔒 Security

MeriJob follows basic security practices including:

- Passwords are never stored as plain text.
- Passwords are hashed using `bcryptjs`.
- JWT tokens are signed using a secret key.
- MongoDB credentials are stored in environment variables.
- Adzuna API credentials are stored in environment variables.
- `.env` files are excluded from version control.
- Authentication responses do not expose password hashes.

> Production deployment will include additional security measures such as stricter CORS configuration, request validation, rate limiting, secure token handling, and improved error handling.

---

# 🧩 Future Improvements

Planned improvements include:

- Advanced job search
- Location-based job filtering
- Salary filtering
- Employment type filtering
- Job recommendations
- Application tracking
- Saved jobs
- User dashboard
- Profile management
- Email notifications
- Responsive UI
- Production deployment

---

# 👨‍💻 Author

## Krishna Garg

GitHub:  
https://github.com/krishnagarg-dev

---

# ⭐ About the Project

MeriJob is being developed as a complete job search and application management platform.

The goal is to provide users with a single platform where they can:

```text
Discover Jobs
      ↓
Search & Filter
      ↓
View Job Details
      ↓
Save Jobs
      ↓
Apply
      ↓
Track Applications
```

More features will be added as development continues.

---

## 📜 License

This project is currently being developed for learning and portfolio purposes.
