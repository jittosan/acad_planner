import React from 'react'
import { Modal } from './Modal'

const SemesterModal = ({close}) => {
    return (
        <Modal close={close}>
            <strong>Edit Semesters</strong>
            <p>Add Semester</p>
            <p>Edit Semester</p>
            <p>Delete Semester</p>
        </Modal>
    )
}

export default SemesterModal
