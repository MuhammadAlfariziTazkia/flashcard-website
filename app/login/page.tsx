// app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link, PlusIcon } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Login gagal. Cek kembali email dan password.');
    } else {
      router.push('/dashboard'); // Redirect setelah login
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Login to Remind.me
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-sm
                         focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-sm
                         focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-none transition-colors duration-300 hover:bg-gray-800"
          >
            Log In
          </button>
          {error && (
            <>
              <PlusIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </form>
        <div className="mt-6 text-center">
          <Link href="/register" className="text-sm text-gray-600 hover:underline">
            Dont have an account? Sign up
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
