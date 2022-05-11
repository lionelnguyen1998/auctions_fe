import React, { Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import auctionApi from '../api/auctionApi';
import userApi from '../api/userApi';
import notificationApi from '../api/notificationApi';
import AuthService from "../services/auth.service";
import './index.css'

function Header({auth}) {
    const [totalLiked, setTotalLiked] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [notifications, setNotifications] = useState([])
    const [totalNotRead, setTotalNotRead] = useState('')
    const index = 1;
    const isNotRead = 1;
    const count = 4;
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
                                                    <div><b>おはよう {userInfo.name}</b></div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul className="dropdown">
                                                        <div class="dropdown-content">
                                                            <li><a href="/" className="nav-link" onClick={logOut} style={{color:"#1C1C1C"}}>ログアウト</a></li>
                                                            <li><Link to="/edit" style={{color:"#1C1C1C"}}>編集</Link></li>
                                                            <li><Link to="/changepass" style={{color:"#1C1C1C"}}>パスワードを変更</Link></li>
                                                        </div>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    <div><i className="fa fa-user" style={{color:"black"}}></i></div>
                                                    <span className="arrow_carrot-down"></span>
                                                    <ul className="dropdown">
                                                        <div class="dropdown-content">
                                                            <li> <Link to="/login" style={{color:"#1C1C1C"}}>ログイン</Link></li>
                                                            <li> <Link to="/register" style={{color:"#1C1C1C"}}>登録</Link></li>
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
                                <li><Link to='/news'>ニュース</Link></li>
                                <li><Link to="/contacts">お問い合わせ</Link></li>
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
                                                <Link to="/notifications"><b>すべて見る</b></Link>
                                            </div>
                                        </li>
                                        <li><Link to="/auctions"><i className="fa fa-buysellads"></i></Link></li>
                                        <li><Link to="/chat"><i class="fa fa-comments" aria-hidden="true"></i></Link></li>
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
