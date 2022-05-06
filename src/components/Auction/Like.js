import React, {Fragment, useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import {statusKey} from "../constant/index";
import { Pagination, Paper } from "@mui/material";
import './index.css'
import ListAuction from './ListAuction.js'

const tabs = [0, 1, 2, 3];

function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const pageSizes = [4, 8, 12];

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
        auctionApi.getListLike(status, params)
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
             <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>favorites オークションの一覧</h2>
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
                            <ListAuction
                                auctions={auctions}
                            />
                            <div>
                                <select className="select-paginate" onChange={handlePageSizeChange} value={count}>
                                    {pageSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                    ))}
                                </select>
                                <Pagination
                                    style={{float: "right"}}
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
             </Paper>
        </Fragment>
    )
}

export default Auctions;