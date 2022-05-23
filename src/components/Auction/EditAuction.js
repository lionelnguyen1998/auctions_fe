import React, { Fragment, useState, useEffect } from 'react';
import './index.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import auctionApi from '../api/auctionApi';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material'

function EditAuction() {
    let navigate = useNavigate();
    const link = window.location.href;
    const auctionId = link.slice(34);
    const [name, setName] = useState('');
    const [categories, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [end_date, setEndDate] = useState('')
    const [start_date, setStartDate] = useState('');
    const [messageName, setMessageName] = useState("");
    const [messageCategory, setMessageCategory] = useState("");
    const [messageStartDate, setMessageStartDate] = useState("");
    const [messageEndDate, setMessageEndDate] = useState("");

    useEffect(() => {
      auctionApi.getInfo(auctionId) 
        .then(res => {
          const auction = res.data.data
          setName(auction.title);
          setCategoryId(auction.category_id);
          setStartDate(auction.start_date);
          setEndDate(auction.end_date)
        })
        .catch(e => console.log(e))
    }, [])

    const handleEditAuction = (e) => {
      e.preventDefault();
      setMessageName("");
      setMessageCategory("");
      setMessageStartDate("");
      setMessageEndDate("");
      auctionApi.editAuction(
        auctionId,
        name,
        categoryId,
        start_date,
        end_date
      ).then(
        (response) => {
          if (response.data.code === 1000) {
            const auctionId = response.data.data.auction_id;
            navigate(`/detailwait/${auctionId}`);
          } else {
            const errors = response.data.message.split('&')
            setMessageCategory(errors[0].slice(10));
            setMessageStartDate(errors[1].slice(12));
            setMessageEndDate(errors[2].slice(10));
            setMessageName(errors[3].slice(7));
          }
        }
      );
    }

    useEffect(() => {
      ;(async () => {
          try {
              const response = await auctionApi.getListCategory()
              setCategory(response.data.data)
          } catch (error) {
              console.log(error.message)
          }
      })()
    }, [])

    const options = [
      categories.map(category => (
        { value: `${category.category_id}`, label: `${category.category_id} : ${category.name}`}
      ))
    ]
    return (
        <Fragment>
          <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate(-1)}>オークション一覧</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <div className="container">
              <div className="row">
                  <div className="col-lg-12">
                  <div className="section-title">
                          <h2>auctionを編集</h2>
                      </div>
                  </div>
              </div>  
              <Form 
                className="form-test"
                method="POST"
                onSubmit={handleEditAuction}
                >
                <div className="form-group">
                  <label htmlFor="name"><b>オークションのタイトル </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='入力してください'
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
                  <label htmlFor="category"><b>カテゴリー </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Select name='category'
                    onChange={e => setCategoryId(e.value)}
                    options={options[0]}
                    placeholder='選択してください'
                    defaultValue={options[0][4]}
                  />
                  {messageCategory && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageCategory}
                      </label>
                    </div>
                  )}
                </div>
                <label htmlFor="start_date"><b>始まる時間 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                <div className="form-group">
                  <DateTimePicker 
                      onChange={e => setStartDate(e)} 
                      value={start_date}
                      name="start_date"
                      className="form-control"
                  />
                  {messageStartDate && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageStartDate}
                      </label>
                    </div>
                  )}
                </div>
                <label htmlFor="end_date"><b>終わる時間 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                <div className="form-group">
                  <DateTimePicker 
                      onChange={e => setEndDate(e)} 
                      value={end_date} 
                      name="end_date"
                      className="form-control"
                  />
                  {messageEndDate && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageEndDate}
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <button className="site-btn">
                    <span>登録</span>
                  </button>
                </div>
              </Form>
            </div>
          </Paper>
        </Fragment>
    );
}

export default EditAuction;