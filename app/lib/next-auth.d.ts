// types/next-auth.d.ts
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User
  }

  interface User extends DefaultUser{
    id: string; // Tambahkan id ke user
  }
}
