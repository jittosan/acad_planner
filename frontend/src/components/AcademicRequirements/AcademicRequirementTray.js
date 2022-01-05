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
    let planner = useContext(PlannerContext)
    const [selectedIndex, setSelectedIndex] = useState(0)
    let requirement = planner.getRequirement(selectedIndex).data
    console.log(requirement)

    const visualiseRequirements = (currentNode, renderOutput) => {
        // category
        if (currentNode.type==="category") {
            renderOutput.push(currentNode)
        } else if (currentNode.type==="node" && currentNode.logic===".") {
            renderOutput.push(currentNode)
            return
        } 

        currentNode.modules.map((item) => visualiseRequirements(item, renderOutput))
    }

    let renderOutput = []
    visualiseRequirements(requirement, renderOutput)
    console.log(renderOutput)

    return (
        <div className={styles.fullDisplay}>
            <h1 onClick={()=>setSelectedIndex(selectedIndex+1)}>Academic Requirement</h1>
            <h2>{requirement.name}</h2>
            {renderOutput.map((item, index) => <AcademicRequirementDisplayItem key={index} dataNode={item} />)}
        </div>
    )
}

export const AcademicRequirementDisplayItem = ({ dataNode }) => {
    let endpoint = false
    let renderOut
    // category node
    if (dataNode.type==="category") {
        renderOut = <strong>{dataNode.name}</strong>
    // node EndPoint
    } else if (dataNode.type==="node" && dataNode.logic===".") {
        endpoint = true
        renderOut = <p>{dataNode.modules[0]}</p>
    // node AND/OR
    } else if (dataNode.type==="node") {
        
    }
    
    return (
        <div>
            {renderOut}
            {endpoint ? <br /> : '' }
        </div>
    )
}
