import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blinkit Decision Assistant - Buy with Confidence',
  description: 'AI-native shopping assistant that answers "Is this the right product for me?" for Coffee, Protein Powder, and Skincare categories on Blinkit.',
  keywords: 'Blinkit, Blinkit Decision Assistant, Buy with Confidence, Quick Commerce, E-commerce AI, Coffee, Protein, Skincare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-blinkit-bg min-h-screen antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}
