import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home/home";
import NavBar from "./components/navbar";
import SkillsResources from "./components/analyzer/skills-resources";
import LandingPage from "./components/landing-page/landing-page";
import AnalyzerPage from "./components/analyzer/analyzer-page";
import Jobs from "./components/jobs/jobs";
import ProfilePage from "./components/profile-page/profile-page";
import LoginPage from "./components/onboarding/login";
import RegisterPage from "./components/onboarding/register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
            <Route path="/analyzer/skills-resources" element={<SkillsResources />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        ) : (
          // Redirect any unauthorized access to "/"
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
