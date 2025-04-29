// src/components/XPLeaderboard.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const topUsers = [
  {
    name: "Aarav Mehta",
    xp: 1250,
    skills: ["React", "UI/UX"],
    initial: "A",
    medal: "gold",
    stats: {
      mentoringSessions: 15,
      tasksCompleted: 28,
      streak: 7
    }
  },
  {
    name: "Riya Sharma",
    xp: 1080,
    skills: ["Python", "Machine Learning"],
    initial: "R",
    medal: "silver",
    stats: {
      mentoringSessions: 12,
      tasksCompleted: 24,
      streak: 5
    }
  },
  {
    name: "Kabir Patel",
    xp: 960,
    skills: ["Public Speaking", "Leadership"],
    initial: "K",
    medal: "bronze",
    stats: {
      mentoringSessions: 10,
      tasksCompleted: 20,
      streak: 4
    }
  },
];

const medalIcons = {
  gold: "🥇",
  silver: "🥈",
  bronze: "🥉"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const skillVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const StatBox = ({ icon, label, value }) => (
  <motion.div
    className="flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 rounded-lg p-2"
    whileHover={{ scale: 1.05 }}
  >
    <span className="text-lg">{icon}</span>
    <div>
      <div className="text-sm font-medium text-violet-800 dark:text-violet-300">{value}</div>
      <div className="text-xs text-violet-600 dark:text-violet-400">{label}</div>
    </div>
  </motion.div>
);

export default function XPLeaderboard() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-violet-50/50 to-white dark:from-gray-900 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-violet-800 dark:text-violet-300 inline-flex items-center gap-3">
            Top XP Earners This Week
            <motion.span 
              className="text-3xl"
              animate={{ 
                rotate: [0, 15, -15, 15, 0],
                scale: [1, 1.2, 1]
              }}
              whileHover={{ scale: 1.3 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              🏆
            </motion.span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {topUsers.map((user, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg relative group"
            >
              <motion.div 
                className="flex items-center gap-4 mb-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * idx + 0.5 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <span className="text-xl font-semibold text-violet-600 dark:text-violet-300">
                    {user.initial}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <motion.h3 
                    className="font-semibold text-violet-800 dark:text-violet-300 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * idx + 0.6 }}
                  >
                    {user.name}
                    <motion.span 
                      className="text-xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2 * idx + 0.7
                      }}
                    >
                      {medalIcons[user.medal]}
                    </motion.span>
                  </motion.h3>
                  <motion.div 
                    className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 * idx + 0.7 }}
                  >
                    <span>XP: {user.xp}</span>
                    <motion.span
                      className="text-violet-500 dark:text-violet-400 cursor-help"
                      whileHover={{ scale: 1.2 }}
                      title="Experience points earned through mentoring and learning"
                    >
                      ℹ️
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    variants={skillVariants}
                    className="px-3 py-1 text-sm bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 rounded-full relative"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    onHoverStart={() => setHoveredSkill(`${idx}-${i}`)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    {skill}
                    {hoveredSkill === `${idx}-${i}` && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-violet-800 dark:bg-violet-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                      >
                        Top skill in portfolio
                      </motion.div>
                    )}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredCard === idx ? 1 : 0,
                  height: hoveredCard === idx ? 'auto' : 0
                }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-violet-100 dark:border-violet-700/30 grid grid-cols-3 gap-2"
              >
                <StatBox 
                  icon="👥" 
                  label="Sessions" 
                  value={user.stats.mentoringSessions} 
                />
                <StatBox 
                  icon="✅" 
                  label="Tasks" 
                  value={user.stats.tasksCompleted} 
                />
                <StatBox 
                  icon="🔥" 
                  label="Streak" 
                  value={`${user.stats.streak} days`} 
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
