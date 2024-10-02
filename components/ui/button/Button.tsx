import { ButtonProps } from '@/app/lib/types'
import '@/components/ui/button/button-style.css'

export default function Button({text = "", action, iconComponent, type} : ButtonProps) {
    return (
        <button className="pop-button" onClick={action} type={type}>
            {iconComponent}
            {text}
        </button>
    )
}