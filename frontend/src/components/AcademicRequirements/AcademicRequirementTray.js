import { RiEditBoxLine } from 'react-icons/ri'
import styles from './AcademicRequirementTray.module.scss'
import { useContext } from 'react/cjs/react.development'
import { useEffect, useState } from 'react'
import { PlannerContext } from '../../context/PlannerContext'

const AcademicRequirementTray = () => {
    const planner = useContext(PlannerContext)
    let demoData = planner.getAllRequirements()
    const [triggerFlag, setTriggerFlag] = useState(false) // dummy flag to trigger refresh
    const [display, setDisplay] = useState(false)
    const showDisplay = () => {setDisplay(true)}
    const hideDisplay = () => {setDisplay(false)}
    
    console.log('ACADTRAY')
    useEffect(() => {
        const trigger = () => setTriggerFlag(!triggerFlag)
        planner.attachCallback(()=>{console.log('boop');trigger()})
    }, [planner, triggerFlag])

    return (
        <div className={`${styles.tray} ${display ? styles.displayEnlarged : styles.displayMinimised}`}>
            {display ?
                <AcademicRequirementDisplay />
                : 
                <div className={styles.tagContainer}>
                    {demoData.map((_, index) => <AcademicRequirementTab key={index} index={index} />)}
                </div>
            }
            <div className={styles.editContainer}>
                <RiEditBoxLine onClick={()=>{if(display) {hideDisplay()} else {showDisplay()}}} />
            </div>

        </div>
    )
}

export default AcademicRequirementTray

// Tab for display within tray
const AcademicRequirementTab = ({index}) => {
    let planner = useContext(PlannerContext)
    let acadRequirementHandler = planner.getRequirement(index)
    console.log(acadRequirementHandler.getName(), planner.verify(index))
    
    return(
        <div className={`${styles.requirementTab} ${planner.verify(index) ? styles.completeRequirement : styles.incompleteRequirement}`}>
            <p>{acadRequirementHandler.getName().substring(0,3)}</p>
        </div>
    )
}

// Component for full-screen display of Academic Requirements
export const AcademicRequirementDisplay = () => {
    return (
        <div>
            <h1>Academic Requirement</h1>
        </div>
    )
}

