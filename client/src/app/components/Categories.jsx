'use client';

import { motion } from 'framer-motion';
import { Laptop, Smartphone, Headphones, Watch, ArrowUpRight, Cpu } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Laptop',
    icon: Laptop,
    count: '150+ Products',
    gradient: 'from-indigo-500 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
  },
  {
    name: 'Smartphone',
    icon: Smartphone,
    count: '200+ Products',
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
  },
  {
    name: 'Wearables',
    icon: Watch,
    count: '120+ Products',
    gradient: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'
  },
  {
    name: 'Audio',
    icon: Headphones,
    count: '300+ Products',
    gradient: 'from-emerald-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'
  },
  {
    name: 'Accessories',
    icon: Cpu,
    count: '450+ Products',
    gradient: 'from-blue-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800'
  }
];

export default function Categories() {
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
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg font-medium max-w-2xl mx-auto">
            Explore our comprehensive range of premium tech products curated for your digital life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/items?category=${category.name}`}>
                  <div className="group relative overflow-hidden rounded-2xl glass-card border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-500 h-full bg-[var(--bg-secondary)]">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-40 group-hover:opacity-20 transition-opacity`} />
                      <div className="absolute top-3 right-3">
                        <div className="w-7 h-7 rounded-full glass-card flex items-center justify-center text-white border-white/20 group-hover:bg-[var(--accent)] group-hover:rotate-45 transition-all">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] font-bold text-[9px] uppercase tracking-widest">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}