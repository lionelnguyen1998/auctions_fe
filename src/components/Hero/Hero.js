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
                               <span>全てカテゴリー</span>
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
                                      全てカテゴリー
                                       <span className="arrow_carrot-down"></span>
                                   </div>
                                   <input type="text" placeholder="検索" />
                                   <button type="submit" className="site-btn">検索</button>
                               </form>
                           </div>
                           <div className="hero__search__phone">
                               <div className="hero__search__phone__icon">
                                   <i className="fa fa-phone"></i>
                               </div>
                               <div className="hero__search__phone__text">
                                   <h5>1234567890</h5>
                                   <span>８時午前～２２時午後</span>
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