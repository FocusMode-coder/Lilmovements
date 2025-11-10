"use client";
import { useState } from "react";
import clsx from "clsx";

export default function GlowCard({ children, className="" }: {children: React.ReactNode; className?: string}) {
  const [tilt, setTilt] = useState({x:0,y:0});
  return (
    <div
      onMouseMove={(e)=> {
        const r=(e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width - 0.5)*10;
        const y=((e.clientY-r.top)/r.height - 0.5)*-10;
        setTilt({x,y});
      }}
      onMouseLeave={()=>setTilt({x:0,y:0})}
      style={{ transform:`rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      className={clsx("relative rounded-2xl p-6 bg-white/80 backdrop-blur shadow-xl transition-transform duration-200", className)}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
           style={{ boxShadow: "0 0 80px 10px rgba(0,200,255,.25)" }} />
      {children}
    </div>
  );
}