import { createContext } from "react";
import Planner from "../scripts/v4";
import modData from '../data/modData.json'

// Schedules, selectedScheduleIndex
// AcademicRequirements
// DataStore
// ModuleMap

// define context
const PlannerContext = createContext({});

const PlannerContextProvider = ({children, scheduleList, acadList, selectIndex, updateIndex}) => {
    // load data from data file or localStorage
    // parse data and place into object before populating component tree
    let newValue = new Planner(modData, scheduleList, acadList, selectIndex)
    // console.log('SCHEDULE LIST', scheduleList)
    // console.log('ACAD LIST', acadList)
    // console.log('SELECT INDEX', selectIndex)
    // console.log('UPDATE INDEX', updateIndex)
    console.log(newValue)
    // console.log(newValue.addSemester('NEW'))
    console.log(newValue)
    return(
        <PlannerContext.Provider value={newValue}>
            {children}
        </PlannerContext.Provider>
    )
}

export {PlannerContextProvider, PlannerContext}