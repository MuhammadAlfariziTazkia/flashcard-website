import { ButtonProps } from '@/app/lib/types'
import '@/components/ui/button/button-style.css'

export default function Button({text = "", action, iconComponent} : ButtonProps) {
    return (
        <button className="pop-button" onClick={action}>
            {iconComponent}
            {text}
        </button>
    )
}