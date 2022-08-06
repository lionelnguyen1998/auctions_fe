import React, {useState} from 'react';
import {Paper, Button, Modal, Box} from "@mui/material";
import auctionApi from '../../components/api/auctionApi';
import './buyingInfo.css'

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
function BuyingInfo({item, buyingUser, status, auctionId, t}) {
    const [open, setOpen] = useState('')
    const handleSuccess = (auctionId) => {
        auctionApi.delivery(auctionId) 
        .then((res) => {
            window.location.reload();
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
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                            <p style={{float: 'left', fontWeight: 'bold', fontSize:'20px'}}>{t('receive.receive_title')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row my-4">

                <div className="col-6">
                    <p><b>{t('receive.name')}：</b> {buyingUser.buying_user_name}</p>
                    <p><b>{t('user.phone')}:</b> {buyingUser.buying_user_phone}</p>
                    <p><b>{t('user.address')}:</b> {buyingUser.buying_user_address}</p>
                    <p style={{whiteSpace: 'pre-line'}}><b>{t('receive.buy_info')}:</b>{item.selling_info}</p>  
                </div>
                <div className="col-6">
                {
                    (status === 6) ? (
                        <>
                            <Button size="small" variant="outlined" style={{ height: '20px', marginBottom: '25px', color: '#fd7e14', borderColor: '#fd7e14'}}>
                                <b onClick={handleOpen}>{t('receive.delivery1')}</b>
                            </Button>
                            <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                <h4 id="parent-modal-title" style={{color: '#4CAF50'}}><b>{t('receive.delivery2')}</b></h4>
                                <hr></hr>
                                <Button onClick={() => handleSuccess(auctionId)} variant="outlined" style={{color: '#4CAF50', borderColor:'#4CAF50'}}>{t('button_input.confirm')}</Button>
                                <Button onClick={handleClose} style={{float:'right'}} variant="outlined">{t('button_input.cancel')}</Button>
                                </Box>
                            </Modal>
                        </>
                    ) : (
                        <Button size="small" variant="outlined" disabled style={{ height: '20px', marginBottom: '25px'}}>
                            <b>{t('receive.delivery1')}</b>
                        </Button>
                    )
                }
                <br/>
                <Button size="small" className={(status === 7) ? 'delivery_2' : 'delivery_1'} disabled variant="outlined" style={{ height: '20px', marginBottom: '25px'}}>
                    <b>{t('receive.received')}</b>
                </Button>
                <br/>
                <Button size="small" className={(status === 8) ? 'received' : 'receive_1'} disabled variant="outlined" style={{ height: '20px'}}>
                    <b>{t('receive.delivery_success')}</b>
                </Button>
                </div>
            </div>
        </Paper>
        </>
    )
}

export default BuyingInfo;