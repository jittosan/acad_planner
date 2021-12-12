import React from 'react'
import Semester from './Semester'
import styles from './SemesterContainer.module.scss'

// test definitions
const test_obj = [
    {
        name:'Y1S1',
        acad_year: 'AY20/21',
        type:'SEM 1',
        id: 1,
        modules:['ESP1111', 'MA1512', 'MA1511']
    },
    {
        name:'Y1S2',
        acad_year: 'AY20/21',
        type:'SEM 2',
        id: 1,
        modules:['PC2030', 'ESP2111']
    },
    {
        name:'Y2S1',
        acad_year: 'AY21/22',
        type:'SEM 1',
        id: 1,
        modules:['MA1508E', 'ME2121', 'GEA1000']
    },
    {
        name:'Y2S2',
        acad_year: 'AY21/22',
        type:'SEM 2',
        id: 1,
        modules:['ESP1111', 'MA1512', 'MA1511']
    },
    {
        name:'Y2 Summer',
        acad_year: 'AY22/23',
        type:'ST I',
        id: 1,
        modules:['PC2030', 'ESP2111']
    },
    {
        name:'Y3S1',
        acad_year: 'AY22/23',
        type:'SEM 1',
        id: 1,
        modules:['MA1508E', 'ME2121', 'GEA1000']
    },
] 


const SemesterContainer = () => {
    return (
        <div className={styles.container}>
            {test_obj.map((item) => <Semester sem_obj={item}  />)}
        </div>
    )
}

export default SemesterContainer
