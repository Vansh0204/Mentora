// src/pages/LeaderboardPage.jsx
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import DashboardLayout from '../components/DashboardLayout';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Alice', xp: 3200, badges: 5 },
  { rank: 2, name: 'Bob', xp: 2900, badges: 4 },
  { rank: 3, name: 'Charlie', xp: 2500, badges: 3 },
  { rank: 4, name: 'Diana', xp: 2100, badges: 2 },
  { rank: 5, name: 'Eve', xp: 1800, badges: 2 },
  { rank: 6, name: 'Frank', xp: 1500, badges: 1 }
];

const RankBadge = ({ rank }) => {
  const medals = {
    1: { emoji: '🥇', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200' },
    2: { emoji: '🥈', bg: 'bg-gray-100 dark:bg-gray-700/30', text: 'text-gray-800 dark:text-gray-200' },
    3: { emoji: '🥉', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-200' }
  };

  if (medals[rank]) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${medals[rank].bg} ${medals[rank].text}`}>
        <span>{medals[rank].emoji}</span>
        <span className="font-semibold">#{rank}</span>
      </div>
    );
  }

  return (
    <div className="px-3 py-1 rounded-full bg-violet-100/50 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200">
      #{rank}
    </div>
  );
};

const BadgeDisplay = ({ count }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-lg">🏆</span>
      <span className="font-medium">{count}</span>
    </div>
  );
};

export default function LeaderboardPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-violet-500 dark:text-violet-400 text-center mb-12">
            Leaderboard
          </h1>

          <motion.div 
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    XP
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD_DATA.map((user, index) => (
                  <motion.tr
                    key={user.rank}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-transparent via-violet-50/50 dark:via-violet-900/20 to-transparent' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      <RankBadge rank={user.rank} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400 font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚡</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{user.xp.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      <BadgeDisplay count={user.badges} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        <ThemeToggle />
      </div>
    </DashboardLayout>
  );
}
