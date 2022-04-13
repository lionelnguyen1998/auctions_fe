import React, { Fragment} from 'react';
import Slider from '../Slider/Slider'

function Hero() {
    return (
        <Fragment>
             <section className="hero">
           <div className="container">
               <div className="row">
                   <div className="col-lg-3">
                       <div className="hero__categories">
                           <div className="hero__categories__all">
                               <i className="fa fa-bars"></i>
                               <span>all categories</span>
                           </div>
                           <ul>
                               <li><a href="#">categories1</a></li>
                               <li><a href="#">categories2</a></li>
                           </ul>
                       </div>
                   </div>
                   <div className="col-lg-9">
                       <div className="hero__search">
                           <div className="hero__search__form">
                               <form action="#">
                                   <div className="hero__search__categories">
                                       All Categories
                                       <span className="arrow_carrot-down"></span>
                                   </div>
                                   <input type="text" placeholder="What do yo u need?" />
                                   <button type="submit" className="site-btn">SEARCH</button>
                               </form>
                           </div>
                           <div className="hero__search__phone">
                               <div className="hero__search__phone__icon">
                                   <i className="fa fa-phone"></i>
                               </div>
                               <div className="hero__search__phone__text">
                                   <h5>1234567890</h5>
                                   <span>support 24/7 time</span>
                               </div>
                           </div>
                       </div>
                       <Slider />
                   </div>
               </div>
           </div>
       </section>
        </Fragment>
    )
}

export default Hero;