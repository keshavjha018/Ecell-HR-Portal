import React from 'react';
import {Link} from "react-router-dom";
import "./footer.css"
import logo from "../images/name.jpg"

function Footer() {
    return (
        <div>
            <footer className="footer" id="resources">
                <div className="container">
                    <div className="logo">
                        <Link to="#">
                            <img src={logo} alt=""/>
                        </Link>
                    </div>

                    {/* Quick Links  */}

                    <div className="quick-links">
                        <div className="links-group">
                            <span>Quick Links</span>
                            <div>
                                <Link to="/login" className='footerLinks'>Log In</Link> 
                                <Link to="/signup" className='footerLinks'>Create an Account</Link>
                                <Link to="/complaint" className='footerLinks'>Register an Issue</Link>
                            </div>
                        </div>
                        <div className="links-group">
                            <span>Team E-Cell</span>
                            <div>
                                <Link to="#" className='footerLinks'>About</Link>
                                <Link to="#" className='footerLinks'>Our Team</Link>
                                <Link to="#" className='footerLinks'>Careers</Link>
                                <Link to="#" className='footerLinks'>Contact</Link>
                            </div>
                        </div>
                    </div>
                    {/* Social Media */}
                    <div className="social-media">
                        <Link to="#">
                            <img className='footerSocialImg'
                                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-facebook.svg"
                                alt="Facebook Logo"
                            />
                        </Link>
                        <Link to="#">
                            <img className='footerSocialImg'
                                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-twitter.svg"
                                alt="Twitter Logo"
                            />
                        </Link>
                        <Link to="#">
                            <img className='footerSocialImg'
                                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-pinterest.svg"
                                alt="Pinterest Logo"
                            />
                        </Link>
                        <Link to="#">
                            <img className='footerSocialImg'
                                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-instagram.svg"
                                alt="Instagram Logo"
                            />
                        </Link>
                    </div>
                </div>
                {/* Made By */}
                <div className="attribution">
                    Contributed by Dev and Resource Team <br />
                    <span className="outer-link"> E-Cell IIIT Dharwad</span>.
                    
                </div>
            </footer>
        </div>
    )
}

export default Footer