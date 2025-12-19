import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage/index.tsx";
import AuthPage from "./pages/Auth/index.tsx";
import Login from "./pages/Auth/Login.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import LearnByScenarios from "./pages/Conversation/LearnByScenarios.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage content={<Login />} />} />
        <Route path="/register" element={<AuthPage content={<SignUp />} />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/scenario/:scenario_id" element={<LearnByScenarios />} />
      </Routes>
    </Router >
  </>
);
