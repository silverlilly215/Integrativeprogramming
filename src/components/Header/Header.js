import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header" id="home">
            <div className="header-content">
                <div className="header-left">
                    <h1>Hi! I,m Alexandra Ledesma</h1>
                    <p>Explore my work and skills as a front-end developer!</p>
                    <a href="/resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
                        Download Resume
                    </a>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="header-right">
                    <img src="/profile.png" alt="image" className="profile-image" />
                </div>
            </div>
        </div>
    );
};

export default Header;
