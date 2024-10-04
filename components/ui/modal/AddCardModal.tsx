import LongButton from "../button/LongButton"
import ModalLayout from "./ModalLayout"
import { createCard } from "@/app/lib/actions"
import { useState } from "react"
import LoadingModal from "./LoadingModal"
import "@/components/ui/custom-style.css"
import { Modal } from "@/app/lib/types"

interface Props extends Modal {
    topicId: string;
    updateAction: () => void;
    closeAction: () => void;
}

export default function AddCardModal({ topicId, closeAction, updateAction }: Props) {
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
                <input type="hidden" name="topicId" value={topicId} required/>
                <input type="text" name="value1" placeholder="Question" required/>
                <input type="text" name="value2" placeholder="Answer" required/>
                <LongButton text="Save" />
            </form>
            {isLoading && (
                <LoadingModal message="Add new Flashcard..." />
            )}
        </div>
    )
    return <ModalLayout title={topicName} body={body} closeAction={closeAction} />
}