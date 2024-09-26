import LongButton from "../button/LongButton";
import Input from "../input/TextInput";
import ModalLayout from "./ModalLayout";

export default function CreateTopicModal({ closeAction }: CreateTopicModaPropsType) {
    const body: React.ReactNode = (
        <form>
            <Input placeholder="Example: Japanese Vocabulary" />
            <LongButton text="Save" />
        </form>
    )
    return <ModalLayout title="New Topic" body={body} closeAction={closeAction} />
}