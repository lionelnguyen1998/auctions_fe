import React, { Fragment, useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import userApi from '../api/userApi';
import UploadService from "../services/FileUploadService";
import { useNavigate } from 'react-router-dom';

function Edit({t}) {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [messageN, setMessageN] = useState('');
    const [messageE, setMessageE] = useState('');
    const [messageA, setMessageA] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [successfull, setSuccessfull] = useState(false);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState([]);
    const [selectedFile, setSelectedFile] = useState(undefined);

    useEffect(() => {
        userApi.info() 
        .then(res => {
            const userInfo = res.data.data;
            setEmail(userInfo.email);
            setAddress(userInfo.address);
            setPhone(userInfo.phone);
            setName(userInfo.name);
            setImage(userInfo.avatar);
        })
        .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])
  
    const selectFile = (event) => {
      setSelectedFile(event.target.files);
      const file = event.target.files[0];
      file.preview = URL.createObjectURL(file);
      setImagePreview(file)
    };
  
    const upload = () => {
      let currentFile = selectedFile[0];
      UploadService.upload(currentFile, (event) => {
          })
          .then((response) => {
              return setImage(response.data[0]);
          })
      setSelectedFile(undefined);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setMessageN('');
        setMessageE('');
        setMessageA('');
        setMessagePhone('');
        setSuccessfull(false);
        userApi.edit(
            name,
            email,
            address,
            phone,
            image,
        ).then(
            response => {
                if (response.data.code === 1000) {
                    navigate("/auctions");
                    window.location.reload();
                    setSuccessfull(true)
                } else {
                    const errors = response.data.message.split("&");
                    if (errors[0].slice(6) == 7000) {
                        setMessageN(`${t('errors.7000')}`)
                    }
                    if (errors[0].slice(6) == 7001){
                        setMessageN(`${t('errors.7001')}`)
                    }
        
                    if (errors[1].slice(7) == 7000) {
                        setMessagePhone(`${t('errors.7000')}`)
                    }
                    if (errors[1].slice(7) == 7013){
                        setMessagePhone(`${t('errors.7013')}`)
                    }
                    
                    if (errors[2].slice(9) == 7001) {
                        setMessageA(`${t('errors.7001')}`)
                    }
    
                    if (errors[3].slice(7) == 7000) {
                        setMessageE(`${t('errors.7000')}`)
                    } 
                    if(errors[3].slice(7) == 7001) {
                        setMessageE(`${t('errors.7001')}`)
                    } 
                    if (errors[3].slice(7) == 7002) {
                        setMessageE(`${t('errors.7002')}`)
                    } 
                    if (errors[3].slice(7) == 7004){
                        setMessageE(`${t('errors.7004')}`)
                    }
                    setSuccessfull(false)
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
                        <h2>{t('edit.title')}</h2>
                    </div>
                </div>
            </div>
            <Form
            onSubmit={handleEdit}
            >
            {!successfull && (
                <>
                <div className="form-group">
                    <label htmlFor="name"><b>{t('register.name')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="text"
                    className="form-control"
                    placeholder={t('register.name_input')}
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    {messageN && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageN}
                        </label>
                    </div>
                    )}
                    <label htmlFor="email"><b>{t('register.email')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder={t('register.email_input')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    {messageE && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageE}
                        </label>
                    </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="phone"><b>{t('register.phone')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder={t('register.phone_input')}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
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
                    <label htmlFor="address"><b>{t('register.address')} </b></label>
                    <Input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder={t('register.address_input')}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                    {messageA && (
                    <div className="form-group">
                        <label style={{color:"red"}}>
                        {messageA}
                        </label>
                    </div>
                    )}
                </div>
                <div className="form-group">
                <label htmlFor="file"><b>{t('register.avatar')}</b></label>
                    <div className="row my-3">
                        <div className="col-8">
                        <label className="btn btn-default p-0">
                            <input type="file" onChange={selectFile} />
                            {
                                <input hidden name="avatar" value={image}/>
                            }
                        </label>
                        </div>
                    </div>
                    {
                        (imagePreview) && (
                            <img src={imagePreview.preview} alt="" width="20%"/>
                        )
                    }
                    {
                        (image) && (
                            <img src={image} alt="" width="20%"/>
                        )
                    }
                </div>
                <div className="form-group">
                    <button className="site-btn"
                    disabled={!selectFile}
                    onClick={upload}
                    >{t('button_input.edit')}</button>
                </div>
                </>
            )}
            </Form>
        </div>
        </div>
    </Fragment>
    );
}
    
export default Edit;