import { motion } from "framer-motion";

export default function LoadingScreen({ progress }) {
  const colors = [
    "rgb(167, 139, 250)", // violet-400
    "rgb(139, 92, 246)", // violet-500
    "rgb(124, 58, 237)", // violet-600
    "rgb(255, 155, 155)", // red-300
    "rgb(134, 239, 172)", // green-300
    "rgb(147, 197, 253)", // blue-300
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] isolate flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/10 to-transparent dark:via-violet-400/10"
            style={{
              top: `${i * 10}%`,
            }}
            animate={{
              x: [-1000, 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-500/10 to-transparent dark:via-violet-400/10"
            style={{
              left: `${i * 10}%`,
            }}
            animate={{
              y: [-1000, 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 30 + 20,
              height: Math.random() * 30 + 20,
              border: `2px solid ${colors[i % colors.length]}`,
              opacity: 0.1,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main logo with dynamic effects */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.2)",
                "0 0 60px rgba(139, 92, 246, 0.4)",
                "0 0 20px rgba(139, 92, 246, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-3xl bg-white/90 p-4 backdrop-blur-sm dark:bg-gray-900/90"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative"
            >
              <svg width="100" height="100" viewBox="0 0 32 32" className="relative z-10 text-violet-600 dark:text-violet-400">
                <rect width="32" height="32" rx="8" className="fill-current" />
                <motion.path 
                  d="M8 24V8L16 18L24 8V24" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              
              {/* Animated corner accents */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-6 w-6 border-2 border-violet-500/20 dark:border-violet-400/20"
                  style={{
                    top: i < 2 ? -4 : "auto",
                    bottom: i >= 2 ? -4 : "auto",
                    left: i % 2 === 0 ? -4 : "auto",
                    right: i % 2 === 1 ? -4 : "auto",
                    borderTopWidth: i < 2 ? 2 : 0,
                    borderBottomWidth: i >= 2 ? 2 : 0,
                    borderLeftWidth: i % 2 === 0 ? 2 : 0,
                    borderRightWidth: i % 2 === 1 ? 2 : 0,
                    borderRadius: 4,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Progress bar with animated gradient */}
        <motion.div className="absolute -bottom-20 left-1/2 w-64 -translate-x-1/2">
          <div className="relative h-2 overflow-hidden rounded-full bg-violet-100/10 backdrop-blur-sm dark:bg-violet-900/10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600 dark:from-violet-500 dark:via-violet-400 dark:to-violet-500"
              style={{
                backgroundSize: "200% 100%",
              }}
              initial={{ width: "0%", backgroundPosition: "0% 50%" }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{ 
                width: { duration: 0.3, ease: "easeOut" },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />
          </div>

          {/* Loading text with spinner */}
          <motion.div 
            className="mt-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-4 w-4"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-violet-500 dark:text-violet-400">
                <motion.path 
                  d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </motion.div>
            <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
              Loading Resources... {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>

        {/* Animated brand text */}
        <motion.div className="mt-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold"
          >
            {["M", "e", "n", "t", "o", "r", "a"].map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block bg-gradient-to-br from-violet-500 to-violet-700 bg-clip-text text-transparent dark:from-violet-400 dark:to-violet-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  textShadow: [
                    "0 0 20px rgba(139, 92, 246, 0)",
                    "0 0 40px rgba(139, 92, 246, 0.3)",
                    "0 0 20px rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.1,
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
} 