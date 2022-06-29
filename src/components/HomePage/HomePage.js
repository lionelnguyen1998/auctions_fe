import React, { Fragment, useEffect} from 'react';
import Hero from '../Hero/Hero';
import Category from '../Category/Category';
import Features from '../Features/Features';
import auctionApi from '../api/auctionApi';

function HomePage({t}){
    useEffect(() => {
        auctionApi.update();
    }, [])
    return (
        <Fragment>
            <Hero t={t}/>
            <Features />
            <Category/>
        </Fragment>
    )
}

export default HomePage;