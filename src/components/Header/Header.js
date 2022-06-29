import React, { Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import auctionApi from '../api/auctionApi';
import userApi from '../api/userApi';
import notificationApi from '../api/notificationApi';
import AuthService from "../services/auth.service";
import {useTranslation} from 'react-i18next';
import './index.css'

function Header({auth}) {
    const [totalLiked, setTotalLiked] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [notifications, setNotifications] = useState([])
    const [totalNotRead, setTotalNotRead] = useState('')
    const index = 1;
    const isNotRead = 1;
    const count = 4;
    const {t} = useTranslation()
    const logOut = () => {
        AuthService.logout();
    }

    const getRequestParams = (index, count, isNotRead) => {
        let params = {};
        if (index) {
          params["index"] = index;
        }
        if (count) {
          params["count"] = count;
        }
        if (count) {
            params["is_not_read"] = isNotRead;
        }
        return params;
    };

    useEffect(() => {
        auctionApi.getTotalLikeOfUser()
            .then((res) => {
                setTotalLiked(res.data.data.total_liked)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    useEffect(() => {
        userApi.info()
            .then((res) => {
                setUserInfo(res.data.data)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    useEffect(() => {
        const params = getRequestParams( index, count, isNotRead);
        notificationApi.getAllNotification(params)
            .then((res) => {
                setNotifications(res.data.data.denys)
                setTotalNotRead(res.data.data.total_not_read)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [totalNotRead])
    
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
                                    <div className="header__top__right__language">
                                        {
                                            auth ? (
                                                <>
                                                    <div><b>{t('header.hello')} {userInfo.name}</b></div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul className="dropdown">
                                                        <div class="dropdown-content">
                                                            <li><a href="/" className="nav-link" onClick={logOut} style={{color:"#1C1C1C"}}>{t('account.logout')}</a></li>
                                                            <li><Link to="/edit" style={{color:"#1C1C1C"}}>{t('account.edit')}</Link></li>
                                                            <li><Link to="/changepass" style={{color:"#1C1C1C"}}>{t('account.changepass')}</Link></li>
                                                            
                                                        </div>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    <div><i className="fa fa-user" style={{color:"black"}}></i></div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul className="dropdown">
                                                        <div class="dropdown-content">
                                                            <li> <Link to="/login" style={{color:"#1C1C1C"}}>{t('account.login')}</Link></li>
                                                            <li> <Link to="/register" style={{color:"#1C1C1C"}}>{t('account.register')}</Link></li>
                                                        </div>
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
                            <Link to="/" className="logo"><b>{t('header.auctions')}</b></Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to="/">{t('header.homepage')}</Link></li>
                                {
                                    auth ? (
                                        <li><Link to="/sell">{t('header.selling')}</Link></li>
                                    ) : (
                                        <li><Link to="/login">{t('header.selling')}</Link></li>
                                    )
                                }
                                <li><Link to='/news'>{t('header.news')}</Link></li>
                                <li><Link to="/contacts">{t('header.contacts')}</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            {
                                auth && (
                                    <ul>
                                        <li>   
                                            <Link to="/likes">
                                                <i className="fa fa-heart"></i>
                                                <span>{totalLiked}</span>
                                            </Link>
                                        </li>
                                        <li className="dropdown">
                                            <Link to="/notifications">
                                                <i className="fa fa-bell"></i>
                                                <span>{totalNotRead}</span>
                                            </Link>
                                            <div class="dropdown-content">
                                                {
                                                    notifications.map((notification, index) => (
                                                        <div key={index}>
                                                            <Link to={`/notifications/${notification.auction_id}`}>{ notification.reason.substr(0, 20) + '...' }</Link>
                                                        </div>
                                                    ))
                                                }
                                                <Link to="/notifications"><b>{t('notifications.all')}</b></Link>
                                            </div>
                                        </li>
                                        <li><Link to="/auctions"><i className="fa fa-buysellads"></i></Link></li>
                                        <li><Link to="/chat"><i class="fa fa-comments" aria-hidden="true"></i></Link></li>
                                        {
                                            (auth.user.role === 1) && (
                                                <li>   
                                                    <a target="_blank" href="http://admin.localhost:443/">
                                                        <i class="fa fa-tachometer" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                            )
                                        }
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
