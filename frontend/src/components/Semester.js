import React, { useState } from 'react'
import {HiOutlineTrash} from 'react-icons/hi'
import {IoAdd} from 'react-icons/io5'
import styles from '../styles/Semester.module.scss'
import Tag from './Tag'
import { useContext } from 'react'
import { DataStoreContext } from '../context/DataStoreContext'
import { ScheduleContext } from '../context/ScheduleContext'

const Semester = ({sem_obj}) => {
    let demo = useContext(ScheduleContext)
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <strong>{sem_obj.name}</strong>
                <p>{sem_obj.acad_year} ({sem_obj.type})</p>
            </div>
            <div className={styles.module_container}>
                {sem_obj.modules.map((item, index)=><Module key={index} module_code={item} />)}  
                <div className={styles.footer}>
                    <IoAdd className={styles.footerIcon} />
                    <input placeholder={demo.getText()} onClick={() => demo.setText('NEW')} />
                </div>
            </div>
        </div>
    )
}

const Module = ({module_code}) => {
    const [hovered, setHovered] = useState(false)
    const isHovered = () => {setHovered(true)}
    const notHovered = () => {setHovered(false)}
    let modData = useContext(DataStoreContext)

    // console.log(modData[module_code] ? modData[module_code].title : '!Not Found')
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
            {hovered ? <HiOutlineTrash className={styles.deleteIcon} /> : '' }
        </div>
    )
}

export default Semester