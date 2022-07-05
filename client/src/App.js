import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmailVerify from './pages/EmailVerify';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/verifymail" element={<EmailVerify/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
