import React, {Fragment, useState} from 'react';
import auctionApi from '../../components/api/auctionApi';
import {Button} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';

function DeleteComment({commentId, auctionId, setTotal, t}) {
    const [deleteComment, setDeleteComment] = useState('');
    const handleDeleteComment = () => {
        auctionApi.deleteComment(commentId)
            .then((response) => {
                if (response.data.code === 1006) {
                    setDeleteComment(`${t('errors.1006')}`)
                } else {
                    setTotal(response.data.data.total)
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