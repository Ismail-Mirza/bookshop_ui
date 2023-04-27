import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <div className="footer">
            <div>
                <div>
                    <p>Contact us</p>
                    <p>Dhaka,Bangladesh</p>
                    <p>boiwala.ishara@gmail.com</p>
                </div>
                <div>
                    <p>Important stuff</p>
                    <p>Cookies</p>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Secure shopping</p>
                </div>
                <div>
                    <p>Explore</p>
                    <p>About us</p>
                    <p>Bookmarks</p>
                </div>
                <div>
                    <p>Join us</p>
                    <p>Job</p>
                    <p>Affiliates</p>
                </div>
                <div>
                    <p>Follow us on:</p>
                    <div>
                        <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
                        <FontAwesomeIcon className="icon" icon={faInstagram} />
                        <FontAwesomeIcon className="icon" icon={faTwitter} />
                        <FontAwesomeIcon className="icon" icon={faLinkedin} />
                    </div>
                </div>
            </div>
            <div className="mobileFooter">
                <div>
                    <div>
                        <p>Follow us on:</p>
                        <div>
                            <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
                            <FontAwesomeIcon className="icon" icon={faInstagram} />
                            <FontAwesomeIcon className="icon" icon={faTwitter} />
                            <FontAwesomeIcon className="icon" icon={faLinkedin} />
                        </div>
                    </div>
                </div>
                <div>
                    <small>
                        <Link to="/contactUs">Contact us</Link> | <Link to="/importantStuff">Important staff</Link> | <Link to="/explore">Explore</Link> | <Link to="/joinUs">Join us</Link>
                    </small>
                </div>
            </div>
            <div>
                <small style={{ textAlign: "center" }}>© {currentYear} Boiwala</small>
            </div>
        </div>
    );
};

export default Footer;