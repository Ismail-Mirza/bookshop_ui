import React from 'react';
import './Shop.css';
import RecentAdded from '../RecentAdded/RecentAdded';
import CarouselSec from '../CarouselSec/CarouselSec';

const Shop = () => {

    return (
        <div className="shop">
            <div className="shopCarousel">
                <CarouselSec></CarouselSec>
            </div>
            <RecentAdded></RecentAdded>
        </div>
    );
};

export default Shop;