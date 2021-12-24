import { useState} from 'react'
import { useContext } from 'react'
import {RiEditLine} from 'react-icons/ri'                           // import icons
import styles from './SemesterContainer.module.scss'                // import styles
import { ScheduleContext } from '../../context/ScheduleContext'     // import context data
import Semester from './Semester'                                   // import local components
import SemesterModal from '../modals/SemesterModal.js'

const SemesterContainer = () => {
    let scheduleHandler = useContext(ScheduleContext) // get schedule data from context
    let schedule = scheduleHandler.getData()
    const [modalOpen, setModalOpen] = useState(false) // state controls for showing/hiding edit settings modal
    const displayModal = () => {setModalOpen(true)}
    const hideModal = () => {setModalOpen(false)}

    return (
        <div className={styles.container}>
            {schedule.map((_, index) => <Semester key={index} index={index}  />)}
            <div className={styles.editButton} onClick={displayModal}>
                <p><RiEditLine /> Edit Semesters</p>
            </div>
        {modalOpen ? <SemesterModal close={hideModal} /> : ''}
        </div>
    )
}

export default SemesterContainer
