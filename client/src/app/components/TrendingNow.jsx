'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TrendingNow() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items?limit=4`);
        const data = await response.json();
        setItems(data.items || []);
      } catch (error) {
        console.error('Failed to fetch trending items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const gradients = [
    'from-indigo-500 to-purple-500',
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500'
  ];

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
            <span className="gradient-text">Hot Picks</span> This Week
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-medium">
            Curated selection of the most popular gadgets among tech enthusiasts
          </p>
        </motion.div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/items/${item._id}`}>
                  <div className="group relative overflow-hidden rounded-2xl glass-card border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/20 bg-[var(--bg-secondary)] h-full">
                    
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${gradients[index % gradients.length]} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      
                      <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full flex items-center gap-1 border-white/20">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-white">{item.rating || '4.8'}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-2 block">
                        {item.category}
                      </span>
                      
                      <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-black text-[var(--text-primary)]">
                          ${item.price}
                        </p>
                        <motion.div 
                          whileHover={{ x: 5 }}
                          className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all"
                        >
                          <TrendingUp size={18} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}