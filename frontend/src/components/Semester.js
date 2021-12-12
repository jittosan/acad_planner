import React, { useState } from 'react'
import {MdOutlineCancel} from 'react-icons/md'
import {BsDash} from 'react-icons/bs'
import {IoAdd} from 'react-icons/io5'
import styles from './Semester.module.scss'

const Semester = ({sem_obj}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <strong>{sem_obj.name}</strong>
                <p>{sem_obj.acad_year} ({sem_obj.type})</p>
            </div>
            <div className={styles.module_container}>
                {sem_obj.modules.map((item)=><Module module_code={item} />)}  
            </div>
            <div className={styles.footer}>
                <IoAdd className={styles.footerIcon} />
                <input placeholder='Add module...' />
            </div>
        </div>
    )
}

const Module = ({module_code}) => {
    const [hovered, setHovered] = useState(false)
    const isHovered = () => {setHovered(true)}
    const notHovered = () => {setHovered(false)}

    return(
        <div className={styles.module} onMouseOver={isHovered} onMouseLeave={notHovered}>
            {hovered ? <MdOutlineCancel className={styles.deleteIcon} /> : <BsDash className={styles.dashIcon} /> }
            <p>{module_code}</p>
        </div>
    )
}

export default Semester
