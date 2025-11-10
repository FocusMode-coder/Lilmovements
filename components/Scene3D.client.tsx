"use client";
import { useState, useEffect } from "react";

export default function Scene3DClient() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-[380px] w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-300 rounded-xl mx-auto mb-4 animate-pulse"></div>
          <p className="text-orange-800 font-semibold">Loading 3D Scene...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[380px] w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-orange-100 to-orange-200 relative flex items-center justify-center">
      {/* Animated floating card */}
      <div 
        className="bg-orange-300/80 rounded-2xl p-6 shadow-lg transform perspective-1000 animate-bounce"
        style={{
          animation: 'float 3s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="px-4 py-2 rounded-xl bg-white/90 text-sm font-semibold shadow text-orange-800">
          Lil Movements – Immersive Experience
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(5deg); }
        }
      `}</style>
    </div>
  );
}