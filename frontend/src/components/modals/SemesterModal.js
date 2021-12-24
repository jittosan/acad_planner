import React from 'react'
import { Modal } from './Modal'
import styles from './SemesterModal.module.scss'

const SemesterModal = ({close}) => {
    return (
        <Modal className={styles.main} close={close}>
            <div>
                <h2>Edit Semesters</h2>
            </div>
            <div>
                <p>Add Semester</p>
                <p>Edit Semester</p>
                <p>Delete Semester</p>
            </div>
        </Modal>
    )
}

export default SemesterModal
