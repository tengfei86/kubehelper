import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KubeHelper — AI-Powered Kubernetes YAML Generator',
  description: 'Generate, validate, and fix Kubernetes YAML with AI. Stop fighting indentation. Start shipping.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
