# MeriJob

**MeriJob** is a full-stack job placement platform that connects job seekers with employers and HR/recruitment teams.

The project is intentionally separated into two frontend portals:

- **Candidate Portal** — for job seekers to discover jobs, apply, save jobs, and manage applications.
- **Employer / Hiring Portal** — for employers and HR users to manage hiring, create jobs, and review candidates.

The backend is shared through production APIs while authentication and portal-specific UI flows remain separated.

---

## Live Applications

### Candidate Portal
https://candidate-ecru-six.vercel.app/

### Employer / Hiring Portal
https://employer-mocha.vercel.app/

### Backend
https://merijob-backend.onrender.com

> The frontend applications are deployed independently on Vercel. The backend is deployed on Render.

---

## Project Structure

```text
MeriJob/
│
├── candidate/                 # Candidate / Job Seeker Portal
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── employer/                  # Employer / HR / Hiring Portal
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── server/                    # Node.js + Express backend
    ├── src/
    ├── package.json
    └── ...
```

---

# 1. Candidate Portal

The Candidate Portal is the public-facing job-seeker application.

### Main flow

```text
Home
  ↓
Search / Browse Jobs
  ↓
Job Details
  ↓
Login / Register
  ↓
Candidate Dashboard
  ├── Applications
  ├── Saved Jobs
  └── Profile / Candidate Features
```

### Candidate routes

```text
/
 /jobs
 /job/:id
 /about
 /contact
 /login
 /register
 /dashboard
 /applications
 /saved-jobs
```

### Candidate features

- Browse available jobs
- Search and filter jobs
- View individual job details
- Candidate registration
- Candidate login
- Candidate dashboard
- Apply for jobs
- View applications
- Save jobs
- Remove saved jobs
- Authentication using JWT
- Persistent client-side authentication state
- Production API integration

---

# 2. Employer / Hiring Portal

The Employer Portal is a completely separate frontend application designed for companies, employers and HR/recruitment teams.

The portal is not intended to behave like a candidate dashboard.

Its structure represents a hiring platform where:

- A company can use MeriJob for recruitment.
- Multiple HR/recruitment users can work through the hiring portal.
- Employers can maintain their hiring profile.
- Employers can create and manage job listings.
- Hiring teams can review applications/candidates.
- Live jobs created by employers are available to candidates through the backend.

### Employer flow

```text
Employer Home
      ↓
Employer Login / Register
      ↓
Employer Setup
      ↓
Employer Dashboard
      ├── My Jobs
      ├── Post a Job
      ├── Applications
      └── Hiring Management
```

### Employer routes

```text
/
/home
/login
/register
/setup
/dashboard
/employer/dashboard
/employer/jobs
/employer/jobs/new
/employer/jobs/:id/edit
/employer/applications
```

Compatibility redirects are also provided for legacy paths such as:

```text
/dashboard
/jobs
/post-job
/applications
```

These redirect into the employer-specific routes instead of creating a second dashboard implementation.

### Employer features

- Dedicated employer landing/home page
- Employer login
- Employer registration
- Employer setup/profile flow
- Employer dashboard
- Job management
- Create/post jobs
- Edit jobs
- View employer's jobs
- Application management
- Hiring workflow
- Protected employer routes
- Employer-specific authentication handling
- Logout support
- Production API integration

---

# 3. Candidate vs Employer Separation

MeriJob uses role-based authentication and separate frontend applications.

## Candidate

```text
Portal:
https://candidate-ecru-six.vercel.app/

Role:
seeker

Primary dashboard:
/dashboard
```

## Employer

```text
Portal:
https://employer-mocha.vercel.app/

Role:
employer

Primary dashboard:
/employer/dashboard
```

An employer account should not be treated as a normal candidate account.

Likewise, a candidate should not be redirected into the employer dashboard.

The employer portal has its own authentication context and protected routes.

---

# 4. Authentication

Authentication is handled through the backend using JWT tokens.

The frontend stores the authenticated session information in browser storage.

Typical values include:

```text
token
user
rememberMe
```

The stored user object contains the user's role, allowing the application to determine whether the account is a candidate or employer.

### Candidate login behavior

```text
Candidate credentials
        ↓
POST /api/auth/login
        ↓
Validate role = seeker
        ↓
Store candidate token/user
        ↓
/dashboard
```

### Employer login behavior

```text
Employer credentials
        ↓
POST /api/auth/login
        ↓
Validate role = employer
        ↓
Store employer token/user
        ↓
Employer dashboard
```

Employer routes are protected with the employer portal's `ProtectedRoute`.

---

# 5. Logout

Logout must clear the authentication state so that a previous user cannot remain authenticated accidentally.

The logout flow should remove the relevant authentication information:

```text
token
user
employerToken
rememberMe
```

After logout, the user is returned to the appropriate public/home/login flow.

This is especially important when switching between candidate and employer accounts on the same browser.

---

# 6. API Architecture

The production backend is:

```text
https://merijob-backend.onrender.com
```

The frontend applications use:

```env
VITE_API_URL=https://merijob-backend.onrender.com
```

A shared API service can resolve the production API through:

```js
const API =
  import.meta.env.VITE_API_URL ||
  "https://merijob-backend.onrender.com";
```

Authenticated API requests attach:

```http
Authorization: Bearer <token>
```

---

# 7. Important API Areas

The application currently uses API areas including:

```text
/api/auth
/api/jobs
/api/applications
/api/saved-jobs
```

Employer functionality also uses the backend's employer/job/application functionality.

The exact endpoint implementation belongs to the `server` application and should remain the single source of truth for production data.

---

# 8. Live Jobs

The candidate portal should not depend on hard-coded demo jobs as the primary production source.

The intended production flow is:

```text
HR / Employer
      ↓
Create Job
      ↓
Backend / Database
      ↓
Job becomes available through API
      ↓
Candidate Jobs page
      ↓
Candidate Job Details
      ↓
Candidate applies
      ↓
Application stored in backend
      ↓
Employer reviews application
```

Therefore, jobs posted by an HR/employer should eventually appear in the candidate portal through the production `/api/jobs` API.

Static/demo data can be retained only as UI/demo content where appropriate; it must not replace live backend data when the production API is available.

---

# 9. Backend

### Technology

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- CORS
- dotenv

### Backend responsibilities

- Authentication
- User management
- Role handling
- Job creation
- Job retrieval
- Job updates
- Job applications
- Saved jobs
- Employer functionality
- Database communication
- Production API responses

### Health check

The backend has a health endpoint used for deployment/testing:

```text
/api/health
```

Production:

```text
https://merijob-backend.onrender.com/api/health
```

---

# 10. Environment Variables

## Candidate

Create:

```text
candidate/.env
```

Example:

```env
VITE_API_URL=https://merijob-backend.onrender.com
```

## Employer

Create:

```text
employer/.env
```

Example:

```env
VITE_API_URL=https://merijob-backend.onrender.com
```

## Server

The backend requires the environment variables defined by the server configuration, including the database connection, JWT secret, frontend/CORS configuration and other production secrets.

Example structure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_configuration
PORT=5000
NODE_ENV=production
```

Never commit real passwords, database credentials, JWT secrets or API tokens to GitHub.

---

# 11. Running Locally

## Start Backend

```bash
cd server
npm install
npm run dev
```

or, depending on the configured scripts:

```bash
node src/server.js
```

Backend:

```text
http://localhost:5000
```

---

## Start Candidate Portal

Open another terminal:

```bash
cd candidate
npm install
npm run dev
```

Candidate:

```text
http://localhost:5173
```

---

## Start Employer Portal

Open another terminal:

```bash
cd employer
npm install
npm run dev
```

The Vite development server will display the local employer URL.

---

# 12. Production Builds

Before deployment, verify each application independently.

## Candidate

```bash
cd candidate
npm install
npm run build
```

Expected result:

```text
dist/
```

## Employer

```bash
cd employer
npm install
npm run build
```

Expected result:

```text
dist/
```

## Server

```bash
cd server
npm install
```

Then run the configured production/start command.

---

# 13. Deployment

## Candidate

The Candidate Portal is deployed on Vercel:

```text
https://candidate-ecru-six.vercel.app/
```

Recommended Vercel configuration:

```text
Root Directory: candidate
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variable:

```text
VITE_API_URL=https://merijob-backend.onrender.com
```

---

## Employer

The Employer / Hiring Portal is deployed separately on Vercel:

```text
https://employer-mocha.vercel.app/
```

Recommended Vercel configuration:

```text
Root Directory: employer
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variable:

```text
VITE_API_URL=https://merijob-backend.onrender.com
```

---

## Backend

The backend is deployed on Render:

```text
https://merijob-backend.onrender.com
```

MongoDB is used as the production database.

---

# 14. Testing Checklist

## Candidate Portal

- [ ] Open candidate homepage
- [ ] Browse jobs
- [ ] Search/filter jobs
- [ ] Open job details
- [ ] Register as candidate
- [ ] Login as candidate
- [ ] Candidate reaches `/dashboard`
- [ ] Apply to a live job
- [ ] Verify application appears
- [ ] Save a job
- [ ] Verify saved job
- [ ] Remove saved job
- [ ] Logout
- [ ] Verify protected pages are no longer accessible

## Employer Portal

- [ ] Open employer homepage
- [ ] Employer homepage does not immediately force the user into setup/dashboard
- [ ] Open employer login
- [ ] Login using employer/HR account
- [ ] Verify employer role
- [ ] Verify employer dashboard
- [ ] Open My Jobs
- [ ] Create a job
- [ ] Verify job is stored by backend
- [ ] Edit a job
- [ ] Review applications
- [ ] Logout
- [ ] Verify dashboard is protected after logout

## Cross-Portal Role Testing

### Employer account on Candidate Portal

The candidate portal must not treat an employer as a candidate.

Expected behavior:

```text
Employer credentials
        ↓
Candidate login
        ↓
Role detected as employer
        ↓
Do not open candidate dashboard
```

The user should instead be directed toward the dedicated Employer / Hiring Portal.

### Candidate account on Employer Portal

The employer portal must not allow a seeker to enter employer-only pages.

Expected behavior:

```text
Candidate credentials
        ↓
Employer login
        ↓
Role detected as seeker
        ↓
Reject employer access
```

---

# 15. Important Development Rules

### Do not mix the portals

Do not copy employer dashboard logic into the candidate portal.

Do not make the candidate portal responsible for employer dashboard rendering.

Keep:

```text
candidate/
```

and:

```text
employer/
```

as independent frontend applications.

### Do not replace live APIs with fake data

If an API is available, production UI should consume the API rather than silently falling back to unrelated static job records.

### Preserve the existing UI

The existing approved design should be preserved.

Changes should focus on:

- functionality
- routing
- authentication
- API correctness
- dynamic data
- responsive/layout fixes
- broken navigation
- logout
- role separation

Unrelated visual redesigns should not be introduced.

---

# 16. Recommended User Journey

## Job Seeker

```text
Candidate Home
      ↓
Find Jobs
      ↓
Job Details
      ↓
Login / Register
      ↓
Apply
      ↓
Candidate Dashboard
      ↓
Track Applications
```

## Employer / HR

```text
Employer Home
      ↓
Employer Login / Register
      ↓
Employer Setup
      ↓
Hiring Dashboard
      ↓
Create Hiring Requirement
      ↓
Publish Job
      ↓
Receive Applications
      ↓
Review Candidates
      ↓
Build Hiring Team
```

---

# 17. Product Vision

MeriJob is structured as a recruitment and job-placement platform rather than only a simple job board.

The long-term platform model is:

```text
Companies
    ↓
MeriJob Hiring Platform
    ↓
HR / Recruiters
    ↓
Hiring Requirements
    ↓
Live Job Listings
    ↓
Job Seekers
    ↓
Applications
    ↓
Candidate Screening / Hiring
```

This allows multiple employers and HR users to use the platform while candidates have a dedicated experience for discovering and applying to opportunities.

---

# 18. Current Deployment URLs

| Application | URL |
|---|---|
| Candidate Portal | https://candidate-ecru-six.vercel.app/ |
| Employer / Hiring Portal | https://employer-mocha.vercel.app/ |
| Backend API | https://merijob-backend.onrender.com |
| Backend Health | https://merijob-backend.onrender.com/api/health |

---

# 19. Author

**Krishna Garg**

MeriJob — Full-Stack Job Placement Platform

Built with React, Vite, Node.js, Express, MongoDB and JWT authentication.

---

## License

This project is currently maintained as a personal/project implementation.

Add an appropriate open-source license before publicly distributing the source code if required.
