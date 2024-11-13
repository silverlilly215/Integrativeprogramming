import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact" id="contact">
            <h2>Contact Me</h2>
            <form action="/submit_form" method="post">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
