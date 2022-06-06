import React, { Fragment, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';
import Upload from './Upload.js'

function Register({t}) {
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
              
              if (errors[4].slice(10) == 7000) {
                setMessageP(`${t('errors.7000')}`)
              }
              if (errors[4].slice(10) == 7001){
                setMessageP(`${t('errors.7001')}`)
              }
              
              if (errors[5].slice(9) == 7000) {
                setMessageRePass(`${t('errors.7000')}`)
              } 
              if (errors[5].slice(9) == 7003) {
                setMessageRePass(`${t('errors.7003')}`)
              }
              if (errors[5].slice(9) == 7002) {
                setMessageRePass(`${t('errors.7002')}`)
              }
              
              setSuccessfull(false)
            }
          }
        );
  }
  console.log(image)
  return (
    <Fragment>
      <div className="col-md-12">
        <div className="card card-container">
          <div className="row">
              <div className="col-lg-12">
              <div className="section-title">
                      <h2>{t('register.title')}</h2>
                  </div>
              </div>
          </div>
          <Form
            onSubmit={handleRegister}
          >
            {!successfull && (
              <>
                <div className="form-group">
                  <label htmlFor="name"><b>{t('register.name')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('register.name')}
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('register.email_input')}
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
                    <b>{t('register.password')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i>
                  </label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('register.input_password')}
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
                  <label htmlFor="re_pass"><b>{t('register.re_pass')}</b></label>
                  <Input
                    type="password"
                    className="form-control"
                    name="re_pass"
                    value={re_pass}
                    onChange={e=> setRePass(e.target.value)}
                    placeholder={t('register.re_pass_input')}
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
                    <b>{t('register.phone')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i>
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={t('register.phone')}
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
                  <label htmlFor="address"><b>{t('register.address')}</b></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder={t('register.address_input')}
                  />
                  {messageA && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageA}
                      </label>
                    </div>
                  )}
                </div>
                <Upload 
                  image={image}
                  setImage={setImage}
                  t={t}
                />
                <div className="form-group">
                  <button
                    style={{borderRadius:'15px'}}
                    className="site-btn"
                  >
                    {t('register.button')}
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