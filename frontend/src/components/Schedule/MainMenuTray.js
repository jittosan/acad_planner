import { useState } from 'react'
// import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
// import ScheduleContainer from './ScheduleContainer'
import { BsPlusCircleDotted } from 'react-icons/bs'
import styles from './MainMenuTray.module.scss'
import { FiUpload, FiDownload, FiSettings } from 'react-icons/fi'
import { useContext } from 'react/cjs/react.development'
import { PlannerContext } from '../../context/PlannerContext'

const MainMenuTray = ({updateSchedule}) => {
    const planner = useContext(PlannerContext)
    const scheduleTitle = planner.getSchedule().name
    const [dropdown, setDropdown] = useState(false)
    const showDropdown = () => {setDropdown(true)}
    const hideDropdown = () => {setDropdown(false)}
    const selectNewSchedule = (index) => {updateSchedule(index);hideDropdown()}
    
    return (
        <div className={`${styles.mainTray} ${dropdown ? styles.enlarged : styles.minimised}`} >
            <div>
                <h2 onClick={() => {if (!dropdown) {showDropdown()} else {hideDropdown()}}}>{dropdown ? 'Menu' : scheduleTitle }</h2>
                {/* <p onClick={() => {if (!dropdown) {showDropdown()} else {hideDropdown()}}}>{dropdown ? <BsChevronUp /> : <BsChevronDown /> }</p> */}
            </div>
            {dropdown ? <ScheduleMenu updateSemester={selectNewSchedule} /> : ''}
            {dropdown ? <GlobalControlsTray /> : ''}
            

        </div>
    )
}

export default MainMenuTray


const ScheduleMenu= ({updateSemester}) => {
    const planner = useContext(PlannerContext)
    let selectedScheduleIndex = planner.getSelectedScheduleIndex()

    return(
        <div>
            <strong>SCHEDULES</strong>
            {planner.getAllSchedules().map((item, index) => <p key={index} onClick={() => updateSemester(index)}>{selectedScheduleIndex===index ? <BsPlusCircleDotted /> : ''}{item.name}</p>)}
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