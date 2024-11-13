import React from 'react';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'; 
import Skills from './components/Skills/Skills';
import './index.css';
import './App.css';

function App() {
    return (
        <div>
            <Navbar />
            <Header />
            <About />
            <Skills />
            <Portfolio />
            <Contact />
            <Footer />
          
        </div>
    );
}

export default App;
