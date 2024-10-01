// types/next-auth.d.ts
import NextAuth from 'next-auth';

export declare module 'next-auth' {
  interface Session {
    user: User
  }

  interface User {
    id: string; // Tambahkan id ke user
    name?: string | null;
    email?: string | null;
  }
}
