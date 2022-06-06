import React from 'react';
import DeleteComment from './DeleteComment';
import {Avatar, Grid, Button} from "@mui/material";
import { format } from "timeago.js";
import './detail.css'

function ListComments ({comment, t, auctionId, setTotal}) {
    return (
        <>
        <div key={comment.comment_id}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={comment.user_name} src={comment.user_avatar} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <div>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user_name}</h4>
                        <span style={{float:"right", color: '#e6efe6'}}>{ format(comment.updated_at) }</span>
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
        </>
    )
}

export default ListComments;