import React from 'react';
import {Paper, Button} from "@mui/material";
import ModalRate from '../Rate/ModalRate.js'
import './buyingInfo.css'

function Receive({item, buyingUser, status, auctionId, t, categoryId}) {
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
                <ModalRate
                    categoryId={categoryId}
                    auctionId={auctionId}
                    t={t}
                    status={status}
                />
                <Button size="small" className={(status === 8) ? 'received' : 'receive_1'} disabled variant="outlined" style={{ height: '20px', marginTop: '25px'}}>
                    <b>{t('receive.delivery_success')}</b>
                </Button>
                </div>
            </div>
        </Paper>
        </>
    )
}

export default Receive;