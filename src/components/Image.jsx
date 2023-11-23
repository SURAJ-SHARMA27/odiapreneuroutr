// CardComponent.js

import React from 'react';
import '../components/stylecss/Image.css';


const CardComponent = () => {
    return (
    <div className="container2">
            <div className="card1">
                <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>
                <div className="circle">
                    <img src='./photo1.jpg' className="carousel-image"></img>

                </div>

            </div>
            <div className="card1">
                <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>
                <div className="circle">
                    <img src='./photo1.jpg' className="carousel-image"></img>

                </div>

            </div>
            <div className="card1">
                <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>
                <div className="circle">
                    <img src='./photo1.jpg' className="carousel-image"></img>

                </div>

            </div>

            <div className="card1">
                <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>
                <div className="circle">
                    <img src='./photo1.jpg' className="carousel-image"></img>

                </div>

            </div>
    </div>
    );
};

export default CardComponent;
