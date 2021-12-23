import './App.css';
import SemesterContainer from './components/SemesterContainer';
import AcademicRequirements from './components/AcademicRequirements';
import ScheduleContainer from './components/ScheduleContainer';
import { ScheduleContextProvider } from './context/ScheduleContext';
import { useState } from 'react';
import scheduleData from './data/schedule.json'

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

function App() {
  const [currentSchedule, setCurrentSchedule] = useState(0)
  const selectSchedule = (index) => {console.log(index);setCurrentSchedule(index);trigger()}
  let schedule = scheduleData[currentSchedule]['semesters']
  const [flip, setFlip] = useState(true)
  const trigger = () => (setFlip(!flip))
  const update = (newState) => {trigger()}

  return (
    <div className="App">
      <ScheduleContextProvider value={schedule} update={update}>
      <div className='MainContainer'>
        <ScheduleContainer schedule={scheduleData} update={selectSchedule} current={currentSchedule}/>
        <SemesterContainer />
        <AcademicRequirements acad_req_data={acad_req_data} />
      </div>
      </ScheduleContextProvider>
    </div>
  );
}

export default App;