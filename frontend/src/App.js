import './App.css';
import SemesterContainer from './components/SemesterContainer';
import AcademicRequirements from './components/AcademicRequirements';
import ScheduleHeader from './components/ScheduleHeader';
import ScheduleContainer from './components/ScheduleContainer';
import { ScheduleContextProvider } from './context/ScheduleContext';
import { useEffect, useState } from 'react';

//define test data
let acad_req_data = [
  {
      name: 'ESP',
      modules: ['ESP1111', 'ESP2111']
  },
  {
      name: 'IDP',
      modules: ['EG2310', 'EG2401A']
  },
  {
      name: 'Physics Minor',
      modules: ['PC1101']
  },

]
let sem_data = [
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
      modules:['CS1010E', 'ESP2111']
  },
  {
      name:'Y2S1',
      acad_year: 'AY21/22',
      type:'SEM 1',
      id: 1,
      modules:['PC2031', 'ME2121', 'GESS1014']
  },
  {
      name:'Y2S2',
      acad_year: 'AY21/22',
      type:'SEM 2',
      id: 1,
      modules:['GEC1010', 'ESP5402', 'MA1511']
  },
  {
      name:'Y2 Summer',
      acad_year: 'AY22/23',
      type:'ST I',
      id: 1,
      modules:['PC2020', 'ESP2111']
  },
  {
      name:'Y3S1',
      acad_year: 'AY22/23',
      type:'SEM 1',
      id: 1,
      modules:['MA1508E', 'ME2121', 'GEA1000']
  },
] 

let scheduleData = [
  {
    name:'First',
    semesters: [...sem_data]
  },
  {
    name:'Alternate',
    semesters: [...sem_data]
  },
  {
    name:'Extreme',
    semesters: [...sem_data]
  },
]
// const schedule_title = 'Ultimate Combi'
console.log(scheduleData)
function App() {
  const [currentSchedule, setCurrentSchedule] = useState(0)

  const [schedule, setSchedule] = useState(scheduleData[currentSchedule]['semesters'])
  console.log(schedule)
  const [flip, setFlip] = useState(true)
  const trigger = () => (setFlip(!flip))
  const update = (newState) => {setSchedule(newState);trigger()}

  return (
    <div className="App">
      {/* <ScheduleHeader title={'Academic Planner'}/> */}
      <ScheduleContextProvider value={schedule} update={update}>
      <div className='MainContainer'>
        <ScheduleContainer acad_req_data={acad_req_data} schedule={scheduleData} update={setCurrentSchedule} current={currentSchedule}/>
        <SemesterContainer />
        <AcademicRequirements acad_req_data={acad_req_data} />
      </div>
      </ScheduleContextProvider>
    </div>
  );
}

export default App;