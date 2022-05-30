import React, { Fragment, useState, useEffect } from 'react';
import './index.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import auctionApi from '../api/auctionApi';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material'
import {useTranslation } from 'react-i18next'

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
    const {t} = useTranslation();

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
            if (errors[0].slice(10) == 7000) {
              setMessageCategory(`${t('errors.7000')}`);
            }
            if (errors[0].slice(10) == 7007) {
              setMessageCategory(`${t('errors.7007')}`);
            }
            if (errors[1].slice(12) == 7000) {
              setMessageStartDate(`${t('errors.7000')}`);
            }
            if (errors[1].slice(12) == 7008) {
              setMessageStartDate(`${t('errors.7008')}`);
            }
            if (errors[1].slice(12) == 7009) {
              setMessageStartDate(`${t('errors.7009')}`);
            }

            if (errors[2].slice(10) == 7000) {
              setMessageEndDate(`${t('errors.7000')}`);
            }
            if (errors[2].slice(10) == 7008) {
              setMessageEndDate(`${t('errors.7008')}`);
            } 
            if (errors[2].slice(10) == 7010) {
              setMessageEndDate(`${t('errors.7010')}`);
            }
            if (errors[3].slice(7) == 7000) {
              setMessageName(`${t('errors.7000')}`);
            } 
            if (errors[3].slice(7) == 7001) {
              setMessageName(`${t('errors.7001')}`);
            } 
            if (errors[3].slice(7) == 7005) {
              setMessageName(`${t('errors.7005')}`);
            }
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
          <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <div className="container">  
              <Form 
                className="form-test"
                method="POST"
                onSubmit={handleCreateAuction}
                >
                <div className="form-group">
                  <label htmlFor="name"><b>{t('input_auction.title')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    placeholder={t('input_auction.input')}
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
                  <label htmlFor="category"><b>{t('input_auction.category')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Select name='category'
                    onChange={e => setCategoryId(e.value)}
                    options={options[0]}
                    placeholder={t('input_auction.choosecategory')}
                  />
                  {messageCategory && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageCategory}
                      </label>
                    </div>
                  )}
                </div>
                <label htmlFor="start_date"><b>{t('input_auction.start_date')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
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
                <label htmlFor="end_date"><b>{t('input_auction.end_date')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
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
                    <span>{t('button_input.create')}</span>
                  </button>
                </div>
              </Form>
            </div>
          </Paper>
        </Fragment>
    );
}

export default Sell;