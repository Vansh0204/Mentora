// src/components/TestimonialsCarousel.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Frontend Developer",
    quote: "Mentora helped me learn UI design while teaching React to someone else. It's a win-win!",
    initial: "A"
  },
  {
    name: "Riya Sharma",
    role: "College Student",
    quote: "I found my first design mentor here — and now I'm mentoring juniors myself. Love the XP vibes!",
    initial: "R"
  },
  {
    name: "Tanish Gupta",
    role: "Career Switcher",
    quote: "Better than any bootcamp I joined. The community, rewards, and support made all the difference.",
    initial: "T"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15
    }
  }
};

const quoteVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -5 }
};

const profileVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  hover: { x: 5 }
};

export default function TestimonialsCarousel() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-violet-50/50 to-white dark:from-gray-900 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1,
            type: "spring",
            bounce: 0.3
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-violet-800 dark:text-violet-300 inline-flex items-center gap-3">
            What Our Users Say
            <motion.span 
              className="text-3xl"
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              whileHover={{ 
                scale: 1.2,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            >
              💬
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
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg relative group"
            >
              <div className="mb-4 italic text-gray-600 dark:text-gray-300">
                "{testimonial.quote}"
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                  <span className="text-lg text-violet-600 dark:text-violet-300">
                    {testimonial.initial}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-violet-800 dark:text-violet-300">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {hoveredCard === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    height: 'auto',
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -10,
                    height: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeIn"
                    }
                  }}
                  className="mt-4 pt-4 border-t border-violet-100"
                >
                  <motion.p 
                    className="text-sm text-violet-600"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.1,
                        duration: 0.3
                      }
                    }}
                  >
                    Want to share your own story? Join Mentora today!
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

