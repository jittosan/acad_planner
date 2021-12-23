import React from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdSaveAlt, MdSettings } from 'react-icons/md'
import styles from '../styles/ScheduleContainer.module.scss'

const ScheduleContainer = ({acad_req_data, schedule, update, current}) => {
    return (
        <div className={styles.container}>
        <div className={styles.titleCard}>
            <h2>Academic Planner</h2>
        </div>
        <br />

        <div>
        <strong>Schedules</strong>
            {schedule.map((item, index) => <ScheduleItem key={index} title={item.name} update={() => update(index)} selected={current===index} />)}
        <p>.</p>
        </div>

        <br />
        <div className={styles.actionTray}>
            <MdSaveAlt className={styles.icon} />
            <MdSettings className={styles.icon} />
        </div>
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
