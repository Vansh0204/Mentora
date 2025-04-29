// src/pages/SkillSwap.js
import React, { useState, useEffect } from 'react';
import './SkillSwap.css'; // Import the CSS for styling
import { collection, query, where, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../components/DashboardLayout";
import ThemeToggle from "../components/ThemeToggle";

const DEMO_USER = {
  canTeach: ['React', 'CSS'],
  wantToLearn: ['Python', 'Django']
};

const DEMO_MATCHES = [
  {
    id: 1,
    name: 'Bob',
    avatar: '🧑‍💻',
    teaches: ['Python'],
    wantsToLearn: ['React'],
    canTeachYou: true,
    wantsToLearnFromYou: true,
    matchPercentage: 85,
    status: 'none'
  },
  {
    id: 2,
    name: 'Charlie',
    avatar: '👨‍💻',
    teaches: ['Django', 'Vue.js'],
    wantsToLearn: ['Node.js', 'React'],
    canTeachYou: true,
    wantsToLearnFromYou: true,
    matchPercentage: 92,
    status: 'none'
  }
];

export default function DemoSkillSwap() {
  const [activeTab, setActiveTab] = useState('all');
  const [matches, setMatches] = useState(DEMO_MATCHES);

  const filterMatches = (tab) => {
    switch (tab) {
      case 'canTeach':
        return matches.filter(match => match.wantsToLearnFromYou);
      case 'wantsToLearn':
        return matches.filter(match => match.canTeachYou);
      default:
        return matches;
    }
  };

  const handleConnect = (matchId) => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId
          ? { ...match, status: match.status === 'none' ? 'pending' : 'none' }
          : match
      )
    );
  };

  const SkillTag = ({ skill }) => (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 border border-violet-200 dark:border-violet-800"
    >
      {skill}
    </motion.span>
  );

  const MatchBadge = ({ type }) => {
    const styles = type === 'teach' 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800'
      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800';
    
    return (
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium border ${styles}`}
      >
        {type === 'teach' ? 'Can Teach You' : 'Wants to Learn From You'}
      </motion.span>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-5 rounded-full transform -translate-x-32 translate-y-16" />
            
            <h1 className="text-3xl font-bold mb-6 relative">Demo Skill Swap & Matching</h1>
            
            <div className="space-y-4 relative">
              <div className="flex items-center gap-2">
                <span className="text-violet-200 font-medium min-w-[120px]">You can teach:</span>
                <div className="flex flex-wrap gap-2">
                  {DEMO_USER.canTeach.map(skill => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-violet-200 font-medium min-w-[120px]">You want to learn:</span>
                <div className="flex flex-wrap gap-2">
                  {DEMO_USER.wantToLearn.map(skill => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex divide-x divide-gray-200 dark:divide-gray-700">
                {['all', 'canTeach', 'wantsToLearn'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
                        : 'text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {tab === 'all' && 'All Matches'}
                    {tab === 'canTeach' && 'Can Teach Me'}
                    {tab === 'wantsToLearn' && 'Wants to Learn From Me'}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence mode="wait">
                {filterMatches(activeTab).map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-2xl">
                            {match.avatar}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {match.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${match.matchPercentage}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full bg-violet-600 dark:bg-violet-500"
                                />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {match.matchPercentage}% Match
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[80px]">Teaches:</span>
                            <div className="flex flex-wrap gap-2">
                              {match.teaches.map(skill => (
                                <SkillTag key={skill} skill={skill} />
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[80px]">Wants to learn:</span>
                            <div className="flex flex-wrap gap-2">
                              {match.wantsToLearn.map(skill => (
                                <SkillTag key={skill} skill={skill} />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {match.canTeachYou && <MatchBadge type="teach" />}
                          {match.wantsToLearnFromYou && <MatchBadge type="learn" />}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConnect(match.id)}
                        className={`ml-4 inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium transition-colors ${
                          match.status === 'pending'
                            ? 'border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-700 dark:bg-violet-900/20 dark:text-violet-400'
                            : 'border-transparent bg-violet-600 text-white hover:bg-violet-700'
                        }`}
                      >
                        {match.status === 'pending' ? 'Pending' : 'Connect'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </DashboardLayout>
  );
}

