import React, { useState } from 'react'
import { BsCheckCircle, BsDashCircle } from 'react-icons/bs'
import {RiArrowDownSLine,RiArrowRightSLine} from 'react-icons/ri'
import styles from './AcademicRequirements.module.scss'
import Tag from './Tag'

const AcademicRequirements = ({acad_req_data}) => {
    const [display, setDisplay] = useState(true)
    const showDisplay = () =>{setDisplay(true)}
    const hideDisplay = () =>{setDisplay(false)}

    return (
        <div className={`${styles.container} ${display ? '' : styles.hidden}`}>
            <strong  onClick={hideDisplay}>Requirements</strong>
            {acad_req_data.map((item) => <RequirementGroup req_data={item} />)}
        </div>
    )
}

const RequirementGroup = ({req_data}) => {
    const [selected, setSelected] = useState(false)
    const toggleSelect = () => {setSelected(!selected)}

    return (
        <>
        <div className={styles.requirementGroup} onClick={toggleSelect} >
            {selected ? <RiArrowRightSLine className={styles.dropdownIcon} /> : <RiArrowDownSLine className={styles.dropdownIcon} />}
            <Tag code={req_data.name.substring(0,3)} color={'#ec3cec'}/>
            <p className={styles.titleText}>{req_data.name}</p>
        </div>
                <div className={styles.dropdownContainer} style={{display: selected ? '' : 'none'}}>
                    {req_data.modules.map((item) => <RequiredModule code={item} />)}
                </div>
        </>
    )
}

const RequiredModule = ({code}) => {
    const [completed, setCompleted] = useState(false)
    return(
        <div className={styles.requiredModule} onClick={() => setCompleted(!completed)}>
            {completed ? <BsCheckCircle className={styles.checkIcon} /> : <BsDashCircle className={styles.dashIcon} />}
            <p>{code}</p>
        </div>
    )
}

export default AcademicRequirements
