import '@/app/ui/global.css';
import { cabin } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cabin.className} antialiased`}>{children}</body>
    </html>
  );
}
