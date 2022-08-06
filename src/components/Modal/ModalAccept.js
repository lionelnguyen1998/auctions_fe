import React, {useState} from 'react';
import {Button, Modal, Box} from "@mui/material";
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
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
function ModalAccept({auctionId, t}) {
    const [sellingInfo, setSellingInfo] = useState('')
    const [sellingInfoM, setSellingInfoM] = useState('')
    const [open, setOpen] = useState('')
    const handleAccept = () => {
        auctionApi.acceptBid(auctionId, sellingInfo)
        .then((res) => {
            if (res.data.code === 1001) {
                setSellingInfoM(res.data.message)
            } else {
                setOpen(false);
                window.location.reload();
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
    
    return (
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
        </>
    )
}

export default ModalAccept;