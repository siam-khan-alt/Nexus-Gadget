'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all  duration-300 ${
        isScrolled ? 'glass-card py-4' : 'bg-transparent py-5 '
      }`}
    >
      <div className="nav-container flex justify-between items-center">
        <Link href="/" className="gradient-text font-bold text-xl">
         NEXUS GADGET
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/items" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Browse</Link>
          {session ? (
            <>
              <Link href="/add-item" className="text-sm font-medium hover:text-[var(--accent)] transition-colors">Add Item</Link>
              <button onClick={() => signOut()} className="flex items-center gap-2 text-sm font-medium text-red-500">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--accent)] to-[#ec4899] text-white font-black py-2 rounded-2xl transition-all shadow-xl shadow-[var(--accent)]/20 hover:scale-[1.02] disabled:opacity-50 px-5">Login</Link>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-[var(--text-primary)]">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[var(--text-primary)]">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-card p-6 flex flex-col gap-4 md:hidden"
          >
            <Link href="/items" onClick={() => setIsMobileMenuOpen(false)}>Browse Items</Link>
            {session && <Link href="/add-item" onClick={() => setIsMobileMenuOpen(false)}>Add Item</Link>}
            {!session && <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}