'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function LoadingSpinner({ fullPage = false }) {
  const spinnerContent = (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ 
          rotate: 360,
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"] 
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          borderRadius: { duration: 2, repeat: Infinity, repeatType: "reverse" }
        }}
        className="w-20 h-20 border-2 border-dashed border-[var(--accent)] opacity-40"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut" 
        }}
        className="absolute text-[var(--accent)]"
      >
        <Cpu size={32} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent blur-sm"
      />

      <div className="absolute -bottom-10 whitespace-nowrap">
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.4em]"
        >
          System Initializing...
        </motion.span>
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] z-[999] flex items-center justify-center overflow-hidden">
        <div className="absolute w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full" />
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="w-full py-24 flex items-center justify-center">
      {spinnerContent}
    </div>
  );
}