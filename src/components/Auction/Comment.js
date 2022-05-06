import React, {Fragment, useEffect, useState, useRef} from 'react';
import {Avatar, Pagination, Paper, Grid, Button} from "@mui/material";
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
import { useNavigate } from 'react-router-dom';
import {tabKey} from "../constant/index";
import AuthService from "../services/auth.service";
import auctionApi from '../api/auctionApi';

const tabs = ['bids', 'comments'];
function Comment(props) {
  console.log(props)
  const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [total, setTotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [bids, setBids] = useState([])
    const [price, setPrice] = useState('')
    const [priceM, setPriceM] = useState('');
    const [type, setType] = useState('bids');
    const pageSizes = [4, 8, 12];

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
      auctionApi.getListCommentsBids (type, props.auctionId, params)
          .then((response) => {
              if (type === 'comments') {
                  const { comments, total} = response.data.data;
                  setComments(comments);
                  const totalPage = Math.ceil(total/count)
                  setCount(totalPage);
              } else {
                  const { bids, total} = response.data.data;
                  setBids(bids);
                  const totalPage = Math.ceil(total/count)
                  setCount(totalPage);
              }
          })
          .catch((e) => {
              console.log(e);
          });
  };

  useEffect(retrieveAuctionsBidComment, [type, props.auctionId, index, count, total, totalPrice]);

  const handlePageChange = (event, value) => {
      setPage(value);
  };

  const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPage(1);
  };

  const handleCreateComment = (e) => {
      e.preventDefault();
      auctionApi.createComment(
        props.auctionId,
          content
      )
      .then(res => {
      })
      .catch((e) => {
          navigate("/login");
      })
      setTotal(total + 1)
      setContent('')
  }

  const handleCreateBid = (e) => {
      e.preventDefault();
      setPriceM('')
      auctionApi.createBid(
        props.auctionId,
          price
      )
      .then(res => {
          if (res.data.code === 1001) {
              const errors = res.data.message
              setPriceM(errors.slice(7))
          }
      })
      .catch((e) => {
          navigate("/login");
      })
      setTotalPrice(totalPrice + 1)
      setPrice('')
  }

  return (
    <Fragment>
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
                                        comments.map((comment, index) => (
                                            <div key={index}>
                                                <Grid container wrap="nowrap" spacing={2}>
                                                    <Grid item>
                                                        <Avatar alt={comment.user_name} src={comment.user_avatar} />
                                                    </Grid>
                                                    <Grid justifyContent="left" item xs zeroMinWidth>
                                                        <div>
                                                            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user_name}</h4>
                                                            <span style={{float:"right"}}>{comment.updated_at}</span>
                                                        </div>
                                                        <p style={{ textAlign: "left" }}>
                                                            {comment.content}
                                                        </p>
                                                        <p style={{ textAlign: "left", color: "gray" }}>
                                                        <Button color="success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                                                        <Button color="success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                                                        <Button color="success"><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                                        </p>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </div>
                                        ))
                                    )

                                }
                                {
                                    (type === 'bids') && (props.auction.statusId === 1) && (
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
                                                            <span style={{float:"right"}}>{bid.updated_at}</span>
                                                        </div>
                                                        <p style={{ textAlign: "left" }}>
                                                            {bid.price}
                                                        </p>
                                                        <p style={{ textAlign: "left", color: "gray" }}>
                                                        <Button color="success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                                                        <Button color="success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                                                        <Button color="success"><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                                        {
                                                            (props.auction.statusId === 3) 
                                                            && (currentUser.user.user_id === props.sellingUser.selling_user_id) 
                                                            && (bid.price === props.maxPrice) 
                                                            && (
                                                                <>
                                                                    <Button size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px', marginRight: '20px'}}>
                                                                        chap nhan
                                                                    </Button>
                                                                    <Button size="small" variant="outlined" style={{ color: '#FF9800', height: '20px'}}>
                                                                        thuong luong
                                                                    </Button>
                                                                </>
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
                                <div>
                                    <select className="select-paginate" onChange={handlePageSizeChange} value={count}>
                                        {pageSizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                        ))}
                                    </select>
                                    <Pagination style={{float: "right"}}
                                        className="my-3"
                                        count={counts}
                                        page={index}
                                        siblingCount={1}
                                        boundaryCount={1}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handlePageChange}
                                        color="success"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </Paper>
    </Fragment>
  )
}

export default Comment;