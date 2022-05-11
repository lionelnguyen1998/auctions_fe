import React, { Fragment, useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import { statusKey } from "../constant/index";
import { Paper } from "@mui/material";
import './index.css'
import ListAuction from './ListAuction.js'
import userApi from '../api/userApi';
import UserInfo from './UserInfo.js'
import Paginate from '../Paginate/Paginate.js'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom'

const tabs = [0, 1, 2, 3, 4, 6];
const responsive = {
    0: {
        items: 4
    }
};
function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [userInfo, setUserInfo] = useState('')
    const [categories, setCategories] = useState([])
    const [total, setTotal] = useState([])
    useEffect(() => {
        auctionApi.getListCategoryBuy()
            .then(res => {
                const {category, all} = res.data.data
                setCategories(category)
            })
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
    
    const getRequestParams = (index, count) => {
        let params = {};
        if (index) {
          params["index"] = index;
        }
        if (count) {
          params["count"] = count;
        }
        return params;
    };
    const retrieveAuctions = () => {
        const params = getRequestParams(index, count);
        auctionApi.getAllAuctionsOfUser(status, params)
            .then((response) => {
                const { auctions, total} = response.data.data;
                setAuctions(auctions);
                setTotal(total);
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
        };

    useEffect(retrieveAuctions, [status, index, count]);

    return (
        <Fragment>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <UserInfo 
                    userInfo={userInfo}
                />
            </Paper>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>ユーザーのオークションの一覧</h2>
                            </div>
                            
                            <div className="featured__controls">
                                    <ul>
                                        {
                                            tabs.map(tab => (
                                                <li 
                                                    key={tab}
                                                    style={status === tab ? {
                                                        color: '#7FAD39',
                                                    } : {}}
                                                    onClick={() => setStatus(tab)}
                                                >
                                                    <b>{statusKey[tab]}</b>
                                                </li>
                                            ))
                                        }
                                    </ul>
                            </div>
                        </div>
                        </div>
                        <div>
                            <b style={{color:'#7FAD39'}}>{total} オークション</b>
                            <ListAuction
                                auctions={auctions}
                            />
                            <Paginate 
                            counts={counts}
                            index={index}
                            setPage={setPage}
                            count={count}
                            setPageSize={setPageSize}
                            />
                        </div>
                    </div>
                </section>
            </Paper>
            {
                (categories.length !== 0) ? (
                    <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                        <section className="categories">
                            <div className="container">
                                <div className="section-title">
                                    <h2>カテゴリー一覧</h2>
                                </div>
                                <div className="row">
                                    <AliceCarousel 
                                    duration={400}
                                    autoPlay={true}
                                    startIndex = {1}
                                    fadeOutAnimation={true}
                                    mouseDragEnabled={true}
                                    playButtonEnabled={true}
                                    responsive={responsive}
                                    autoPlayInterval={2000}
                                    autoPlayDirection="rtl"
                                    autoPlayActionDisabled={true}
                                    >
                                        {
                                            categories.map((category, index) => (
                                                <div key={index} className="categories__item set-bg" style={{ backgroundImage: `url(${category.image})`, marginRight: '20px' }}>
                                                    <h5><Link to={`/listItem/${category.category_id}`}>{category.name}</Link></h5>
                                                </div>
                                            ))
                                        }
                                    </AliceCarousel>
                                </div>
                            </div>
                        </section>
                    </Paper>
                ) : (
                    <div className="section-title">
                        <h2>商品をまだ買いません！</h2>
                    </div>
                )
            }
        </Fragment>
    )
}

export default Auctions;