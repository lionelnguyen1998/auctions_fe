import React, { Fragment, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import userApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';

function ChangePass() {
    let navigate = useNavigate();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [messageOP, setMessageOP] = useState('');
    const [messageNP, setMessageNP] = useState('');
    const [messageRP, setMessageRP] = useState('');

    const handleChangePass = (e) => {
        e.preventDefault();
        setMessageOP('');
        setMessageNP('');
        setMessageRP('');
        userApi.changepass(
            oldPass,
            newPass,
            rePass,
        ).then(
            response => {
                if (response.data.code === 1000) {
                    navigate("/");
                    window.location.reload();
                } else {
                    const errors = response.data.message.split("&");
                    setMessageOP(errors[0].slice(9))
                    setMessageNP(errors[1].slice(9))
                    setMessageRP(errors[2].slice(8))
                }
                }
            );
    }
    return (
    <Fragment>
        <div className="col-md-12">
        <div className="card card-container">
            <div className="row">
                <div className="col-lg-12">
                <div className="section-title">
                        <h2>パスワードを変更</h2>
                    </div>
                </div>
            </div>
            <Form
            onSubmit={handleChangePass}
            >
                <div className="form-group">
                    <label htmlFor="old_pass"><b>現在のパスワード </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="password"
                    className="form-control"
                    name="old_pass"
                    value={oldPass}
                    onChange={e => setOldPass(e.target.value)}
                    />
                    {messageOP && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageOP}
                        </label>
                    </div>
                    )}
                    <label htmlFor="new_pass"><b>新しいパスワード </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="password"
                    className="form-control"
                    name="new_pass"
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    />
                    {messageNP && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageNP}
                        </label>
                    </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="re_pass"><b>新しいパスワードを再入力　</b></label>
                    <Input
                    type="password"
                    className="form-control"
                    name="re_pass"
                    value={rePass}
                    onChange={e => setRePass(e.target.value)}
                    />
                    {messageRP && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageRP}
                        </label>
                    </div>
                    )}
                </div>
                <div className="form-group">
                    <button className="site-btn"
                    >編集</button>
                </div>
            </Form>
        </div>
        </div>
    </Fragment>
    );
}
    
export default ChangePass;