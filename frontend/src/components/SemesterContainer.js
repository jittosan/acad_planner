import React from 'react'
import Semester from './Semester'
import styles from './SemesterContainer.module.scss'

// test definitions
const test_obj = [
    {
        name:'Semester 1',
        acad_year: 'AY20/21',
        type:'SEM 1',
        id: 1,
        modules:['ESP1111', 'MA1512', 'MA1511']
    },
    {
        name:'Semester 2',
        acad_year: 'AY20/21',
        type:'SEM 2',
        id: 1,
        modules:['PC2030', 'ESP2111']
    },
    {
        name:'Semester 3',
        acad_year: 'AY21/22',
        type:'SEM 1',
        id: 1,
        modules:['MA1508E', 'ME2121', 'GEA1000']
    },
] 


const SemesterContainer = () => {
    return (
        <div>
            {test_obj.map((item) => <Semester sem_obj={item}  />)}
        </div>
    )
}

export default SemesterContainer
