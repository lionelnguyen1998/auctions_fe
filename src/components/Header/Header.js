import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

function Header({auth}) {
    const logOut = () => {
        AuthService.logout();
    }
    return (
        <Fragment>
            <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                    </div>
                                    <div className="header__top__right__language">
                                        {
                                            auth ? (
                                                <>
                                                    <div>Hi {auth.user.name}</div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul>
                                                        <li><a href="/" className="nav-link" onClick={logOut}>Logout</a></li>
                                                        <li><Link to="/edit">Edit</Link></li>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    <div><i className="fa fa-user" style={{color:"black"}}></i></div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul>
                                                        <li> <Link to="/login" style={{color:"white"}}>Login</Link></li>
                                                        <li> <Link to="/register" style={{color:"white"}}>Register</Link></li>
                                                    </ul>
                                                </>
                                            )
                                        }
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header__logo">
                            <Link to="/" className="logo">Auctions</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to="/">Home</Link></li>
                                {
                                    auth ? (
                                        <li><Link to="/sell">sell</Link></li>
                                    ) : (
                                        <li><Link to="/login">sell</Link></li>
                                    )
                                }
                                <li><a href="#">Pages</a>
                                    <ul className="header__menu__dropdown">
                                        <li><a href="#">Shop Details</a></li>
                                        <li><a href="#">Shoping Cart</a></li>
                                        <li><a href="#">Check Out</a></li>
                                        <li><a href="#">Blog Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">News</a></li>
                                <li><Link to="/contacts">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                                <li><a href="#"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
        </Fragment>
    );
}

export default Header;
