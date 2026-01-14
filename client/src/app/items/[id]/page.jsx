'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, Check, Package, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ItemDetailPage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchItem();
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(params.id));
  }, [params.id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${params.id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      wishlist = wishlist.filter(id => id !== params.id);
      toast.info('Removed from wishlist');
    } else {
      wishlist.push(params.id);
      toast.success('Added to wishlist!');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    const shareData = {
      title: item.name,
      text: item.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="space-y-4">
              <div className="aspect-square bg-[var(--bg-secondary)] rounded-2xl" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-[var(--bg-secondary)] rounded-2xl" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-12 bg-[var(--bg-secondary)] rounded-xl w-3/4" />
              <div className="h-32 bg-[var(--bg-secondary)] rounded-3xl" />
              <div className="h-20 bg-[var(--bg-secondary)] rounded-xl w-1/2" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link href="/items" className="text-[var(--accent)] flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const productImages = item.images && item.images.length > 0 ? item.images : [item.image];
  const originalPrice = (parseFloat(item.price) * 1.15).toFixed(0);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="nav-container mx-auto px-6 pt-32 pb-10">
        <Link href="/items" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] mb-8 font-bold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={productImages[selectedImage]}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                    ? 'border-[var(--accent)] scale-95 shadow-lg' 
                    : 'border-[var(--border-color)] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black uppercase tracking-widest border border-[var(--accent)]/20">
                {item.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tight leading-tight">
                {item.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-600">{item.rating}</span>
                </div>
                <span className="text-[var(--text-secondary)] text-sm font-medium italic">Premium Quality Verified</span>
              </div>
            </div>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              {item.description}
            </p>

            <div className="flex flex-col-reverse md:flex-row items-center gap-6 mb-10">
              <div>
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-[var(--accent)]">
                    ${item.price}
                  </span>
                  <span className="text-xl text-[var(--text-secondary)] line-through opacity-50">
                    ${originalPrice}
                  </span>
                </div>
              </div>
              <div className="h-12 w-[1px] bg-[var(--border-color)] hidden md:flex" />
              <div className="px-12 md:px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-sm">
                Save 15% Off
              </div>
            </div>

            <div className="flex items-center gap-3 mb-10 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">In Stock & Ready to Ship</p>
                <p className="text-xs text-[var(--text-secondary)]">Free Express Global Delivery</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.success(`${item.name} added to cart!`)}
                className="flex-1 min-w-[200px] py-5 rounded-2xl bg-[var(--accent)] text-white font-black text-lg shadow-xl shadow-[var(--accent)]/20 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </motion.button>
              
              <div className="flex gap-3">
                <button 
                  onClick={toggleWishlist}
                  className={`p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-all ${isWishlisted ? 'text-red-500 border-red-500/50 bg-red-500/5' : 'hover:text-red-500'}`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:text-[var(--accent)] transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-10 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              Technical Specifications
            </h2>
            <div className="space-y-4">
              {Object.entries(item.specifications || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-4 border-b border-[var(--border-color)] last:border-0">
                  <span className="text-[var(--text-secondary)] font-bold uppercase text-xs tracking-widest">
                    {key.replace('_', ' ')}
                  </span>
                  <span className="font-bold text-right ml-4">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <h2 className="text-2xl font-black mb-8">
              In The Box
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(item.inTheBox || []).map((boxItem, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">{boxItem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}