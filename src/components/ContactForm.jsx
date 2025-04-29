import { motion } from 'framer-motion';

export default function ContactForm() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        action="https://formsubmit.co/hwheels2428@gmail.com"
        method="POST"
        className="space-y-6"
      >
        {/* FormSubmit Configuration */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Contact Form Submission" />
        <input type="hidden" name="_template" value="table" />
        
        {/* Honeypot field to prevent spam */}
        <input type="text" name="_honey" style={{ display: 'none' }} />
        
        {/* Redirect after submission */}
        <input 
          type="hidden" 
          name="_next" 
          value={`${window.location.origin}/welcome`}
        />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your.email@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Your message here..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet-400 to-indigo-400 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Send Message
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
} 