import { RiAdminFill } from "react-icons/ri";
import { FcHome } from "react-icons/fc";

export default function Navbar(){
    return <nav className = "nav">
        <a href="/" className="site-title">HR Portal</a>
        <ul>
        <div style={{display: "flex", justifyContent: "center"}}>
            <FcHome icon={FcHome} size = '2rem' />
        </div>
            {/* <FcHome icon={FcHome} size = '2rem' /> */}
            <li className="active">
                <a href="/home">Home</a>                
            </li>
            <RiAdminFill icon={RiAdminFill} size = '2rem'/>
            <li>
                <a href="/admin">Admin</a>
            </li>
        </ul>
    </nav>
}