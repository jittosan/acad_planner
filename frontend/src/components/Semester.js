import React, { useState } from 'react'
import {MdOutlineCancel} from 'react-icons/md'
import {BsCircle} from 'react-icons/bs'
import {IoAdd} from 'react-icons/io5'
import styles from './Semester.module.scss'
import Tag from './Tag'

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
            {/* {hovered ? <MdOutlineCancel className={styles.deleteIcon} /> : <BsCircle className={styles.dashIcon} /> } */}
            <div className={styles.codeContainer}>
                <p>{module_code}</p>
            </div>
            <div className={styles.tagContainer}>
                <Tag code={'NAN'} color={'#ec3cec'}/>
                <Tag code={'ENE'} color={'#ecc23c'}/>
            </div>
        </div>
    )
}

export default Semester