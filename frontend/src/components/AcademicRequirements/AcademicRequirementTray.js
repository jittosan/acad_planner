import { RiEditBoxLine } from 'react-icons/ri'
import styles from './AcademicRequirementTray.module.scss'
import { useContext } from 'react/cjs/react.development'
import { useEffect, useState } from 'react'
import { PlannerContext } from '../../context/PlannerContext'

const AcademicRequirementTray = () => {
    const planner = useContext(PlannerContext)
    let demoData = planner.getAllRequirements()
    const [triggerFlag, setTriggerFlag] = useState(false)
    
    console.log('ACADTRAY')
    useEffect(() => {
        const trigger = () => setTriggerFlag(!triggerFlag)
        planner.attachCallback(()=>{console.log('boop');trigger()})
    }, [planner])

    return (
        <div className={styles.tray}>
            <div className={styles.tagContainer}>
            {/* <AcademicReqHandler /> */}
                {demoData.map((item, index) => <AcademicRequirementTab key={index} reqDataset={item} index={index} />)}
            </div>
            <div className={styles.editContainer}>
                <RiEditBoxLine />
            </div>

        </div>
    )
}

export default AcademicRequirementTray

// const AcademicReqHandler = () => {
//     let modData = useContext(DataStoreContext)
//     let scheduleMods = useContext(ScheduleContext).flatten()
//     // console.log('Academic Requirement Handler Test')
//     // let ml = ['ESP1111', 'CS1010E', 'ESP2111', 'GEC1010', 'GESS1014', 'ESP5402', 'GEA1000', 'GEQ1000', "PC2133",'PC1101', 'PC2174A', 'PC2193', 'PC2130' ,'PC2135', 'GER1000']
//     let phm = new AcademicRequirement(acadReqDemoAlt, modData)
//     let esp = new AcademicRequirement(acadReqDemo, modData)
//     // console.log('PHYSICS MINOR', phm.verify(scheduleMods))
//     console.log()
//     // console.log('ESP MAJOR',esp.verify(scheduleMods))
//     console.log()

//     return (
//         <div>
//             <p>..</p>
//         </div>
//     )
// }


const AcademicRequirementTab = ({reqDataset, index}) => {
    let planner = useContext(PlannerContext)
    let acadRequirementHandler = planner.getRequirement(index)
    console.log(acadRequirementHandler.getName(), planner.verify(index))

    return(
        <div className={`${styles.requirementTab} ${planner.verify(index) ? styles.completeRequirement : styles.incompleteRequirement}`}>
            <p>{reqDataset.getName().substring(0,3)}</p>
        </div>
    )
}