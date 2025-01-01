import React from 'react';
import { Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full p-4 flex justify-center items-center gap-6">
      <div className="text-white/70 text-sm">製作者の連絡先:</div>
      <div className="flex items-center gap-4">
        <a
          href="https://x.com/araaki_vrc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          aria-label="X (Twitter)"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/araaki12345"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}