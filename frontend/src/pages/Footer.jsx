import React from "react";
import { FaYoutube, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate=useNavigate();
  return (
    <footer className="universal-footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">SyncTalk</h2>
          <p className="footer-text">
            SyncTalk enables smart, secure and high-quality video communication
            for meetings, classes, events and professional collaboration.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li onClick={()=>{
                navigate("/")
            }}>Home</li>
            <li onClick={()=>{
                navigate("/contact")
            }}>Contact</li>
            <li onClick={()=>{
                navigate("/auth")
            }}>Signup</li>
            <li onClick={()=>{
                navigate("/auth")
            }}>Login</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-list">
            <li>Email: support@synctalk.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Pune, Maharashtra</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-socials">
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SyncTalk • All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
