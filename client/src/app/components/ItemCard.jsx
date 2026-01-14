'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ItemCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-2xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/10 flex flex-col h-full bg-[var(--bg-secondary)]"
    >
      <div className="aspect-square relative overflow-hidden bg-[var(--bg-secondary)]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary)] opacity-20">
            <ShoppingCart className="w-20 h-20" />
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <div className="bg-[var(--bg-primary)]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--border-color)] flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-[var(--text-primary)]">{item.rating || '4.5'}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.2em]">
            {item.category || 'Technology'}
          </span>
        </div>

        <h3 className="text-xl font-black mb-2 text-[var(--text-primary)] line-clamp-1 tracking-tight">
          {item.name}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2 font-medium leading-relaxed">
          {item.description || 'Premium tech product featuring latest innovations.'}
        </p>

        <div className="mt-auto pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Price</span>
            <p className="text-xl font-black text-[var(--text-primary)] tracking-tighter">
              ${item.price || '999'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/items/${item._id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-sm font-bold"
              >
                <Eye className="w-4 h-4" />
                Details
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}