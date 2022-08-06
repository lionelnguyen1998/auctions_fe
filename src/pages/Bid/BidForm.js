import React, {useState} from 'react';
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
import auctionApi from '../../components/api/auctionApi';
import { useNavigate} from 'react-router-dom';
import './index.css'

function BidForm ({t, auctionId, setTotalPrice}) {
    let navigate = useNavigate();
    const [price, setPrice] = useState('')
    const [priceM, setPriceM] = useState('');
    const handleCreateBid = (e) => {
        e.preventDefault();
        setPriceM('')
        auctionApi.createBid(
            auctionId,
            price
        )
        .then(res => {
            if (res.data.code === 1001) {
                const errors = res.data.message
                if (errors.slice(7) == 7000) {
                    setPriceM(`${t('errors.7000')}`)
                }
                if (errors.slice(7) == 7006) {
                    setPriceM(`${t('errors.7006')}`)
                }
                if (errors.slice(7) == 7014) {
                    setPriceM(`${t('errors.7014')}`)
                }
            } else {
                setTotalPrice(res.data.total)
            }
        })
        .catch((e) => {
            navigate("/login");
        })
        setPrice('')
    }
    return (
        <>
        <Form
        method="POST"
        onSubmit={handleCreateBid}
        >
            <div className="form-group">
                <Textarea
                type="text"
                className="form-control"
                name="price"
                placeholder={t('detail.bid_input')}
                value={price}
                onChange={e => setPrice(e.target.value)}
                />
                {   priceM && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {priceM}
                        </label>
                    </div>
                )}
            </div>
            <div className="form-group">
                <button className="site-btn send">
                <span>{t('button_input.send')}</span>
                </button>
            </div>
        </Form>
        </>
    )
}

export default BidForm;