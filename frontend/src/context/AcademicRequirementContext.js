import { createContext } from "react";

// define context & load in from data files
const AcademicRequirementContext = createContext({});

const AcademicRequirementContextProvider = ({value, children}) => {
    return(
        <AcademicRequirementContext.Provider value={value}>
            {children}
        </AcademicRequirementContext.Provider>
    )
}

export {AcademicRequirementContextProvider, AcademicRequirementContext}