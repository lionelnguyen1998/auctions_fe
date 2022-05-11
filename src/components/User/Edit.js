import React, { Fragment, useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import userApi from '../api/userApi';
import UploadService from "../services/FileUploadService";
import { useNavigate } from 'react-router-dom';

function Edit() {
    let navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    let userInfo = currentUser.user;
    const [email, setEmail] = useState(userInfo.email);
    const [address, setAddress] = useState(userInfo.address);
    const [phone, setPhone] = useState(userInfo.phone);
    const [name, setName] = useState(userInfo.name);
    const [messageN, setMessageN] = useState('');
    const [messageE, setMessageE] = useState('');
    const [messageA, setMessageA] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [successfull, setSuccessfull] = useState(false);
    const [image, setImage] = useState(userInfo.avatar);
    const [imagePreview, setImagePreview] = useState([]);
    const [selectedFile, setSelectedFile] = useState(undefined);

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
                    navigate("/");
                    window.location.reload();
                    setSuccessfull(true)
                } else {
                    const errors = response.data.message.split("&");
                    setMessageN(errors[0].slice(6))
                    setMessagePhone(errors[1].slice(7))
                    setMessageA(errors[2].slice(9))
                    setMessageE(errors[3].slice(7))
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
                        <h2>プロファールを編集</h2>
                    </div>
                </div>
            </div>
            <Form
            onSubmit={handleEdit}
            >
            {!successfull && (
                <>
                <div className="form-group">
                    <label htmlFor="name"><b>名前 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="text"
                    className="form-control"
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
                    <label htmlFor="email"><b>メールアドレス </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="text"
                    className="form-control"
                    name="email"
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
                    <label htmlFor="phone"><b>電話番号 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                    <Input
                    type="text"
                    className="form-control"
                    name="phone"
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
                    <label htmlFor="address"><b>アドレス </b></label>
                    <Input
                    type="text"
                    className="form-control"
                    name="address"
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
                <label htmlFor="file"><b>アバター</b></label>
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
                        imagePreview === true ? (
                            <img src={imagePreview.preview} alt="" width="20%"/>
                        ) : (
                            <img src={image} alt="" width="20%"/>
                        )
                    }
                </div>
                <div className="form-group">
                    <button className="site-btn"
                     disabled={!selectFile}
                     onClick={upload}
                    >編集</button>
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