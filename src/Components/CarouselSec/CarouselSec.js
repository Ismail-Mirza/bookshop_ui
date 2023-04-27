import React from 'react';
import './CarouselSec.css';
import carousel1 from '../../images/carousel/carousel-1.jpg';
import carousel2 from '../../images/carousel/carousel-2.jpg';
import carousel3 from '../../images/carousel/carousel-3.jpg';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const CarouselSec = () => {
    const [x, setX] = useState(0);

    let carouselArray = [
        <img src={carousel1} alt="" />,
        <img src={carousel2} alt="" />,
        <img src={carousel3} alt="" />
    ]

    useEffect(() => {
        setTimeout(() => {x === -100 * (carouselArray.length - 1) ? setX(0) : setX(x - 100)}, 5000);
    }, [x, carouselArray.length]);

    // const goLeft = () => {
    //     x === 0 ? setX(-100 * (carouselArray.length - 1)) : setX(x + 100);
    // };

    // const goRight = () => {
    //     x === -100 * (carouselArray.length - 1) ? setX(0) : setX(x - 100);
    // };

    return (
        <div className="carouselSec">
            {
                carouselArray.map((item, index) => (
                    <div key={index} className="carouselItem" style={{ transform: `translateX(${x}%)` }}>
                        {item}
                    </div>
                ))
            }
            {/* <button id="goLeft" onClick={goLeft}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <button id="goRight" onClick={goRight}><FontAwesomeIcon icon={faChevronRight} /></button> */}
        </div>
    );
};

export default CarouselSec;