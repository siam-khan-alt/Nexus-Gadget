'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'Tech Reviewer',
    rating: 5,
    review: 'Absolutely blown away by the quality and performance. This is next-level technology that actually delivers on its promises.',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    rating: 5,
    review: 'The build quality is exceptional and the performance metrics exceed expectations. Best purchase this year.',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Content Creator',
    rating: 5,
    review: 'Perfect for my workflow. The speed and efficiency have transformed how I create content daily.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'David Smith',
    role: 'Early Adopter',
    rating: 5,
    review: 'The most intuitive tech I have ever used. The attention to detail in the design and software is unmatched.',
    avatar: 'https://i.pravatar.cc/150?img=8'
  },
];

export default function UserReviews() {
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
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg font-medium max-w-2xl mx-auto">
            Real experiences from real tech enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl glass-card border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent)]/10 relative flex flex-col justify-between">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--accent)] opacity-10 group-hover:opacity-20 transition-opacity" />
                
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-[var(--text-secondary)] mb-8 leading-relaxed font-medium italic">
                    "{review.review}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--accent)]/30 group-hover:ring-[var(--accent)] transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[var(--bg-primary)] rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] leading-tight">{review.name}</h4>
                    <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}