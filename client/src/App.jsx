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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




