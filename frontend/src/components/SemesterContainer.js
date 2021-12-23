import React, { useState } from 'react'
import Semester from './Semester'
import styles from '../styles/SemesterContainer.module.scss'
import { DataStore } from '../scripts/v3'

const SemesterContainer = ({sem_data}) => {
    console.log('LOCAL DATA')
    const [data, setData] = useState(new DataStore())
    console.log(data.getNode('ESP1111'))

    return (
        <div className={styles.container}>
            {sem_data.map((item, index) => <Semester key={index} sem_obj={item}  />)}
        </div>
    )
}

export default SemesterContainer
