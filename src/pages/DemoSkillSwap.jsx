import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const DEMO_USER = {
  canTeach: ['React', 'CSS'],
  wantToLearn: ['Python', 'Django']
};

const DEMO_MATCHES = [
  {
    id: 1,
    name: 'Bob',
    teaches: 'Python',
    wantsToLearn: 'React',
    canTeachYou: true,
    wantsToLearnFromYou: true
  },
  {
    id: 2,
    name: 'Charlie',
    teaches: 'Django, Vue.js',
    wantsToLearn: 'Node.js, React',
    canTeachYou: true,
    wantsToLearnFromYou: true
  },
  {
    id: 3,
    name: 'Sarah',
    teaches: 'Python, Django, FastAPI',
    wantsToLearn: 'CSS',
    canTeachYou: true,
    wantsToLearnFromYou: true
  },
  {
    id: 4,
    name: 'Alex',
    teaches: 'Python, Machine Learning',
    wantsToLearn: '',
    canTeachYou: true,
    wantsToLearnFromYou: false
  },
  {
    id: 5,
    name: 'Emma',
    teaches: 'Django, PostgreSQL',
    wantsToLearn: '',
    canTeachYou: true,
    wantsToLearnFromYou: false
  },
  {
    id: 6,
    name: 'Michael',
    teaches: '',
    wantsToLearn: 'React, CSS',
    canTeachYou: false,
    wantsToLearnFromYou: true
  },
  {
    id: 7,
    name: 'Jessica',
    teaches: 'Python, Data Science',
    wantsToLearn: '',
    canTeachYou: true,
    wantsToLearnFromYou: false
  },
  {
    id: 8,
    name: 'David',
    teaches: '',
    wantsToLearn: 'React',
    canTeachYou: false,
    wantsToLearnFromYou: true
  },
  {
    id: 9,
    name: 'Lisa',
    teaches: 'Python, AWS',
    wantsToLearn: '',
    canTeachYou: true,
    wantsToLearnFromYou: false
  },
  {
    id: 10,
    name: 'Ryan',
    teaches: 'Python, Docker',
    wantsToLearn: '',
    canTeachYou: true,
    wantsToLearnFromYou: false
  }
];

export default function DemoSkillSwap() {
  const [activeTab, setActiveTab] = useState('all');

  const filterMatches = (tab) => {
    switch (tab) {
      case 'canTeach':
        return DEMO_MATCHES.filter(match => match.canTeachYou);
      case 'wantsToLearn':
        return DEMO_MATCHES.filter(match => match.wantsToLearnFromYou);
      default:
        return DEMO_MATCHES;
    }
  };

  const Badge = ({ type }) => (
    <span className={`px-2 py-1 rounded-md text-sm ${
      type === 'teach' 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    }`}>
      {type === 'teach' ? 'Can Teach You' : 'Wants to Learn From You'}
    </span>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-violet-500 dark:text-violet-400">
              Demo Skill Swap & Matching
            </h1>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-500/30 transition-colors"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" 
                />
              </svg>
              Back to Dashboard
            </Link>
          </div>

          <div className="space-y-4 mb-8">
            <div className="text-gray-700 dark:text-violet-400">
              You can teach:{' '}
              <span className="text-violet-500 dark:text-violet-400">
                {DEMO_USER.canTeach.join(', ')}
              </span>
            </div>
            <div className="text-gray-700 dark:text-violet-400">
              You want to learn:{' '}
              <span className="text-violet-500 dark:text-violet-400">
                {DEMO_USER.wantToLearn.join(', ')}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-violet-500 dark:bg-violet-600 text-white'
                  : 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-500/30'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setActiveTab('canTeach')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'canTeach'
                  ? 'bg-violet-500 dark:bg-violet-600 text-white'
                  : 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-500/30'
              }`}
            >
              Can Teach Me
            </button>
            <button
              onClick={() => setActiveTab('wantsToLearn')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'wantsToLearn'
                  ? 'bg-violet-500 dark:bg-violet-600 text-white'
                  : 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-500 dark:text-violet-400 hover:bg-violet-500/20 dark:hover:bg-violet-500/30'
              }`}
            >
              Wants to Learn From Me
            </button>
          </div>

          <div className="space-y-4">
            {filterMatches(activeTab).map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-violet-500 dark:text-violet-400 mb-4">
                  {match.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="text-gray-700 dark:text-violet-400">
                    Teaches: {match.teaches}
                  </div>
                  <div className="text-gray-700 dark:text-violet-400">
                    Wants to learn: {match.wantsToLearn}
                  </div>
                </div>
                <div className="flex gap-2">
                  {match.canTeachYou && <Badge type="teach" />}
                  {match.wantsToLearnFromYou && <Badge type="learn" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <ThemeToggle />
      </div>
    </DashboardLayout>
  );
} 