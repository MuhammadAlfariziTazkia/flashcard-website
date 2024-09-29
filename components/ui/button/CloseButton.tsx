import { XIcon } from "lucide-react";
import '@/components/ui/button/button-style.css'
import { ButtonProps } from "@/app/lib/types";

export default function CloseButton({action} : ButtonProps) {
    return (
        <button
            onClick={action}
            className="text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-2 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
        >
            <XIcon className="h-6 w-6" />
        </button>
    )
}