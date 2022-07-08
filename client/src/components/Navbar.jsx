import { RiAdminFill } from "react-icons/ri";
import { FcHome } from "react-icons/fc";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
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
                        <RiAdminFill className="navIcon"/>
                        <Link to="/">Admin</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}