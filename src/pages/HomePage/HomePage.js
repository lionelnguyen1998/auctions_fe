import React, { Fragment, useEffect} from 'react';
import Hero from '../../components/Hero/Hero';
import Category from '../Category/Category';
import Features from '../Features/Features';
import auctionApi from '../../components/api/auctionApi';

function HomePage({t}){
    useEffect(() => {
        let interval = setInterval(() => {
            auctionApi.update();
        }, 24000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return (
        <Fragment>
            <Hero t={t}/>
            <Features />
            <Category/>
        </Fragment>
    )
}

export default HomePage;