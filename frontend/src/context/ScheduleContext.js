import { createContext } from "react";
import { Schedule } from "../scripts/v3";

// define context pertaining to Scheduling
const ScheduleContext = createContext({});

const ScheduleContextProvider = ({value, update, children}) => {
    // wrap raw scheduleJSON data from file into Schedule class
    let newValue = new Schedule(value, update)

    return(
        <ScheduleContext.Provider value={newValue}>
            {children}
        </ScheduleContext.Provider>
    )
}

export {ScheduleContextProvider, ScheduleContext}