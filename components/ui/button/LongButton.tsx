import { ButtonProps } from '@/app/lib/types'
import '@/components/ui/button/button-style.css'

export default function LongButton({ text, action }: ButtonProps) {
    return (
        <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 py-3 w-full bg-black text-white hover:bg-gray-800"
            onClick={action}
        >
            {text}
        </button>
    )
}