import LongButton from "./LongButton";
import Input from "./TextInput";
import CloseButton from "./CloseButton";
import ModalHeader from "./ModalHeader";

export default function TestModal({ closeAction }: CreateTopicModaPropsType) {
    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center p-4">
            <div className="bg-gray-100 p-8 rounded-2xl w-full max-w-md shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]">
                <ModalHeader title="Topic Name" closeAction={closeAction}/>
                <div className="mb-6">
                    <form>
                        <Input value="べんきょうします"/>
                        <Input value="Belajar"/>
                        <LongButton text="Check Answer"/>
                    </form>
                </div>
            </div>
        </div>
    )
}