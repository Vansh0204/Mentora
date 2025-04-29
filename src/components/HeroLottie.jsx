import Lottie from "lottie-react";
import heroAnimation from "../assets/lottie/hero-mentorship.json";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroLottie() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ users: 0, mentors: 0, sessions: 0 });

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform mouse position for parallax
  const lottieX = useTransform(smoothMouseX, [-500, 500], [30, -30]);
  const lottieY = useTransform(smoothMouseY, [-500, 500], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX - window.innerWidth / 2);
      mouseY.set(clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users < 1000 ? prev.users + 5 : prev.users,
        mentors: prev.mentors < 500 ? prev.mentors + 3 : prev.mentors,
        sessions: prev.sessions < 2000 ? prev.sessions + 10 : prev.sessions,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between py-16 md:py-24 px-6 md:px-20 bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-purple-200 dark:bg-violet-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 bg-violet-200 dark:bg-purple-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Text Content */}
      <motion.div 
        className="relative max-w-xl text-center md:text-left space-y-8 md:pr-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold text-violet-900 dark:text-white leading-tight mb-4">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
              Mentora
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
            A gamified social learning hub where teaching grows your skills too. Learn, mentor, earn XP — and grow together.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center md:justify-start gap-4 pt-4"
        >
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500 text-white text-lg font-medium
              hover:shadow-lg hover:shadow-violet-200/50 dark:hover:shadow-violet-500/20 transform hover:-translate-y-0.5 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="group-hover:mr-2 transition-all duration-200">Guest Login</span>
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-200">→</span>
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 pt-8 pb-4"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-300">{stats.users.toLocaleString()}+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-300">{stats.mentors.toLocaleString()}+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-300">{stats.sessions.toLocaleString()}+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Sessions</div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center gap-6 pt-4 text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/20 transition-colors duration-200">
              <svg className="w-4 h-4 text-violet-600 dark:text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-200">Learn by Teaching</span>
          </div>
          <div className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/20 transition-colors duration-200">
              <svg className="w-4 h-4 text-violet-600 dark:text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-200">Earn XP & Rewards</span>
          </div>
          <div className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/20 transition-colors duration-200">
              <svg className="w-4 h-4 text-violet-600 dark:text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-200">Join Community</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Lottie Animation */}
      <motion.div 
        className="relative w-full md:w-1/2 mb-12 md:mb-0"
        variants={itemVariants}
        style={{
          x: lottieX,
          y: lottieY
        }}
      >
        <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
          <Lottie 
            animationData={heroAnimation} 
            loop
            className="w-full max-w-2xl mx-auto drop-shadow-2xl dark:brightness-90"
          />
        </div>
        {/* Animation Overlay Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-violet-200/30 dark:from-violet-500/5 to-transparent rounded-3xl"
          animate={{ 
            opacity: [0.5, 0.3, 0.5],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
