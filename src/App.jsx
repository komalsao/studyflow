import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Upload from "./pages/Upload/Upload";
import Workspace from "./pages/Workspace/Workspace";
import Signup from "./pages/Signup/Signup";
import Onboarding from "./pages/Onboarding/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSession from "./pages/CreateSession/CreateSession";
import StudyWorkspace from "./pages/StudyWorkspace/StudyWorkspace";
import StudySessions from "./pages/StudySessions/StudySessions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route path="/workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/study-workspace" element={<StudyWorkspace />} />
        <Route path="/study-sessions" element={<StudySessions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;