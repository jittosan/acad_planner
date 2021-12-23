import { createContext } from "react";
import modData from '../data/modData.json'

// define context & load in from data files
const DataStoreContext = createContext(modData);

const DataStoreContextProvider = ({value, children}) => {
    return(
        <DataStoreContext.Provider value={value}>
            {children}
        </DataStoreContext.Provider>
    )
}

export {DataStoreContextProvider, DataStoreContext}