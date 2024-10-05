import Image from "next/image";
import Link from "next/link";
import "@/components/ui/custom-style.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Remind.me
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Boost your language learning journey with Remind.me. Our innovative flash card system helps you memorize vocabulary effortlessly, making language acquisition fun and efficient.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/login">
            <button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-black rounded-none transition-colors duration-300 hover:bg-gray-800">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-black bg-white border border-black rounded-none transition-colors duration-300 hover:bg-gray-100">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="aspect-square relative">
          <Image
            src="/images/landing-page.png"
            alt="Language learning illustration"
            layout="fill"
            objectFit="cover"
            className="rounded-none"
          />
        </div>
      </div>
    </div>
  </div>
  );
}