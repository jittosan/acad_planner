import { createContext } from "react";

class demo {
    constructor() {
        this.text = 'TEST TEXT'
    }

    getText() {
        return this.text
    }

    setText(text) {
        this.text = text
    }
}


// define context
const ScheduleContext = createContext(new demo());

const ScheduleContextProvider = ({value, children}) => {
    return(
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    )
}

export {ScheduleContextProvider, ScheduleContext}