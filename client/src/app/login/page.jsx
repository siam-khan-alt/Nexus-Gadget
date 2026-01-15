"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDemoLogin = () => {
    setEmail("admin99@nexus.com");
    setPassword("Sp999999");
    toast.info("Demo credentials applied!", {
      description: "You can now click Secure Login.",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      toast.success("Welcome back to Nexus Gadget!");
      router.push("/add-item");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight mb-2 uppercase">
              Login
            </h2>
            <p className="text-[var(--text-secondary)] font-medium">
              Elevate your tech experience
            </p>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full mb-8 py-3 px-4 flex items-center justify-center gap-2 bg-cyan-500/5 border border-dashed border-cyan-500/30 rounded-2xl text-cyan-400 text-sm font-bold hover:bg-cyan-500/10 transition-all group"
          >
            <ShieldCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Apply Demo Credentials
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest ml-1 text-[var(--text-secondary)]">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest ml-1 text-[var(--text-secondary)]">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--accent)] to-[#ec4899] text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-[var(--accent)]/20 hover:scale-[1.02] disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Authenticating..." : "Secure Login"}
                {!loading && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <Link
              href="/"
              className="block text-xs text-slate-500 hover:text-white transition-colors"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
