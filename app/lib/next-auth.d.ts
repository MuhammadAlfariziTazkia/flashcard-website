// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Menambahkan id ke session.user
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Tambahkan id ke user
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
