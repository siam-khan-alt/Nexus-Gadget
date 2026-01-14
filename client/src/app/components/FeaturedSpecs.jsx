'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, Battery, Wifi } from 'lucide-react';

const specs = [
  {
    icon: Cpu,
    title: 'Flagship Processors',
    value: '5nm Architecture',
    description: 'Latest generation chipsets for ultimate performance'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    value: '240Hz Display',
    description: 'Buttery smooth visuals for gaming and productivity'
  },
  {
    icon: Battery,
    title: 'All-Day Battery',
    value: '72 Hours',
    description: 'Extended battery life with rapid charging support'
  },
  {
    icon: Wifi,
    title: 'Next-Gen Connectivity',
    value: 'WiFi 7 & 5G',
    description: 'Blazing fast wireless performance everywhere'
  },
];

export default function FeaturedSpecs() {
  return (
    <section className="py-5 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="nav-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)] tracking-tight">
            <span className="gradient-text">Cutting-Edge</span> Technology
          </h2>
          <p className="text-[var(--text-secondary)] text-lg font-medium max-w-2xl mx-auto">
            Powered by the latest innovations in tech hardware
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl glass-card border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/10 text-center flex flex-col items-center">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "anticipate" }}
                    className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 text-white"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  
                  <h3 className="text-sm font-black uppercase tracking-widest mb-3 text-[var(--text-secondary)]">
                    {spec.title}
                  </h3>
                  
                  <p className="text-2xl font-black mb-4 text-[var(--text-primary)] leading-tight">
                    {spec.value}
                  </p>
                  
                  <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}