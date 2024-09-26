import { CreateTopicModalPropsType } from "@/app/lib/types";
import LongButton from "../button/LongButton";
import Input from "../input/TextInput";
import ModalLayout from "./ModalLayout";

export default function CreateTopicModal({ closeAction }: CreateTopicModalPropsType) {
    const body: React.ReactNode = (
        <div className="mb-6">
            <form>
                <Input placeholder="Example: Japanese Vocabulary" />
                <LongButton text="Save" />
            </form>
        </div>
    )
    return <ModalLayout title="New Topic" body={body} closeAction={closeAction} />
}