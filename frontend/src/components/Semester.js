import React, { useRef, useState } from 'react'
import {HiOutlineTrash} from 'react-icons/hi'
import {IoAdd} from 'react-icons/io5'
import styles from '../styles/Semester.module.scss'
import Tag from './Tag'
import { useContext } from 'react'
import { DataStoreContext } from '../context/DataStoreContext'
import { ScheduleContext } from '../context/ScheduleContext'

const Semester = ({index}) => {
    let semHandler = useContext(ScheduleContext)
    let semData = semHandler.getData()[index]
    let moduleInputRef = useRef(null)
    const addModuleCode = ()=> {
        semHandler.addModule(moduleInputRef.current.value, index)
        moduleInputRef.current.value = ''
    }
    const removeModuleCode = (code) => {
        semHandler.removeModule(code, index)
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <strong>{semData.name}</strong>
                <p>{semData.acad_year} ({semData.type})</p>
            </div>
            <div className={styles.module_container}>
                {semData.modules.map((item, index)=><Module key={index} module_code={item} removeModuleCode={removeModuleCode} />)}  
                <div className={styles.footer}>
                    <IoAdd className={styles.footerIcon} />
                    <input placeholder={'Add Module...'} ref={moduleInputRef} />
                    <p onClick={addModuleCode}>Add</p>
                </div>
            </div>
        </div>
    )
}

const Module = ({module_code, removeModuleCode}) => {
    const [hovered, setHovered] = useState(false)
    const isHovered = () => {setHovered(true)}
    const notHovered = () => {setHovered(false)}
    let modData = useContext(DataStoreContext)

    return(
        <div className={styles.module} onMouseOver={isHovered} onMouseLeave={notHovered}>
            <div className={styles.codeContainer}>
                <p>{module_code}</p>
            </div>
            <p>{modData[module_code] ? modData[module_code].title : '!Not Found'}</p>
            <div className={styles.tagContainer}>
                {/* {/* <Tag code={'NAN'} color={'#2135aa'}/> */}
                <Tag code={'ENE'} color={'#168f1c'}/>
            </div>
            {hovered ? <HiOutlineTrash className={styles.deleteIcon} onClick={() => removeModuleCode(module_code)} /> : '' }
        </div>
    )
}

export default Semester