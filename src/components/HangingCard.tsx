"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Move } from 'lucide-react';

interface HangingCardProps {
  children: React.ReactNode;
  cordLength?: number;
  cordColor?: string;
  initialRotation?: number;
  swingDuration?: number;
  delay?: number;
  className?: string;
  badgeLabel?: string;
  badgeColor?: string;
  enableDrag?: boolean;
}

export const HangingCard: React.FC<HangingCardProps> = ({
  children,
  cordLength = 40,
  initialRotation = 1.8,
  swingDuration = 5,
  delay = 0,
  className = '',
  badgeLabel,
  badgeColor = 'bg-purple-600',
  enableDrag = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragged, setIsDragged] = useState(false);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Top ceiling clip — same knob on every hanging card */}
      <div className="relative z-30 flex flex-col items-center">
        <div className="w-5 h-3 rounded-sm bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-md border border-slate-300 flex items-center justify-center">
          <div className="w-2 h-1 bg-slate-600/80 rounded-full" />
        </div>
      </div>

      {/* Hanging Cord / Metallic Wire with dynamic gradient */}
      <div
        className="w-[1.5px] bg-gradient-to-b from-slate-400 via-purple-300 to-purple-400/80 shadow-sm relative z-20"
        style={{ height: `${cordLength}px` }}
      >
        {/* Subtle shimmering highlight on the wire */}
        <div className="absolute inset-0 bg-white/40 w-full animate-pulse" />
      </div>

      {/* Card Attachment Ring */}
      <div className="w-3 h-3 rounded-full border-2 border-purple-400/80 bg-white shadow-xs -mt-1 relative z-20 flex items-center justify-center">
        <div className="w-1 h-1 bg-purple-600 rounded-full" />
      </div>

      {/* Hanging Physics Container with Motion */}
      <motion.div
        drag={enableDrag}
        dragConstraints={{ left: -30, right: 30, top: -20, bottom: 30 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        animate={{
          rotate: isDragged ? 0 : isHovered ? [0, -0.8, 0.8, 0] : [-initialRotation, initialRotation, -initialRotation],
          y: isDragged ? 0 : [0, -4, 0],
        }}
        transition={{
          rotate: {
            duration: isHovered ? 2 : swingDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay,
          },
          y: {
            duration: swingDuration * 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 0.3,
          },
        }}
        whileHover={{
          scale: 1.025,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative z-20 mt-1 cursor-grab active:cursor-grabbing origin-top"
      >
        {/* Optional Tag Ribbon / Header Chip */}
        {badgeLabel && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
            <span
              className={`px-2.5 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 ${badgeColor}`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              {badgeLabel}
            </span>
          </div>
        )}

        {/* Drag Hint on hover */}
        {enableDrag && (
          <div className="absolute -bottom-2 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="p-1 rounded-full bg-slate-900/80 text-white text-[8px] flex items-center gap-0.5 backdrop-blur-xs">
              <Move className="w-2 h-2" />
              <span>Drag me</span>
            </span>
          </div>
        )}

        {/* Card Body */}
        {children}
      </motion.div>
    </div>
  );
};
