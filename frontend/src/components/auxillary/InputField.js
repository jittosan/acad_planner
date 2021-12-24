import styles from './InputField.module.scss'

// generic text input field
const InputField = ({placeholder, value, submit}) => {
    return (
        <input
            className={styles.input}
            placeholder={placeholder} 
            value={value} 
            onSubmit={submit} 
        />
    )
}

export default InputField
