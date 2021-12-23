import './App.css';
import SemesterContainer from './components/SemesterContainer';
import AcademicRequirements from './components/AcademicRequirements';
import ScheduleHeader from './components/ScheduleHeader';
import ScheduleContainer from './components/ScheduleContainer';

//define test data
const acad_req_data = [
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
const sem_data = [
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
      modules:['CS1010', 'ESP2111']
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
const schedule_title = 'Ultimate Combi'

function App() {
  return (
    <div className="App">
      {/* <ScheduleHeader title={schedule_title}/> */}
      <div className='MainContainer'>
        <ScheduleContainer acad_req_data={acad_req_data} />
        <SemesterContainer sem_data={sem_data} />
        <AcademicRequirements acad_req_data={acad_req_data} />
      </div>
    </div>
  );
}

export default App;