import LongButton from "./LongButton";
import Input from "./TextInput";
import CloseButton from "./CloseButton";

export default function CreateTopicModal({ closeAction }: CreateTopicModaPropsType) {

    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center p-4">
            <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">New Topic</h2>
                    <CloseButton action={closeAction}/>
                </div>
                <div className="mb-6">
                    <form>
                        <Input placeholder="Example: Japanese Vocabulary"/>
                        <LongButton text="Save"/>
                    </form>
                </div>
            </div>
        </div>
    )
}