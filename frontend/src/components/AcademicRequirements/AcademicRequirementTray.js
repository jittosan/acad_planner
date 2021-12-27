import { RiEditBoxLine } from 'react-icons/ri'
import { AcademicRequirement } from '../../scripts/v3'
import acadReqDemo from '../../data/acadReqDemo.json'
import styles from './AcademicRequirementTray.module.scss'
import {LargeTag} from './Tag'

// define demo data for tags
const demoTag = [
    {
        code : 'ESP',
        color: '#229'
    },
    {
        code : 'ESP',
        color: '#933'
    },
    {
        code : 'ESP',
        color: '#070'
    }
]

const AcademicRequirementTray = () => {
    return (
        <div className={styles.tray}>
            <div className={styles.tagContainer}>
            <AcademicReqHandler />
                {demoTag.map((item, index) => <LargeTag key={index} code={item.code} color={item.color} />)}
            </div>
            <div className={styles.editContainer}>
                <RiEditBoxLine />
            </div>

        </div>
    )
}

export default AcademicRequirementTray

const AcademicReqHandler = () => {
    console.log('Academic Requirement Handler Test')
    let ml = ['ESP1111', 'CS1010E', 'ESP2111', 'GEC1010', 'GESS1014', 'ESP5402', 'GEA1000', 'GET1012', "PC2130"]
    // let ml = ['ESP1111']
    let aca = new AcademicRequirement(acadReqDemo)
    console.log(aca)
    aca.match(ml)
    console.log(aca.flatten())
    console.log(aca.verify())

    return (
        <div>
            <p>..</p>
        </div>
    )
}
