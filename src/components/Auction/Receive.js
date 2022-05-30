import React, {useState} from 'react';
import {Paper, Button, Modal, Box} from "@mui/material";
import Rater from 'react-rater'
import auctionApi from '../api/auctionApi';
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
function Receive({item, buyingUser, status, auctionId, t}) {
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
                    <p><b>{t('receive.name')}: </b> {buyingUser.buying_user_name}</p>
                    <p><b>{t('user.phone')}:</b> {buyingUser.buying_user_phone}</p>
                    <p><b>{t('user.address')}:</b> {buyingUser.buying_user_address}</p>
                    <p style={{whiteSpace: 'pre-line'}}><b>{t('receive.buy_info')}:</b>{item.selling_info}</p>  
                </div>
                <div className="col-6">
                <Button size="small" className={(status === 6) ? 'delivery' : 'delivery_1' } disabled variant="outlined" style={{ height: '20px', marginBottom: '25px'}}>
                    <b>{t('receive.delivery1')}</b>
                </Button>
                <br/>
                {
                    (status === 7) ? (
                        <>
                            <Button size="small" variant="contained" style={{height: '20px', marginRight: '10px'}} color='success'>
                                <b onClick={handleOpen}>{t('receive.receive1')}</b>
                            </Button>
                            <Button size="small" variant="contained" style={{height: '20px'}}>
                                <b >{t('receive.receive2')}</b>
                            </Button>
                            <br/>
                        </>
                    ) : (
                        <>
                            <Button size="small" disabled variant="contained" style={{height: '20px', marginRight: '10px'}}>
                                <b onClick={handleOpen}>{t('receive.receive1')}</b>
                            </Button>
                            <Button size="small" disabled variant="contained" style={{height: '20px'}}>
                                <b >{t('receive.receive2')}</b>
                            </Button>
                            <br/>
                        </>
                    )
                }
                <Button size="small" className={(status === 8) ? 'received' : 'receive_1'} disabled variant="outlined" style={{ height: '20px', marginTop: '25px'}}>
                    <b>{t('receive.delivery_success')}</b>
                </Button>
                
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                    <br/>
                    <p>{t('receive.receive_modal')}</p>
                    <p>{t('receive.rate')}</p>
                    <Rater total={5} rating={5} />
                    <hr></hr>
                    <Button onClick={() => handleSuccess(auctionId)} variant="outlined" style={{color: '#28a745', borderColor:'#28a745'}}>{t('receive.confirm_modal')}</Button>
                    <Button onClick={handleClose} style={{float:'right'}} variant="outlined">{t('receive.cancel_modal')}</Button>
                    </Box>
                </Modal>

                </div>
            </div>
               
        </Paper>
        </>
    )
}

export default Receive;