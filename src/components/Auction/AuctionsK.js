import React, {Fragment, useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import {statusKey} from "../constant/index";
import { Paper, Avatar, Grid, Typography} from "@mui/material";
import './index.css'
import ListAuction from './ListAuction.js'
import {role} from "../constant/index";
import Search from './Search.js';
import Paginate from '../Paginate/Paginate.js'

const tabs = [0, 1, 2, 3, 6];

function AuctionsK() {
    const link = window.location.href;
    const userId = link.slice(31);
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [total, setTotal] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [query, setQuery] = useState('');
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
        auctionApi.getAllAuctionsOfUserK(userId, status, params)
            .then((response) => {
                const { auctions, total} = response.data.data;
                setAuctions(auctions);
                setTotal(total);
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
                setUserInfo(response.data.data.userInfo)
            })
            .catch((e) => {
                console.log(e);
            });
        };

    useEffect(retrieveAuctions, [status, index, count]);

    return (
        <Fragment>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                
                <Grid container spacing={10}>
                    <Grid item>
                    <Avatar
                        alt={userInfo.name}
                        src={userInfo.avatar}
                        sx={{ width: 150, height: 150 }}
                    />
                    </Grid>
                    <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <b>名前:　　　　　　　</b> {userInfo.name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <b>メールアドレス:　　</b> {userInfo.email}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <b>電話番号:　　　　　</b> {userInfo.phone}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <b>アドレス:　　　　　</b> {userInfo.address}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <b>役割:　　　　　　　</b> {role[userInfo.role]}
                            </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
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
                                        <Search 
                                            setQuery={setQuery}
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
                                auctions={search(auctions)}
                                query={query}
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

export default AuctionsK;