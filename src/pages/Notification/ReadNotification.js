import React, {useState, useEffect, useRef} from 'react';
import { Paper, Button} from "@mui/material";
import notificationApi from '../../components/api/notificationApi';
import { Link} from 'react-router-dom';
import DetailsThumb from '../Auction/DetailsThumb'
import Description from '../Auction/Description.js'
import ModalBox from './ModalBox.js'
import './index.css'

function ReadNotification({t}){
    const [notification, setNotification] = useState([])
    const link = window.location.href;
    const auctionId = link.slice(36);
    const [indexs, setIndex] = useState(0);
    const imgDiv = useRef();
    const [item, setItem] = useState([]);
    const [auction, setAuction] = useState('');

    useEffect(() => {
        notificationApi.getReadNotification(auctionId)
            .then((res) => {
                setNotification(res.data.data)
                setAuction(res.data.data.auctions)
                setItem(res.data.data.items)
            })
            .catch((e) => {
                console.log(e);
            });
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
                                <Link to='/notifications'><p>{t('notifications.list')}</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h2>{t('notifications.reason')}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-title">
                        <h4 className="reason-reject" style={{whiteSpace: 'pre-line'}}>{auction.reason}</h4>
                    </div>
                </section>
            </Paper>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="section-title1">
                            <h2>{auction.title}</h2>
                        </div>
                        <div>
                        {
                            item ? (item.images && (
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
                                        <h3>{t('detail.price')}: {Number(item.starting_price).toLocaleString()} $</h3>
                                        <p>{t('detail.category')}: {notification.category.name}</p>
                                        <p>{t('detail.brand')}: {item.brand}</p>
                                        <p>{t('detail.series')}: {item.series ?? '--'}</p>
                                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px', marginRight: '5px'}}>
                                            <b>{auction.start_date}</b>
                                        </Button>
                                        <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px', marginRight: '5px'}}>
                                            <b>{auction.end_date}</b>
                                        </Button>
                                        <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                            <b>{auction.status}</b>
                                        </Button>
                                        <DetailsThumb images={item.images} setIndex={setIndex} />
                                        <ModalBox 
                                            auctionId={auctionId}
                                            t={t}
                                        />
                                    </div>
                                </div>
                                )) : (
                                    <>
                                        <div className="box-details2">
                                            <h2>{t('notifications.no_info')}</h2>
                                            <p>{t('detail.category')}: {notification.category.name}</p>
                                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px', marginRight: '5px'}}>
                                                <b>{auction.start_date}</b>
                                            </Button>
                                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px', marginRight: '5px'}}>
                                                <b>{auction.end_date}</b>
                                            </Button>
                                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                                <b>{t(`status.${auction.statusId}`)}</b>
                                            </Button>
                                            <ModalBox 
                                                auctionId={auctionId}
                                                t={t}
                                            />
                                        </div>
                                    </>
                                )
                        }
                        </div>
                    </div>
                </section>
            </Paper>
            {
                item ? (
                    <Description
                        description={item.description}
                        t={t}
                    />
                ) : (<></>)
            }
        </>
    )
}

export default ReadNotification;