import { createContext } from "react";
import { Schedule } from "../scripts/v3";

// define context
const ScheduleContext = createContext({});

const ScheduleContextProvider = ({value, update, children}) => {
    // wrap raw schedule data into Schedule class
    console.log(update)
    let newValue = new Schedule(value, update)

    return(
        <ScheduleContext.Provider value={newValue}>
            {children}
        </ScheduleContext.Provider>
    )
}

export {ScheduleContextProvider, ScheduleContext}