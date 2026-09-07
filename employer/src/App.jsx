import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployerHome from "./pages/Home/EmployerHome";
import EmployerLogin from "./pages/Login/EmployerLogin";
import EmployerRegister from "./pages/Register/EmployerRegister";
import EmployerSetup from "./pages/Setup/EmployerSetup";
import EmployerDashboard from "./pages/Dashboard/EmployerDashboard";
import EmployerJobs from "./pages/Jobs/EmployerJobs";
import PostJob from "./pages/PostJob/PostJob";
import EmployerApplications from "./pages/Applications/EmployerApplications";

const protect = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployerHome />} />
          <Route path="/employer" element={<Navigate to="/" replace />} />
          <Route path="/home" element={<EmployerHome />} />
          <Route path="/login" element={<EmployerLogin />} />
          <Route path="/register" element={<EmployerRegister />} />
          <Route path="/setup" element={protect(<EmployerSetup />)} />
          <Route path="/dashboard" element={<Navigate to="/employer/dashboard" replace />} />
          <Route path="/employer/dashboard" element={protect(<EmployerDashboard />)} />
          <Route path="/jobs" element={<Navigate to="/employer/jobs" replace />} />
          <Route path="/employer/jobs" element={protect(<EmployerJobs />)} />
          <Route path="/post-job" element={<Navigate to="/employer/jobs/new" replace />} />
          <Route path="/employer/jobs/new" element={protect(<PostJob />)} />
          <Route path="/employer/jobs/:id/edit" element={protect(<PostJob />)} />
          <Route path="/applications" element={<Navigate to="/employer/applications" replace />} />
          <Route path="/employer/applications" element={protect(<EmployerApplications />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
