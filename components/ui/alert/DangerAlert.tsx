import { Alert } from "@/app/lib/types";
import { AlertTriangleIcon } from "lucide-react";

export default function DangerAlert({message}: Alert) {
    return (
        <div className="my-3 p-4 bg-red-100 rounded-xl shadow-[inset_5px_5px_10px_#f7d4d4,inset_-5px_-5px_10px_#ffe4e4] text-red-800 flex items-center" role="alert">
            <AlertTriangleIcon className="h-5 w-5 mr-2" />
            <span>{message}</span>
        </div>
    )
}