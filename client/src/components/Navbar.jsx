// import { RiAdminFill } from "react-icons/ri";
import { FcHome } from "react-icons/fc";
import "./Navbar.css";
import { Link } from "react-router-dom";
import LoginButton from "./Buttons/LoginButton";
import LogoutButton from "./Buttons/LogoutButton";

export default function Navbar() {

    //If user present in Local Storage => LoggedIn ; else => Not Logged In
    const loggedIn = localStorage.getItem("userInfo");

    return (
        <>
            <div className="navbar">
                <Link to="/" className="logoName">HR Portal</Link>
                <ul>
                    <li className="active navListItem">
                        <FcHome className="navIcon"/>
                        <Link to="/">Home</Link>
                    </li>

                    <li className="navListItem">
                        { loggedIn ? <LogoutButton/> : <LoginButton /> }
                    </li>
                
                    {/* <li className="navListItem">
                        <RiAdminFill className="navIcon"/>
                        <Link to="/">Admin</Link>
                    </li> */}
                </ul>
            </div>
        </>
    )
}