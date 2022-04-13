import React, { Fragment, useEffect, useState } from 'react';
import {statusKey} from "../constant/index";
import auctionApi from '../api/auctionApi';
import { Link } from 'react-router-dom';

const tabs = [1, 2, 3];
function Features(){
    const [auctions, setAuctions] = useState([]);
    const [status, setStatus] = useState(1);
    useEffect(() => {
        ;(async () => {
            try {
                const response = await auctionApi.getList(status)
                setAuctions(response.data.data.auctions)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [status])

    return (
        <Fragment>
            <section className="featured spad">
           <div className="container">
               <div className="row">
                   <div className="col-lg-12">
                       <div className="section-title">
                           <h2>all auctions</h2>
                       </div>
                       <div className="featured__controls">
                            <ul>
                                {
                                    tabs.map(tab => (
                                        <li 
                                            key={tab}
                                            style={status === tab ? {
                                                color: '#fff',
                                                backgroundColor: '#333'
                                            } : {}}
                                            onClick={() => setStatus(tab)}
                                        >
                                            {statusKey[tab]}
                                        </li>
                                    ))
                                }
                            </ul>
                       </div>
                   </div>
               </div>
               <div className="row featured__filter">
                   {
                        auctions.map((auction) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mix oranges" key={auction.auction_id}>
                                <div className="featured__item">
                                    <div className="featured__item__pic set-bg" data-setbg={auction.category.image} style={{backgroundImage: `url(${auction.category.image})`}}>
                                        <ul className="featured__item__pic__hover">
                                            <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                            <li><Link to={`/detail/${auction.auction_id}`}><i className="fa fa-retweet"></i></Link></li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6><a href="#">{auction.title}</a></h6>
                                        <h5>{auction.status}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                   }
               </div>
           </div>
            </section>
        </Fragment>
    )
}

export default Features;