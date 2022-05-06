import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336'];
function ListAuction(props) {
    const auctions = props.auctions
    return (
        <Fragment>
            <div className="row featured__filter">
                {
                    auctions.map((auction) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges" key={auction.auction_id}>
                            <div className="featured__item">
                                <div className="featured__item__pic set-bg" data-setbg={auction.category.image} style={{backgroundImage: `url(${auction.category.image})`}}>
                                    <ul className="featured__item__pic__hover">
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
        </Fragment>
    )
}

export default ListAuction;