import React,{useState, useEffect} from 'react'
import auctionApi from '../api/auctionApi';
import './detail.css'
import {Paper} from "@mui/material";
import { useNavigate} from 'react-router-dom';
import AuthService from "../services/auth.service";
import Paginate from '../Paginate/Paginate.js'
import Info from './Info';
import Description from "./Description.js";
import BuyingInfo from "./BuyingInfo.js";
import CommentForm from "./CommentForm.js"
import ListComments from "./ListComments.js"
import BidForm from "../Bid/BidForm.js"
import ListBids from "../Bid/ListBids.js"
import RateForm from "./RateForm.js"

const tabs = ['bids', 'comments', 'rates'];

export default function Detail({t}) {
    const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();
    const link = window.location.href;
    const auctionId = link.slice(29);
    const [maxPrice, setMaxPrice] = useState('');
    const [auction, setAuction] = useState('');
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [comments, setComments] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [bids, setBids] = useState([])
    const [type, setType] = useState('bids');
    const [sellingUser, setSellingUser] = useState('');
    const [categoryInfo, setCategoryInfo] = useState('')
    const [item, setItem] = useState([]);
    const [rates, setRates] = useState([])
    const [totalRates, setTotalRates] = useState('')
    const [buyingUser, setBuyingUser] = useState('');
    
    useEffect(() => {
        auctionApi.detail(auctionId)
            .then((res) => {
                setAuction(res.data.data.auctions)
                setSellingUser(res.data.data.selling_user)
                setCategoryInfo(res.data.data.category)
                setItem(res.data.data.items)
                setBuyingUser(res.data.data.buying_user)
            })
    }, [])

    useEffect(() => {
        auctionApi.maxBid(auctionId)
            .then((res) => {
                setMaxPrice(res.data.data)
            })
    }, [totalPrice])

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

    const retrieveAuctionsBidComment = () => {
        const params = getRequestParams( index, count);
        auctionApi.getListCommentsBids (type, auctionId, params)
            .then((response) => {
                if (type === 'comments') {
                    const { comments, total} = response.data.data;
                    setComments(comments);
                    setTotal(total)
                    const totalPage = Math.ceil(total/count)
                    setCount(totalPage);
                } else if (type === 'bids') {
                    const { bids, total} = response.data.data;
                    setBids(bids);
                    setTotalPrice(total)
                    const totalPage = Math.ceil(total/count)
                    setCount(totalPage);
                } else {
                    const { rates, total} = response.data.data;
                    setRates(rates);
                    setTotalRates(total)
                    const totalPage = Math.ceil(total/count)
                    setCount(totalPage);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(retrieveAuctionsBidComment, [type, auctionId, index, count, total, totalPrice]);

    return (
    <>
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate(-1)}>{t('features.list')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Info 
            auctionId={auctionId}
            maxPrice={maxPrice}
            sellingUser={sellingUser}
            auction={auction}
            categoryInfo={categoryInfo}
            currentUser={currentUser}
            item={item}
            t={t}
        />
        <Description 
            description={item.description}
            t={t}
        />
        {
            (auction.statusId === 6 || auction.statusId === 7 || auction.statusId === 8)
            && ((currentUser.user.user_id === sellingUser.selling_user_id))
            && (
                <BuyingInfo 
                    buyingUser={buyingUser}
                    item={item}
                    status={auction.statusId}
                    auctionId={auction.auction_id}
                    t={t}
                />
            )
        }
       
        <Paper style={{ padding: "20px 200px", marginBottom: '40px' }} className="container">
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="featured__controls">
                                <ul>
                                    {
                                        tabs.map(tab => (
                                            <li 
                                                key={tab}
                                                style={type === tab ? {
                                                    color: '#7FAD39',
                                                } : {}}
                                                onClick={() => setType(tab)}
                                            >
                                                <b>{t(`detail.${tab}`)}</b>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                <div>
                <div className="featured__filter">
                        {
                            (type === 'comments') && (
                                <CommentForm
                                    t={t}
                                    auctionId={auctionId}
                                    setTotal={setTotal}
                                />
                            )
                        }
                        {
                            (type === 'comments') && (
                                <p>{total} {t(`detail.comments`)}</p>
                            )
                        }
                        {
                            (type === 'comments') && (
                                comments.map((comment) => (
                                    <ListComments 
                                        comment={comment}
                                        t={t}
                                        auctionId={auctionId}
                                        setTotal={setTotal}
                                    />
                                ))
                            )

                        }
                        {
                            (type === 'bids') && (auction.statusId === 1) && (
                                <BidForm
                                    t={t}
                                    auctionId={auctionId}
                                    setTotalPrice={setTotalPrice}
                                />
                            )
                        }
                        {
                            (type === 'bids') && (
                                <p>{totalPrice} {t(`detail.bids`)}</p>
                            )
                        }
                        {
                            (type === 'bids')  && (
                                bids.map((bid, index) => (
                                    <ListBids
                                        t={t}
                                        bid={bid}
                                        auction={auction}
                                        index={index}
                                        currentUser={currentUser}
                                        sellingUser={sellingUser}
                                        maxPrice={maxPrice}
                                        auctionId={auctionId}
                                    />
                                ))
                            )
                        }
                        {
                            (type === 'rates') && (
                                <p>{totalRates} {t(`detail.rates`)}</p>
                            )
                        }
                        {
                            (type === 'rates') && (auction.statusId === 8) && (
                                rates.map((rate) => (
                                    <RateForm
                                        t={t}
                                        rate={rate}
                                    />
                                ))
                            )
                        }
                    
                    </div>
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
