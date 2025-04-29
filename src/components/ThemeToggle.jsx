import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <motion.button
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
        isDark 
          ? 'bg-white text-gray-900' 
          : 'bg-gray-800 text-white'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <>
          <HiSun className="w-5 h-5" />
          <span className="text-sm font-medium">Light Mode</span>
        </>
      ) : (
        <>
          <HiMoon className="w-5 h-5" />
          <span className="text-sm font-medium">Dark Mode</span>
        </>
      )}
    </motion.button>
  );
} 