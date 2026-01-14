'use client';

import { motion } from 'framer-motion';

const brands = [
  'TechNova', 'QuantumCore', 'NeuralTech', 'FusionLabs', 
  'VectorX', 'PrismTech', 'ApexDigital', 'NexusCore',
  'CyberForge', 'StellarTech', 'VortexLab', 'ZenithPro'
];

export default function BrandPartners() {
  const scrollingBrands = [...brands, ...brands];

  return (
    <section className="py-20 bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
      <div className="nav-container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)] tracking-tight">
            Trusted <span className="gradient-text">Brand Partners</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg font-medium max-w-2xl mx-auto">
            Collaborating with the world's leading technology brands to bring you the best.
          </p>
        </motion.div>
      </div>

      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10" />

        <motion.div
          className="flex gap-8 whitespace-nowrap py-4"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {scrollingBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 px-10 py-6 rounded-2xl glass-card border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer min-w-[200px] group"
            >
              <h3 className="text-xl font-black text-center tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                {brand}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}