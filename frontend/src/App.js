import { useState } from 'react';
import './App.css';         // import global styles
import SemesterContainer from './components/Semester/NewSemesterContainer';    // import local components
import AcademicRequirements from './components/AcademicRequirements/AcademicRequirements';
import ScheduleContainer from './components/Schedule/ScheduleContainer';
import { ScheduleContextProvider } from './context/ScheduleContext';    
import scheduleData from './data/schedule.json'  // import data from local file
import acadReqDemoAlt from './data/acadReqDemoAlt.json'
import acadReqDemo from './data/acadReqDemo.json'
import AcademicRequirementTray from './components/AcademicRequirements/AcademicRequirementTray';
import MainMenuTray from './components/Schedule/MainMenuTray';
import { PlannerContextProvider } from './context/PlannerContext';

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
  const [currentSchedule, setCurrentSchedule] = useState(0)   // state to track current selected schedule from list
  const selectSchedule = (index) => {setCurrentSchedule(index);trigger()}
  const [flip, setFlip] = useState(true)      // dummy state to trigger for rerenders (setCurrentSchedule apparently does not trigger rerender cycles properly)
  const trigger = () => (setFlip(!flip))
  const update = (newState) => {trigger()}
  let schedule = scheduleData[currentSchedule]['semesters']   // extract imported data into variable
  
  return (
    <div className="App">
    <PlannerContextProvider 
      selectIndex={currentSchedule}
      updateIndex={setCurrentSchedule}
      scheduleList={scheduleData}
      acadList={[acadReqDemoAlt, acadReqDemo]}
    >
      <ScheduleContextProvider value={schedule} update={update}>
        <div className='MainContainer'>
        <MainMenuTray />
          {/* <ScheduleContainer schedule={scheduleData} update={selectSchedule} current={currentSchedule}/> */}
          <SemesterContainer />
          <AcademicRequirementTray />
          {/* <AcademicRequirements acad_req_data={acad_req_data} /> */}
        </div>
      </ScheduleContextProvider>
    </PlannerContextProvider>
    </div>
  );
}

export default App;