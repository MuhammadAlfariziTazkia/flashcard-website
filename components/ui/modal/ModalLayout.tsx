import { Modal } from "@/app/lib/types";
import { XIcon } from "lucide-react";

interface Props extends Modal {
    body: React.ReactNode;
    title: string;
}

export default function ModalLayout({ title, closeAction, body }: Props) {
    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center p-4">
            <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={closeAction}
                        className="text-gray-600 hover:text-gray-800 bg-gray-100 rounded-full p-2 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                {body}
            </div>
        </div>
    )
}