import React, { Fragment, useState, useEffect } from 'react';
import contactApi from '../api/contactApi';
import { useNavigate } from 'react-router-dom';
import UploadService from "../services/FileUploadService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import Textarea from "react-validation/build/textarea";
import { Paper } from '@mui/material'

function Contacts() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [imagePreview, setImagePreview] = useState([]);
    const [selectedFile, setSelectedFile] = useState(undefined);
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
                    setMessageName(errors[0].slice(6));
                    setMessageEmail(errors[2].slice(7));
                    setMessagePhone(errors[1].slice(7));
                    setMessageContent(errors[3].slice(9));
                    setMessageType(errors[4].slice(12))
                }
            }
        );
    }

    useEffect(() => {
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview.preview)
        }
    }, [imagePreview])

    const selectFile = (event) => {
        setSelectedFile(event.target.files);
        const file = event.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImagePreview(file)
      };

    const upload = () => {
        let currentFile = selectedFile[0];
        UploadService.upload(currentFile)
            .then((response) => {
                return setFile(response.data);
              })
        setSelectedFile(undefined);
      };

    const options = [
        {value:'1', label: '1: システムエラー'},
        {value:'2', label: '2: 使い方'},
        {value:'3', label: '3: 他に'},
    ]

    return (
        <Fragment>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <div className="container">  
                    <Form 
                        className="form-test"
                        method="POST"
                        onSubmit={handleContact}
                        >
                        <div className="form-group">
                            <label htmlFor="report_type"><b>レポートのタイプ </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Select name='report_type' 
                                onChange={e => setType(e.value)}
                                placeholder='選択してください'
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
                            <label htmlFor="name"><b>名前 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={e => setName(e.target.value)}
                                placeholder='名前を入力してください'
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
                            <label htmlFor="email"><b>メールアドレス </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                placeholder='メールアドレスを入力してください'
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
                            <label htmlFor="phone"><b>電話番号 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Input
                                type="text"
                                className="form-control"
                                name="phone"
                                onChange={e => setPhone(e.target.value)}
                                placeholder='電話番号を入力してください'
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
                            <label htmlFor="content"><b>内容 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                            <Textarea
                                type="text"
                                className="form-control"
                                name="content"
                                onChange={e => setContent(e.target.value)}
                                placeholder='内容を入力してください'
                            />
                            {messageContent && (
                                <div className="form-group">
                                <label style={{color:"red"}}>
                                    {messageContent}
                                </label>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address"><b>写真</b></label>
                            <div className="row my-3">
                                <div className="col-8">
                                <label className="btn btn-default p-0">
                                    <input type="file" onChange={selectFile} />
                                    {
                                        <input hidden name="file" value={file}/>
                                    }
                                </label>
                                </div>
                            </div>
                            {
                                imagePreview && (
                                    <img src={imagePreview.preview} alt="" width="20%"/>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <button 
                                className="site-btn"
                                disabled={!selectFile}
                                onClick={upload}
                            >
                                <span>送信</span>
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