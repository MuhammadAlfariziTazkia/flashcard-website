import { AddCardModalType } from "@/app/lib/types"
import TextInput from "../input/TextInput"
import LongButton from "../button/LongButton"
import ModalLayout from "./ModalLayout"
import { createCard } from "@/app/lib/actions"
import { useState } from "react"
import LoadingModal from "./LoadingModal"

export default function AddCardModal({ topicId, closeAction }: AddCardModalType) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        try {
            await createCard(new FormData(event.currentTarget))
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
                <input type="hidden" name="topicId" value={topicId} />
                <TextInput name="value1" placeholder="Question" />
                <TextInput name="value2" placeholder="Answer" />
                <LongButton text="Save" />
            </form>
            {isLoading && (
                <LoadingModal message="Add new Flashcard..." />
            )}
        </div>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}