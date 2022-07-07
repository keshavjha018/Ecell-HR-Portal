import React from 'react';
import {Link} from "react-router-dom";
import "./home.css";
import landingPic from "../images/employees.webp";

function Home() {
    return (
        <div>
            <section class="landing">
                <div class="landing-text">
                    <h1>Welcome to the <br /> HR PORTAL </h1>
                    <p>
                        Raise your voice against issues like Abuse, Boycott and Discrimination 
                        among the organisation.
                    </p>
                    <Link to="/complaint" class="btn btn-md regComplaintBtn">Register Complaint</Link>
                </div>
                <div class="landing-image">
                    <img src={landingPic} alt="img"/>
                </div>
            </section>
        </div>
    )
}

export default Home