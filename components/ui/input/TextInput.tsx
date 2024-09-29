import { BaseInputPropsType } from '@/app/lib/types'
import '@/components/ui/input/input-style.css'

export default function TextInput({name, value, placeholder, onChange} : BaseInputPropsType) {
    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}