import { Message } from "@/app/lib/types";

export default function LoadingModal({ message }: Message) {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-gray-100 p-8 rounded-2xl max-w-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]">
        <center>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-semibold">{message}</p>
        </center>
      </div>
    </div>
  )
}