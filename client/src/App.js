import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ComplaintForm from './pages/complaint';


function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route exact path="/" element={<ComplaintForm/>} />

      </Routes>
      </Router>
    </>
  );
}

export default App;
