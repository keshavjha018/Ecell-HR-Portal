import React from 'react';
import {Link} from "react-router-dom";
import "./home.css";
import landingPic from "../images/employees.webp";

function Home() {
    return (
        <div>
            <section className="landing">
                <div className="landing-text">
                    <h1>Welcome to the <br /> HR PORTAL </h1>
                    <p>
                        Raise your voice against issues like Abuse, Boycott and Discrimination 
                        among the organisation.
                    </p>
                    <Link to="/complaint" className="btn btn-md regComplaintBtn">Register Complaint</Link>
                </div>
                <div className="landing-image">
                    <img src={landingPic} alt="img"/>
                </div>
            </section>
        </div>
    )
}

export default Home