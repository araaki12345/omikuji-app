'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function VRCBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* メインの背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-800 via-red-900 to-red-950" />

      {/* きらめきエフェクト */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`
        }}
      />
    </div>
  );
}