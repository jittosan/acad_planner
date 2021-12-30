import { createContext } from "react";
import Planner from "../scripts/v4";

// Schedules, selectedScheduleIndex
// AcademicRequirements
// DataStore
// ModuleMap

// define context
const PlannerContext = createContext({});

const PlannerContextProvider = ({children}) => {
    // load data from data file or localStorage
    // parse data and place into object before populating component tree
    let newValue = new Planner()

    return(
        <PlannerContext.Provider value={newValue}>
            {children}
        </PlannerContext.Provider>
    )
}

export {PlannerContextProvider, PlannerContext}