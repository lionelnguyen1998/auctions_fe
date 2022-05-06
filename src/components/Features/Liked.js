import React, {Fragment, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import auctionApi from '../api/auctionApi';
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';

function Liked(props) {
    const auctionId = props.auction
    console.log(auctionId)
    console.log(props.like)
    const currentUser = AuthService.getCurrentUser();
    const [liked, setLiked] = useState(props.like)
    const [totalLiked, setTotalLiked] = useState('')
    console.log(liked)

    const handleLiked = (e) => {
        e.preventDefault();
        auctionApi.like(auctionId)
        .then(res => {
            setLiked(res.data.data.is_liked)
        })
    }

    useEffect(() => {
        auctionApi.getTotalLikeOfUser()
            .then((res) => {
                setTotalLiked(res.data.data.total_liked)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [liked])

    return (
        <Fragment>
            <Button size="small" style={{color:'#4CAF50', marginLeft: '10px', height: '20px'}}
                onClick={handleLiked}
            >
                {
                    currentUser ? ((liked == 1) ? (<i className="fa fa-heart"></i>) : (<i class="fa fa-heart-o" aria-hidden="true"></i>)) 
                        : (<Link to='/login'><i class="fa fa-heart-o" aria-hidden="true"></i></Link>)
                }
            </Button>
        </Fragment>
    )
}

export default Liked;