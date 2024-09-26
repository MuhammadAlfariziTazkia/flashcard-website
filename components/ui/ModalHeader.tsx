import CloseButton from "./CloseButton";

export default function ModalHeader({ title, closeAction }: ModalHeaderPropsType) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <CloseButton action={closeAction} />
        </div>
    )
}