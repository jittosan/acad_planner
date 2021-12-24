import { HiOutlineClipboardList } from 'react-icons/hi' // import icons
import { MdSaveAlt, MdSettings } from 'react-icons/md'
import styles from './ScheduleContainer.module.scss' // import styles

// MAIN SCHEDULE CONTAINER
// Left Sidebar, with global controls and Schedule component
const ScheduleContainer = ({schedule, update, current}) => {
    return (
        <div className={styles.container}>
        {/* Sidebar Title/Header */}
        <div className={styles.titleCard}>
            <h2>Academic Planner</h2>
        </div>
        <br />

        {/* Schedule Selection Menu */}
        <div>
        <strong>Schedules</strong>
            {schedule.map((item, index) => <ScheduleItem key={index} title={item.name} update={() => update(index)} selected={current===index} />)}
        <p>.</p>
        </div>

        <br />
        {/* Additional Control buttons e.g. save/settings */}
        <div className={styles.actionTray}>
            <MdSaveAlt className={styles.icon} />
            <MdSettings className={styles.icon} />
        </div>
        </div>
    )
}

// Individual schedule component for schedule menu
const ScheduleItem = ({title, update, selected}) => {
    return (
        <div className={`${styles.itemContainer} ${selected ? styles.selected : ''}`} onClick={update}>
            <HiOutlineClipboardList />
            <p>{title}</p>
        </div>
    )
}

export default ScheduleContainer
