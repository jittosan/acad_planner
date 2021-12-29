import { RiEditBoxLine } from 'react-icons/ri'
import { AcademicRequirement } from '../../scripts/v3'
import acadReqDemo from '../../data/acadReqDemo.json'
import acadReqDemoAlt from '../../data/acadReqDemoAlt.json'
import styles from './AcademicRequirementTray.module.scss'
import { useContext } from 'react/cjs/react.development'
import { DataStoreContext } from '../../context/DataStoreContext'
import { ScheduleContext } from '../../context/ScheduleContext'

let demoData = [acadReqDemo, acadReqDemoAlt]

const AcademicRequirementTray = () => {
    return (
        <div className={styles.tray}>
            <div className={styles.tagContainer}>
            {/* <AcademicReqHandler /> */}
                {demoData.map((item, index) => <AcademicRequirementTab key={index} reqDataset={item} />)}
            </div>
            <div className={styles.editContainer}>
                <RiEditBoxLine />
            </div>

        </div>
    )
}

export default AcademicRequirementTray

const AcademicReqHandler = () => {
    let modData = useContext(DataStoreContext)
    let scheduleMods = useContext(ScheduleContext).flatten()
    // console.log('Academic Requirement Handler Test')
    // let ml = ['ESP1111', 'CS1010E', 'ESP2111', 'GEC1010', 'GESS1014', 'ESP5402', 'GEA1000', 'GEQ1000', "PC2133",'PC1101', 'PC2174A', 'PC2193', 'PC2130' ,'PC2135', 'GER1000']
    let phm = new AcademicRequirement(acadReqDemoAlt, modData)
    let esp = new AcademicRequirement(acadReqDemo, modData)
    // console.log('PHYSICS MINOR', phm.verify(scheduleMods))
    console.log()
    // console.log('ESP MAJOR',esp.verify(scheduleMods))
    console.log()

    return (
        <div>
            <p>..</p>
        </div>
    )
}


const AcademicRequirementTab = ({reqDataset}) => {
    let modData = useContext(DataStoreContext)
    let scheduleMods = useContext(ScheduleContext).flatten()
    let acadRequirementHandler = new AcademicRequirement(reqDataset, modData)
    console.log(reqDataset.name, acadRequirementHandler.verify(scheduleMods))

    return(
        <div className={`${styles.requirementTab} ${acadRequirementHandler.verify(scheduleMods) ? styles.completeRequirement : styles.incompleteRequirement}`}>
            <p>{reqDataset.name.substring(0,3)}</p>
        </div>
    )
}