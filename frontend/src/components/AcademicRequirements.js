import React, { useState } from 'react'
import {RiArrowDownSLine,RiArrowRightSLine} from 'react-icons/ri'
import styles from './AcademicRequirements.module.scss'

const AcademicRequirements = ({acad_req_data}) => {
    return (
        <div className={styles.container}>
            <strong>Requirements</strong>
            {acad_req_data.map((item) => <RequirementGroup req_data={item} />)}
        </div>
    )
}

const RequirementGroup = ({req_data}) => {
    const [selected, setSelected] = useState(false)
    const toggleSelect = () => {setSelected(!selected)}

    return (
        <div className={styles.requirementGroup} onClick={toggleSelect} >
            {selected ? <RiArrowRightSLine className={styles.dropdownIcon} /> : <RiArrowDownSLine className={styles.dropdownIcon} />}
            <p>{req_data.name}</p>
            {selected ? req_data.modules.map((item) => <p>{item}</p>) : ''}
        </div>
    )
}

export default AcademicRequirements
