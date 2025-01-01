'use client';

import React from 'react';
import { Twitter, Facebook, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  result: string;
  message: string;
}

export default function ShareButtons({ result, message }: ShareButtonsProps) {
  const url = "https://vrc-omikuji.vercel.app";
  const shareText = `お正月のVRCおみくじ結果: ${result}！\n${message}\n#おみくじ #正月`;
  
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    Twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    line: `https://line.me/R/msg/text/?${encodedText}%0D%0A${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=550,height=450');
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={() => handleShare('Twitter')}
        className="p-3 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={24} className="text-white" />
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={24} className="text-white" />
      </button>
      <button
        onClick={() => handleShare('line')}
        className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
        aria-label="Share on LINE"
      >
        <MessageCircle size={24} className="text-white" />
      </button>
    </div>
  );
}