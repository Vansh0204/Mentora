// src/components/DashboardLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
            className="relative"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <motion.button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-all duration-200 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isSidebarOpen 
                    ? "M9 19l-7-7 7-7" 
                    : "M5 19l7-7-7-7"}
                />
              </svg>
            </motion.div>
          </motion.button>
          <Topbar />
        </div>
        <main className={`flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
