import React from 'react'
import Semester from './Semester'
import styles from '../styles/SemesterContainer.module.scss'

const SemesterContainer = ({sem_data}) => {
    return (
        <div className={styles.container}>
            {sem_data.map((item) => <Semester sem_obj={item}  />)}
        </div>
    )
}

export default SemesterContainer
