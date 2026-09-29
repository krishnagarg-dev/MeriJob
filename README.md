# MeriJob — AI-Powered Job & Recruitment Platform

<p align="center">
  <img src="https://candidate-ecru-six.vercel.app/merijob-logo.png" alt="MeriJob Logo" width="140" />
</p>

<p align="center">
  <strong>Connecting Talent with Opportunities</strong>
  <br />
  A full-stack job and recruitment platform designed to simplify job discovery, applications, and talent acquisition.
</p>

<p align="center">
  <a href="https://candidate-ecru-six.vercel.app/">Candidate Portal</a> •
  <a href="https://employer-mocha.vercel.app/">Employer Portal</a> •
  <a href="https://merijob-backend.onrender.com/">Backend API</a>
</p>

---

## 📌 About the Project

**MeriJob** is a full-stack job and recruitment platform developed to connect job seekers with employers through a unified digital experience.

The platform provides dedicated portals for candidates and employers, allowing candidates to explore job opportunities, apply for suitable positions, and track their applications. Employers can create and manage job listings, review applications, and update candidate application statuses.

MeriJob follows a modular architecture with separate frontend applications for candidates and employers, supported by a shared backend API and MongoDB database.

The project is built using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**, with a focus on responsive design, reusable components, secure authentication, and maintainable code.

### 🌐 Live Demo

| Application      | Link                                   |
| ---------------- | -------------------------------------- |
| Candidate Portal | https://candidate-ecru-six.vercel.app/ |
| Employer Portal  | https://merijob-employer.vercel.app/   |
| Backend API      | https://merijob-backend.onrender.com/  |

> The backend may take a little time to respond if the hosting service has put it into an idle state.

---

## 🎯 Project Objectives

* Build a centralized platform for job seekers and recruiters.
* Simplify job discovery and online job applications.
* Provide candidates with a dashboard to track their applications.
* Allow employers to publish and manage job openings.
* Enable employers to review applications and update application statuses.
* Provide separate, role-based experiences for candidates and employers.
* Develop a responsive, user-friendly interface.
* Use a scalable full-stack architecture that can support future enhancements.

---

## ✨ Key Features

### 👨‍💻 Candidate Portal

The Candidate Portal is designed to help job seekers explore opportunities and manage their job search.

* **Candidate Registration and Login:** Create an account and access the candidate portal.
* **Candidate Dashboard:** View relevant account information and application progress.
* **Browse Jobs:** Explore available job opportunities.
* **Job Search:** Search and discover jobs based on available job information.
* **Job Details:** View job information before applying.
* **Apply for Jobs:** Submit applications for suitable job openings.
* **My Applications:** View submitted applications in one place.
* **Application Status Tracking:** Track application statuses such as Applied, Interview, Offer, and Rejected.
* **Application History:** View application dates and related job information.
* **Responsive Interface:** Access the platform across desktop and mobile screen sizes.
* **Profile and Session Management:** Access the candidate portal through an authenticated session and log out when finished.

### 🏢 Employer Portal

The Employer Portal provides tools for employers to publish job openings and manage applications.

* **Employer Registration and Login:** Create an employer account and authenticate.
* **Employer Setup:** Complete the employer setup flow.
* **Employer Dashboard:** View job and application information.
* **Job Management:** Create, view, and manage job listings.
* **Post a Job:** Publish new job opportunities through a dedicated form.
* **Edit Job Listings:** Update existing job information where supported.
* **Delete Job Listings:** Remove job listings when they are no longer needed.
* **Application Management:** Review applications received for job openings.
* **Application Status Updates:** Change application statuses as candidates progress through the recruitment process.
* **Search and Filtering:** Find relevant job listings and applications using the available interface.
* **Protected Routes:** Restrict employer pages to authenticated users with the appropriate role.

### 🔐 Authentication and Authorization

MeriJob uses an authentication system to provide separate access for candidates and employers.

* Registration and login flows for different user roles.
* Token-based authentication for protected API requests.
* Authorization middleware to restrict access to role-specific endpoints.
* Protected frontend routes for authenticated users.
* Authenticated API requests using the `Authorization` header.
* Logout functionality to clear the active client-side session.

### 📊 Application Tracking

The application tracking system helps candidates and employers follow the recruitment process.

**Application statuses include:**

| Status    | Description                                            |
| --------- | ------------------------------------------------------ |
| Applied   | The candidate has submitted an application.            |
| Interview | The application has progressed to the interview stage. |
| Offer     | An offer status has been assigned.                     |
| Rejected  | The application has been marked as rejected.           |

Candidates can view their submitted applications, while employers can review received applications and update their statuses according to the recruitment process.

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose                                |
| ------------ | -------------------------------------- |
| React.js     | Component-based user interface         |
| Vite         | Frontend development and build tooling |
| JavaScript   | Application logic                      |
| Tailwind CSS | Responsive styling and UI design       |
| React Router | Client-side navigation                 |
| Lucide React | Interface icons                        |
| Context API  | Shared frontend authentication state   |
| Fetch API    | Communication with the backend         |

### Backend

| Technology           | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| Node.js              | JavaScript runtime                                          |
| Express.js           | REST API and server-side routing                            |
| MongoDB              | NoSQL database                                              |
| Mongoose             | MongoDB object modeling                                     |
| JSON Web Token (JWT) | Token-based authentication                                  |
| Zod                  | Request data validation                                     |
| Socket.IO            | Real-time communication support in the backend architecture |

### Development and Deployment

| Tool / Platform | Purpose                 |
| --------------- | ----------------------- |
| Git             | Version control         |
| GitHub          | Source code hosting     |
| Postman         | API testing             |
| MongoDB Atlas   | Cloud database hosting  |
| Vercel          | Frontend deployment     |
| Render          | Backend deployment      |
| VS Code         | Development environment |

---

## 🏗️ Project Architecture

MeriJob is organized into three main applications:

1. **Candidate Frontend:** The user interface for job seekers.
2. **Employer Frontend:** The user interface for recruiters and employers.
3. **Backend API:** A shared Express.js server that handles authentication, job operations, application management, validation, and database communication.

Both frontend applications communicate with the shared backend API over HTTP.

```text
                         MERIJOB
                            |
             +--------------+--------------+
             |                             |
      Candidate Portal               Employer Portal
       React + Vite                   React + Vite
             |                             |
             +--------------+--------------+
                            |
                     REST API Calls
                            |
                    Node.js + Express
                            |
          +-----------------+-----------------+
          |                 |                 |
      Auth Routes        Job Routes     Application Routes
          |                 |                 |
          +-----------------+-----------------+
                            |
                     Middleware Layer
              (Authentication, Roles,
                 Request Validation)
                            |
                       Mongoose
                            |
                      MongoDB Atlas
```

### Application Structure

The repository is organized into separate frontend and backend directories.

```text
MeriJob/
│
├── candidate/                  # Candidate frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── employer/                   # Employer frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Shared backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   └── ...
│   ├── package.json
│   └── .env
│
└── README.md
```

> This is a representative structure. Keep or add folder names according to the actual files in your repository.

---

## 📂 Main Modules

### 1. Candidate Module

The candidate module manages the job seeker's experience, including registration, authentication, job discovery, job applications, dashboard information, and application tracking.

### 2. Employer Module

The employer module supports employer authentication, account setup, job creation, job management, application review, and application status updates.

### 3. Authentication Module

The authentication module handles registration, login, token verification, and role-based access to protected resources.

### 4. Job Module

The job module provides backend operations for creating, retrieving, updating, and deleting job listings, subject to the authenticated user's permissions.

### 5. Application Module

The application module handles job applications, retrieving a candidate's applications, reviewing applications, and updating application statuses.

### 6. Validation and Middleware

The backend uses validation and middleware to check incoming request data, authenticate users, and enforce role-specific access rules before requests reach protected controllers.

---

## 🔌 API Overview

The backend exposes REST API endpoints for authentication, job listings, and applications.

**Base URL**

```text
https://merijob-backend.onrender.com
```

### Authentication

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register an account     |
| POST   | `/api/auth/login`    | Authenticate an account |

> Confirm the exact registration and login request formats and role handling against the backend implementation.

### Applications

| Method | Endpoint                       | Description                                                      |
| ------ | ------------------------------ | ---------------------------------------------------------------- |
| POST   | `/api/applications`            | Submit a job application                                         |
| GET    | `/api/applications/my`         | Retrieve the authenticated candidate's applications              |
| PATCH  | `/api/applications/:id/status` | Update an application's status, subject to backend authorization |

### Jobs

Job-related endpoints support job listing and employer job management. Exact paths and supported HTTP methods should be checked in the current `server/src/routes` files before documenting them as a complete endpoint reference.

### Health Check

```http
GET /api/health
```

Use the health endpoint to check whether the backend is responding, if this route is enabled in the deployed version.

### Authentication Header

Protected endpoints use a bearer token when authentication is required.

```http
Authorization: Bearer <your_token>
Content-Type: application/json
```

---

## ⚙️ Installation and Local Setup

Follow these steps to run MeriJob locally.

### Prerequisites

Install the following before starting:

* Node.js and npm
* Git
* MongoDB Atlas account or a local MongoDB instance
* Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd MeriJob
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with the actual GitHub repository URL.

### 2. Install Candidate Dependencies

```bash
cd candidate
npm install
```

Create a `.env` file in the `candidate` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the candidate frontend:

```bash
npm run dev
```

The Vite development server will display the local URL in the terminal.

### 3. Install Employer Dependencies

Open a new terminal from the project root:

```bash
cd employer
npm install
```

Create a `.env` file in the `employer` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the employer frontend:

```bash
npm run dev
```

### 4. Install Backend Dependencies

Open another terminal from the project root:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the required variables.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:5173
```

If the backend uses separate candidate and employer origins, configure CORS to allow both frontend development URLs.

Start the backend using the script defined in `server/package.json`. For example, if the project has a `dev` script:

```bash
npm run dev
```

Otherwise, use the actual start script configured in the backend package file.

### 5. Run the Applications

Run the backend, candidate frontend, and employer frontend in separate terminals.

| Application        | Local URL                              |
| ------------------ | -------------------------------------- |
| Backend            | `http://localhost:5000`                |
| Candidate Frontend | Vite development URL shown in terminal |
| Employer Frontend  | Vite development URL shown in terminal |

> Vite may select another port if the default port is already in use. Use the exact URL printed by the development server.

---

## 🔑 Environment Variables

### Candidate and Employer Frontends

| Variable       | Description          | Example                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

For production, set the frontend environment variable to the deployed backend URL:

```env
VITE_API_URL=https://merijob-backend.onrender.com
```

Set this variable separately in the Candidate and Employer Vercel project settings, then redeploy the relevant frontend.

### Backend

| Variable       | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `PORT`         | Port on which the Express server listens                            |
| `MONGO_URI`    | MongoDB connection string                                           |
| `JWT_SECRET`   | Secret used for signing or verifying authentication tokens          |
| `FRONTEND_URL` | Allowed frontend origin or origin configuration used by the backend |

**Security Note:** Never commit `.env` files, database credentials, JWT secrets, or access tokens to GitHub. Use environment variable settings in the hosting platform for production deployments.

---

## 🚀 Deployment

MeriJob uses separate frontend deployments and a shared backend deployment.

### Candidate Frontend — Vercel

1. Import the candidate frontend repository or configure the existing project in Vercel.
2. Set the Root Directory to `candidate` when deploying from a monorepo.
3. Configure the build settings according to the candidate `package.json`.
4. Add `VITE_API_URL` with the deployed backend URL.
5. Deploy and verify the candidate pages and API requests.

### Employer Frontend — Vercel

1. Configure a separate Vercel project for the employer frontend.
2. Set the Root Directory to `employer` when deploying from a monorepo.
3. Configure the build settings according to the employer `package.json`.
4. Add `VITE_API_URL` with the deployed backend URL.
5. Deploy and verify employer authentication, job management, and application operations.

### Backend — Render

1. Create or open the backend service in Render.
2. Set the Root Directory to `server` when using a monorepo.
3. Configure the install, build (if applicable), and start commands according to `server/package.json`.
4. Add the backend environment variables in Render.
5. Configure MongoDB access and allowed frontend origins.
6. Deploy and verify the backend health endpoint and API operations.

### Production URLs

| Service   | URL                                    |
| --------- | -------------------------------------- |
| Candidate | https://candidate-ecru-six.vercel.app/ |
| Employer  | https://merijob-employer.vercel.app/   |
| Backend   | https://merijob-backend.onrender.com/  |

---

## 🧪 Testing

The backend uses request validation and authentication middleware to protect API operations.

Recommended manual testing workflow:

1. Check the backend health endpoint.
2. Register a candidate account.
3. Log in as a candidate.
4. Browse job listings.
5. Apply for a job.
6. Open the My Applications page and verify that the application is listed.
7. Register or log in as an employer.
8. Create a job listing.
9. Open employer applications and review submitted applications.
10. Update an application status and verify that the change is reflected where expected.
11. Test invalid or incomplete request payloads and verify that the API returns appropriate error responses.
12. Verify that unauthenticated or wrong-role requests cannot access protected resources.

API requests can be tested using Postman or another HTTP client.

---

## 🖥️ User Workflow

### Candidate Workflow

```text
Register / Login
       |
       v
Candidate Dashboard
       |
       v
Explore Job Listings
       |
       v
View Job Details
       |
       v
Apply for a Job
       |
       v
My Applications
       |
       v
Track Application Status
```

### Employer Workflow

```text
Register / Login
       |
       v
Employer Setup
       |
       v
Employer Dashboard
       |
       v
Post a Job
       |
       v
Manage Job Listings
       |
       v
Review Applications
       |
       v
Update Application Status
```

---

## 🎨 User Interface

MeriJob provides dedicated interfaces for candidates and employers, with separate navigation and workflows for each role.

The frontend applications use reusable React components and responsive styling to support consistent layouts across the platform.

Key UI areas include:

* Candidate homepage and job discovery
* Candidate dashboard
* Job listing and job details
* Candidate applications and status filters
* Employer dashboard
* Employer job management
* Job posting form
* Employer application management
* Authentication and setup pages

---

## 🔒 Security Considerations

Security-related functionality is implemented across the frontend and backend.

* Authentication is required for protected API operations.
* Role-based middleware restricts access to role-specific endpoints.
* Request validation helps reject invalid input.
* Environment variables are used for sensitive backend configuration.
* Frontend applications send authentication tokens for protected requests.

For production use, secrets should be stored only in the hosting platform, CORS should be limited to trusted origins, and authorization checks should be enforced on the backend rather than relying only on frontend route protection.

---

## 🔮 Future Enhancements

Potential future improvements for MeriJob include:

* AI-assisted job recommendations
* Resume parsing and profile-based job matching
* Advanced candidate and employer search filters
* Email notifications for application status changes
* Interview scheduling and calendar integration
* Candidate profile completion and resume management
* Employer analytics and recruitment insights
* Saved jobs and job alerts
* Pagination and advanced sorting for large datasets
* Automated backend and frontend testing
* Accessibility and performance improvements

These are possible future enhancements and are not necessarily part of the currently deployed version.

---

## 📚 Learning Outcomes

Developing MeriJob provides practical experience with:

* Building full-stack applications using the MERN stack
* Creating reusable React components
* Managing frontend routes and shared application state
* Designing REST APIs with Express.js
* Structuring backend code into routes, controllers, models, and middleware
* Connecting applications to MongoDB using Mongoose
* Implementing authentication and role-based authorization
* Validating incoming API requests
* Integrating separate frontend applications with one backend
* Testing APIs using Postman
* Managing source code with Git and GitHub
* Deploying frontend applications on Vercel and backend services on Render
* Configuring production environment variables and CORS

---

## 👨‍💻 Developer

**Krishna Garg**

Full Stack Developer | MERN Stack Developer

* GitHub: https://github.com/krishnagarg-dev
* LinkedIn: Add your LinkedIn profile URL
* Portfolio: Add your portfolio URL

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the changes locally.
5. Commit your changes with a clear message.
6. Open a pull request describing your contribution.

---

## 📄 License

Add the license that applies to this repository. If no license has been selected, the project is currently shared without an explicit open-source license.

---

<p align="center">
  <strong>MeriJob — Connecting Talent with Opportunities.</strong>
  <br />
  Built with ❤️ by Krishna Garg
</p>
