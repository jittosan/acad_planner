import { useRef, useState } from 'react'
import { useContext } from 'react'
import {HiOutlineTrash} from 'react-icons/hi'                           // import icons
import {IoAdd} from 'react-icons/io5'               
import styles from './Semester.module.scss'                             // import styles
import { DataStoreContext } from '../../context/DataStoreContext'       // import context data
import { ScheduleContext } from '../../context/ScheduleContext'

// Semester Card component
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
        <div className={styles.container}>
            {/* Title/Header */}
            <div className={styles.title}>
                <strong>{semData.name}</strong>
                <p>{semData.acad_year} ({semData.type})</p>
            </div>

            {/* Module List Display */}
            <div className={styles.module_container}>
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
            <div className={styles.contentContainer}>
                <p>{modData[module_code] ? modData[module_code].title : '!Not Found'}</p>
                <div className={styles.tagContainer}>
                    {/* {/* <Tag code={'NAN'} color={'#2135aa'}/> */}
                    {/* <Tag code={'ENE'} color={'#168f1c'}/> */}
                </div>
            </div>

            {/* Delete Icon when hovered over */}
            <div className={styles.deleteContainer}>
                {hovered ? <HiOutlineTrash className={styles.deleteIcon} onClick={() => removeModuleCode(module_code)} /> : '' }
            </div>
        </div>
    )
}

export default Semester