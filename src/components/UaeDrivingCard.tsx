"use client";

import React, { useState } from 'react';
import { Car, CheckCircle2, MapPin } from 'lucide-react';
import { usePortfolio } from '@/content/PortfolioProvider';

export const UaeDrivingCard: React.FC = () => {
  const drivingCard = usePortfolio().drivingCard;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-3xl p-6 border border-emerald-200/90 shadow-lg shadow-emerald-500/5 flex flex-col gap-4 relative overflow-hidden group transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Info */}
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25">
          <Car className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900">{drivingCard.title}</h4>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {drivingCard.badge}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {drivingCard.description}
          </p>
        </div>
      </div>

      {/* Realistic Night Highway Simulation Canvas */}
      <div className="relative w-full h-24 bg-gradient-to-b from-[#080d1a] via-[#0c1426] to-[#070b14] rounded-2xl overflow-hidden border border-slate-800 shadow-inner select-none">
        
        {/* Distant Dubai Skyline Silhouette with Burj Khalifa */}
        <div className="absolute inset-x-0 bottom-7 h-12 pointer-events-none opacity-40">
          <svg className="w-full h-full" viewBox="0 0 500 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 L15,50 L15,35 L28,35 L28,50 L45,50 L45,28 L58,28 L58,50 L75,50 L75,38 L88,38 L88,50 L110,50 L110,22 L115,18 L120,22 L120,50 L140,50 L140,30 L155,30 L155,50 
                 L190,50 L190,16 L196,16 L196,8 L198,3 L200,1 L202,3 L204,8 L204,16 L210,16 L210,50 
                 L240,50 L240,25 L255,25 L255,50 L280,50 L280,32 L295,32 L295,50 L320,50 L320,20 L335,20 L335,50 
                 L365,50 L365,34 L378,34 L378,50 L410,50 L410,26 L425,26 L425,50 L455,50 L455,36 L470,36 L470,50 L500,50 Z"
              fill="url(#skylineGrad)"
            />
          </svg>
        </div>

        {/* Burj Khalifa Spire Beacon Blink */}
        <div className="absolute bottom-[44px] left-[39.8%] -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full animate-ping pointer-events-none" />

        {/* Night Sky Stars */}
        <div className="absolute top-2 left-8 w-1 h-1 bg-white/70 rounded-full" />
        <div className="absolute top-4 left-32 w-0.5 h-0.5 bg-emerald-200/60 rounded-full" />
        <div className="absolute top-2 right-16 w-1 h-1 bg-amber-200/60 rounded-full" />
        <div className="absolute top-5 right-40 w-0.5 h-0.5 bg-white/50 rounded-full" />

        {/* Realistic Highway Road Bed */}
        <div className="absolute bottom-0 inset-x-0 h-8 bg-[#111622] border-t border-slate-700/70">
          
          {/* Moving Road Surface Texture & White Dashed Highway Markings (Calm, realistic speed) */}
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[3px] overflow-hidden flex items-center">
            <div className="flex gap-6 w-[200%] animate-road-move shrink-0">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-12 h-[2.5px] bg-slate-300/75 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.35)] shrink-0" />
              ))}
            </div>
          </div>

          {/* Yellow Road Edge Line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-amber-400/80 shadow-[0_0_3px_rgba(251,191,36,0.6)]" />

          {/* Road Reflectors (Cats-Eyes) on the curb */}
          <div className="absolute bottom-1 inset-x-0 flex justify-between px-6 pointer-events-none opacity-50">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="w-1 h-1 bg-amber-300 rounded-full shadow-[0_0_4px_#fde047]" />
            ))}
          </div>
        </div>

        {/* Realistic Modern Luxury SUV with Coordinate-Locked Headlight Beam */}
        <div className="animate-suv-drive bottom-2 z-20 pointer-events-none">
          <div className="relative flex items-end">
            
            {/* Master Luxury SUV Vector Graphics (SUV + Optical Headlight Projection) */}
            <svg
              width="250"
              height="38"
              viewBox="0 0 250 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]"
            >
              {/* Gradients & Shaders */}
              <defs>
                {/* Premium Emerald Metallic Finish */}
                <linearGradient id="suvBodyGrad" x1="0" y1="0" x2="106" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="25%" stopColor="#064e3b" />
                  <stop offset="55%" stopColor="#059669" />
                  <stop offset="78%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                {/* Privacy Tinted Glass */}
                <linearGradient id="suvGlass" x1="26" y1="6" x2="76" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#020617" />
                  <stop offset="45%" stopColor="#0284c7" stopOpacity="0.65" />
                  <stop offset="85%" stopColor="#0369a1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                {/* Machined Diamond Alloy Rim Gradient */}
                <linearGradient id="suvRimGrad" x1="0" y1="0" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Metallic Chrome Trim */}
                <linearGradient id="chromeTrim" x1="0" y1="0" x2="106" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>

                {/* Mathematically Locked Headlight Projection Gradient */}
                <linearGradient id="headlightBeamGrad" x1="104" y1="19" x2="250" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="25%" stopColor="#67e8f9" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                </linearGradient>

                {/* Ground Reflection Gradient under Headlights */}
                <linearGradient id="groundGlowGrad" x1="104" y1="35" x2="230" y2="35" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>

                {/* Red Taillight Ambient Glow Gradient */}
                <radialGradient id="taillightGlowGrad" cx="4" cy="21" r="10" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#e11d48" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9f1239" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Red LED Taillight Ambient Glow Halo */}
              <ellipse cx="2" cy="21" rx="8" ry="4" fill="url(#taillightGlowGrad)" />

              {/* Tarmac Ground Contact Shadow */}
              <ellipse cx="53" cy="34" rx="48" ry="2.2" fill="#000000" fillOpacity="0.9" />

              {/* PRECISE HEADLIGHT PROJECTION BEAM (Originating exactly at front headlight lens x:104, y:19.5) */}
              <polygon
                points="104,18.5 248,6 248,37 104,21.5"
                fill="url(#headlightBeamGrad)"
                opacity={isHovered ? "0.95" : "0.75"}
              />

              {/* Road Ground Reflection Illuminating Ahead */}
              <ellipse cx="170" cy="35" rx="60" ry="2" fill="url(#groundGlowGrad)" />

              {/* Roof Rails (SUV signature) */}
              <path d="M30 4.5 L72 4.5" stroke="url(#chromeTrim)" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="33" y="4.5" width="2" height="2" fill="#64748b" />
              <rect x="67" y="4.5" width="2" height="2" fill="#64748b" />

              {/* Rear Aerodynamic Spoiler */}
              <path d="M12 6.5 L24 5.5 L24 7.5 L14 8 Z" fill="#064e3b" stroke="#022c22" strokeWidth="0.5" />

              {/* Main SUV Body Profile (Robust Shoulder Lines & Wheel Arches) */}
              <path
                d="M5 28 
                   C3 28 1 26 1 23 
                   C1 20 3 19 6 18 
                   L14 17 
                   L20 8 
                   C22 6 26 5.5 32 5.5 
                   L75 5.5 
                   C81 5.5 86 8 90 13 
                   L98 17 
                   C103 18.5 105 20.5 105 23 
                   C105 26 102 28 99 28 
                   L90 28 
                   C89 23.5 84.5 20 79 20 
                   C73.5 20 69 23.5 68 28 
                   L37 28 
                   C36 23.5 31.5 20 26 20 
                   C20.5 20 16 23.5 15 28 
                   Z"
                fill="url(#suvBodyGrad)"
                stroke="#022c22"
                strokeWidth="0.8"
              />

              {/* Muscular Wheel Arch Moldings */}
              <path d="M14 28 C15 22.5 20 19 26 19 C32 19 37 22.5 38 28" fill="none" stroke="#0f172a" strokeWidth="2" />
              <path d="M67 28 C68 22.5 73 19 79 19 C85 19 90 22.5 91 28" fill="none" stroke="#0f172a" strokeWidth="2" />

              {/* SUV Windows with Tinted Glass & Chrome Trim */}
              {/* Rear Quarter Window */}
              <path d="M21 9 L32 7.5 L32 16 L17 16 Z" fill="url(#suvGlass)" stroke="#0f172a" strokeWidth="0.5" />
              {/* Rear Passenger Window */}
              <path d="M34 7.5 L53 7.5 L53 16 L34 16 Z" fill="url(#suvGlass)" stroke="#0f172a" strokeWidth="0.5" />
              {/* Front Driver Window */}
              <path d="M55 7.5 L73 7.5 L84 16 L55 16 Z" fill="url(#suvGlass)" stroke="#0f172a" strokeWidth="0.5" />

              {/* Window Chrome Lower Sills */}
              <path d="M16 16.5 L85 16.5" stroke="url(#chromeTrim)" strokeWidth="0.8" />

              {/* Door Handles */}
              <rect x="42" y="18" width="6" height="1.2" rx="0.6" fill="#f8fafc" stroke="#334155" strokeWidth="0.4" />
              <rect x="63" y="18" width="6" height="1.2" rx="0.6" fill="#f8fafc" stroke="#334155" strokeWidth="0.4" />

              {/* Side Character Crease & Lower Skid Plate Trim */}
              <path d="M12 20.5 Q50 19.5 92 18.5" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.7" />
              <rect x="38" y="28" width="28" height="1.5" rx="0.5" fill="url(#chromeTrim)" />

              {/* Rear Lightbar (Modern Connected LED) */}
              <path d="M1 21 C1 19.5 2.5 19 4.5 19 L7 19 L7 23 L3.5 23 C1.8 23 1 22.2 1 21 Z" fill="#ef4444" />
              <rect x="2" y="20" width="4.5" height="1.5" rx="0.5" fill="#fecdd3" />

              {/* Front Matrix LED Headlight & DRL (Bulb and Optical Lens) */}
              <path d="M96 17 L103 18.5 C104.5 19 105 20.5 104 21.5 L97 21.5 L95 17.5 Z" fill="#fef08a" />
              <circle cx="103" cy="19.8" r="1.5" fill="#ffffff" />
              <circle cx="100.5" cy="19.2" r="1.2" fill="#67e8f9" />

              {/* REAR WHEEL ASSEMBLY with Spinning Rims */}
              <g transform="translate(26, 28)">
                <circle cx="0" cy="0" r="7.5" fill="#090d16" stroke="#1e293b" strokeWidth="1.2" />
                <path d="M-4.5 -3.5 A 5 5 0 0 1 -1 -5.5 L-1 -3 L-3.5 -2 Z" fill="#ef4444" />
                <circle cx="0" cy="0" r="5" fill="#64748b" />
                <g className="animate-wheel-spin">
                  <circle cx="0" cy="0" r="4.2" fill="#0f172a" stroke="url(#suvRimGrad)" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.5" fill="#f8fafc" />
                  <line x1="-4" y1="0" x2="4" y2="0" stroke="#ffffff" strokeWidth="0.9" />
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="#ffffff" strokeWidth="0.9" />
                  <line x1="-2.8" y1="-2.8" x2="2.8" y2="2.8" stroke="#ffffff" strokeWidth="0.9" />
                  <line x1="2.8" y1="-2.8" x2="-2.8" y2="2.8" stroke="#ffffff" strokeWidth="0.9" />
                </g>
              </g>

              {/* FRONT WHEEL ASSEMBLY with Spinning Rims */}
              <g transform="translate(79, 28)">
                <circle cx="0" cy="0" r="7.5" fill="#090d16" stroke="#1e293b" strokeWidth="1.2" />
                <path d="M-4.5 -3.5 A 5 5 0 0 1 -1 -5.5 L-1 -3 L-3.5 -2 Z" fill="#ef4444" />
                <circle cx="0" cy="0" r="5" fill="#64748b" />
                <g className="animate-wheel-spin">
                  <circle cx="0" cy="0" r="4.2" fill="#0f172a" stroke="url(#suvRimGrad)" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.5" fill="#f8fafc" />
                  <line x1="-4" y1="0" x2="4" y2="0" stroke="#ffffff" strokeWidth="0.9" />
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="#ffffff" strokeWidth="0.9" />
                  <line x1="-2.8" y1="-2.8" x2="2.8" y2="2.8" stroke="#ffffff" strokeWidth="0.9" />
                  <line x1="2.8" y1="-2.8" x2="-2.8" y2="2.8" stroke="#ffffff" strokeWidth="0.9" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Live Sheikh Zayed Highway Info Overlay Badge */}
        <div className="absolute top-2 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-[10px] font-bold text-slate-200 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wide">{drivingCard.highway}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-extrabold">{drivingCard.transit}</span>
        </div>

        {/* City Distance Pill Badges */}
        <div className="absolute top-2 right-3 hidden sm:flex items-center gap-1.5 text-[9px] font-bold text-slate-400 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
          <span className="text-white">DXB</span>
          <span>→</span>
          <span className="text-white">AUH</span>
          <span>→</span>
          <span className="text-white">SHJ</span>
        </div>
      </div>

      {/* Footer Credentials */}
      <div className="flex items-center justify-between text-xs font-semibold px-0.5 pt-1">
        <span className="text-emerald-700 font-black flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {drivingCard.footerLeft}
        </span>
        <span className="text-slate-500 font-bold flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {drivingCard.footerRight}
        </span>
      </div>
    </div>
  );
};
