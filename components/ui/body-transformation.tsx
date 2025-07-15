"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function BodyTransformation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-80 h-96 mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="300"
          height="350"
          viewBox="0 0 300 350"
          className="drop-shadow-2xl"
        >
          {/* Body Before (Overweight) */}
          <motion.g
            animate={{
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Head */}
            <circle cx="150" cy="50" r="25" fill="#FFB366" />
            {/* Body */}
            <ellipse cx="150" cy="140" rx="45" ry="60" fill="#4F46E5" />
            {/* Arms */}
            <ellipse cx="110" cy="120" rx="15" ry="35" fill="#FFB366" />
            <ellipse cx="190" cy="120" rx="15" ry="35" fill="#FFB366" />
            {/* Legs */}
            <ellipse cx="135" cy="230" rx="18" ry="50" fill="#1F2937" />
            <ellipse cx="165" cy="230" rx="18" ry="50" fill="#1F2937" />
          </motion.g>

          {/* Body After (Athletic) */}
          <motion.g
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Head */}
            <circle cx="150" cy="50" r="25" fill="#FFB366" />
            {/* Body (Athletic) */}
            <ellipse cx="150" cy="140" rx="30" ry="55" fill="#10B981" />
            {/* Arms (Muscular) */}
            <ellipse cx="115" cy="120" rx="12" ry="30" fill="#FFB366" />
            <ellipse cx="185" cy="120" rx="12" ry="30" fill="#FFB366" />
            {/* Legs (Athletic) */}
            <ellipse cx="138" cy="230" rx="15" ry="48" fill="#1F2937" />
            <ellipse cx="162" cy="230" rx="15" ry="48" fill="#1F2937" />
            {/* Muscle definition */}
            <ellipse cx="150" cy="125" rx="8" ry="15" fill="#059669" opacity="0.6" />
            <ellipse cx="140" cy="145" rx="6" ry="10" fill="#059669" opacity="0.4" />
            <ellipse cx="160" cy="145" rx="6" ry="10" fill="#059669" opacity="0.4" />
          </motion.g>

          {/* Transformation particles */}
          <motion.g
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={120 + (i * 20)}
                cy={100 + (i % 2) * 100}
                r="2"
                fill="#F59E0B"
                animate={{
                  scale: isHovered ? [0, 1, 0] : 0,
                  y: isHovered ? [0, -20, -40] : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: isHovered ? Infinity : 0,
                }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      {/* Hover instruction */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
      >
        Passe o mouse para ver a transformação
      </motion.div>
    </div>
  );
}