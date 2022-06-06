import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Paper, Grid, Button} from "@mui/material";
import DetailsThumb from './DetailsThumb'
import Description from './Description'
import Receive from './Receive'
import auctionApi from '../api/auctionApi';
import {Link} from 'react-router-dom'
import 'react-rater/lib/react-rater.css'
import './index.css'

function ItemDetail ({itemId, t, categoryId}) {
    const [indexs, setIndex] = useState(0);
    const imgDiv = useRef();
    const [item, setItem] = useState('')
    const [auction, setAuction] = useState('')
    const [sellingUser, setSellingUser] = useState('');
    const [buyingUser, setBuyingUser] = useState('');
    const [liked, setLiked] = useState('')

    const handleMouseMove = e =>{
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }

    useEffect(() => {
        auctionApi.getDetailItem(itemId)
            .then(res => {
                const info = res.data.data;
                setItem(info.item)
                setAuction(info.auction)
                setSellingUser(info.selling_user)
                setBuyingUser(info.buying_user)
                setLiked(info.item.like)
            })
            .catch(e => console.log(e))
    }, [itemId])

    const handleLiked = (auctionId) => {
        auctionApi.like(auctionId)
        .then(res => {
            setLiked(res.data.data.is_liked)
        })
        .catch((e) => {
           console.log(e)
        })
    }

    return (
        <>
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
           {
            item.images && (
                   <div className="details">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>{item.name}</h2>
                            </div>
                        </div>
                       <div className="img-container" 
                        ref={imgDiv}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`}
                        style={{backgroundImage: `url(${item.images[indexs]})`}}
                        >
                       </div>
                       <div className="box-details">
                            <Grid container wrap="nowrap" spacing={5} style={{marginBottom: '15px'}}>
                                <Grid item>
                                    <Link to={`/auctions/${sellingUser.selling_user_id}`}>
                                        <Avatar
                                        sx={{ width: 60, height: 60 }}
                                        alt={sellingUser.selling_user_name} 
                                        src={sellingUser.selling_user_avatar} />
                                    </Link>
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <div>
                                        <b style={{ margin: 0, textAlign: "left", fontSize: '30px'}}>{sellingUser.selling_user_name}</b>
                                    </div>
                                </Grid>
                            </Grid>
                            <h3>{t('list_item.price')}: {Number(item.starting_price).toLocaleString()} $</h3>
                            <h3>{t('list_item.buy_price')}: {Number(item.max_price).toLocaleString()} $</h3>
                            <p><b>{t('input_auction.category')}:</b> {item.category}</p>
                            <p><b>{t('input_item.brand')}:</b> {item.brand}</p>
                            <p><b>{t('input_item.series')}:</b> {item.series ?? '--'}</p>
                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                                <b>{auction.start_date}</b>
                            </Button>
                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                <b>{auction.end_date}</b>
                            </Button>
                            <br/>
                        
                            
                            <DetailsThumb images={item.images} setIndex={setIndex} />
                            <Button size="small" style={{color:'#4CAF50', marginLeft: '10px', height: '20px'}}
                                onClick={() => handleLiked(auction.auction_id)}
                            >
                                {
                                    (liked == true) ? 
                                    (<i className="fa fa-heart" style={{fontSize:'40px'}}></i>) : (<i class="fa fa-heart-o" style={{fontSize:'40px'}} aria-hidden="true"></i>)
                                }
                            </Button>
                       </div>
                   </div>
                )
           }
        </Paper>
        <Description
            description={item.description}
            t={t}
        />
        <Receive
            item={item}
            buyingUser={buyingUser}
            status={auction.status}
            auctionId={auction.auction_id}
            t={t}
            categoryId={categoryId}
        />
        </>
    )
}

export default ItemDetail;