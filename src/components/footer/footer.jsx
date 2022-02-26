import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

const Footer = () => {
    return(
        <>
            <div className="footer-container" >
                <div className="footer-link-wrapper" >
                    <div className="footer-description" >
                        <Link to = "/">
                            <h2 style={{color: "#1c1d1f"}} >OVERFIT</h2>
                        </Link>
                        <p>We create the best experiences for our customers</p>
                    </div>
                    <div className="footer-link-items" >
                        <div className="footer-link-title" >Contact Us</div>
                        <Link className="footer-link" to = "/">Contact</Link>
                        <Link className="footer-link" to = "/">Support</Link>
                        <Link className="footer-link" to = "/">Destinations</Link>
                        <Link className="footer-link" to = "/">Sponsorships</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper" >
                    <div className="footer-link-items" >
                        <div className="footer-link-title" >Company</div>
                        <Link className="footer-link" to = "/">About</Link>
                        <Link className="footer-link" to = "/">Factories</Link>
                        <Link className="footer-link" to = "/">Careers</Link>
                        <Link className="footer-link" to = "/">International</Link>
                    </div>
                    <div className="footer-link-items" >
                        <div className="footer-link-title" >Connect</div>
                        <a className="footer-link" href="https://www.instagram.com/vichang517/" target="_blank" rel="noreferrer">Instagram</a>
                        <a className="footer-link" href="https://www.facebook.com/profile.php?id=100001558004053" target="_blank" rel="noreferrer">Facebook</a>
                        <a className="footer-link" href="/" target="_blank" rel="noreferrer">Youtube</a>
                        <a className="footer-link" href="https://twitter.com/VicChang17" target="_blank" rel="noreferrer">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="copyright" >
                <p>ⓒ {new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </>
    );
}

export default Footer;