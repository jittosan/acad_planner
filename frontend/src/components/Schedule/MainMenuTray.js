import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import ScheduleContainer from './ScheduleContainer'
import styles from './MainMenuTray.module.scss'
import { FiUpload, FiDownload, FiSettings } from 'react-icons/fi'

const MainMenuTray = () => {
    const [dropdown, setDropdown] = useState(false)
    const showDropdown = () => {setDropdown(true)}
    const hideDropdown = () => {setDropdown(false)}

    return (
        <div className={`${styles.mainTray} ${dropdown ? styles.enlarged : styles.minimised}`} >
            <div>
                <h2 onClick={() => {if (!dropdown) {showDropdown()} else {hideDropdown()}}}>{dropdown ? 'Menu' : 'Academic Planner' }</h2>
                {/* <p onClick={() => {if (!dropdown) {showDropdown()} else {hideDropdown()}}}>{dropdown ? <BsChevronUp /> : <BsChevronDown /> }</p> */}
            </div>
            {dropdown ? <ScheduleMenu /> : ''}
            {dropdown ? <GlobalControlsTray /> : ''}
            

        </div>
    )
}

export default MainMenuTray


const ScheduleMenu= () => {
    return(
        <div>
            <strong>SCHEDULES</strong>
            <p>Edit</p>
        </div>
    )
}


const GlobalControlsTray = () => {
    return (
        <div className={styles.globalControlsTray}>
            {/* <strong>Options</strong> */}
            <FiDownload className={styles.controlIcon} />
            <FiUpload className={styles.controlIcon} />
            <FiSettings className={styles.controlIcon} />
        </div>
    )
}