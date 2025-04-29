import { motion } from "framer-motion";
import HeroLottie from "../components/HeroLottie.jsx";
import HowItWorksTimeline from "../components/HowItWorksTimeline.jsx";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import XPLeaderboard from "../components/XPLeaderboard";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 dark:from-gray-900 dark:to-gray-800 to-white">
      <HeroLottie />
      <HowItWorksTimeline />
      <TestimonialsCarousel />
      <XPLeaderboard />

      {/* Contact Us Section */}
      <section className="py-20 bg-gradient-to-b from-violet-50 dark:from-violet-900/20 dark:to-gray-800 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-violet-800 dark:text-violet-300 mb-4">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Have questions about mentorship or want to join our community? We'd love to hear from you!
              </p>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 h-32 resize-none placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-violet-600 dark:bg-violet-500 hover:bg-violet-700 dark:hover:bg-violet-600 rounded-full transition-colors duration-200 transform hover:scale-105 w-full sm:w-auto"
                  >
                    Send Message
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-6">Mentora</h3>
            
            {/* Social Media Links */}
            <div className="flex space-x-6 mb-8">
              <a
                href="https://www.instagram.com/all.about.vansh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vansh-agarwal-0413j"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/Vansh0204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>© 2025 Mentora. All rights reserved.</p>
              
            </div>
          </div>
        </div>
      </footer>

      <ThemeToggle />
    </div>
  );
}
