import React,{useState, useRef, useEffect} from 'react'
import DetailsThumb from './DetailsThumb'
import auctionApi from '../api/auctionApi';
import {Avatar, Paper, Grid, Button} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import './detail.css'

const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#2196F3'];
function Info ({auctionId, maxPrice, sellingUser, auction, categoryInfo, currentUser, item, t}) {
    let navigate = useNavigate();
    const [indexs, setIndex] = useState(0);
    const imgDiv = useRef();
    const [liked, setLiked] = useState('');
    
    useEffect(() => {
        auctionApi.detail(auctionId)
            .then((res) => {
                setLiked(res.data.data.like)
            })
    }, [])

    const handleMouseMove = e =>{
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }

    const handleLiked = (e) => {
        e.preventDefault();
        auctionApi.like(auctionId)
        .then(res => {
            setLiked(res.data.data.is_liked)
        })
        .catch((e) => {
            navigate("/login");
        })
    }
    return (
        <>
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <div className="section-title1">
                <h2>{auction.title}</h2>
            </div>
           {
            item.images && (
                   <div className="details">
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
                            <h2 title={item.name}>{t('detail.name')} {item.name}</h2>
                            <h3>{t('detail.price')}: {Number(item.starting_price).toLocaleString()} $</h3>
                            {
                                ((auction.statusId === 6)
                                && (currentUser.user.user_id === sellingUser.selling_user_id))
                                ? (
                                    <h3>{t('detail.sell_price')}: {Number(maxPrice).toLocaleString()} $</h3>
                                ) : (
                                    <h3>{t('detail.max_price')}: {maxPrice ? Number(maxPrice).toLocaleString() : '--'} $</h3>
                                )
                            }
                            <p><b>{t('detail.category')}:</b> {categoryInfo.name}</p>
                            <p><b>{t('detail.brand')}:</b> {item.brand}</p>
                            <p><b>{t('detail.series')}:</b> {item.series ?? '--'}</p>
                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px', borderColor:'#4CAF50'}}>
                                <b>{auction.start_date}</b>
                            </Button>
                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px', borderColor:'#F44336'}}>
                                <b>{auction.end_date}</b>
                            </Button>
                            <Button disabled size="small" variant="outlined" style={{ color: colors[auction.statusId], height: '20px', borderColor: colors[auction.statusId]}}>
                                <b>{t(`status.${auction.statusId}`)}</b>
                            </Button>
                            <DetailsThumb images={item.images} setIndex={setIndex} />
                            {/* {
                                (auction.statusId === 2) && (
                                    <CountDown
                                    startDate = {auction.start_date}
                                    />
                                )
                            }
                            {
                                (auction.statusId === 3) && (
                                    <CountDown
                                    startDate = {auction.end_date}
                                    />
                                )
                            } */}
                            <Button size="small" style={{color:'#4CAF50', marginLeft: '10px', height: '20px'}}
                                onClick={handleLiked}
                            >
                                {
                                    currentUser ? ((liked == true) ? (<i className="fa fa-heart" style={{fontSize:'40px'}}></i>) : (<i class="fa fa-heart-o" style={{fontSize:'40px'}} aria-hidden="true"></i>)) 
                                        : (<i class="fa fa-heart-o" style={{fontSize:'40px'}} aria-hidden="true" onClick={() => navigate('/login')}></i>)
                                }
                            </Button>
                       </div>
                   </div>
                )
           }
        </Paper>
        </>
    )
}

export default Info;