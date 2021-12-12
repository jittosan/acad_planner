import React from 'react'
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
            <p>+</p>
                <input placeholder='Add module...' />
            </div>
        </div>
    )
}

const Module = ({module_code}) => {
    return(
        <div className={styles.module}>
            {/* <div className={styles.listmarker}></div> */}
            <p>{module_code}</p>
            {/* <p> X </p> */}
        </div>
    )
}

export default Semester
