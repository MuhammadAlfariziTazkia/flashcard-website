import { ButtonPropsType } from '@/app/lib/types'
import '@/components/ui/button/button-style.css'
import { FlagIcon, ListIcon, PlayIcon, PlusIcon } from "lucide-react"

function getIconComponent(value: string) {
 switch (value) {
    case "add": return <PlusIcon className='button-icon'/>
    case "list": return <ListIcon className='button-icon'/>
    case "play": return <PlayIcon className='button-icon'/>
    case "flag": return <FlagIcon className='button-icon'/>
    default: return <></>
 }
}

export default function Button({iconType = "", text = "", popup = false, action, isDisabled} : ButtonPropsType) {
    return (
        <button className={popup ? "pop-button" : "deep-button"} onClick={action} disabled={isDisabled}>
            {getIconComponent(iconType)}
            {text}
        </button>
    )
}