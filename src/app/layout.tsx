import './globals.css';

export const metadata = {
  title: 'お正月VRCおみくじ',
  description: 'VRChatterに向けたお正月おみくじジェネレーター',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
