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
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          const errors = error.response.data.errors;
          setLoading(false);
          setMessage(resMessage);
          setMessageEmail(errors.email);
          setMessagePassword(errors.password)
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        {message && (
          <div className="form-group">
            <label style={{color:"red"}}>
              {message}
            </label>
          </div>
        )}
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeUsername}
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
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
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
              <span>Login</span>
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Login;