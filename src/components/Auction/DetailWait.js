import React,{useState, useRef, useEffect} from 'react'
import DetailsThumb from './DetailsThumb'
import auctionApi from '../api/auctionApi';
import './detail.css'
import {Avatar, Paper, Grid, Button} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';

const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#2196F3'];
export default function DetailWait() {
    let navigate = useNavigate();
    const [indexs, setIndex] = useState(0);
    const imgDiv = useRef();
    const link = window.location.href;
    const auctionId = link.slice(33);
    const [item, setItem] = useState([]);
    const [auction, setAuction] = useState('');
    const [sellingUser, setSellingUser] = useState('');
    const [categoryInfo, setCategoryInfo] = useState('')
    
    useEffect(() => {
        auctionApi.detail(auctionId)
            .then((res) => {
                setItem(res.data.data.items)
                setAuction(res.data.data.auctions)
                setSellingUser(res.data.data.selling_user)
                setCategoryInfo(res.data.data.category)
            })
    }, [])

    console.log(auction)
    const handleMouseMove = e =>{
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }

    return (
        <>
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate(-1)}>オークション一覧</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
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
                            <h2 title={item.name}>アイテムの名前　{item.name}</h2>
                            <h3>始値: {Number(item.starting_price).toLocaleString()} 円</h3>
                            <p>カテゴリー: {categoryInfo.name}</p>
                            <p>ブランド: {item.brand}</p>
                            <p>シリーズ: {item.series ?? '--'}</p>
                            <p>ディスクリプション: {item.description}</p>
                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                                <b>{auction.start_date}</b>
                            </Button>
                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                <b>{auction.end_date}</b>
                            </Button>
                            <br/>
                            <Button disabled size="small" variant="outlined" style={{ color: colors[auction.statusId], height: '20px'}}>
                                <b>{auction.status}</b>
                            </Button>
                            <Link to='/'>
                                <Button size="small" variant="outlined" style={{ color: '#17a2b8', height: '20px'}}>
                                    <b>編集</b>
                                </Button>
                            </Link>
                            <DetailsThumb images={item.images} setIndex={setIndex} />
                       </div>
                   </div>
                )
           }
        </Paper>
        </>
    )
}
