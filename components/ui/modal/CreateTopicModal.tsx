import { BaseModalPropsType } from "@/app/lib/types";
import LongButton from "../button/LongButton";
import ModalLayout from "./ModalLayout";
import TextInput from "../input/TextInput";
import { createTopic } from "@/app/lib/actions";

export default function CreateTopicModal({ closeAction }: BaseModalPropsType) {
    const body: React.ReactNode = (
        <div className="mb-6">
            <form action={createTopic}>
                <TextInput placeholder="Example: Japanese Vocabulary" name="name" />
                <LongButton text="Save" />
            </form>
        </div>
    )
    return <ModalLayout title="New Topic" body={body} closeAction={closeAction} />
}