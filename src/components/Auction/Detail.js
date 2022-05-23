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
export default function Detail() {
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
    
    useEffect(() => {
        auctionApi.detail(auctionId)
            .then((res) => {
                setAuction(res.data.data.auctions)
                setSellingUser(res.data.data.selling_user)
                setCategoryInfo(res.data.data.category)
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
                setPriceM(errors.slice(7))
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
                           <p onClick={() => navigate(-1)}>オークション一覧</p>
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
        />
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
                                                <b>{tabKey[tab]}</b>
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
                                            placeholder='入力してください'
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
                                            <span>送信</span>
                                            </button>
                                        </div>
                                    </Form>
                                    
                                </div>
                            )
                        }
                        {
                            (type === 'comments') && (
                                <p>{total} コメント</p>
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
                                            placeholder='入力してください'
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
                                            <span>送信</span>
                                            </button>
                                        </div>
                                    </Form>
                                    
                                </div>
                            )
                        }
                        {
                            (type === 'bids') && (
                                <p>{totalPrice} 入札</p>
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
                                                    {Number(bid.price).toLocaleString()} 円
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
                                                                アクセプタンス
                                                            </Button>
                                                            <Modal
                                                                open={open}
                                                                onClose={handleClose}
                                                                aria-labelledby="parent-modal-title"
                                                                aria-describedby="parent-modal-description"
                                                            >
                                                                <Box sx={{ ...style, width: 400 }}>
                                                                <h4 id="parent-modal-title" style={{color: '#28a745'}}><b>オークションの買い取り情報</b></h4>
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
                                                                        placeholder='入力してください'
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
                                                                <Button onClick={handleAccept} variant="outlined" style={{color: '#28a745', borderColor:'#28a745'}}>アクセプタンス</Button>
                                                                <Button onClick={handleClose} style={{float:'right'}} variant="outlined">キャンセル</Button>
                                                                </Box>
                                                            </Modal>
                                                            <Button size="small" onClick={handleOpen2} variant="outlined" style={{ color: '#FF9800', borderColor:'#FF9800', height: '20px'}}>
                                                                相談する
                                                            </Button>
                                                            <Modal
                                                                open={open2}
                                                                onClose={handleClose2}
                                                                aria-labelledby="parent-modal-title"
                                                                aria-describedby="parent-modal-description"
                                                            >
                                                                <Box sx={{ ...style, width: 450 }}>
                                                                <h4 id="parent-modal-title" style={{color: '#FF9800'}}><b>値段について相談したいですか？</b></h4>
                                                                <br/>
                                                                <hr></hr>
                                                                <Button onClick={handleNegotiate} variant="outlined" style={{color: '#FF9800', borderColor:'#FF9800'}}>はい</Button>
                                                                <Button onClick={handleClose2} style={{float:'right'}} variant="outlined">いいえ</Button>
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
                                                            配信中
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
