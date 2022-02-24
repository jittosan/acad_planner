import { useState } from 'react';
import './App.css';         // import global styles
import SemesterContainer from './components/Semester/NewSemesterContainer';    // import local components
import AcademicRequirementTray from './components/AcademicRequirements/AcademicRequirementTray';
import MainMenuTray from './components/Schedule/MainMenuTray';
import scheduleData from './data/schedule.json'  // import data from local file
import espMajor from './data/ESPMajor.json'
import physicsMinor from './data/physicsMinor.json'
import philoMinor from './data/philoMinor.json'
import csMinor from './data/CSMinor.json'
import nanoSpec from './data/nanoSpec.json'
import energySpec from './data/energySpec.json'
import { PlannerContextProvider } from './context/PlannerContext';

function App() {
  const [currentSchedule, setCurrentSchedule] = useState(0)   // state to track current selected schedule from list
  // const dataList = [espMajor, nanoSpec, energySpec, physicsMinor, csMinor,  philoMinor]
  const dataList = [espMajor, nanoSpec, physicsMinor, csMinor]
  return (
    <div className="App">
    <PlannerContextProvider 
      selectIndex={currentSchedule}
      scheduleList={scheduleData}
      acadList={dataList}
    >
        <div className='MainContainer'>
          <MainMenuTray updateSchedule={setCurrentSchedule} />
          <SemesterContainer />
          <AcademicRequirementTray />
        </div>
    </PlannerContextProvider>
    </div>
  );
}

export default App;