import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Portfolio.css';

const Portfolio = () => {
    const images = [
        "REACRFIRST/public/1.jpg",
        "/public/7.jpg",
        "/public/3.jpg",
        "/public/4.jpg",
        "/public/5.jpg",
        "/public/6.jpg",
    ];

    // Create items for the carousel
    const items = images.map((image, index) => (
        <div className="portfolio-item" key={index}>
            <div className="frame">  {/* Frame container added */}
                <div className="image-container">
                    <img src={image} alt={`Image ${index + 1}`} className="portfolio-image" />
                </div>
            </div>
            <h1 className="image-title">Image {index + 1}</h1>
        </div>
    ));

    return (
        <div className="portfolio" id="portfolio">
            <div className="portfolio-content">
                <h2 className="portfolio-title">My Works</h2>
                <AliceCarousel
                    items={items}
                    autoPlay
                    autoPlayInterval={3000}
                    infinite
                    disableButtonsControls
                    responsive={{
                        0: { items: 1 },  // Show 1 image on small screens
                        768: { items: 2 }, // Show 2 images on medium screens
                        1024: { items: 3 }, // Show 3 images at a time on larger screens
                    }}
                />
            </div>
        </div>
    );
};

export default Portfolio;
