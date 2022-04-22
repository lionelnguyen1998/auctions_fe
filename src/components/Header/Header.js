import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";
import './index.css'

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
                                        <i className="fa fa-facebook"></i>
                                        <i className="fa fa-twitter"></i>
                                    </div>
                                    <div className="header__top__right__language">
                                        {
                                            auth ? (
                                                <>
                                                    <div>おはよう {auth.user.name}</div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul>
                                                        <li><a href="/" className="nav-link" onClick={logOut}>ログアウト</a></li>
                                                        <li><Link to="/edit">編集</Link></li>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    <div><i className="fa fa-user" style={{color:"black"}}></i></div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul>
                                                        <li> <Link to="/login" style={{color:"white"}}>ログイン</Link></li>
                                                        <li> <Link to="/register" style={{color:"white"}}>登録</Link></li>
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
                            <Link to="/" className="logo"><b>オークション</b></Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to="/">ホーム</Link></li>
                                {
                                    auth ? (
                                        <li><Link to="/sell">販売</Link></li>
                                    ) : (
                                        <li><Link to="/login">販売</Link></li>
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
                                <li><Link to="/contacts">お問い合わせ</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            {
                                auth && (
                                    <ul>
                                        <li><a href="#"><i className="fa fa-heart"></i><span>1</span></a></li>
                                        <li><a href="#"><i className="fa fa-bell"></i><span>1</span></a></li>
                                        <li><Link to="/auctions"><i className="fa fa-buysellads"></i></Link></li>
                                    </ul>
                                )
                            }
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
