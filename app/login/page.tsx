'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';

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
      setError('Failed, please re-check email and passowrd');
    } else {
      router.push('/dashboard');
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
            <input required type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
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
      </div>
    </div>
  )
}
