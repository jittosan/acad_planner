import React from 'react'
import Semester from './Semester'
import styles from '../styles/SemesterContainer.module.scss'
import { useContext } from 'react/cjs/react.development'
import { ScheduleContext } from '../context/ScheduleContext'

const SemesterContainer = () => {
    let schedule = useContext(ScheduleContext).getData()
    
    return (
        <div className={styles.container}>
            {schedule.map((_, index) => <Semester key={index} index={index}  />)}
        </div>
    )
}

export default SemesterContainer
