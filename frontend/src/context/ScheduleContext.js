import { createContext } from "react";

// define context & load in from data files
const ScheduleContext = createContext({});

const ScheduleContextProvider = ({value, children}) => {
    return(
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    )
}

export {ScheduleContextProvider, ScheduleContext}