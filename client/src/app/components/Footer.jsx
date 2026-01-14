'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/siam-khan-alt" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/siam-khan-sp99/" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100078237812772" }
  ];

  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-[var(--bg-primary)] pt-16 pb-8 transition-colors duration-300">
      <div className="nav-container">
        <div className="flex flex-wrap justify-between gap-12 mb-12">
          
          <div className="w-full md:w-1/3 space-y-5">
            <Link href="/" className="inline-block">
              <h3 className="text-3xl  tracking-tighter gradient-text">
                NEXUS GADGET
              </h3>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Making your tech lifestyle better with premium gadgets since 2010. 
              Your satisfaction and quality experience are our top priorities. 
              Find your perfect gear today.
            </p>
            
            <div className="space-y-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent)]">
                  <Mail size={16} />
                </div>
                <a href="mailto:nssiam99@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">nssiam99@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent)]">
                  <Phone size={16} />
                </div>
                <span>+880 1881361160</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent)]">
                  <MapPin size={16} />
                </div>
                <span>Gofforgaoun, Mymensingh</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <h4 className="text-lg font-bold mb-6 text-[var(--text-primary)]">Explore</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)] font-medium">
              <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
              <li><Link href="/items" className="hover:text-[var(--accent)] transition-colors">All Products</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Support Center</Link></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 space-y-6">
            <h4 className="text-lg font-bold text-[var(--text-primary)]">Follow Siam</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Stay connected for the latest tech updates and project developments.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-secondary)] font-semibold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} <span className="text-[var(--accent)]">NEXUS GADGET</span>
          </p>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span>Crafted by</span>
            <a 
              href="https://github.com/siam-khan-alt" 
              className="font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors border-b border-transparent hover:border-[var(--accent)]"
            >
              Siam Khan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}