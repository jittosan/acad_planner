import styles from './Loader.module.scss'

// Loading component to overlay while app is loading data
const Loader = () => {
    return (
        <div className={styles.background}>
            <h1>Loading...</h1>
        </div>
    )
}

export default Loader
