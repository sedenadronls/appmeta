import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Background3D } from './components/Background3D';
import { AuthFlow } from './pages/Auth';
import { MainApp } from './pages/MainApp';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('User');

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${isDarkMode ? 'bg-[#1a1814] text-white dark' : 'bg-[#f7f5f0] text-[#2d2a26]'}`}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Background3D darkMode={isDarkMode} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex justify-center pb-0 md:p-8 shrink-0">
        <div className={`w-full max-w-[480px] h-full flex flex-col relative overflow-hidden shadow-2xl ${isDarkMode ? 'bg-black/50 md:border-[#947e62]/20' : 'bg-white/30 md:border-white/50'} md:backdrop-blur-xl md:border md:rounded-[40px]`}>
           {!isAuthenticated ? (
             <AuthFlow onLogin={handleLogin} />
           ) : (
             <MainApp userName={userName} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onLogout={() => setIsAuthenticated(false)} />
           )}
        </div>
      </div>
    </div>
  );
}
