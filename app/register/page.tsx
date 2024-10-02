'use client'

import Link from "next/link";
import { createUser } from "../lib/actions";
import CustomInput from "@/components/ui/input/CustomInput";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUser(new FormData(event.currentTarget));
      router.push("/login");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Join Remind.me
        </h1>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <CustomInput
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <CustomInput
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <CustomInput
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <CustomInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
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