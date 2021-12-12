import React from 'react'
import styles from './ScheduleHeader.module.scss'

const ScheduleHeader = ({title}) => {
    // set default title
    if (title ===  '') {
        title = 'Semester Planner'
    }

    return (
        <div className={styles.container}>
            <h2>{title}</h2>
        </div>
    )
}

export default ScheduleHeader
