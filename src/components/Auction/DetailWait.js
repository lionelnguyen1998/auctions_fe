import React,{useState, useRef, useEffect} from 'react'
import DetailsThumb from './DetailsThumb'
import auctionApi from '../api/auctionApi';
import './detail.css'
import {Paper, Button} from "@mui/material";
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
    const [categoryInfo, setCategoryInfo] = useState('')
    
    useEffect(() => {
        auctionApi.detail(auctionId)
            .then((res) => {
                setItem(res.data.data.items)
                setAuction(res.data.data.auctions)
                setCategoryInfo(res.data.data.category)
            })
    }, [])

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
            <div className="section-title1">
                <h2>{auction.title}</h2>
            </div>
           {
            item.images ? (
                   <div className="details">
                       <div className="img-container" 
                        ref={imgDiv}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`}
                        style={{backgroundImage: `url(${item.images[indexs]})`}}
                        >
                       </div>
                        <div className="box-details">
                            <h2 title={item.name}>アイテムの名前　{item.name}</h2>
                            <h3>始値: {Number(item.starting_price).toLocaleString()} 円</h3>
                            <p><b>カテゴリー:</b> {categoryInfo.name}</p>
                            <p><b>ブランド:</b> {item.brand}</p>
                            <p><b>シリーズ:</b> {item.series ?? '--'}</p>
                            <p style={{whiteSpace: 'pre-line'}}><b>ディスクリプション:</b>{item.description}</p>
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
                            <Link to={`/editAuction/${auction.auction_id}`}>
                                <Button size="small" variant="outlined" style={{ color: '#17a2b8', height: '20px'}}>
                                    <b>編集</b>
                                </Button>
                            </Link>
                            <DetailsThumb images={item.images} setIndex={setIndex} />
                        </div>
                   </div>
                ) : (
                    <div className="box-details">
                        <h2><b>アイテムの名前:</b>--</h2>
                        <h3><b>始値:</b> -- 円</h3>
                        <p><b>カテゴリー:</b> {categoryInfo.name}</p>
                        <p><b>ブランド:</b> --</p>
                        <p><b>シリーズ:</b> --</p>
                        <p><b>ディスクリプション:</b> --</p>
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
                    </div>
                )
           }
        </Paper>
        </>
    )
}
