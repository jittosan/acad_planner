import { useState, useRef} from 'react'
import { useContext } from 'react'
import {RiEditLine} from 'react-icons/ri'                           // import icons
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'                           
import {HiOutlineTrash} from 'react-icons/hi'                           // import icons
import {IoAdd} from 'react-icons/io5'               
import styles from './NewSemesterContainer.module.scss'                // import styles
// import local components
import SemesterModal from '../modals/SemesterModal.js'
import { PlannerContext } from '../../context/PlannerContext'               // import context data

const SemesterContainer = () => {
    let planner = useContext(PlannerContext) // get schedule data from context
    let schedule = planner.getSchedule()
    const [modalOpen, setModalOpen] = useState(false) // state controls for showing/hiding edit settings modal
    const displayModal = () => {setModalOpen(true)}
    const hideModal = () => {setModalOpen(false)}
    // selecting sem to display (CONSIDER STORING IN CACHE/LOCALSTORAGE FOR PERSISTENCE)
    const [selectedSem, setSelectedSem] = useState(0)
    const firstSemSelected = () => {return selectedSem===0}
    const lastSemSelected = () => {return selectedSem===schedule.length-1}
    const incrementSelectedSem = (value) => {
        if ((selectedSem+value)>=0 && (selectedSem+value)<=schedule.length-1) {
            setSelectedSem(selectedSem+value)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <div className={`${styles.button} ${firstSemSelected() ? styles.disableButton : styles.enableButton}`} onClick={()=>{incrementSelectedSem(-1)}}>
                    <BsChevronLeft />
                </div>
                <div className={styles.editButton} onClick={displayModal}>
                    <RiEditLine /> <p>Edit Semesters</p>
                </div>
                <div className={`${styles.button} ${lastSemSelected() ? styles.disableButton : styles.enableButton}`} onClick={()=>{incrementSelectedSem(1)}}>
                    <BsChevronRight />
                </div>
            </div>
            <Semester index={selectedSem} />
            {modalOpen ? <SemesterModal close={hideModal} /> : ''}
        </div>
    )
}

export default SemesterContainer

const Semester = ({index}) => {
    let planner = useContext(PlannerContext)    // get schedule context data
    let semData = planner.getSemester(index)
    const [triggerFlag, setTriggerFlag] = useState(true)
    let moduleInputRef = useRef(null) // function to add module from input field
    const addModuleCode = ()=> {
        // remove spaces, strip front & back
        planner.addModule(moduleInputRef.current.value.toUpperCase(), index)
        moduleInputRef.current.value = ''
        // enable popup for user-defined defined mods if not in database already
        setTriggerFlag(!triggerFlag)
    }
    const removeModuleCode = (code) => { // function to remove module from sem
        planner.removeModule(code, index)
        setTriggerFlag(!triggerFlag)
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
const Module = ({module_code}) => {
    const [hovered, setHovered] = useState(false)  // state to track hover state of component
    const isHovered = () => {setHovered(true)}
    const notHovered = () => {setHovered(false)}
    let moduleInfo = useContext(PlannerContext).getModuleInfo(module_code) // extract data storage context

    return(
        <div className={styles.module} onMouseOver={isHovered} onMouseLeave={notHovered}>
            {/* Module Code */}
            <div className={styles.codeContainer}>
                <p>{moduleInfo!==null ? moduleInfo.moduleCode : module_code}</p>
            </div>

            {/* Module Title & Tag */}
            <div className={styles.contentContainer}>
                <p>{moduleInfo!==null ? moduleInfo.title : '!Not Found'}</p>
                <div className={styles.tagContainer}>
                </div>
            </div>

            {/* Delete Icon when hovered over */}
            {/* <div className={styles.deleteContainer}>
                {hovered ? <HiOutlineTrash className={styles.deleteIcon} onClick={() => removeModuleCode(module_code)} /> : '' }
            </div> */}
        </div>
    )
}