import React from 'react'
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
    return (
        <div>
            <p>{req_data.name}</p>
        </div>
    )
}

export default AcademicRequirements
