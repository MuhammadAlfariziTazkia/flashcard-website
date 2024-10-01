// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'; // untuk compare password yang di-hash
import { getUser } from '@/app/lib/data';
import { JWT } from 'next-auth/jwt'; // Import tipe JWT dari next-auth

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == undefined) return null;
        const user = await getUser(credentials?.email);
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login', // redirect ke halaman login custom
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id; // Pastikan 'id' ditambahkan ke token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      return session;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
