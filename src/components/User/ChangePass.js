import React, { Fragment, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import userApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

function ChangePass({t}) {
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
                    AuthService.logout();
                    navigate("/");
                    window.location.reload();
                } else {
                    const errors = response.data.message.split("&");
                    if (errors[0].slice(9) == 7003) {
                        setMessageOP(`${t('errors.7003')}`)
                    } 
                    if (errors[0].slice(9) == 7000) {
                        setMessageOP(`${t('errors.7000')}`)
                    }

                    if (errors[1].slice(9) == 7001) {
                        setMessageNP(`${t('errors.7001')}`)
                    } 
                    if (errors[1].slice(9) == 7000) {
                        setMessageNP(`${t('errors.7000')}`)
                    }

                    if (errors[2].slice(8) == 7000) {
                        setMessageRP(`${t('errors.7000')}`)
                    }
                    if (errors[2].slice(8) == 7001) {
                        setMessageRP(`${t('errors.7001')}`)
                    } 
                    if (errors[2].slice(8) == 7003) {
                        setMessageRP(`${t('errors.7003')}`)
                    }
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
                        <h2>{t('change_pass.title')}</h2>
                    </div>
                </div>
            </div>
            <Form
            onSubmit={handleChangePass}
            >
                <div className="form-group">
                    <label htmlFor="old_pass"><b>{t('change_pass.old_pass')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="password"
                    className="form-control"
                    name="old_pass"
                    placeholder={t('change_pass.input_old_pass')}
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
                    <label htmlFor="new_pass"><b>{t('change_pass.new_pass')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="password"
                    className="form-control"
                    name="new_pass"
                    value={newPass}
                    placeholder={t('change_pass.input_new_pass')}
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
                    <label htmlFor="re_pass"><b>{t('change_pass.re_pass')}</b></label>
                    <Input
                    type="password"
                    className="form-control"
                    name="re_pass"
                    placeholder={t('change_pass.input_re_pass')}
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
                    <button className="site-btn">
                    {t('button_input.edit')}
                    </button>
                </div>
            </Form>
        </div>
        </div>
    </Fragment>
    );
}
    
export default ChangePass;