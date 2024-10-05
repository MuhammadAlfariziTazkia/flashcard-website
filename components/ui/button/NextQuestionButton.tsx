interface Props {
    action: () => void;
}

export default function NextQuestionButton({ action }: Props) {
    return (
        <button
            onClick={action}
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-3 w-full bg-black text-white hover:bg-gray-800"
        >
            Next Question
        </button>
    )
}