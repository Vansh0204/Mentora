import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const tracks = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Master modern web development',
    icon: '🌐',
    levels: [
      { level: 1, name: 'HTML & CSS Basics', xp: 100 },
      { level: 2, name: 'JavaScript Fundamentals', xp: 200 },
      { level: 3, name: 'React & Frontend', xp: 300 },
      { level: 4, name: 'Backend Development', xp: 400 },
      { level: 5, name: 'Full Stack Mastery', xp: 500 },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Create beautiful and user-friendly interfaces',
    icon: '🎨',
    levels: [
      { level: 1, name: 'Design Principles', xp: 100 },
      { level: 2, name: 'Figma Basics', xp: 200 },
      { level: 3, name: 'UI Components', xp: 300 },
      { level: 4, name: 'UX Research', xp: 400 },
      { level: 5, name: 'Design System', xp: 500 },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Analyze and visualize data',
    icon: '📊',
    levels: [
      { level: 1, name: 'Python Basics', xp: 100 },
      { level: 2, name: 'Data Analysis', xp: 200 },
      { level: 3, name: 'Machine Learning', xp: 300 },
      { level: 4, name: 'Deep Learning', xp: 400 },
      { level: 5, name: 'AI Applications', xp: 500 },
    ],
  },
];

export default function LearningTracks() {
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("mentoraUser"));

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const progressRef = collection(db, "users", user.uid, "progress");
        const snapshot = await getDocs(progressRef);
        const progress = {};
        snapshot.forEach(doc => {
          progress[doc.id] = doc.data();
        });
        setUserProgress(progress);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [user]);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Tracks</h1>
          <p className="mt-2 text-gray-600">
            Choose your path and start your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{track.icon}</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {track.title}
                    </h3>
                    <p className="text-sm text-gray-500">{track.description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm text-gray-500">
                      {userProgress[track.id]?.currentLevel || 0}/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${((userProgress[track.id]?.currentLevel || 0) / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {track.levels.map((level) => (
                    <div
                      key={level.level}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        (userProgress[track.id]?.currentLevel || 0) >= level.level
                          ? "bg-indigo-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Level {level.level}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {level.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          {level.xp} XP
                        </span>
                        {(userProgress[track.id]?.currentLevel || 0) >= level.level ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <span className="text-gray-400">○</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Learning
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 