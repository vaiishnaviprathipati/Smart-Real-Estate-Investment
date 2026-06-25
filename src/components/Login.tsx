import React, { useState } from 'react';
import { Building2, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: (user: { email: string; role: 'buyer' | 'investor' }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'investor'>('buyer');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ email, role });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-4">
            <Building2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Smart Real Estate</h1>
          <p className="text-slate-500 mt-2">Select your profile to continue</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button 
              onClick={() => setRole('buyer')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'buyer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              House Buyer
            </button>
            <button 
              onClick={() => setRole('investor')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'investor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Property Investor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-slate-500 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 font-bold hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account? <a href="#" className="text-indigo-600 font-bold hover:underline">Create Account</a>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-[10px] mt-8 uppercase tracking-widest font-bold">
          Secure Enterprise Access • AES-256 Encrypted
        </p>
      </motion.div>
    </div>
  );
}
