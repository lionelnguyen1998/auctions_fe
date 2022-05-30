import React, { useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import {statusKey} from "../constant/index";
import { Paper } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import ListAuction from './ListAuction.js'
import Paginate from '../Paginate/Paginate.js'
import './index.css'
import Search from './Search';

const tabs = [0, 1, 2, 3];

function AuctionByCategory({t}) {
    let navigate = useNavigate();
    const link = window.location.href;
    const categoryId = link.slice(41);
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [total, setTotal] = useState('')
    const [category, setCategory] = useState('')
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
        if (categoryId) {
            params["category_id"] = categoryId;
        }
        return params;
    };
    const retrieveAuctions = () => {
        const params = getRequestParams(index, count);
        auctionApi.getAllAuctions(status, params)
            .then((response) => {
                const { auctions, total, category} = response.data.data;
                setAuctions(auctions);
                setTotal(total)
                setCategory(category);
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
        };

    useEffect(retrieveAuctions, [categoryId, status, index, count]);

    return (
        <>
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate(-1)}>{t('category.list')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
             <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>{category}</h2>
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
        </>
    )
}

export default AuctionByCategory;