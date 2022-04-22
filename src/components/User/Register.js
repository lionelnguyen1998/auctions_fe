import React, { Fragment, useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import UploadService from "../services/FileUploadService";
import { useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [re_pass, setRePass] = useState('');
  const [messageN, setMessageN] = useState('');
  const [messageE, setMessageE] = useState('');
  const [messageP, setMessageP] = useState('');
  const [messageA, setMessageA] = useState('');
  const [messagePhone, setMessagePhone] = useState('');
  const [messageRePass, setMessageRePass] = useState('');
  const [successfull, setSuccessfull] = useState(false);
  const [image, setImage] = useState();
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
  
  const handleRegister = (e) => {
      e.preventDefault();
      setMessageN('');
      setMessageP('');
      setMessageE('');
      setMessageA('');
      setMessagePhone('');
      setMessageRePass('');
      setSuccessfull(false);
        AuthService.register(
          name,
          email,
          password,
          address,
          phone,
          re_pass,
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
              setMessageP(errors[4].slice(10))
              setMessageRePass(errors[5].slice(9))
              setSuccessfull(false)
            }
          }
        );
  }
  return (
    <Fragment>
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={handleRegister}
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
                    placeholder='名前を入力してください'
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
                    placeholder='メールアドレスを入力してください'
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
                  <label htmlFor="password">
                    <b>パスワード </b><i className="fa fa-asterisk" style={{color:"red"}}></i>
                  </label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='パスワードを入力してください'
                  />
                  {messageP && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageP}
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="re_pass"><b>パスワードを確認する</b></label>
                  <Input
                    type="password"
                    className="form-control"
                    name="re_pass"
                    value={re_pass}
                    onChange={e=> setRePass(e.target.value)}
                    placeholder='パスワードを入力してください'
                  />
                  {messageRePass && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageRePass}
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <b>電話番号 </b><i className="fa fa-asterisk" style={{color:"red"}}></i>
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={phone}
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
                  <label htmlFor="address"><b>アドレス</b></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder='アドレスを入力してください'
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
                  <label htmlFor="address"><b>アバター</b></label>
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
                    登録
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </Fragment>
  );
}
  
export default Register;