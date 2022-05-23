import React, {useState} from 'react';
import {Button, Modal, Box} from "@mui/material";
import auctionApi from '../api/auctionApi';
import { useNavigate } from 'react-router-dom';

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
function ModalDelete({auctionId}) {
    let navigate = useNavigate();
    const [open, setOpen] = useState('')
    const handleDeleteAuction = (auctionId) => {
        console.log(auctionId)
        auctionApi.deleteAuction(auctionId)
            .then(res => {
                console.log(res)
                if (res.data.code === 1000) {
                    navigate('/auctions')
                }
            })
            .catch(e => console.log(e))
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <Button size="small" onClick={handleOpen} variant="outlined" style={{ color: '#dc3545', borderColor:'#dc3545', height: '20px'}}>
            <b>削除</b>
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 450 }}>
            <h4 id="parent-modal-title" style={{color: '#dc3545'}}><b>本当に削除しますか？</b></h4>
            <br/>
            <hr></hr>
            <Button onClick={() => handleDeleteAuction(auctionId)} variant="outlined" style={{color: '#dc3545', borderColor:'#dc3545'}}><b>削除</b></Button>
            <Button onClick={handleClose} style={{float:'right'}} variant="outlined"><b>カンセル</b></Button>
            </Box>
        </Modal>
        </>
    )
}

export default ModalDelete;