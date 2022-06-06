import React, { Fragment, useState } from 'react';
import contactApi from '../api/contactApi';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import Textarea from "react-validation/build/textarea";
import { Paper } from '@mui/material'
import Upload from './Upload.js'

function Contacts({t}) {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [typeReport, setType] = useState('');
    const [content, setContent] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [messageName, setMessageName] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleContact = (e) => {
        e.preventDefault();
        setMessageEmail("");
        setMessagePhone("");
        setMessageName("")
        setMessageContent("");
        setMessageType("")
        contactApi.contactUs(
          name,
          email,
          phone,
          content,
          file,
          typeReport
        ).then(
            (res) => {
                if (res.data.code === 1000) {
                    navigate("/");
                    window.location.reload();
                } else {
                    const errors = res.data.message.split('&')
                    if (errors[0].slice(6) == 7000) {
                        setMessageName(`${t('errors.7000')}`);
                    } 
                    if (errors[0].slice(6) == 7001) {
                        setMessageName(`${t('errors.7001')}`);
                    } 

                    if (errors[1].slice(7) == 7013) {
                        setMessagePhone(`${t('errors.7013')}`);
                    }
                    if (errors[1].slice(7) == 7000) {
                        setMessagePhone(`${t('errors.7000')}`);
                    }

                    if (errors[2].slice(7) == 7000) {
                        setMessageEmail(`${t('errors.7000')}`);
                    } 
                    if (errors[2].slice(7) == 7001) {
                        setMessageEmail(`${t('errors.7001')}`);
                    }
                    if (errors[2].slice(7) == 7002) {
                        setMessageEmail(`${t('errors.7002')}`);
                    }

                    if (errors[4].slice(12) == 7000) {
                        setMessageType(`${t('errors.7000')}`);
                    }
                }
            }
        );
    }

    const options = [
        {value:'1', label: `${t('contacts.type1')}`},
        {value:'2', label: `${t('contacts.type2')}`},
        {value:'3', label: `${t('contacts.type3')}`},
    ]

    return (
        <Fragment>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <div className="container">  
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>{t('contacts.contact')}</h2>
                            </div>
                        </div>
                    </div>
                    <Form 
                        className="form-test"
                        method="POST"
                        onSubmit={handleContact}
                        >
                        <div className="form-group">
                            <label htmlFor="report_type"><b>{t('contacts.type')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Select name='report_type' 
                                onChange={e => setType(e.value)}
                                placeholder={t('contacts.type')}
                                options={options}
                            />
                            {messageType && (
                                <div className="form-group">
                                <label style={{color:"red"}}>
                                    {messageType}
                                </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name"><b>{t('contacts.name')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={e => setName(e.target.value)}
                                placeholder={t('contacts.name_input')}
                            />
                            {messageName && (
                                <div className="form-group">
                                <label style={{color:"red"}}>
                                    {messageName}
                                </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"><b>{t('contacts.email')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                placeholder={t('contacts.email_input')}
                            />
                            {messageEmail && (
                                <div className="form-group">
                                <label style={{color:"red"}}>
                                    {messageEmail}
                                </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone"><b>{t('contacts.phone')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="phone"
                                onChange={e => setPhone(e.target.value)}
                                placeholder={t('contacts.phone_input')}
                            />
                            {messagePhone && (
                                <div className="form-group">
                                <label style={{color:"red"}}>
                                    {messagePhone}
                                </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content"><b>{t('contacts.content')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Textarea
                                style={{height: '120px'}}
                                type="text"
                                className="form-control"
                                name="content"
                                onChange={e => setContent(e.target.value)}
                                placeholder={t('contacts.content_input')}
                            />
                            {messageContent && (
                                <div className="form-group">
                                <label style={{color:"red"}}>
                                    {messageContent}
                                </label>
                                </div>
                            )}
                        </div>
                        <Upload 
                            t={t}
                            file={file}
                            setFile={setFile}
                        />
                        <div className="form-group">
                            <button 
                                className="site-btn"
                            >
                                <span>{t('contacts.send')}</span>
                            </button>
                        </div>
                    </Form>
                </div>
            </Paper>
            <div className="google-map-code">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.6504851923864!2d105.84081554309465!3d21.000018685759812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adc56146714b%3A0x540247151005b711!2zxJDhuqFpIGjhu41jIGLDoWNoIGtob2EgaMOgIG7hu5lp!5e0!3m2!1svi!2s!4v1653013052239!5m2!1svi!2s" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </Fragment>
    )
}

export default Contacts;