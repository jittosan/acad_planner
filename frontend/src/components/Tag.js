import React from 'react'
import styles from '../styles/Tag.module.scss'

const Tag = ({code, color}) => {
    return (
        <div className={styles.container} style={{backgroundColor:color}}>
            <p>{code}</p>
        </div>
    )
}

export default Tag


// redux-store : {code,color, isVisible, name}