import React, { useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  const router = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    router(path);
    setMenuOpen(false); 
  };

  return (
    <>
      <div className='landingPageContainer'>
        <nav>
          <div className="navHeader">
            <h2>
              <img src='/syncLogo.png' alt="logo" style={{width:"30px",height:"30px",marginRight:"10px"}} />
              SyncTalk
            </h2>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`bar ${menuOpen ? "change1" : ""}`}></div>
            <div className={`bar ${menuOpen ? "change2" : ""}`}></div>
            <div className={`bar ${menuOpen ? "change3" : ""}`}></div>
          </div>

          <div className={`navlist ${menuOpen ? "open" : ""}`}>
            <button className="btn" onClick={() => handleNavClick("/")}>Home</button>
            <button className="btn" onClick={() => handleNavClick("/contact")}>Contact Us</button>
            <button className="btn" onClick={() => handleNavClick("/fhgvbb")}>Join as Guest</button>
            <button className="btn" onClick={() => handleNavClick("/auth")}>Register</button>
            <button className="btn" onClick={() => handleNavClick("/auth")}>Login</button>
          </div>
        </nav>

        <div className="landingMainContainer">
          <div>
            <h1><span style={{color:"rgba(61, 125, 255, 1)"}}>Connect</span> with Loved ones!</h1>
            <p>Cover a distance by SyncTalk</p>
            <div role='button'>
              <Link to={"/auth"}>Get Started</Link>
            </div>
          </div>
          <div>
            <img src="/mobile.png" alt="mobile_image" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default LandingPage;
