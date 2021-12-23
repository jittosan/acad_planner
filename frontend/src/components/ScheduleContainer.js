import React, { useState } from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import styles from '../styles/ScheduleContainer.module.scss'

const ScheduleContainer = ({acad_req_data, schedule, update, current}) => {
    return (
        <div className={styles.container}>
            <strong>Schedules</strong>
            {schedule.map((item, index) => <ScheduleItem key={index} title={item.name} update={() => update(index)} selected={current===index} />)}
        </div>
    )
}

const ScheduleItem = ({title, update, selected}) => {
    return (
        <div className={`${styles.itemContainer} ${selected ? styles.selected : ''}`} onClick={update}>
            <HiOutlineClipboardList />
            <p>{title}</p>
        </div>
    )
}

export default ScheduleContainer
