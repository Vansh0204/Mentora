import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Welcome() {
  const user = JSON.parse(localStorage.getItem("mentoraUser"));
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);

  // Array of motivational quotes
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The expert in anything was once a beginner. - Helen Hayes"
  ];

  // Extended stats data
  const statsData = {
    users: {
      value: "10k+",
      subStats: [
        { label: "Active Mentors", value: "2.5k+" },
        { label: "Active Learners", value: "7.5k+" },
        { label: "Countries", value: "50+" }
      ]
    },
    skills: {
      value: "50+",
      subStats: [
        { label: "Technical Skills", value: "25+" },
        { label: "Soft Skills", value: "15+" },
        { label: "Creative Skills", value: "10+" }
      ]
    },
    matches: {
      value: "5k+",
      subStats: [
        { label: "This Month", value: "500+" },
        { label: "Success Rate", value: "95%" },
        { label: "Ongoing", value: "1.2k" }
      ]
    },
    rating: {
      value: "4.8",
      subStats: [
        { label: "Teaching Quality", value: "4.9" },
        { label: "Platform Ease", value: "4.7" },
        { label: "Community", value: "4.8" }
      ]
    }
  };

  // Get a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-indigo-600/10 dark:from-violet-900/30 dark:via-purple-900/30 dark:to-indigo-900/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Hi {user?.name || "there"}, Welcome to <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Mentora</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 italic">
                "{randomQuote}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/skillswap')}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-2 border-violet-600 dark:border-violet-400"
              >
                Find Skill Partner
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🤝",
              title: "Skill Exchange",
              description: "Exchange your expertise with others. Teach JavaScript while learning Python, or share design skills while mastering marketing. Our smart matching system finds your perfect learning partners.",
              details: ["Smart Matching Algorithm", "Real-time Chat", "Schedule Management", "Skill Rating System"]
            },
            {
              icon: "⭐",
              title: "XP & Achievements",
              description: "Level up your profile by teaching and learning. Earn XP points, unlock achievement badges, climb the leaderboard, and showcase your expertise through our gamified learning system.",
              details: ["XP System", "Achievement Badges", "Leaderboard", "Gamified Learning"]
            },
            {
              icon: "🎓",
              title: "Learning Paths",
              description: "Follow structured learning paths, track your progress with certifications, and get matched with mentors who can guide you. Set goals, measure progress, and celebrate milestones.",
              details: ["Structured Learning Paths", "Certifications", "Mentor Matching", "Progress Tracking"]
            },
            {
              icon: "💬",
              title: "Community Hub",
              description: "Join topic-based communities, participate in discussions, share resources, and connect with peers. Get help, share knowledge, and build your professional network.",
              details: ["Topic-Based Communities", "Discussions", "Resource Sharing", "Peer Connections"]
            },
            {
              icon: "📊",
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed analytics. Track hours spent learning, teaching, skills mastered, and get personalized recommendations for your next learning goals.",
              details: ["Detailed Analytics", "Learning Hours", "Skills Mastered", "Personalized Recommendations"]
            },
            {
              icon: "🌟",
              title: "Skill Validation",
              description: "Earn verified badges through peer reviews and assessments. Showcase your expertise with skill endorsements and build a credible learning portfolio.",
              details: ["Peer Reviews", "Assessments", "Skill Endorsements", "Credible Portfolio"]
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              onHoverStart={() => setHoveredCard(feature.title)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 dark:from-violet-400/10 dark:to-indigo-400/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === feature.title ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <AnimatePresence>
                {hoveredCard === feature.title && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 text-sm text-gray-600">
                      {feature.details.map((detail, i) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center"
                        >
                          <span className="w-2 h-2 bg-violet-600 rounded-full mr-2" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-gradient-to-br from-violet-300 via-purple-300 to-indigo-300 dark:from-violet-500 dark:via-purple-500 dark:to-indigo-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
          >
            Start Your Learning Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: "👋",
                title: "Complete Your Profile",
                description: "Add your skills, interests, and learning goals to get personalized recommendations.",
                action: "Update Profile",
                path: "/profile"
              },
              {
                step: 2,
                icon: "🤝",
                title: "Find Learning Partners",
                description: "Get matched with mentors and learners who share your interests and goals.",
                action: "Find Partners",
                path: "/skillswap"
              },
              {
                step: 3,
                icon: "🎯",
                title: "Start Learning",
                description: "Book your first session, join communities, and begin your learning adventure.",
                action: "Go to Dashboard",
                path: "/dashboard"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg relative group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-violet-50 rounded-bl-2xl rounded-tr-xl flex items-center justify-center text-2xl font-bold text-violet-400">
                  {step.step}
                </div>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {step.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(step.path)}
                  className="w-full py-3 bg-gradient-to-r from-violet-300 to-indigo-300 hover:from-violet-400 hover:to-indigo-400 text-gray-800 hover:text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {step.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-gray-800 dark:text-white/90 text-lg mb-6">
              Join thousands of learners who are already growing with Mentora
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/community')}
              className="px-8 py-3 bg-white/95 backdrop-blur-sm text-violet-500 hover:text-violet-600 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Community
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
} 