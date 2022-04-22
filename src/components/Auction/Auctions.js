import React, {Fragment, useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import {statusKey} from "../constant/index";
import { Link } from 'react-router-dom';
import Pagination from "@mui/material/Pagination";
import Button from '@mui/material/Button';
import './index.css'

const tabs = [0, 1, 2, 3, 4];

function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const pageSizes = [4, 8, 12];
    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336'];

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
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
        };

    useEffect(retrieveAuctions, [status, index, count]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return (
        <Fragment>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>オークションの一覧</h2>
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
                        <div className="row featured__filter">
                            {
                                auctions.map((auction) => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 mix oranges" key={auction.auction_id}>
                                        <div className="featured__item">
                                            <div className="featured__item__pic set-bg" data-setbg={auction.category.image} style={{backgroundImage: `url(${auction.category.image})`}}>
                                                <ul className="featured__item__pic__hover">
                                                    <li><Link to={`/detail/${auction.auction_id}`}><i className="fa fa-heart"></i></Link></li>
                                                    <li><Link to={`/detail/${auction.auction_id}`}><i className="fa fa-retweet"></i></Link></li>
                                                </ul>
                                            </div>
                                            <div className="featured__item__text">
                                                <h6>{auction.title}</h6>
                                                <Link to={`/detail/${auction.auction_id}`}>
                                                    <Button size="small" variant="outlined" style={{ color: colors[auction.statusId], height: '20px'}}>
                                                        <b>{auction.status}</b>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <select onChange={handlePageSizeChange} value={count}>
                                {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                                ))}
                            </select>
                            <Pagination
                                className="my-3"
                                count={counts}
                                page={index}
                                siblingCount={1}
                                boundaryCount={1}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePageChange}
                                color="success"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Auctions;