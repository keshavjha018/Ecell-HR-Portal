import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmailVerify from './pages/EmailVerify';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/signup" element={<Signup/>} />
        <Route exact path ="/login" element={<Login/>} />
        <Route exact path ="/verifymail" element={<EmailVerify/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
