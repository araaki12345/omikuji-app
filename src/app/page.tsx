import React from 'react';
import Omikuji from '@/components/Omikuji';
import VRCBackground from '@/components/Background';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <VRCBackground />
      <div className="relative z-10">
        <Omikuji />
        <Footer />
      </div>
    </div>
  );
}