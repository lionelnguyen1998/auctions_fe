import React, {useState, useEffect, useRef} from 'react';
import { Paper, Button, Modal, Box} from "@mui/material";
import notificationApi from '../api/notificationApi';
import { Link, useNavigate } from 'react-router-dom';
import DetailsThumb from '../Auction/DetailsThumb'
import './index.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #e6efe6',
    borderRadius: '10px',
    boxShadow: 5,
    pt: 2,
    px: 4,
    pb: 3,
};
function ReadNotification(){
    let navigate = useNavigate();
    const [notification, setNotification] = useState([])
    const link = window.location.href;
    const auctionId = link.slice(36);
    const [indexs, setIndex] = useState(0);
    const imgDiv = useRef();
    const [item, setItem] = useState([]);
    const [auction, setAuction] = useState('');
    const [total, setTotal] = useState('');
    const [open, setOpen] = useState('')

    useEffect(() => {
        notificationApi.getReadNotification(auctionId)
            .then((res) => {
                console.log(res.data.data)
                setNotification(res.data.data)
                setAuction(res.data.data.auctions)
                setItem(res.data.data.items)
                setTotal(res.data.data.total_not_read)
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

    const handleDeleteNotification = (auctionId) => {
        console.log(auctionId)
        notificationApi.deleteNotification(auctionId)
        .then((res) => {
            setTotal(res.data.data.total)
            setOpen(false);
            navigate(-1)
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <Link to='/notifications'><p>お知らせ一覧</p></Link>
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
                                    <h2>理由</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-title">
                        <h4 className="reason-reject">{auction.reason}</h4>
                    </div>
                </section>
            </Paper>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div>
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
                                        <h2 title={item.name}>アイテムの名前　{item.name}</h2>
                                        <h3>始値: {Number(item.starting_price).toLocaleString()} 円</h3>
                                        <p>カテゴリー: {notification.category.name}</p>
                                        <p>ブランド: {item.brand}</p>
                                        <p>シリーズ: {item.series ?? '--'}</p>
                                        <p>ディスクリプション: {item.description}</p>
                                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                                            <b>{auction.start_date}</b>
                                        </Button>
                                        <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                            <b>{auction.end_date}</b>
                                        </Button>
                                        <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                            <b>{auction.status}</b>
                                        </Button>
                                        <DetailsThumb images={item.images} setIndex={setIndex} />
                                        <Button onClick={handleOpen} size="small" style={{fontSize:'40px'}}>
                                            <i class="fa fa-trash" aria-hidden="true" style={{color: '#dc3545'}}></i>
                                        </Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="parent-modal-title"
                                            aria-describedby="parent-modal-description"
                                        >
                                            <Box sx={{ ...style, width: 400 }}>
                                            <h4 id="parent-modal-title" style={{color: '#dc3545'}}><b>本当に削除しますか？</b></h4>
                                            <hr></hr>
                                            <Button onClick={() => handleDeleteNotification(auctionId)} variant="outlined" style={{color: '#dc3545', borderColor:'#dc3545'}}>削除</Button>
                                            <Button onClick={handleClose} style={{float:'right'}} variant="outlined">キャンセル</Button>
                                            </Box>
                                        </Modal>
                                    </div>
                                </div>
                                )
            }
                        </div>
                    </div>
                </section>
            </Paper>
        </>
    )
}

export default ReadNotification;