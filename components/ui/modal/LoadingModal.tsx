import { Message } from "@/app/lib/types";

export default function LoadingModal ({message}: Message) {
    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 p-6 rounded-xl shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-700 font-semibold">{message}</p>
            </div>
          </div>
        </div>
      )
}