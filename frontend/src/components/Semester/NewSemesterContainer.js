import { useState, useRef} from 'react'
import { useContext } from 'react'
import {RiEditLine} from 'react-icons/ri'                           // import icons
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'                           
import {HiOutlineTrash} from 'react-icons/hi'                           // import icons
import {IoAdd} from 'react-icons/io5'               
import styles from './NewSemesterContainer.module.scss'                // import styles                           
import { ScheduleContext } from '../../context/ScheduleContext'     // import context data
import { DataStoreContext } from '../../context/DataStoreContext'     // import local components
import SemesterModal from '../modals/SemesterModal.js'

const SemesterContainer = () => {
    let scheduleHandler = useContext(ScheduleContext) // get schedule data from context
    let schedule = scheduleHandler.getData()
    const [modalOpen, setModalOpen] = useState(false) // state controls for showing/hiding edit settings modal
    const displayModal = () => {setModalOpen(true)}
    const hideModal = () => {setModalOpen(false)}
    // selecting sem to display
    const [selectedSem, setSelectedSem] = useState(0)
    const firstSemSelected = () => {return selectedSem===0}
    const lastSemSelected = () => {return selectedSem===schedule.length-1}
    const incrementSelectedSem = (value) => {
        if ((selectedSem+value)>=0 && (selectedSem+value)<=schedule.length-1) {
            setSelectedSem(selectedSem+value)
        }
    }
    console.log(selectedSem)
    // console.log(schedule.length)
    // console.log(schedule)
    return (
        <div className={styles.container}>
        <div className={styles.buttonContainer}>
            <div className={`${styles.button} ${firstSemSelected() ? styles.disableButton : styles.enableButton}`} onClick={()=>{incrementSelectedSem(-1)}}>
                <BsChevronLeft />
            </div>
            <div className={styles.editButton} onClick={displayModal}>
                <p><RiEditLine /> Edit Semesters</p>
            </div>
            <div className={`${styles.button} ${lastSemSelected() ? styles.disableButton : styles.enableButton}`} onClick={()=>{incrementSelectedSem(1)}}>
                <BsChevronRight />
            </div>
        </div>
            <Semester index={selectedSem} />
            {/* {schedule.map((_, index) => <Semester key={index} index={index}  />)} */}
            
        {modalOpen ? <SemesterModal close={hideModal} /> : ''}
        </div>
    )
}

export default SemesterContainer

const Semester = ({index}) => {
    let semHandler = useContext(ScheduleContext) // get schedule context data
    let semData = semHandler.getData()[index]
    let moduleInputRef = useRef(null) // function to add module from input field
    const addModuleCode = ()=> {
        // remove spaces, strip front & back
        semHandler.addModule(moduleInputRef.current.value.toUpperCase(), index)
        moduleInputRef.current.value = ''
        // enable popup for user-defined defined mods if not in database already
    }
    const removeModuleCode = (code) => { // function to remove module from sem
        semHandler.removeModule(code, index)
    }
    
    return (
        <div className={styles.semesterContainer}>
            {/* Title/Header */}
            <div className={styles.title}>
                <h2>{semData.name}</h2>
                <p>{semData.acad_year} ({semData.type})</p>
            </div>

            {/* Module List Display */}
            <div className={styles.moduleContainer}>
                {semData.modules.map((item, index)=><Module key={index} module_code={item} removeModuleCode={removeModuleCode} />)}  
                
                {/* Card Footer & Add module */}
                <div className={styles.footer}>
                    <IoAdd className={styles.footerIcon} />
                    <input placeholder={'Add Module...'} ref={moduleInputRef} onKeyPress={(e) => {if (e.key==='Enter') {addModuleCode()}}}/>
                    <p onClick={addModuleCode}>Add</p>
                </div>
            </div>
        </div>
    )
}

// Individual module in Semester Card component
const Module = ({module_code, removeModuleCode}) => {
    const [hovered, setHovered] = useState(false)  // state to track hover state of component
    const isHovered = () => {setHovered(true)}
    const notHovered = () => {setHovered(false)}
    let modData = useContext(DataStoreContext)   // extract data storage context

    return(
        <div className={styles.module} onMouseOver={isHovered} onMouseLeave={notHovered}>
            {/* Module Code */}
            <div className={styles.codeContainer}>
                <p>{module_code}</p>
            </div>

            {/* Module Title & Tag */}
            {/* <div className={styles.contentContainer}>
                <p>{modData[module_code] ? modData[module_code].title : '!Not Found'}</p>
                <div className={styles.tagContainer}>
                </div>
            </div> */}

            {/* Delete Icon when hovered over */}
            {/* <div className={styles.deleteContainer}>
                {hovered ? <HiOutlineTrash className={styles.deleteIcon} onClick={() => removeModuleCode(module_code)} /> : '' }
            </div> */}
        </div>
    )
}