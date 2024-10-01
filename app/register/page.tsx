import Link from "next/link";

export default function RegisterPage () {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
              Join Remind.me
            </h1>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-sm
                             focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-sm
                             focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="you@example.com"
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
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-sm
                             focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-none text-sm
                             focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-black rounded-none transition-colors duration-300 hover:bg-gray-800"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-gray-600 hover:underline">
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      )
}