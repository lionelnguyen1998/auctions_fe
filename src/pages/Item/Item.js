import React, { Fragment, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import Textarea from "react-validation/build/textarea";
import auctionApi from '../../components/api/auctionApi';
import { Paper } from '@mui/material'
import Upload from '../../components/UploadFile/Upload.js'
import {useTranslation} from 'react-i18next'
import './index.css';

function Item() {
    let navigate = useNavigate();
    const link = window.location.href;
    const auctionId = link.slice(27);
    const [name, setName] = useState("");
    const [messageName, setMessageName] = useState("");
    const [brands, setBrand] = useState([]);
    const [brandId, setBrandId] = useState("");
    const [messageBrand, setMessageBrand] = useState("");
    const [starting_price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [messageDescription, setMessageDescription] = useState("");
    const [messagePrice, setMessagePrice] = useState("");
    const [series, setSeries] = useState("");
    const [messageSeries, setMessageSeries] = useState("");
    const [auction, setAuction] = useState();
    const [images, setImages] = useState([]);
    const [messageImage, setMessageImage] = useState([]);
    const [addImage, setAddImage] = useState([])
    const {t} = useTranslation();

    useEffect(() => {
        ;(async () => {
            try {
                const response = await auctionApi.getListBrand()
                setBrand(response.data.data.brand)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [])

    useEffect(() => {
      auctionApi.detail1(auctionId)
        .then(res =>  setAuction(res.data.data))
    }, [])

    const handleCreateItem = (e) => {
        e.preventDefault();
        setMessageName("");
        setMessagePrice("");
        setMessageBrand("");
        setMessageDescription("");
        setMessageSeries("");
        setMessageImage("")
        auctionApi.createItem(
            auctionId,
            name,
            brandId,
            starting_price,
            description,
            series,
            images
        ).then(
          (response) => {
            if (response.data.code === 1000) {
              navigate('/auctions');
            } else if (response.data.code === 1007) {
              setMessageImage(response.data.message);
            } else {
              const errors = response.data.message.split('&')
              if (errors[0].slice(6) == 7000) {
                setMessageBrand(`${t('errors.7000')}`);
              }
              
              if (errors[1].slice(6) == 7000) {
                setMessageName(`${t('errors.7000')}`);
              }
              if (errors[1].slice(6) == 7001) {
                setMessageName(`${t('errors.7001')}`);
              }

              if (errors[2].slice(7) == 7011) {
                setMessageSeries(`${t('errors.7011')}`);
              }
              if (errors[2].slice(7) == 7012) {
                setMessageSeries(`${t('errors.7012')}`);
              }

              if (errors[3].slice(13) == 7000) {
                setMessageDescription(`${t('errors.7000')}`);
              }

              if (errors[4].slice(15) == 7000) {
                setMessagePrice(`${t('errors.7000')}`);
              }
              if (errors[4].slice(15) == 7006) {
                setMessagePrice(`${t('errors.7006')}`);
              }
            }
          }
        )
        .catch((e) => console.log(e));
    }

    const handleAddImage = (e) => {
      setAddImage(addImage.concat(
            <>
              <Upload
                images={images}
                setImages={setImages}
                index={addImage.length}
                t={t}
              />
            </>
      ))
    }

    const options = [
      brands.map(brand => (
        {value: `${brand.brand_id}`, label: `${brand.brand_id} : ${brand.name}`}
      ))
    ]
    return (
        <Fragment>
          <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate('/auctions')}>{t('features.list')}</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <div className="container">  
              {
                auction && (
                  <div className="">    
                    <h3 className="h3-auction">{t('name.auctions')}</h3>
                    <p><b>{t('input_auction.title')}:  </b>{auction.auctions.title}</p>
                    <p><b>{t('input_auction.category')}:  </b>{auction.category.name}</p>
                    <p><b>{t('input_auction.start_date')}:  </b>{auction.auctions.start_date}</p>
                    <p><b>{t('input_auction.end_date')}:  </b>{auction.auctions.end_date}</p>
                  </div>
                )
              }
              <br/>
              <hr/>
              <br/>
              <Form 
                className="form-test"
                method="POST"
                onSubmit={handleCreateItem}
                >
                <div className="form-group">
                  <label htmlFor="name"><b>{t('input_item.name')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    placeholder={t('input_item.name_input')}
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
                  <label htmlFor="brand"><b>{t('input_item.brand')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Select name='brand'
                    onChange={e => setBrandId(e.value)}
                    placeholder={t('input_item.brand_choose')}
                    options={options[0]}
                  />
                  {messageBrand && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageBrand}
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="series"><b>{t('input_item.series')} </b></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="series"
                    onChange={e => setSeries(e.target.value)}
                    placeholder={t('input_item.series_input')}
                  />
                {messageSeries && (
                    <div classseries="form-group">
                      <label style={{color:"red"}}>
                        {messageSeries}
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="price"><b>{t('input_item.price')} ($)</b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="price"
                    onChange={e => setPrice(e.target.value)}
                    placeholder={t('input_item.price_input')}
                  />
                {messagePrice && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messagePrice}
                      </label>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description"><b>{t('input_item.description')} </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Textarea
                    style={{height:'120px'}}
                    type="text"
                    className="form-control"
                    name="Description"
                    onChange={e => setDescription(e.target.value)}
                    placeholder={t('input_item.description_input')}
                  />
                  {messageDescription && (
                    <div className="form-group">
                      <label style={{color:"red"}}>
                        {messageDescription}
                      </label>
                    </div>
                  )}
                </div>
                {
                    addImage
                }
                {
                  (images.length < 4) && (
                    <a class="btn btn-new" onClick={handleAddImage}><i class="fa fa-plus" style={{color: '#28a745'}}></i><b>{t('input_item.add_images')}</b></a>
                  )
                }
              
                {messageImage && (
                  <div className="form-group">
                    <label style={{color:"red"}}>
                      {messageImage}
                    </label>
                  </div>
                )}
                <div className="form-group">
                  <button className="site-btn">
                    <span>{t('button_input.create')}</span>
                  </button>
                </div>
              </Form>
            </div>
          </Paper>
      </Fragment>
    )
}

export default Item;