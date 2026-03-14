import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Life Decision',
  description: 'Diagnostic psychologique pour mieux comprendre vos décisions importantes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-10 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
