import { Zen_Antique } from 'next/font/google';
import './globals.css';

const zenAntique = Zen_Antique({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'お正月VRCおみくじ',
  description: 'VRChatterに向けたお正月おみくじジェネレーター',
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={zenAntique.className}>
      <body>
        {children}
      </body>
    </html>
  );
}