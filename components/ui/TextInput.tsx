export default function TextInput({name, value, placeholder} : BaseInputPropsType) {
    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
        />
    )
}