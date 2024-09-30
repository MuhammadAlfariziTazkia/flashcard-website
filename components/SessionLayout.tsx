// app/components/SessionLayout.tsx
'use client'; // Ini membuat komponen menjadi Client Component

import { SessionProvider } from 'next-auth/react';

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
