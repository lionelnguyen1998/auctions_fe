import React,{useState, useRef, useEffect} from 'react'
import DetailsThumb from './DetailsThumb'
import auctionApi from '../api/auctionApi';
import './detail.css'
import {Paper, Button} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import ModalDelete from './ModalDelete.js'
import Description from './Description.js';

const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#2196F3'];
export default function DetailWait({t}) {
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
                           <p onClick={() => navigate(-1)}>{t('features.list')}</p>
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
                            <h2 title={item.name}>{t('detail.name')} {item.name}</h2>
                            <h3>{t('detail.price')}: {Number(item.starting_price).toLocaleString()} 円</h3>
                            <p><b>{t('detail.category')}:</b> {categoryInfo.name}</p>
                            <p><b>{t('detail.brand')}:</b> {item.brand}</p>
                            <p><b>{t('detail.series')}:</b> {item.series ?? '--'}</p>
                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                                <b>{auction.start_date}</b>
                            </Button>
                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                <b>{auction.end_date}</b>
                            </Button>
                            <br/>
                            <Button disabled size="small" variant="outlined" style={{ color: colors[auction.statusId], height: '20px'}}>
                                <b>{t(`status.${auction.statusId}`)}</b>
                            </Button>
                            <Link to={`/editAuction/${auction.auction_id}`}>
                                <Button size="small" variant="outlined" style={{ color: '#17a2b8', height: '20px', borderColor: '#17a2b8'}}>
                                    <b>{t('detail_wait.auction_edit')}</b>
                                </Button>
                            </Link>
                            <Link to={`/editItem/${item.item_id}/${auction.auction_id}`}>
                                <Button size="small" variant="outlined" style={{ color: '#17a2b8', height: '20px', borderColor: '#17a2b8'}}>
                                    <b>{t('detail_wait.item_edit')}</b>
                                </Button>
                            </Link>
                            
                            <ModalDelete 
                                auctionId={auction.auction_id}
                                t={t}
                            />
                           
                            <DetailsThumb images={item.images} setIndex={setIndex} />
                        </div>
                   </div>
                ) : (
                    <div className="box-details">
                        <h2><b>{t('detail_wait.no_item')}</b></h2>
                        <p><b>{t('detail.category')}:</b> {categoryInfo.name}</p>
                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                            <b>{auction.start_date}</b>
                        </Button>
                        <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                            <b>{auction.end_date}</b>
                        </Button>
                        <br/>
                        <Button disabled size="small" variant="outlined" style={{ color: colors[auction.statusId], height: '20px'}}>
                            <b>{t(`status.${auction.statusId}`)}</b>
                        </Button>
                        <Link to={`/editAuction/${auction.auction_id}`}>
                            <Button size="small" variant="outlined" style={{ color: '#17a2b8', height: '20px', borderColor: '#17a2b8'}}>
                                <b>{t('detail_wait.auction_edit')}</b>
                            </Button>
                        </Link>
                        <Link to={`/item/${auction.auction_id}`}>
                            <Button size="small" variant="outlined" style={{ color: '#28a745', height: '20px', borderColor: '#28a745'}}>
                                <b>{t('detail_wait.add_item')}</b>
                            </Button>
                        </Link>
                        <ModalDelete 
                            auctionId={auction.auction_id}
                            t={t}
                        />
                    </div>
                )
           }
        </Paper>
        {
            (item.description) ? (
                <Description
                    description={item.description}
                    t={t}
                />
            ) : (<></>)
        }
        
        </>
    )
}
