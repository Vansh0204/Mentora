import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LeaderboardPage from "./pages/LeaderboardPage";
import DemoSkillSwap from './pages/DemoSkillSwap';
import MentorMatch from "./pages/MentorMatch";
import Certifications from "./pages/Certifications";
import Community from "./pages/Community";
import Badges from "./pages/Badges";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import Sessions from "./pages/Sessions";
import Bookings from "./pages/Bookings";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a longer loading time with progress
    const duration = 5000; // 5 seconds total
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/skillswap" element={<DemoSkillSwap />} />
        <Route path="/demo-skillswap" element={<DemoSkillSwap />} />
        <Route path="/mentormatch" element={<MentorMatch />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/community" element={<Community />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </>
  );
}
