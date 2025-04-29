import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import DashboardLayout from "../components/DashboardLayout";
import ThemeToggle from "../components/ThemeToggle";

const badges = [
  {
    id: 1,
    name: "First Session",
    description: "Completed your first mentoring session",
    icon: "🎯",
    xp: 100,
    status: "locked",
    color: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    id: 2,
    name: "Skill Master",
    description: "Mastered a new skill through mentoring",
    icon: "🏆",
    xp: 500,
    status: "locked",
    color: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    id: 3,
    name: "Mentor Pro",
    description: "Completed 10 mentoring sessions",
    icon: "👑",
    xp: 1000,
    status: "locked",
    color: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    id: 4,
    name: "Community Builder",
    description: "Helped 5 other members learn new skills",
    icon: "🤝",
    xp: 750,
    status: "locked",
    color: "bg-green-100 dark:bg-green-900/20",
  },
  {
    id: 5,
    name: "Learning Champion",
    description: "Completed all levels in a learning track",
    icon: "📚",
    xp: 1500,
    status: "locked",
    color: "bg-pink-100 dark:bg-pink-900/20",
  },
];

export default function Badges() {
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBadges = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("mentoraUser"));
        const userDoc = await getDoc(doc(db, "users", userData.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserBadges(data.badges || []);
        }
      } catch (error) {
        console.error("Error fetching user badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBadges();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Badges
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your achievements and progress
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${badge.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16" />
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {badge.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="px-3 py-1 bg-white/50 dark:bg-white/10 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                    {badge.xp} XP
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {badge.status === "locked" ? "🔒 Locked" : "✨ Unlocked"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Badge Progress
            </h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Total Badges</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {userBadges.length} / {badges.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userBadges.length / badges.length) * 100}%` }}
              />
            </div>
          </motion.div>
        </div>
        <ThemeToggle />
      </div>
    </DashboardLayout>
  );
} 