import { createContext } from "react";
import modData from '../data/modData.json'

// define context pertaining to DataStore objects (i.e. module information & networking)
const DataStoreContext = createContext(modData);

const DataStoreContextProvider = ({value, children}) => {
    return(
        <DataStoreContext.Provider value={value}>
            {children}
        </DataStoreContext.Provider>
    )
}

export {DataStoreContextProvider, DataStoreContext}