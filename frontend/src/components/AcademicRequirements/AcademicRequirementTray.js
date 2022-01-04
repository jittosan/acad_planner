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
    }, [planner, triggerFlag])

    return (
        <div className={styles.tray}>
            <div className={styles.tagContainer}>
            {/* <AcademicReqHandler /> */}
                {demoData.map((_, index) => <AcademicRequirementTab key={index} index={index} />)}
            </div>
            <div className={styles.editContainer}>
                <RiEditBoxLine />
            </div>

        </div>
    )
}

export default AcademicRequirementTray

const AcademicRequirementTab = ({index}) => {
    let planner = useContext(PlannerContext)
    let acadRequirementHandler = planner.getRequirement(index)
    // console.log(acadRequirementHandler.getName(), planner.verify(index))
    console.log('Acad Refresh')
    return(
        <div className={`${styles.requirementTab} ${planner.verify(index) ? styles.completeRequirement : styles.incompleteRequirement}`}>
            <p>{acadRequirementHandler.getName().substring(0,3)}</p>
        </div>
    )
}