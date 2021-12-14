import React, { useState } from 'react'
import {HiOutlineTrash} from 'react-icons/hi'
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
            {/* <div className={styles.footer}>
                <IoAdd className={styles.footerIcon} />
                <input placeholder='Add module...' />
            </div> */}
        </div>
    )
}

const Module = ({module_code}) => {
    const [hovered, setHovered] = useState(false)
    const isHovered = () => {setHovered(true)}
    const notHovered = () => {setHovered(false)}

    return(
        <div className={styles.module} onMouseOver={isHovered} onMouseLeave={notHovered}>
            <div className={styles.codeContainer}>
                <p>{module_code}</p>
            </div>
            <p>Engineering Calculus</p>
            <div className={styles.tagContainer}>
                {/* {/* <Tag code={'NAN'} color={'#2135aa'}/> */}
                <Tag code={'ENE'} color={'#168f1c'}/>
            </div>
            {hovered ? <HiOutlineTrash className={styles.deleteIcon} /> : '' }
        </div>
    )
}

export default Semester