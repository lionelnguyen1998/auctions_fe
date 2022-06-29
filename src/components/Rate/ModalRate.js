import React, {useState} from 'react';
import {Button, Modal, Box} from "@mui/material";
import auctionApi from '../api/auctionApi';
import { useNavigate } from 'react-router-dom';
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
import UploadOnly from '../UploadFile/UploadOnly.js';
import Select from "react-select";
import './index.css'

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
function ModalRate({categoryId, auctionId, t, status}) {
    let navigate = useNavigate();
    const [open, setOpen] = useState('')
    const [star, setStar] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('');
    const [messageStar, setMessageStar] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const options = [
        {value:'1', label:  
        <i class="fa fa-star" aria-hidden="true"></i>
        },
        {value:'2', label:  
        <div>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
        </div>
        },
        {value:'3', label: 
        <div>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
        </div>
        },
        {value:'4', label: 
        <div>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
        </div>
        },
        {value:'5', label: 
        <div>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
        </div>
        },
    ]
    const handleSuccess = (auctionId) => {
        setMessageContent("");
        setMessageStar("")
        auctionApi.rate(auctionId, star, content, image) 
        .then((res) => {
            if (res.data.code === 1000) {
                navigate(`/listItem/${categoryId}`);
                window.location.reload();
            } else {
                const errors = res.data.message.split('&')
                if (errors[1].slice(8) == 7000) {
                    setMessageContent(`${t('errors.7000')}`);
                } 
                if (errors[0].slice(5) == 7000) {
                    setMessageStar(`${t('errors.7000')}`);
                } 
                console.log(messageStar)
            }
        })
        .catch(e => console.log(e));
    }
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
            <br/>
            <b style={{color:'red'}}>{t('receive.receive_modal')}</b>
            <hr></hr>
            <Form
            method="POST"
            >
                <div className="form-group">
                    <Textarea
                        style={{height: '120px'}}
                        Star="text"
                        className="form-control"
                        name="content"
                        placeholder={t('bid.input_modal')}
                        onChange={e => setContent(e.target.value)}
                    />
                    {messageContent && (
                            <div className="form-group">
                            <label style={{color:"red"}}>
                                {messageContent}
                            </label>
                            </div>
                    )}
                </div>
                <UploadOnly 
                    image={image}
                    setImage={setImage}
                    t={t}
                />
                <div className="form-group">
                    <Select name='report_type' 
                        onChange={e => setStar(e.value)}
                        placeholder={t('receive.rate')}
                        options={options}
                    />
                    {messageStar && (
                        <div className="form-group">
                        <label style={{color:"red"}}>
                            {messageStar}
                        </label>
                        </div>
                    )}
                </div>
            </Form>
            <hr></hr>
            <Button onClick={() => handleSuccess(auctionId)} variant="outlined" style={{color: '#28a745', borderColor:'#28a745'}}>{t('receive.confirm_modal')}</Button>
            <Button onClick={handleClose} style={{float:'right'}} variant="outlined">{t('receive.cancel_modal')}</Button>
            </Box>
        </Modal>
        </>
    )
}

export default ModalRate;