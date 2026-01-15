'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [dots, setDots] = useState([]);
  useEffect(() => {
    const generatedDots = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setDots(generatedDots);
  }, []);
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-10 pb-5 bg-[var(--bg-primary)] transition-colors duration-500">
      
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent)] blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500 blur-[120px] rounded-full animate-pulse" />
      </div>

   <div className="absolute inset-0 z-0">
       {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--accent)] rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="nav-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center  mx-auto"
        >

          <h1 className="text-3xl md:text-5xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-[var(--text-primary)]">
            <span className="gradient-text">Experience</span>
            <br />
            The Future of Tech
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover cutting-edge gadgets and premium technology products curated for innovators and early adopters. Your journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/items">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px var(--accent)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 flex items-center justify-center gap-2 relative overflow-hidden bg-gradient-to-r from-[var(--accent)] to-[#ec4899] text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[var(--accent)]/20 hover:scale-[1.02] disabled:opacity-50 group"
              >
                Explore Catalog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}