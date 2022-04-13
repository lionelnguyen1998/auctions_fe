import React, { Fragment, useState, useEffect } from 'react';
import './index.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
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
          const auctionId = response.data.data.auctions.auction_id;
          navigate(`/item/${auctionId}`);
        },
        (error) => {
          const errors = error.response.data.errors
          setMessageName(errors.title_ni);
          setMessageCategory(errors.category_id);
          setMessageStartDate(errors.start_date);
          setMessageEndDate(errors.end_date);
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

    return (
        <Fragment>
          <Form 
            className="form-test"
            method="POST"
            onSubmit={handleCreateAuction}
            >
            <div className="form-group">
              <label htmlFor="name">name</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                onChange={e => setName(e.target.value)}
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
              <label htmlFor="category">category</label>
              <Select name='category' 
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                <option value=''>Chọn loại danh mục</option>
                {
                  categories.map(category => (
                    <option key={category.category_id} value={category.category_id} onChange={e => setCategory(e.target.value)}>
                        {category.category_id} : {category.name}
                    </option>
                  ))
                }
              </Select>
              {messageCategory && (
                <div className="form-group">
                  <label style={{color:"red"}}>
                    {messageCategory}
                  </label>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="start_date">start_date</label>
              <DateTimePicker 
                  onChange={e => setStartDate(e)} 
                  value={start_date}
                  name="start_date"
              />
              {messageStartDate && (
                <div className="form-group">
                  <label style={{color:"red"}}>
                    {messageStartDate}
                  </label>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="end_date">end_date</label>
              <DateTimePicker 
                  onChange={e => setEndDate(e)} 
                  value={end_date} 
                  name="end_date"
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
                <span>Create</span>
              </button>
            </div>
          </Form>
        </Fragment>
    );
}

export default Sell;