import { createContext } from "react";
import Planner from "../scripts/v4";
import modData from '../data/modData.json'

// Schedules, selectedScheduleIndex
// AcademicRequirements
// DataStore
// ModuleMap

// define context
const PlannerContext = createContext({});

const PlannerContextProvider = ({children, scheduleList, acadList, selectIndex, callbacks}) => {
    // load data from data file or localStorage
    // parse data and place into object before populating component tree
    let newValue = new Planner(modData, scheduleList, acadList, selectIndex)

    return(
        <PlannerContext.Provider value={newValue}>
            {children}
        </PlannerContext.Provider>
    )
}

export {PlannerContextProvider, PlannerContext}