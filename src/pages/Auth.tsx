import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export function AuthFlow({ onLogin }: { onLogin: (name: string) => void }) {
  const [step, setStep] = useState<'welcome' | 'login' | 'signup'>('welcome');
  const [name, setName] = useState('');
  const [loginName, setLoginName] = useState(''); // Mock field just to pass a name from login too

  const handleSignup = () => {
    onLogin(name.trim() || 'User');
  };

  const handleLogin = () => {
    onLogin(loginName.trim() || 'User');
  };

  return (
    <div className="flex flex-col h-full w-full justify-center px-6 relative z-10">
      {step === 'welcome' && (
        <div className="flex flex-col items-center text-center">
          <h1 className="font-cursive text-7xl md:text-8xl mb-2 text-[#947e62] tracking-wider leading-relaxed py-4">Μετανοlι</h1>
          <p className="text-lg opacity-70 mb-12">Take control of your day</p>
          <button onClick={() => setStep('signup')} className="w-full bg-[#947e62] text-white py-4 rounded-2xl font-medium text-lg mb-4 hover:bg-[#7a6750] transition-colors shadow-lg">
            Get Started
          </button>
          <button onClick={() => setStep('login')} className="w-full bg-white/20 dark:bg-black/20 py-4 rounded-2xl font-medium text-lg border border-[#947e62]/20 hover:bg-white/30 transition-colors backdrop-blur-md">
            Already have an account? Login
          </button>
        </div>
      )}

      {step === 'login' && (
        <div className="flex flex-col w-full glass-panel dark:bg-black/30 p-8 rounded-3xl backdrop-blur-xl">
          <button onClick={() => setStep('welcome')} className="self-start p-2 -ml-2 mb-6 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6" /></button>
          <h1 className="font-cursive text-6xl font-bold mb-8 text-[#947e62] text-center tracking-wide">Μετανοlι</h1>
          <div className="space-y-4 mb-2">
            <input type="text" placeholder="Your Name (Mock User)" value={loginName} onChange={e => setLoginName(e.target.value)} className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
            <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
            <input type="password" placeholder="Password" className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
          </div>
          <button className="self-end text-sm text-[#947e62] dark:text-[#DED2B6] font-medium mb-8 mt-2">Forgot Password?</button>
          <button onClick={handleLogin} className="w-full bg-[#947e62] text-white py-4 rounded-2xl font-medium text-lg mb-6 shadow-lg">Login</button>
          <div className="h-px w-full bg-[#947e62]/20 mb-6" />
          <div className="text-center text-sm opacity-70">Don't have an account? <button onClick={() => setStep('signup')} className="text-[#947e62] font-bold">Sign Up</button></div>
        </div>
      )}

      {step === 'signup' && (
        <div className="flex flex-col w-full glass-panel dark:bg-black/30 p-8 rounded-3xl backdrop-blur-xl">
          <button onClick={() => setStep('welcome')} className="self-start p-2 -ml-2 mb-6 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6" /></button>
          <h1 className="font-cursive text-6xl font-bold mb-8 text-[#947e62] text-center tracking-wide">Μετανοlι</h1>
          <div className="space-y-4 mb-8">
            <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
            <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
            <input type="password" placeholder="Password" className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
            <input type="password" placeholder="Confirm Password" className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-[#947e62]/20 focus:outline-none focus:border-[#947e62] dark:text-white" />
          </div>
          <button onClick={handleSignup} className="w-full bg-[#947e62] text-white py-4 rounded-2xl font-medium text-lg mb-6 shadow-lg">Create Account</button>
          <div className="text-center text-sm opacity-70">Already have an account? <button onClick={() => setStep('login')} className="text-[#947e62] font-bold">Login</button></div>
        </div>
      )}
    </div>
  );
}
