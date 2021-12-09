import React from "react";

import "./footer.scss"

function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer>
        <div className="footer-container">
          <a href="https://www.linkedin.com/in/vicchang0517/" target="_blank" rel="noreferrer" >Contact Us</a>
          <h2>Shipping & Returns</h2>
          <p>Copyright ⓒ {year}</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;