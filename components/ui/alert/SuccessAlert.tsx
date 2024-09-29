import { Alert } from "@/app/lib/types";
import { CheckCircleIcon } from "lucide-react";

export default function SuccessAlert({message}: Alert) {
    return (
        <div className="my-3 p-4 bg-green-100 rounded-xl shadow-[inset_5px_5px_10px_#b8dbba,inset_-5px_-5px_10px_#daffdc] text-green-800 flex items-center" role="alert">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span>{message}</span>
        </div>
    )
}