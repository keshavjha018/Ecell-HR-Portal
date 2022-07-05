import { useRef } from "react"
import {FaBars, FaTimes} from "react-icons/fa";
import "../Styles/main.css";
import Home from '@material-ui/icons/Home';
//import Admin from '@material-ui/icons/Admin';
//import { ReactComponent as Logo } from './logo.svg';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    function Navbar() {
        const navRef = useRef();

        const showNavbar = () => {
            navRef.current.classList.toggle("responsive_nav");
        }
    return(
        <header>
            
            <h3>HR Portal</h3>
            <nav ref={navRef}>
                <Home>
                    
                </Home>
                <a href="/#">Home</a>
                
                <a href="/#">Admin</a>
                
                
                <button className ="nav-btn"onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className ="nav-btn" onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    );
}
export default Navbar;