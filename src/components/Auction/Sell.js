import React, { Fragment, useState, useEffect } from 'react';
import './index.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import auctionApi from '../api/auctionApi';
import { useNavigate } from 'react-router-dom';

function Sell() {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [categories, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [end_date, setEndDate] = useState(new Date())
    const [start_date, setStartDate] = useState(new Date());
    const [messageName, setMessageName] = useState("");
    const [messageCategory, setMessageCategory] = useState("");
    const [messageStartDate, setMessageStartDate] = useState("");
    const [messageEndDate, setMessageEndDate] = useState("");

    const handleCreateAuction = (e) => {
      e.preventDefault();
      setMessageName("");
      setMessageCategory("");
      setMessageStartDate("");
      setMessageEndDate("");
      auctionApi.createAuction(
        name,
        categoryId,
        start_date,
        end_date
      ).then(
        (response) => {
          if (response.data.code === 1000) {
            const auctionId = response.data.data.auction_id;
            navigate(`/item/${auctionId}`);
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
              setCategory(response.data.data.categories)
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
          <div className="container">  
            <Form 
              className="form-test"
              method="POST"
              onSubmit={handleCreateAuction}
              >
              <div className="form-group">
                <label htmlFor="name"><b>オークションのタイトル </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
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
        </Fragment>
    );
}

export default Sell;