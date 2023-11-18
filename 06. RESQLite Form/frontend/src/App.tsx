import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllData from './components/AllData';
import DataEntry from './components/DataEntry';
import DataEdit from './components/DataEdit';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="root">
      <Router>
        <Routes>
          <Route path="/"  Component={AllData} />
          <Route path="/edit/:id" Component={DataEdit} />
          <Route path="/entry" Component={DataEntry} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
