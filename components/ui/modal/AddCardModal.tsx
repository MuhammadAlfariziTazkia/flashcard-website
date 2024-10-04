import ModalLayout from "./ModalLayout"
import { createCard } from "@/app/lib/actions"
import { useState } from "react"
import LoadingModal from "./LoadingModal"
import "@/components/ui/custom-style.css"
import { Modal } from "@/app/lib/types"

interface Props extends Modal {
    topicName: string;
    topicId: string;
    updateAction: () => void;
    closeAction: () => void;
}

export default function AddCardModal({ topicId, closeAction, updateAction, topicName }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        try {
            await createCard(new FormData(event.currentTarget))
            updateAction();
            closeAction();
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const body: React.ReactNode = (
        <div className="mb-6">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="topicId" value={topicId} required />
                <input type="text" name="value1" placeholder="Question" required />
                <input type="text" name="value2" placeholder="Answer" required />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-3 w-full bg-black text-white hover:bg-gray-800"
                >
                    Save
                </button>
            </form>
            {isLoading && (
                <LoadingModal message="Add new Flashcard..." />
            )}
        </div>
    )
    return <ModalLayout title={topicName} body={body} closeAction={closeAction} />
}