import React, { Fragment } from 'react';
import Hero from '../Hero/Hero';
import Category from '../Category/Category';
import Features from '../Features/Features';

function HomePage(){
    return (
        <Fragment>
            <Hero />
            <Category/>
            <Features />
        </Fragment>
    )
}

export default HomePage;