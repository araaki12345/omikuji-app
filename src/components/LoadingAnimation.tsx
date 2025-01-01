'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative w-40 h-40">
        {/* おみくじ箱 */}
        <motion.div
          className="relative"
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            viewBox="0 0 100 120"
            className="w-40 h-40"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            {/* メインの六角形の箱体 */}
            <path 
              d="M20 30 L50 20 L80 30 L80 90 L50 100 L20 90 Z" 
              className="stroke-white"
            />
            {/* 内側の縁取り線 */}
            <path 
              d="M35 26 L65 26 M35 94 L65 94" 
              className="stroke-white"
            />
            {/* 縦の装飾線 */}
            <path 
              d="M30 35 L30 85 M70 35 L70 85" 
              className="stroke-white"
            />
            {/* 上部の穴 */}
            <circle 
              cx="50" 
              cy="25" 
              r="4" 
              className="stroke-white"
            />
          </svg>
        </motion.div>

        {/* ローディングテキスト */}
        <motion.div
          className="text-center mt-8 text-white text-lg font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          おみくじを選んでいます...
        </motion.div>
      </div>
    </motion.div>
  );
}