import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <Fragment>
         <footer className="footer spad">
           <div className="container">
               <div className="row">
                   <div className="col-lg-3 col-md-6 col-sm-6">
                       <div className="footer__about">
                           <div className="footer__about__logo">
                           <Link to="/" className="logo"><b>オークション</b></Link>
                           </div>
                           <ul>
                               <li>アドレス: 2P Trần Đại Nghĩa, Bách Khoa, Hai Bà Trưng, Hà Nội</li>
                               <li>電話番号: 1234567890</li>
                               <li>メールアドレス: auction@gmail.com</li>
                           </ul>
                       </div>
                   </div>
                   <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                       <div className="footer__widget">
                           <h6>他の情報</h6>
                           <ul>
                               <li><a href="#">私達について</a></li>
                               <li><a href="#">使い方</a></li>
                           </ul>
                       </div>
                   </div>
                   <div className="col-lg-4 col-md-12">
                       <div className="footer__widget">
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
