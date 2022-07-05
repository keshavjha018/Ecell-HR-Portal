import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import EmailVerify from './pages/EmailVerify';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/verifymail" element={<EmailVerify/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
