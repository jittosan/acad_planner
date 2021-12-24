import styles from './InputField.module.scss'

const InputField = ({title, placeholder, value, submit}) => {
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
