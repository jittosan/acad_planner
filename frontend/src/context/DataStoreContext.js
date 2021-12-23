import { createContext } from "react";

// define context & load in from data files
const DataStoreContext = createContext({});

const DataStoreContextProvider = ({value, children}) => {
    return(
        <DataStoreContext.Provider value={value}>
            {children}
        </DataStoreContext.Provider>
    )
}

export {DataStoreContextProvider, DataStoreContext}