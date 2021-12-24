import { createContext } from "react";

// define context relating to Academic Requirements
const AcademicRequirementContext = createContext({});

const AcademicRequirementContextProvider = ({value, children}) => {
    return(
        <AcademicRequirementContext.Provider value={value}>
            {children}
        </AcademicRequirementContext.Provider>
    )
}

export {AcademicRequirementContextProvider, AcademicRequirementContext}