import React from 'react';
import {Avatar, Grid, Button} from "@mui/material";
import { format } from "timeago.js";
import './index.css'
import ModalAccept from '../Modal/ModalAccept.js'

function ListBids ({bid, t, auction, index, currentUser, sellingUser, maxPrice, auctionId}) {
    return (
        <>
        <div key={index}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={bid.user_name} src={bid.user_avatar} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                <div>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{bid.user_name}</h4>
                        <span style={{float:"right", color: '#e6efe6'}}>{ format(bid.updated_at) }</span>
                    </div>
                    <p style={{ textAlign: "left" }}>
                        {Number(bid.price).toLocaleString()} $
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    <Button color="success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                    <Button color="success"><i class="fa fa-pencil-square-o" style={{color: '#007bff'}} aria-hidden="true"></i></Button>
                    {
                        (auction.statusId === 3) 
                        && (currentUser.user.user_id === sellingUser.selling_user_id)
                        && (bid.price === maxPrice) 
                        && (
                           <ModalAccept
                           t={t}
                           auctionId={auctionId}
                           />
                        )
                    }
                    {
                        (auction.statusId === 6 || auction.statusId === 7 || auction.statusId === 8)
                        && (bid.price === maxPrice) 
                        && (
                            <Button size="small" disabled variant="outlined" style={{ color: '#4CAF50', borderColor:'#4CAF50', height: '20px', marginRight: '20px'}}>
                                {t('receive.bought')}
                            </Button>
                        )
                    }
                    </p>
                </Grid>
            </Grid>
        </div>
        </>
    )
}

export default ListBids;