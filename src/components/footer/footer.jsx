import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";

const Footer = () => {
    return(
        <div className="footer-container" >
            <div className="footer-link-wrapper" >
                <div className="footer-description" >
                    <h1>OUTFIT</h1>
                    <p>We  to create the best experiences for our customers</p>
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
                    <div className="footer-link-title" >Video</div>
                    <Link className="footer-link" to = "/">Submit Video</Link>
                    <Link className="footer-link" to = "/">Ambassadors</Link>
                    <Link className="footer-link" to = "/">Agency</Link>
                    <Link className="footer-link" to = "/">Influencer</Link>
                </div>
                <div className="footer-link-items" >
                    <div className="footer-link-title" >Social Media</div>
                    <a className="footer-link" href="/" >Instagram</a>
                    <a className="footer-link" href="/">Facebook</a>
                    <a className="footer-link" href="/">Youtube</a>
                    <a className="footer-link" href="/">Twitter</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;