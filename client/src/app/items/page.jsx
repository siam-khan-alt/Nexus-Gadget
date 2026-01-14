'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Laptop', 'Smartphone', 'Audio', 'Wearables', 'Accessories'];

  useEffect(() => {
    fetchItems();
  }, [currentPage, selectedCategory]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/items?page=${currentPage}&limit=8&category=${selectedCategory}`
      );
      const data = await response.json();
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const filteredItems = Array.isArray(items) 
    ? items.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="nav-container pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Browse <span className="gradient-text">All Items</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded-xl font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search in this category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent)] focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="min-h-[400px] flex flex-col items-center justify-center">
          {loading ? (
            <LoadingSpinner />
          ) : filteredItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {filteredItems.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>

              <div className="mt-16 flex justify-center items-center gap-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] disabled:opacity-30 hover:border-[var(--accent)] transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <span className="font-bold text-lg">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] disabled:opacity-30 hover:border-[var(--accent)] transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-20 bg-[var(--bg-secondary)] rounded-2xl border border-dashed border-[var(--border-color)]">
              <p className="text-xl font-bold text-[var(--text-secondary)]">
                No items found in this section
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}