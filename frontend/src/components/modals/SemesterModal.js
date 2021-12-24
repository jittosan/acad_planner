import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { ScheduleContext } from '../../context/ScheduleContext'
import { CgList } from 'react-icons/cg'
import { GrAdd } from 'react-icons/gr'
import { Modal } from './Modal'
import styles from './SemesterModal.module.scss'
import InputField from '../auxillary/InputField'

const SemesterModal = ({close}) => {
    // get context on scheudle information
    let scheduleHandler = useContext(ScheduleContext)
    let scheduleData = scheduleHandler.getData()
    // state to store which semester is current selected
    const [selectedSem, setSelectedSem] = useState(0)
    // function to insert new Semester into schedule
    const addNewSemester =() => {
        scheduleHandler.addSemester(`Semester ${scheduleData.length+1}`)
    }
    return (
        <Modal className={styles.main} close={close}>
            <div>
                <h2>Edit Semesters</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.listContainer}>
                    {scheduleData.map((item, index) => <SemesterItem 
                        key={index} 
                        click={()=>setSelectedSem(index)} 
                        title={item.name}
                        selected={index===selectedSem}
                        />)}
                    <div className={styles.addButton} onClick={addNewSemester}>
                        <GrAdd />
                        <p>New Sem</p>
                    </div>
                </div>
                <div>
                    <strong>Semester Details</strong>
                    <div className={styles.inputForm}>
                    <div className={styles.inputItem}>
                        <p>Name</p>
                        <InputField placeholder={scheduleData[selectedSem].name} />
                    </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SemesterModal

const SemesterItem = ({title, click, selected}) => {
    return (
        <div className={`${styles.semesterItem} ${selected ? styles.selected : ''}`} onClick={click}>
            <CgList />
            <p>{title}</p>
        </div>
    )
}