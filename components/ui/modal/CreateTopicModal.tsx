import { Modal } from "@/app/lib/types";
import ModalLayout from "./ModalLayout";
import { createTopic } from "@/app/lib/actions";
import "@/components/ui/input/input-style.css"
import React from "react";

interface Props extends Modal {
    userId: string;
    updateAction: () => void;
}

export default function CreateTopicModal({ closeAction, updateAction, userId }: Props) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            updateAction();
            closeAction();
            await createTopic(new FormData(event.currentTarget))
        } catch (error) {
            console.log(error)
        }
    }

    const body: React.ReactNode = (
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="user_id" value={userId} />
                <input
                    type="text"
                    name="name"
                    placeholder="Example: Japanese Vocabulary"
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-3 w-full bg-black text-white hover:bg-gray-800"
                >
                    Save
                </button>
            </form>
        </div>
    )
    return <ModalLayout title="New Topic" body={body} closeAction={closeAction} />
}