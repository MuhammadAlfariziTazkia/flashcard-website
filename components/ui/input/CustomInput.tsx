import { CustomInputProps } from '@/app/lib/types'
import '@/components/ui/input/input-style.css'

export default function CustomInput({ name, value, placeholder, onChange, type, id, required }: CustomInputProps) {
    return (
        <input
            id={id}
            type={type || "text"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required || true}
        />
    )
}