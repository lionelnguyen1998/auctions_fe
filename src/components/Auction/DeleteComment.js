import React, {Fragment, useState} from 'react';
import auctionApi from '../api/auctionApi';
import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';

function DeleteComment({commentId, auctionId}) {
    let navigate = useNavigate();
    const [deleteComment, setDeleteComment] = useState('');
    const handleDeleteComment = () => {
        auctionApi.deleteComment(commentId)
            .then((response) => {
                if (response.data.code === 1006) {
                    setDeleteComment(response.data.message)
                } else {
                    navigate(`/detail/${auctionId}`)
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
    return (
        <Fragment>
            <Button color="success"
            onClick={handleDeleteComment}
            >
                <i class="fa fa-trash" style={{color: '#dc3545'}} aria-hidden="true"></i>
            </Button>
            {deleteComment && (
                <div className="form-group">
                    <label style={{color:"red"}}>
                    {deleteComment}
                    </label>
                </div>
            )}
        </Fragment>
    )
}

export default DeleteComment;