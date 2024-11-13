import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about" id="about">
            <div className="about-image-container">
                {/* No image tag here */}
            </div>
            <div className="about-text">
                <h2>About Me</h2>
                <p>
                    Hello! My name is Alexandra Ledesma, and I am now in my third year of the BSIT degree. I enjoy technology and have a small interest in web development and design. Sometimes I enjoy creating websites that are both beautiful and user-friendly. My primary focus is on front-end development because I must learn it for our software engineering subject, which requires me to bring creative ideas to life through code. I feel that technology may benefit individuals and make daily work simpler.
                </p>
            </div>
        </div>
    );
};

export default About;
