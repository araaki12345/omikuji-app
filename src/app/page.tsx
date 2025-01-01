import React from 'react';
import Omikuji from '@/components/Omikuji';
import VRCBackground from '@/components/Background';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <VRCBackground />
      <div className="relative z-10">
        <Omikuji />
      </div>
    </div>
  );
}