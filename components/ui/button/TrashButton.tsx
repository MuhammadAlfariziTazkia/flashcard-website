import { TrashIcon } from "lucide-react";

export default function TrashButton() {
    return (
        <button
            className="p-2 bg-gray-100 text-red-500 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300 rounded-xl"
        >
            <TrashIcon className="h-4 w-4" />
        </button>
    )
}