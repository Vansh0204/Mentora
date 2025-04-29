import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("mentoraUser"));
  const navigate = useNavigate();
  const [hoveredStat, setHoveredStat] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({});

  // Animate stats on load
  useEffect(() => {
    stats.forEach(stat => {
      setAnimatedStats(prev => ({
        ...prev,
        [stat.label]: 0
      }));
      
      const timer = setTimeout(() => {
        setAnimatedStats(prev => ({
          ...prev,
          [stat.label]: stat.value
        }));
      }, 500);

      return () => clearTimeout(timer);
    });
  }, []);

  const stats = [
    { 
      label: "XP Points", 
      value: user?.xp || 0, 
      icon: "⭐", 
      trend: "+5 this week",
      detail: "Keep learning to earn more XP! Next milestone at 1000 XP.",
      color: "from-amber-500 to-orange-600"
    },
    { 
      label: "Skills Teaching", 
      value: user?.teachSkills?.length || 0, 
      icon: "📚", 
      trend: "Most popular: JavaScript",
      detail: "Your teaching skills are in high demand! 5 learners waiting.",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      label: "Skills Learning", 
      value: user?.learnSkills?.length || 0, 
      icon: "🎯", 
      trend: "2 new this month",
      detail: "Great progress! You've completed 60% of your learning goals.",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      label: "Connections", 
      value: user?.connections?.length || 0, 
      icon: "🤝", 
      trend: "3 pending requests",
      detail: "Your network is growing! Check your pending connection requests.",
      color: "from-violet-500 to-purple-600"
    },
    { 
      label: "Sessions Completed", 
      value: user?.completedSessions || 0, 
      icon: "✅", 
      trend: "Next: Tomorrow 3 PM",
      detail: "You've helped 12 learners achieve their goals this month!",
      color: "from-green-500 to-emerald-600"
    },
    { 
      label: "Achievements", 
      value: user?.achievements?.length || 0, 
      icon: "🏆", 
      trend: "2 nearly unlocked",
      detail: "You're close to unlocking 'Master Mentor' achievement!",
      color: "from-yellow-500 to-amber-600"
    },
    { 
      label: "Community Posts", 
      value: user?.posts || 0, 
      icon: "📝", 
      trend: "5 responses",
      detail: "Your last post helped 20+ community members. Keep sharing!",
      color: "from-pink-500 to-rose-600"
    },
    { 
      label: "Current Level", 
      value: Math.floor((user?.xp || 0) / 1000) + 1, 
      icon: "🌟", 
      trend: "Next level: 78%",
      detail: "Only 220 XP away from reaching the next level!",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const quickActions = [
    { 
      name: "Find Matches", 
      icon: "🔄", 
      path: "/skillswap", 
      color: "from-purple-400 to-fuchsia-400",
      description: "Discover perfect learning partners"
    },
    { 
      name: "Update Profile", 
      icon: "👤", 
      path: "/profile", 
      color: "from-violet-400 to-indigo-400",
      description: "Keep your skills current"
    },
    { 
      name: "Book Session", 
      icon: "📅", 
      path: "/sessions", 
      color: "from-blue-400 to-sky-400",
      description: "Schedule your next learning session"
    },
    { 
      name: "Join Community", 
      icon: "💬", 
      path: "/community", 
      color: "from-teal-400 to-emerald-400",
      description: "Connect with fellow learners"
    },
    { 
      name: "View Achievements", 
      icon: "🏆", 
      path: "/achievements", 
      color: "from-amber-400 to-orange-400",
      description: "Track your progress milestones"
    }
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden mb-8"
          >
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                translateX: [32, 40, 32],
                translateY: [-32, -40, -32]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full"
              animate={{ 
                scale: [1.2, 1, 1.2],
                translateX: [-20, -10, -20],
                translateY: [20, 10, 20]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
              Welcome back, {user?.name || "User"} 
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                👋
              </motion.span>
            </h2>
            <p className="text-violet-100 mb-6 text-lg">
              Ready to continue your learning journey?
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            layout
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group h-[180px] hover:h-[240px]`}
                onHoverStart={() => setHoveredStat(stat.label)}
                onHoverEnd={() => setHoveredStat(null)}
                layout
              >
                <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-95 group-hover:opacity-90 transition-opacity duration-300"/>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                    <motion.span 
                      className="text-xs font-medium px-3 py-1.5 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.trend}
                    </motion.span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <motion.p 
                    className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {Math.round(animatedStats[stat.label] || 0)}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredStat === stat.label ? 1 : 0,
                      height: hoveredStat === stat.label ? "auto" : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-start gap-2">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5"
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <p className="leading-relaxed">{stat.detail}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Progress Indicator */}
                  <motion.div
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredStat === stat.label ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-1">
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-violet-500/50"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 0
                        }}
                      />
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-violet-500/50"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 0.2
                        }}
                      />
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-violet-500/50"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 0.4
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.name}
                onClick={() => navigate(action.path)}
                className={`p-4 bg-gradient-to-br ${action.color} rounded-xl text-white shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
                <span className="text-2xl mb-2 block transform group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </span>
                <h3 className="font-semibold mb-1 text-white/90">{action.name}</h3>
                <p className="text-sm text-white/80">{action.description}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Teaching Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                    <span className="text-xl">📚</span>
                    Skills to Teach
                  </h3>
                  <motion.button
                    onClick={() => navigate('/profile')}
                    className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Edit Skills</span>
                    <span>✏️</span>
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user?.teachSkills?.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSkillClick(skill)}
                      className="px-4 py-2 bg-violet-50 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 hover:bg-violet-100 dark:hover:bg-violet-900/70 flex items-center gap-2"
                    >
                      <span>{skill}</span>
                      <span className="text-xs bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">
                        5 learners
                      </span>
                    </motion.span>
                  )) || 
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 dark:text-gray-400 flex items-center gap-2"
                  >
                    <span>No teaching skills added yet</span>
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👆
                    </motion.span>
                  </motion.p>}
                </div>
              </div>
            </motion.div>

            {/* Learning Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    Skills to Learn
                  </h3>
                  <motion.button
                    onClick={() => navigate('/profile')}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Edit Skills</span>
                    <span>✏️</span>
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user?.learnSkills?.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSkillClick(skill)}
                      className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 flex items-center gap-2"
                    >
                      <span>{skill}</span>
                      <span className="text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                        3 mentors
                      </span>
                    </motion.span>
                  )) || 
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 dark:text-gray-400 flex items-center gap-2"
                  >
                    <span>No learning skills added yet</span>
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👆
                    </motion.span>
                  </motion.p>}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skill Modal */}
          <AnimatePresence>
            {showSkillModal && selectedSkill && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
                onClick={() => setShowSkillModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-violet-600 dark:text-violet-400">
                      {selectedSkill}
                    </h3>
                    <button
                      onClick={() => setShowSkillModal(false)}
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Skill Overview</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Master your knowledge in {selectedSkill} through our comprehensive learning paths and expert mentorship.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4">
                        <h4 className="font-medium text-violet-700 dark:text-violet-300 mb-2">Learning Resources</h4>
                        <ul className="text-sm text-violet-600 dark:text-violet-400 space-y-2">
                          <li>• Interactive Courses</li>
                          <li>• Video Tutorials</li>
                          <li>• Practice Projects</li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                        <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Community Stats</h4>
                        <ul className="text-sm text-indigo-600 dark:text-indigo-400 space-y-2">
                          <li>• 150+ Active Learners</li>
                          <li>• 25 Expert Mentors</li>
                          <li>• 4.8/5 Rating</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => {
                          setShowSkillModal(false);
                          navigate(`/learning/${selectedSkill}`);
                        }}
                        className="flex-1 bg-gradient-to-br from-violet-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
                      >
                        Start Learning
                      </button>
                      <button
                        onClick={() => {
                          setShowSkillModal(false);
                          navigate(`/mentors/${selectedSkill}`);
                        }}
                        className="flex-1 border border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 py-2 rounded-lg font-medium hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-300"
                      >
                        Find Mentors
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ThemeToggle />
      </div>
    </DashboardLayout>
  );
}
