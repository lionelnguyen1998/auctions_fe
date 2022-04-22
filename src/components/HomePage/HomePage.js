import React, { Fragment, useEffect } from 'react';
import Hero from '../Hero/Hero';
import Category from '../Category/Category';
import Features from '../Features/Features';
import auctionApi from '../api/auctionApi';

function HomePage(){
    useEffect(() => {
        auctionApi.update();
    }, [])
    return (
        <Fragment>
            <Hero />
            <Category/>
            <Features />
        </Fragment>
    )
}

export default HomePage;