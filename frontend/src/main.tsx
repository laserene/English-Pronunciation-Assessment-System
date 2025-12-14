import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage/index.tsx";
import AuthPage from "./pages/Auth/index.tsx";
import Login from "./pages/Auth/Login.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import LearnByScenarios from "./pages/Conversation/learn_by_scenarios.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<AuthPage content={<Login />} />} />
        <Route path="/register" element={<AuthPage content={<SignUp />} />} />
        <Route path="/scenario/:topic" element={<LearnByScenarios />} />
      </Routes>
    </Router>
  </>
);
