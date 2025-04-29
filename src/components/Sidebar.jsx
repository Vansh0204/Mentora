// src/components/Sidebar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mentoraUser"));
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userXp = data.xp || 0;
        setXp(userXp);
        // Example: Level up every 1000 XP
        setLevel(Math.floor(userXp / 1000) + 1);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 0);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("mentoraUser");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogoClick = () => {
    navigate("/welcome");
  };

  const navigationItems = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", to: "/dashboard", icon: "🏠" },
        { name: "Profile", to: "/profile", icon: "👤" },
      ],
    },
    {
      title: "Skill Exchange",
      items: [
        { name: "Skill Swap & Matches", to: "/skillswap", icon: "🔄" },
      ],
    },
    {
      title: "Mentorship",
      items: [
        { name: "Book Sessions", to: "/sessions", icon: "📅" },
        { name: "My Bookings", to: "/bookings", icon: "📋" },
      ],
    },
    {
      title: "Community",
      items: [
        { name: "Leaderboard", to: "/leaderboard", icon: "🏅" },
        { name: "Community", to: "/community", icon: "💬" },
        { name: "Badges", to: "/badges", icon: "🎖️" },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 transition-colors relative">
      <div className={`sticky top-0 z-10 bg-white dark:bg-gray-800 transition-shadow ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div 
          onClick={handleLogoClick}
          className="p-6 cursor-pointer group border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
            Mentora
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            Grow Together
          </p>
        </div>

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <span className="text-lg">✨</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Level {level}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{xp} XP</div>
            </div>
          </div>
        </div>
      </div>
      
      <nav 
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500"
        onScroll={handleScroll}
      >
        <div className="py-4 space-y-6">
          {navigationItems.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div>
                {section.items.map(({ name, to, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
                      pathname === to
                        ? "bg-violet-50 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 border-l-4 border-violet-600 dark:border-violet-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400"
                    }`}
                  >
                    <span className="mr-3">{icon}</span>
                    {name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </nav>

      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
