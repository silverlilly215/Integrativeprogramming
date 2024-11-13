import React from 'react';
import './Skills.css';

const Skills = () => {
    const skills = [
        { name: "HTML", level: "Intermediate", value: 70, icon: "fab fa-html5" },
        { name: "CSS", level: "Intermediate", value: 65, icon: "fab fa-css3-alt" },
        { name: "JavaScript", level: "Beginner", value: 50, icon: "fab fa-js" },
        { name: "React", level: "Beginner", value: 45, icon: "fab fa-react" },
        { name: "UI/UX Design", level: "Advanced", value: 80, icon: "fas fa-paint-brush" },
    ];

    return (
        <div className="skills">
            <h3>Front End Skills</h3>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <div className="skill" key={index}>
                        <i className={`${skill.icon} skill-icon`}></i>
                        <div className="skill-info">
                            <div className="pie-chart">
                                <svg width="100" height="100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="pink"
                                        strokeWidth="10"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="#ff88cc"
                                        strokeWidth="10"
                                        fill="transparent"
                                        strokeDasharray={`${skill.value} ${100 - skill.value}`}
                                        strokeDashoffset="25"
                                        style={{ transition: 'stroke-dasharray 0.4s ease-in-out' }}
                                    />
                                </svg>
                            </div>
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-label">{skill.level}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
