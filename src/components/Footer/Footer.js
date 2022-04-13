import React, { Fragment } from 'react';

function Footer() {

  return (
    <Fragment>
         <footer className="footer spad">
           <div className="container">
               <div className="row">
                   <div className="col-lg-3 col-md-6 col-sm-6">
                       <div className="footer__about">
                           <div className="footer__about__logo">
                               <a href="#" className="logo">Auctions</a>
                           </div>
                           <ul>
                               <li>Address: abcd</li>
                               <li>Phone: 1234567890</li>
                               <li>Email: abcd@gmail.com</li>
                           </ul>
                       </div>
                   </div>
                   <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                       <div className="footer__widget">
                           <h6>Useful Links</h6>
                           <ul>
                               <li><a href="#">About Us</a></li>
                               <li><a href="#">About Our Shop</a></li>
                           </ul>
                           <ul>
                               <li><a href="#">Who We Are</a></li>
                               <li><a href="#">Our Services</a></li>
                               <li><a href="#">Projects</a></li>
                           </ul>
                       </div>
                   </div>
                   <div className="col-lg-4 col-md-12">
                       <div className="footer__widget">
                           <h6>Join Our Newsletter Now</h6>
                           <p>Get E-mail updates about our latest shop and special offers.</p>
                           <form action="#">
                               <input type="text" placeholder="Enter your mail" />
                               <button type="submit" className="site-btn">Subscribe</button>
                           </form>
                           <div className="footer__widget__social">
                               <a href="#"><i className="fa fa-facebook"></i></a>
                               <a href="#"><i className="fa fa-instagram"></i></a>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </footer>
    </Fragment>
  );
}

export default Footer;
