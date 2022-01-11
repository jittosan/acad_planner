import { useEffect, useState } from 'react'
import { RiEditBoxLine } from 'react-icons/ri'
import { useContext } from 'react/cjs/react.development'

import { PlannerContext } from '../../context/PlannerContext'
import styles from './AcademicRequirementTray.module.scss'

const AcademicRequirementTray = () => {
    const planner = useContext(PlannerContext)
    let demoData = planner.getAllRequirements()
    const [triggerFlag, setTriggerFlag] = useState(false) // dummy flag to trigger refresh
    const [display, setDisplay] = useState(false)
    const showDisplay = () => {setDisplay(true)}
    const hideDisplay = () => {setDisplay(false)}
    
    useEffect(() => {
        const trigger = () => setTriggerFlag(!triggerFlag)
        planner.attachCallback(()=>{console.log('boop'); trigger()})
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

    // const visualiseRequirements = (currentNode, renderOutput) => {
    //     // category
    //     if (currentNode.type==="category") {
    //         renderOutput.push(currentNode)
    //     } else if (currentNode.type==="node" && currentNode.logic===".") {
    //         renderOutput.push(currentNode)
    //         return
    //     } 

    //     currentNode.modules.map((item) => visualiseRequirements(item, renderOutput))
    // }

    // let renderOutput = []
    // visualiseRequirements(requirement, renderOutput)
    // console.log(renderOutput)

    return (
        <div className={styles.fullDisplay}>
            <h1 onClick={()=>setSelectedIndex((selectedIndex+1)%planner.getAllRequirements().length)}>Academic Requirement</h1>
            {/* <h2>{requirement.name}</h2> */}
            <AcademicRequirementDisplayItem dataNode={requirement} />
            {/* {renderOutput.map((item, index) => <AcademicRequirementDisplayItem key={index} dataNode={item} />)} */}
        </div>
    )
}

export const AcademicRequirementDisplayItem = ({ dataNode, indent }) => {
    if (indent===undefined) {indent=0}
    // category node
    if (dataNode.type==="category") {
        console.log('CATEGORY', dataNode)
        return (
            <div>
                <strong>{dataNode.name}</strong>
                {dataNode.criteria.number!==undefined ? <i><br />{dataNode.criteria.number} of the following:<br /><br /></i> : (dataNode.criteria.credit!==undefined ? <i><br />{dataNode.criteria.credit} MCs worth:<br /><br /></i> : '')}
                {dataNode.modules.map((item, index) => <AcademicRequirementDisplayItem key={index} dataNode={item} indent={indent+1}/>)}
            </div>
        )
    // node EndPoint
    } else if (dataNode.type==="node" && dataNode.logic===".") {
        console.log('END', dataNode)
        return (
            <div>
                <p>{dataNode.modules[0]}<i>{dataNode.completed ? '  COMPL' : ''}</i></p>
            </div>
        )
    // node AND/OR
    } else if ((dataNode.type==="node" && dataNode.log!==".") || dataNode.type==="group") {
        console.log('LOGIC', dataNode.logic, dataNode)
        return (
            <div className={styles.combinationContainer}>
                <div className={styles.combinationBar}>
                    {dataNode.logic==="and" ? "&" : "or"}
                    {dataNode.completed ? "-Y" : "-X"}
                </div>
                <div>
                    {dataNode.modules.map((item, index) => <AcademicRequirementDisplayItem key={index} dataNode={item} indent={indent+1}/>)}
                </div>
            </div>
        )
    } else if (dataNode.type==="main") {
        indent=0
        console.log('MAIN', dataNode)
        return (
            <div>
                <h3>{dataNode.name}</h3>
                {dataNode.modules.map((item, index) => <AcademicRequirementDisplayItem key={index} dataNode={item} indent={indent+1}/>)}
            </div>
        )
    }
}
