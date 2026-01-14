'use client';

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }
  };

  return (
    <section className="py-5 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="nav-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-16 rounded-2xl glass-card border-[var(--border-color)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
            
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-2xl shadow-[var(--accent)]/20 text-white"
            >
              <Mail className="w-10 h-10" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[var(--text-primary)] tracking-tight">
              Stay <span className="gradient-text">Updated</span>
            </h2>
            
            <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Subscribe to our newsletter and be the first to know about new product launches, exclusive deals, and tech insights.
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus-within:border-[var(--accent)] transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 font-medium"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 rounded-[1.5rem] bg-[var(--accent)] text-white font-bold hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Subscribe
                </motion.button>
              </div>
            </form>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}