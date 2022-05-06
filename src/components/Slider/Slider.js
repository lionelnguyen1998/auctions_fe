import React, { Fragment, useEffect, useState, useRef } from 'react';
import auctionApi from '../api/auctionApi';
import './index.css'

function SliderHome() {
    const [index, setIndex] = useState(0)
    const [sliders, setSliders] = useState([])
    const timeoutRef = useRef(null);
    function resetTimeout() {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        auctionApi.slider()
            .then(res => {
                setSliders(res.data.data)
            })
    }, [])

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => 
        setIndex((prevIndex) =>
                prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
                ),
            delay
            );

            return () => {
            resetTimeout();
            };
        }, [index]);

    const delay = 2500;
    return (
        <Fragment>
            <div className="slideshow">
                <div
                    className="slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                    {sliders.map((slider, index) => (
                    <div
                        className="slide"
                        key={index}
                    >
                        <img src={slider.image} />
                    </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default SliderHome;