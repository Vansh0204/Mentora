// src/components/HowItWorksTimeline.jsx
import { motion } from "framer-motion";

const icons = {
  "Create Your Profile": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  "Swap or Book": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  "Mentor or Learn": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "Earn XP & Grow": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

export default function HowItWorksTimeline() {
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Tell us what skills you want to teach and learn. Your learning journey starts here!",
    },
    {
      title: "Swap or Book",
      description:
        "Match with peers via SkillSwap or find a mentor through MentorMatch.",
    },
    {
      title: "Mentor or Learn",
      description:
        "Join 1:1 or group sessions — share, grow, and contribute to each other's journeys.",
    },
    {
      title: "Earn XP & Grow",
      description:
        "Unlock XP, badges, and build your social learning rep with every session.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-violet-600 mb-16"
      >
        How Mentora Works
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-6"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <motion.div 
                  className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {icons[step.title]}
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-xl font-bold text-violet-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
  