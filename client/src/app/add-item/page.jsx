'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import { Plus, Sparkles, Package, DollarSign, Image as ImageIcon, Cpu, Box } from 'lucide-react';

const itemSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Main image URL is required'),
  rating: z.string().default('4.5'),
  stock: z.string().min(1, 'Stock is required'),
  brand: z.string().min(2, 'Brand is required'),
  galleryImages: z.string().optional(),
  inTheBox: z.string().optional(),
  processor: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  display: z.string().optional(),
  battery: z.string().optional(),
  camera: z.string().optional(),
  otherSpecs: z.string().optional(),
});

export default function AddItemPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      rating: '4.5',
      category: 'Laptop',
      galleryImages: '',
      inTheBox: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const galleryArray = data.galleryImages 
        ? data.galleryImages.split(',').map(img => img.trim()).filter(img => img !== "")
        : [];

      const specifications = {};
      if (data.processor) specifications.processor = data.processor;
      if (data.ram) specifications.ram = data.ram;
      if (data.storage) specifications.storage = data.storage;
      if (data.display) specifications.display = data.display;
      if (data.battery) specifications.battery = data.battery;
      if (data.camera) specifications.camera = data.camera;
      
      if (data.otherSpecs) {
        data.otherSpecs.split(',').forEach(pair => {
          const parts = pair.split(':');
          if (parts.length === 2) {
            const key = parts[0].trim().toLowerCase().replace(/\s+/g, '_');
            const value = parts[1].trim();
            specifications[key] = value;
          }
        });
      }

      const formattedData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        rating: parseFloat(data.rating),
        image: data.image,
        brand: data.brand,
        stock: parseInt(data.stock),
        images: [data.image, ...galleryArray],
        specifications,
        inTheBox: data.inTheBox ? data.inTheBox.split(',').map(item => item.trim()) : [],
      };

      const response = await fetch(`${apiUrl}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setShowConfetti(true);
        toast.success('Product launched successfully!');
        setTimeout(() => {
          setShowConfetti(false);
          router.push('/items');
        }, 3000);
        reset();
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Failed to add item');
      }
    } catch (error) {
      toast.error('Connection error: Server is not responding');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} gravity={0.2} />}
      
      <div className="nav-container pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          
          <div className="text-center mb-10">
         
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Launch New <span className="gradient-text">Gadget</span></h1>
          </div>

          <div className="mb-10 flex justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all duration-500 ${s === step ? 'w-20 bg-[var(--accent)]' : 'w-6 bg-[var(--border-color)]'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 md:p-12 rounded-2xl shadow-2xl border border-[var(--border-color)]">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-widest text-xs">
                  <Package className="w-4 h-4" /> <span>Basic Details</span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Product Title</label>
                    <input {...register('name')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none focus:ring-2 ring-[var(--accent)]/20" placeholder="e.g. Nexus Pro 15" />
                    {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Brand</label>
                    <input {...register('brand')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="e.g. Quantum" />
                    {errors.brand && <p className="text-red-500 text-xs mt-2">{errors.brand.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea {...register('description')} rows={3} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Describe the amazing features..." />
                  {errors.description && <p className="text-red-500 text-xs mt-2">{errors.description.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select {...register('category')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none">
                      <option value="Laptop">Laptop</option>
                      <option value="Smartphone">Smartphone</option>
                      <option value="Audio">Audio</option>
                      <option value="Wearables">Wearables</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Initial Rating</label>
                    <input step="0.1" type="number" {...register('rating')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--accent)] to-[#ec4899] text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[var(--accent)]/20 hover:scale-[1.02] disabled:opacity-50">Next: Specifications</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-widest text-xs">
                  <Cpu className="w-4 h-4" /> <span>Technical Specs</span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <input {...register('processor')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Processor (e.g. M3 Pro)" />
                  <input {...register('ram')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="RAM (e.g. 16GB)" />
                  <input {...register('storage')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Storage (e.g. 512GB SSD)" />
                  <input {...register('display')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Display (e.g. 14-inch OLED)" />
                  <input {...register('battery')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Battery Life" />
                  <input {...register('camera')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Camera Specs" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Custom Specs (Format: Key: Value, Key: Value)</label>
                  <textarea {...register('otherSpecs')} rows={2} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="weight: 1.2kg, color: Midnight Blue" />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] font-bold">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-[2] w-full relative group overflow-hidden bg-gradient-to-r from-[var(--accent)] to-[#ec4899] text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[var(--accent)]/20 hover:scale-[1.02] disabled:opacity-50">Next: Logistics</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <div className="flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-widest text-xs">
                  <DollarSign className="w-4 h-4" /> <span>Final Step</span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Price ($)</label>
                    <input type="number" {...register('price')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Stock Inventory</label>
                    <input type="number" {...register('stock')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Main Image URL</label>
                  <input {...register('image')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="https://..." />
                  {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Gallery Images (Comma separated URLs)</label>
                  <textarea {...register('galleryImages')} rows={2} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="url1, url2, url3" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 flex items-center gap-2"><Box className="w-4 h-4"/> In The Box (Comma separated)</label>
                  <input {...register('inTheBox')} className="w-full px-5 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none" placeholder="Laptop, Charger, User Manual" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] font-bold">Back</button>
                  <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[#ec4899] text-white font-black flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02]">
                    {isSubmitting ? 'Processing...' : <><Sparkles className="w-5 h-5" /> Launch Product</>}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </main>
  );
}