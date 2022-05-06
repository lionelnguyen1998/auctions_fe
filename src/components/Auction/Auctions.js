import React, {Fragment, useEffect, useState} from 'react';
import auctionApi from '../api/auctionApi';
import {statusKey} from "../constant/index";
import { Pagination, Paper, Avatar, Grid, Typography} from "@mui/material";
import './index.css'
import ListAuction from './ListAuction.js'
import userApi from '../api/userApi';
import {role} from "../constant/index";

const tabs = [0, 1, 2, 3, 4];

function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(0);
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const pageSizes = [4, 8, 12];
    const [userInfo, setUserInfo] = useState('')

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
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            <b>オークション:　　　</b> {userInfo.total_auctions} オークション
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            <b>気に入る:　　　　　</b> {userInfo.total_like} オークション
                        </Typography>
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
                                <h2>users オークションの一覧</h2>
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