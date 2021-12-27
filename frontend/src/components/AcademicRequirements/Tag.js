import styles from './Tag.module.scss'  //import styling

// display tiny 3-letter coloured tab to indicate AcademicRequirement
const Tag = ({code, color}) => {
    return (
        <div className={styles.container} style={{backgroundColor:color}}>
            <p>{code}</p>
        </div>
    )
}

const LargeTag = ({code, color}) => {
    return (
        <div className={styles.largeContainer} style={{backgroundColor:color}}>
            <p>{code}</p>
        </div>
    )
}

export {Tag, LargeTag }


// redux-store : {code,color, isVisible, name}