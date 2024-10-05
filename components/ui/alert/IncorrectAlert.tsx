interface Props {
    rightAnswer: string;
}

export default function IncorrectAlert({ rightAnswer }: Props) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Incorrect!</strong>
            <span className="block sm:inline ml-2">Right answer: {rightAnswer}</span>
        </div>
    )
}