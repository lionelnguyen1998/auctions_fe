import React,{useState, useEffect} from 'react'
import auctionApi from '../api/auctionApi';
import './detail.css'
import {Avatar, Paper, Grid, Button, Modal, Box} from "@mui/material";
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
import { useNavigate} from 'react-router-dom';
import {tabKey} from "../constant/index";
import AuthService from "../services/auth.service";
import DeleteComment from './DeleteComment';
import Paginate from '../Paginate/Paginate.js'
import Info from './Info';
import { format } from "timeago.js";
import Description from "./Description.js";
import BuyingInfo from "./BuyingInfo.js";

const tabs = ['bids', 'comments'];
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
export default function Detail({t}) {
    const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();
    const link = window.location.href;
    const auctionId = link.slice(29);
    const [maxPrice, setMaxPrice] = useState('');
    const [auction, setAuction] = useState('');
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [comments, setComments] = useState([])
    const [messageError, setMessageError] = useState('')
    const [content, setContent] = useState('')
    const [total, setTotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [bids, setBids] = useState([])
    const [price, setPrice] = useState('')
    const [priceM, setPriceM] = useState('');
    const [type, setType] = useState('bids');
    const [sellingUser, setSellingUser] = useState('');
    const [open, setOpen] = useState('')
    const [open2, setOpen2] = useState('')
    const [sellingInfo, setSellingInfo] = useState('')
    const [sellingInfoM, setSellingInfoM] = useState('')
    const [categoryInfo, setCategoryInfo] = useState('')
    const [item, setItem] = useState([]);
    const [buyingUser, setBuyingUser] = useState('');
    
    useEffect(() => {
        auctionApi.detail(auctionId)
            .then((res) => {
                setAuction(res.data.data.auctions)
                setSellingUser(res.data.data.selling_user)
                setCategoryInfo(res.data.data.category)
                setItem(res.data.data.items)
                setBuyingUser(res.data.data.buying_user)
            })
    }, [])

    useEffect(() => {
        auctionApi.maxBid(auctionId)
            .then((res) => {
                setMaxPrice(res.data.data)
            })
    }, [totalPrice])

    const getRequestParams = (index, count) => {
        let params = {};
        if (index) {
          params["index"] = index;
        }
        if (count) {
          params["count"] = count;
        }
        return params;
    };

    const retrieveAuctionsBidComment = () => {
        const params = getRequestParams( index, count);
        auctionApi.getListCommentsBids (type, auctionId, params)
            .then((response) => {
                if (type === 'comments') {
                    const { comments, total} = response.data.data;
                    setComments(comments);
                    setTotal(total)
                    const totalPage = Math.ceil(total/count)
                    setCount(totalPage);
                } else {
                    const { bids, total} = response.data.data;
                    setBids(bids);
                    setTotalPrice(total)
                    const totalPage = Math.ceil(total/count)
                    setCount(totalPage);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(retrieveAuctionsBidComment, [type, auctionId, index, count, total, totalPrice]);

    const handleCreateComment = (e) => {
        e.preventDefault();
        auctionApi.createComment(
            auctionId,
            content
        )
        .then(res => {
            if (res.data.code === 1000) {
                setTotal(res.data.total)
            } else {
                setMessageError(res.data.message)
            }
        })
        .catch((e) => {
            navigate("/login");
        })
        setMessageError('')
        setContent('')
    }
    const handleCreateBid = (e) => {
        e.preventDefault();
        setPriceM('')
        auctionApi.createBid(
            auctionId,
            price
        )
        .then(res => {
            if (res.data.code === 1001) {
                const errors = res.data.message
                if (errors.slice(7) == 7000) {
                    setPriceM(`${t('errors.7000')}`)
                }
                if (errors.slice(7) == 7006) {
                    setPriceM(`${t('errors.7006')}`)
                }
                if (errors.slice(7) == 7014) {
                    setPriceM(`${t('errors.7014')}`)
                }
            } else {
                setTotalPrice(res.data.total)
            }
        })
        .catch((e) => {
            navigate("/login");
        })
        setPrice('')
    }

    const handleAccept = () => {
        auctionApi.acceptBid(auctionId, sellingInfo)
        .then((res) => {
            if (res.data.code === 1001) {
                setSellingInfoM(res.data.message)
            } else {
                setOpen(false);
            }
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

    const handleNegotiate = () => {
        navigate('/chat')
    }

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

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
        <Info 
            auctionId={auctionId}
            maxPrice={maxPrice}
            sellingUser={sellingUser}
            auction={auction}
            categoryInfo={categoryInfo}
            currentUser={currentUser}
            item={item}
            t={t}
        />
        <Description 
        description={item.description}
        t={t}
        />
        {
            (auction.statusId === 6 || auction.statusId === 7 || auction.statusId === 8)
            && ((currentUser.user.user_id === sellingUser.selling_user_id) || (currentUser.user.user_id === buyingUser.buying_user_id) )
            && (
                <BuyingInfo 
                    buyingUser={buyingUser}
                    item={item}
                    status={auction.statusId}
                    auctionId={auction.auction_id}
                    t={t}
                />
            )
        }
       
        <Paper style={{ padding: "20px 200px", marginBottom: '40px' }} className="container">
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="featured__controls">
                                <ul>
                                    {
                                        tabs.map(tab => (
                                            <li 
                                                key={tab}
                                                style={type === tab ? {
                                                    color: '#7FAD39',
                                                } : {}}
                                                onClick={() => setType(tab)}
                                            >
                                                <b>{t(`detail.${tab}`)}</b>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                <div>
                <div className="featured__filter">
                        {
                            (type === 'comments') && (
                                <div>
                                    <Form
                                    method="POST"
                                    onSubmit={handleCreateComment}
                                    >
                                        <div className="form-group">
                                            <Textarea
                                            type="text"
                                            className="form-control"
                                            name="content"
                                            placeholder={t('detail.comment_input')}
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            />
                                            {   messageError && (
                                                <div className="form-group">
                                                    <label style={{color:"red"}}>
                                                    {messageError}
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <button className="site-btn send">
                                            <span>{t('button_input.send')}</span>
                                            </button>
                                        </div>
                                    </Form>
                                    
                                </div>
                            )
                        }
                        {
                            (type === 'comments') && (
                                <p>{total} {t(`detail.comments`)}</p>
                            )
                        }
                        {
                            (type === 'comments') && (
                                comments.map((comment) => (
                                    <div key={comment.comment_id}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar alt={comment.user_name} src={comment.user_avatar} />
                                            </Grid>
                                            <Grid justifyContent="left" item xs zeroMinWidth>
                                                <div>
                                                    <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user_name}</h4>
                                                    <span style={{float:"right"}}>{ format(comment.updated_at) }</span>
                                                </div>
                                                <p style={{ textAlign: "left" }}>
                                                    {comment.content}
                                                </p>
                                                <p style={{ textAlign: "left", color: "gray" }}>
                                                <Button color="success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                                                <Button color="success"><i class="fa fa-pencil-square-o" style={{color: '#007bff'}} aria-hidden="true"></i></Button>
                                                <DeleteComment 
                                                commentId = {comment.comment_id}
                                                auctionId = {auctionId}
                                                setTotal = {setTotal}
                                                t={t}
                                                />
                                                </p>
                                            </Grid>
                                            
                                        </Grid>
                                    </div>
                                ))
                            )

                        }
                        {
                            (type === 'bids') && (auction.statusId === 1) && (
                                <div>
                                    <Form
                                    method="POST"
                                    onSubmit={handleCreateBid}
                                    >
                                        <div className="form-group">
                                            <Textarea
                                            type="text"
                                            className="form-control"
                                            name="price"
                                            placeholder={t('detail.bid_input')}
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                            />
                                            {   priceM && (
                                                <div className="form-group">
                                                    <label style={{color:"red"}}>
                                                    {priceM}
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <button className="site-btn send">
                                            <span>{t('button_input.send')}</span>
                                            </button>
                                        </div>
                                    </Form>
                                    
                                </div>
                            )
                        }
                        {
                            (type === 'bids') && (
                                <p>{totalPrice} {t(`detail.bids`)}</p>
                            )
                        }
                        {
                            (type === 'bids')  && (
                                bids.map((bid, index) => (
                                    <div key={index}>
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar alt={bid.user_name} src={bid.user_avatar} />
                                            </Grid>
                                            <Grid justifyContent="left" item xs zeroMinWidth>
                                            <div>
                                                    <h4 style={{ margin: 0, textAlign: "left" }}>{bid.user_name}</h4>
                                                    <span style={{float:"right"}}>{ format(bid.updated_at) }</span>
                                                </div>
                                                <p style={{ textAlign: "left" }}>
                                                    {Number(bid.price).toLocaleString()} {t('bid.money')}
                                                </p>
                                                <p style={{ textAlign: "left", color: "gray" }}>
                                                <Button color="success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                                                <Button color="success"><i class="fa fa-pencil-square-o" style={{color: '#007bff'}} aria-hidden="true"></i></Button>
                                                {
                                                    (auction.statusId === 3) 
                                                    && (currentUser.user.user_id === sellingUser.selling_user_id)
                                                    && (bid.price === maxPrice) 
                                                    && (
                                                        <>
                                                            <Button size="small" onClick={handleOpen} variant="outlined" style={{ color: '#4CAF50', borderColor:'#4CAF50', height: '20px', marginRight: '20px'}}>
                                                            {t('bid.accept')}
                                                            </Button>
                                                            <Modal
                                                                open={open}
                                                                onClose={handleClose}
                                                                aria-labelledby="parent-modal-title"
                                                                aria-describedby="parent-modal-description"
                                                            >
                                                                <Box sx={{ ...style, width: 400 }}>
                                                                <h4 id="parent-modal-title" style={{color: '#28a745'}}><b>{t('bid.title_modal')}</b></h4>
                                                                <br/>
                                                                <Form
                                                                method="POST"
                                                                >
                                                                    <Textarea
                                                                        style={{height: '120px'}}
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="selling_info"
                                                                        onChange={e => setSellingInfo(e.target.value)}
                                                                        placeholder={t('bid.input_modal')}
                                                                    />
                                                                    {   sellingInfoM && (
                                                                        <div className="form-group">
                                                                            <label style={{color:"red"}}>
                                                                            {sellingInfoM}
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                </Form>
                                                                <hr></hr>
                                                                <Button onClick={handleAccept} variant="outlined" style={{color: '#28a745', borderColor:'#28a745'}}>{t('bid.button_accept')}</Button>
                                                                <Button onClick={handleClose} style={{float:'right'}} variant="outlined">{t('button_input.cancel')}</Button>
                                                                </Box>
                                                            </Modal>
                                                            <Button size="small" onClick={handleOpen2} variant="outlined" style={{ color: '#FF9800', borderColor:'#FF9800', height: '20px'}}>
                                                            {t('bid.button_negotiate')}
                                                            </Button>
                                                            <Modal
                                                                open={open2}
                                                                onClose={handleClose2}
                                                                aria-labelledby="parent-modal-title"
                                                                aria-describedby="parent-modal-description"
                                                            >
                                                                <Box sx={{ ...style, width: 450 }}>
                                                                <h4 id="parent-modal-title" style={{color: '#FF9800'}}><b>{t('bid.title_modal_negotiate')}</b></h4>
                                                                <br/>
                                                                <hr></hr>
                                                                <Button onClick={handleNegotiate} variant="outlined" style={{color: '#FF9800', borderColor:'#FF9800'}}>{t('bid.yes')}</Button>
                                                                <Button onClick={handleClose2} style={{float:'right'}} variant="outlined">{t('bid.no')}</Button>
                                                                </Box>
                                                            </Modal>
                                                        </>
                                                    )
                                                }
                                                {
                                                    (auction.statusId === 6)
                                                    && (bid.price === maxPrice) 
                                                    && (
                                                        <Button size="small" disabled onClick={handleOpen} variant="outlined" style={{ color: '#4CAF50', borderColor:'#4CAF50', height: '20px', marginRight: '20px'}}>
                                                            {t('receive.delivery1')}
                                                        </Button>
                                                    )
                                                }
                                                </p>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ))
                            )
                        }
                    
                    </div>
                    <Paginate 
                        counts={counts}
                        index={index}
                        setPage={setPage}
                        count={count}
                        setPageSize={setPageSize}
                    />
                    </div>
                </div>
            </section>
        </Paper>
    </>
    )
}
