import React, {Fragment, useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import { Paper } from "@mui/material";
import ListAuction from '../Auction/ListAuction.js';
import Paginate from '../Paginate/Paginate.js';
import Search from '../Search/Search.js';
import './index.css'

const tabs = [0, 1, 2, 3, 6];

function Auctions({t}) {
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [total, setTotal] = useState('')
    const [query, setQuery] = useState('')

    const keys = ['title', 'start_date', 'end_date'];

    const search = (data) => {
        return data.filter((auction) => keys.some((key) => auction[key].toLowerCase().includes(query)));
    };
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
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>{t('like.title')}</h2>
                            </div>
                            <div className="featured__controls">
                                    <ul>
                                        <Search 
                                        setQuery={setQuery} 
                                        t={t}
                                        />
                                        {
                                            tabs.map(tab => (
                                                <li 
                                                    key={tab}
                                                    style={status === tab ? {
                                                        color: '#7FAD39',
                                                    } : {}}
                                                    onClick={() => setStatus(tab)}
                                                >
                                                    <b>{t(`status.${tab}`)}</b>
                                                </li>
                                            ))
                                        }
                                    </ul>
                            </div>
                        </div>
                        </div>
                        <div>
                            <b style={{color:'#7FAD39'}}>{total} {t('name.auctions')}</b>
                            <ListAuction
                                auctions={search(auctions)}
                                t={t}
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
        </Fragment>
    )
}

export default Auctions;