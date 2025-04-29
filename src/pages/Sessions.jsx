import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

export default function Sessions() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-semibold text-violet-500 dark:text-violet-400 mb-6">
              Book Mentoring Sessions
            </h1>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl">🚀</div>
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                  Coming Soon!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  We're working hard to bring you an amazing mentoring experience. 
                  Book sessions with expert mentors and accelerate your learning journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 