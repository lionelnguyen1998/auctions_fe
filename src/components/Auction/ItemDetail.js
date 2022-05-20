import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Paper, Grid, Button, Modal, Box, Slider} from "@mui/material";
import DetailsThumb from './DetailsThumb'
import auctionApi from '../api/auctionApi';
import {Link} from 'react-router-dom'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
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

const marks = [
    {
      value: 0,
      label: '準備中',
    },
    {
      value: 40,
      label: '配信中',
    },
    {
      value: 100,
      label: '配信に成功',
    },
];

function valuetext(value) {
    return `${value}`;
}

function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

function ItemDetail ({itemId}) {
    const [indexs, setIndex] = useState(0);
    const imgDiv = useRef();
    const [item, setItem] = useState('')
    const [auction, setAuction] = useState('')
    const [sellingUser, setSellingUser] = useState('');
    const [buyingUser, setBuyingUser] = useState('');
    const [liked, setLiked] = useState('')
    const [open, setOpen] = useState('')

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

    const handleRate = (e) => {
        console.log(e.target)
    }
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

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
                            <h3>始値: {Number(item.starting_price).toLocaleString()} 円</h3>
                            <h3>買値: {Number(item.max_price).toLocaleString()} 円</h3>
                            <p><b>カテゴリー:</b> {item.category}</p>
                            <p><b>ブランド:</b> {item.brand}</p>
                            <p><b>シリーズ:</b> {item.series ?? '--'}</p>
                            <p style={{whiteSpace: 'pre-line'}}><b>ディスクリプション:</b>{item.description}</p>
                            <hr></hr>
                            <p><b style={{color: '#7FAD39'}}>配送先住所</b></p>
                            <p><b>名前：</b> {buyingUser.buying_user_name}</p>
                            <p><b>電話番号:</b> {buyingUser.buying_user_phone}</p>
                            <p><b>アドレス:</b> {buyingUser.buying_user_address}</p>
                            <p style={{whiteSpace: 'pre-line'}}><b>販売情報:</b>{item.selling_info}</p>
                            <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                                <b>{auction.start_date}</b>
                            </Button>
                            <Button disabled size="small" variant="outlined" style={{ color: '#F44336', height: '20px'}}>
                                <b>{auction.end_date}</b>
                            </Button>
                            <br/>
                        
                            <Button size="small" variant="contained" style={{height: '20px'}} color='warning'>
                                <b onClick={handleOpen}>商品を受け取りました</b>
                            </Button>
                            <Button size="small" variant="contained" style={{height: '20px'}}>
                                <b >返品・返金をリクエストする</b>
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                <br/>
                                <p>私は製品を受け取り、満足しています。返金や返品はいたしません。</p>
                                <p>評判</p>
                                <Rater total={5} rating={5} />
                                <hr></hr>
                                <Button onClick={handleRate} variant="outlined" style={{color: '#28a745', borderColor:'#28a745'}}>確認</Button>
                                <Button onClick={handleClose} style={{float:'right'}} variant="outlined">今はやめる</Button>
                                </Box>
                            </Modal>

                            <Box style={{marginTop:'10px'}} sx={{ width: 300 }}>
                                <Slider
                                    aria-label="Always visible"
                                    defaultValue={0}
                                    marks={marks}
                                    step={null}
                                    getAriaValueText={valuetext}
                                    valueLabelFormat={valueLabelFormat}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
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
        </>
    )
}

export default ItemDetail;