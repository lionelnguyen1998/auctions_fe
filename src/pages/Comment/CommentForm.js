import React, {useState} from 'react';
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
import auctionApi from '../../components/api/auctionApi';
import { useNavigate} from 'react-router-dom';
import './index.css'

function CommentForm ({t, auctionId, setTotal}) {
    let navigate = useNavigate();
    const [content, setContent] = useState('')
    const [messageError, setMessageError] = useState('')
    
    const handleCreateComment = (e) => {
        e.preventDefault();
        auctionApi.createComment(
            auctionId,
            content
        )
        .then(res => {
            if (res.data.code === 1000) {
                setTotal(res.data.total)
            } else {
                setMessageError(res.data.message)
            }
        })
        .catch((e) => {
            navigate("/login");
        })
        setMessageError('')
        setContent('')
    }
    return (
        <>
        <Form
        method="POST"
        onSubmit={handleCreateComment}
        >
            <div className="form-group">
                <Textarea
                type="text"
                className="form-control"
                name="content"
                placeholder={t('detail.comment_input')}
                value={content}
                onChange={e => setContent(e.target.value)}
                />
                {   messageError && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageError}
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

export default CommentForm;