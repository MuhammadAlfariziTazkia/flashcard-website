import { AddCardModalType } from "@/app/lib/types"
import TextInput from "../input/TextInput"
import LongButton from "../button/LongButton"
import ModalLayout from "./ModalLayout"
import { createCard } from "@/app/lib/actions"

export default function AddCardModal({ topicId, closeAction }: AddCardModalType) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createCard(new FormData(event.currentTarget))
            closeAction();
        } catch (error) {
            console.log(error)
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
        </div>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}