import React, { useEffect, useState} from 'react';
import auctionApi from '../../components/api/auctionApi';
import { Paper } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import ListAuction from '../Auction/ListAuction.js'
import Paginate from '../../components/Paginate/Paginate.js'
import Search from '../../components/Search/Search';
import StatusTab from '../../components/Tab/StatusTab.js';
import './index.css'

const tabs = [0, 1, 2, 3, 6];

function AuctionByTypeCategory({t}) {
    let navigate = useNavigate();
    const link = window.location.href;
    const typeId = link.slice(46);
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [total, setTotal] = useState('')
    const [type, setType] = useState('');
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
        if (typeId) {
            params["type"] = typeId;
        }
        return params;
    };
    const retrieveAuctionsOfTypeCategory = () => {
        const params = getRequestParams(index, count);
        auctionApi.getAllAuctions(status, params)
            .then((response) => {
                const { auctions, total, type} = response.data.data;
                setAuctions(auctions);
                setTotal(total)
                setType(type);
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
        };

    useEffect(retrieveAuctionsOfTypeCategory, [typeId, status, index, count]);

    return (
        <>
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate(-1)}> {t('name.homepage')}</p>
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
                                <h2>{t(`category.${typeId}`)}</h2>
                            </div>
                            <div className="featured__controls">
                                    <ul>
                                        <Search 
                                            setQuery={setQuery}
                                            t={t}
                                        />
                                        <StatusTab
                                            t={t}
                                            tabs={tabs}
                                            status={status}
                                            setStatus={setStatus}
                                        />
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

export default AuctionByTypeCategory;