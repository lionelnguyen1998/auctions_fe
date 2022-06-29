import React, {useState} from 'react';
import {Modal, Box, Button} from "@mui/material";
import notificationApi from '../../components/api/notificationApi';
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
function ModalBox({auctionId, t}) {
    let navigate = useNavigate();
    const [open, setOpen] = useState('')
    const handleDeleteNotification = (auctionId) => {
        notificationApi.deleteNotification(auctionId)
        .then((res) => {
            setOpen(false);
            navigate(-1)
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
    return (
        <>
        <Button onClick={handleOpen} size="small" style={{fontSize:'40px'}}>
            <i class="fa fa-trash" aria-hidden="true" style={{color: '#dc3545'}}></i>
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
            <h4 id="parent-modal-title" style={{color: '#dc3545'}}><b>{t('modal.title_delete')}</b></h4>
            <hr></hr>
            <Button onClick={() => handleDeleteNotification(auctionId)} variant="outlined" style={{color: '#dc3545', borderColor:'#dc3545'}}>{t('modal.delete')}</Button>
            <Button onClick={handleClose} style={{float:'right'}} variant="outlined">{t('modal.cancel')}</Button>
            </Box>
        </Modal>
        </>
    )
}

export default ModalBox;