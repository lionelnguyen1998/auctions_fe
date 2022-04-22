import React, { Fragment, useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import userApi from '../api/userApi';

function Edit() {
    const currentUser = AuthService.getCurrentUser();
    let userInfo = currentUser.user;
    const [email, setEmail] = useState(userInfo.email);
    const [address, setAddress] = useState(userInfo.address);
    const [phone, setPhone] = useState(userInfo.phone);
    const [avatar, setAvatar] = useState(userInfo.avatar);
    const [name, setName] = useState(userInfo.name);
    const [password, setPassword] = useState('');
    const [re_pass, setRePass] = useState('');
    const [messageN, setMessageN] = useState('');
    const [messageE, setMessageE] = useState('');
    const [messageP, setMessageP] = useState('');
    const [messageA, setMessageA] = useState('');
    const [messagePhone, setMessagePhone] = useState('');
    const [messageRePass, setMessageRePass] = useState('');
    const [successfull, setSuccessfull] = useState(false);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const onChangeAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setMessageN('');
        setMessageP('');
        setMessageE('');
        setMessageA('');
        setMessagePhone('');
        setMessageRePass('');
        setSuccessfull(false);
        userApi.edit(
            name,
            email,
            password,
            address,
            phone,
            re_pass,
            avatar,
        ).then(
            response => {
                setSuccessfull(true)
            },
            error => {
            const errors = error.response.data.errors;
            setMessageN(errors.name)
            setMessageE(errors.email)
            setMessageP(errors.password)
            setMessageA(errors.address)
            setMessagePhone(errors.phone)
            setMessageRePass(errors.re_pass)
            setSuccessfull(false)
            }
        );
    }
    return (
    <Fragment>
        <div className="col-md-12">
        <div className="card card-container">
            <Form
            onSubmit={handleEdit}
            >
            {!successfull && (
                <>
                <div className="form-group">
                    <label htmlFor="name">名前</label>
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
                    <label htmlFor="email">メールアドレス</label>
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
                    <label htmlFor="password">パスワード</label>
                    <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
                    <label htmlFor="re_pass">パスワードを確認する</label>
                    <Input
                    type="password"
                    className="form-control"
                    name="re_pass"
                    value={re_pass}
                    onChange={e=> setRePass(e.target.value)}
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
                    <label htmlFor="phone">電話番号</label>
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
                    <label htmlFor="address">アドレス</label>
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
                    <label htmlFor="avatar">アバター</label>
                    <Input
                    type="file"
                    className="form-control"
                    name="avatar"
                    onChange={onChangeAvatar}
                    />
                    {
                        avatar && (
                            <img src={avatar.preview} alt="" width="80%"/>
                        )
                    }
                </div>
                <div className="form-group">
                    <button className="site-btn">編集</button>
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