import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailVerify from './pages/EmailVerify';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComplaintForm from "./pages/complaint";
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <Navbar/>
    <ToastContainer position="top-center" autoClose="2500"/>
    <Router>
      <Routes>
        <Route exact path ="/" element={<Home/>} />
        <Route exact path ="/signup" element={<Signup/>} />
        <Route exact path ="/login" element={<Login/>} />
        <Route exact path="/complaint" element={<ComplaintForm />} />
        <Route exact path ="/verify/mail" element={<EmailVerify/>} />
        {/* <Route exact path="*" element={<Error />} /> */}
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
