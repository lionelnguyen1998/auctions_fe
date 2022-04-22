import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import './index.css'
const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const onChangeUsername = (e) => {
    const email = e.target.value;
    setUsername(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setMessageEmail("");
    setMessagePassword("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        (response) => {
          if (response.code === 1000) {
            navigate("/");
            window.location.reload();
          } else if (response.code === 1001) {
            const errors = response.message.split("&");
            setLoading(false);
            setMessageEmail(errors[0].slice(7));
            setMessagePassword(errors[1].slice(10))
          } else {
            setLoading(false);
            setMessage(response.message);
          }
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleLogin} ref={form}>
          {message && (
            <div className="form-group">
              <label style={{color:"red"}}>
                {message}
              </label>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email"><b>メールアドレス </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeUsername}
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
            <label htmlFor="password"><b>パスワード </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              placeholder='パスワードを入力してください'
            />
            {messagePassword && (
              <div className="form-group">
                <label style={{color:"red"}}>
                  {messagePassword}
                </label>
              </div>
            )}
          </div>
          <div className="form-group">
            <button className="site-btn" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>ログイン</span>
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Login;