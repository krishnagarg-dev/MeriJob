import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Jobs from "./pages/Jobs/Jobs";
import JobDetails from "./pages/JobDetails/JobDetails";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Applications from "./pages/Applications/Applications";
import SavedJobs from "./pages/SavedJobs/SavedJobs";

import Employer from "./pages/Employer/Employer";
import EmployerSetup from "./pages/EmployerSetup/EmployerSetup";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";
import PostJob from "./pages/PostJob/PostJob";
import EmployerApplications from "./pages/EmployerApplications/EmployerApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Job Seeker */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />

        {/* Employer */}
        <Route path="/employer" element={<Employer />} />
        <Route path="/employer/setup" element={<EmployerSetup />} />
        <Route
          path="/employer/dashboard"
          element={<EmployerDashboard />}
        />
        <Route
          path="/employer/jobs/new"
          element={<PostJob />}
        />
        <Route
          path="/employer/jobs/:id/edit"
          element={<PostJob />}
        />
        <Route
          path="/employer/applications"
          element={<EmployerApplications />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;