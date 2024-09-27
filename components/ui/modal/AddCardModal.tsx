import { BaseModalPropsType } from "@/app/lib/types"
import TextInput from "../input/TextInput"
import LongButton from "../button/LongButton"
import Button from "../button/Button"
import ModalLayout from "./ModalLayout"

export default function AddCardModal({ closeAction }: BaseModalPropsType) {
    const body: React.ReactNode = (
        <div className="mb-6">
            <form>
                <TextInput placeholder="Question" />
                <TextInput placeholder="Answer" />
                <LongButton text="Save" />
            </form>
        </div>
    )
    return <ModalLayout title="Topic Name" body={body} closeAction={closeAction} />
}