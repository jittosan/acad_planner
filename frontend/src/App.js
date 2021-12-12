import logo from './logo.svg';
import './App.css';
import Semester from './components/Semester';

// test definitions
const test_obj = {
  name:'Semester 1',
  acad_year: 'AY20/21',
  type:'SEM 1',
  id: 1,
  modules:['PC2030', 'ESP2121']}




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Semester sem_obj={test_obj} />
      <Semester sem_obj={test_obj} />
      <Semester sem_obj={test_obj} />
      <Semester sem_obj={test_obj} />
    </div>
  );
}

export default App;