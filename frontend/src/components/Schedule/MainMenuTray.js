import { useState } from 'react'
// import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
// import ScheduleContainer from './ScheduleContainer'
import { BsPlusCircleDotted } from 'react-icons/bs'
import styles from './MainMenuTray.module.scss'
import { FiUpload, FiDownload, FiSettings } from 'react-icons/fi'
import { RiEditLine } from 'react-icons/ri'      
import { useContext } from 'react/cjs/react.development'
import { PlannerContext } from '../../context/PlannerContext'

const MainMenuTray = ({updateSchedule}) => {
    const planner = useContext(PlannerContext)
    const scheduleTitle = planner.getSchedule().name
    const [dropdown, setDropdown] = useState(false)
    // const showDropdown = () => setDropdown(true)
    const hideDropdown = () => setDropdown(false)
    const selectNewSchedule = (index) => {updateSchedule(index); hideDropdown()}
    
    return (
        <div className={`${styles.mainTray} ${dropdown ? styles.enlarged : styles.minimised}`} >
            <div className={styles.mainTrayTitleDiv}>
                <h2 onClick={() => setDropdown(!dropdown)}>{dropdown ? 'Menu' : scheduleTitle }</h2>
                {/* <p onClick={() => {if (!dropdown) {showDropdown()} else {hideDropdown()}}}>{dropdown ? <BsChevronUp /> : <BsChevronDown /> }</p> */}
            </div>
            {
                dropdown && 
                <>
                    <ScheduleMenu updateSemester={selectNewSchedule} scheduleTitle={scheduleTitle} /> 
                    <GlobalControlsTray />
                </>
            }
        </div>
    )
}

export default MainMenuTray


const ScheduleMenu= ({ updateSemester, scheduleTitle }) => {
    const planner = useContext(PlannerContext)
    let selectedScheduleIndex = planner.getSelectedScheduleIndex()

    return(
        <div>
            <strong>SCHEDULES</strong>
                {
                    planner.getAllSchedules().map((item, index) => 
                        <p>
                            <span key={index} 
                                className={`${styles.menuSchedule} ${scheduleTitle === item.name && styles.menuScheduleSelected}` /* highlight current selected schedule in menu */} 
                                onClick={() => updateSemester(index)}
                            >
                                {item.name}&nbsp;
                            </span>
                            <RiEditLine className={`${styles.menuSchedule} ${styles.menuScheduleEditItem}`}/>
                        </p>
                    )
                }
            <p className={styles.menuScheduleEditList}>Edit List</p>
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