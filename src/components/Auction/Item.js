import React, { Fragment, useState, useEffect} from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import Textarea from "react-validation/build/textarea";
import auctionApi from '../api/auctionApi';
import { Paper } from '@mui/material'
import Upload from '../UploadFile/Upload.js'

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
    const [index, setIndex] = useState([]);
    const [messageImage, setMessageImage] = useState([]);
    const [listImage, setListImage] = useState([])

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
              setMessageBrand(errors[0].slice(6));
              setMessageName(errors[1].slice(6));
              setMessageSeries(errors[2].slice(7))
              setMessageDescription(errors[3].slice(13));
              setMessagePrice(errors[4].slice(15));
            }
          }
        )
        .catch((e) => console.log(e));
    }

    const handleAddImage = (e) => {
      setListImage(listImage.concat(
            <>
              <Upload
                images={images}
                setImages={setImages}
                index={listImage.length}
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
                           <p onClick={() => navigate(-1)}>オークション一覧</p>
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
                    <h3 className="h3-auction">オークション</h3>
                    <p><b>オークションのタイトル:  </b>{auction.auctions.title}</p>
                    <p><b>カテゴリー:  </b>{auction.category.name}</p>
                    <p><b>始まる時間:  </b>{auction.auctions.start_date}</p>
                    <p><b>終わる時間:  </b>{auction.auctions.end_date}</p>
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
                  <label htmlFor="name"><b>アイテムの名前 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    placeholder='名前を入力してください'
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
                  <label htmlFor="brand"><b>ブランド </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Select name='brand'
                    onChange={e => setBrandId(e.value)}
                    placeholder='選択してください'
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
                  <label htmlFor="series"><b>シリーズ </b></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="series"
                    onChange={e => setSeries(e.target.value)}
                    placeholder='シリーズを入力してください'
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
                  <label htmlFor="price"><b>値段 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="price"
                    onChange={e => setPrice(e.target.value)}
                    placeholder='値段を入力してください'
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
                  <label htmlFor="description"><b>ディスクリプション </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Textarea
                    style={{height:'120px'}}
                    type="text"
                    className="form-control"
                    name="Description"
                    onChange={e => setDescription(e.target.value)}
                    placeholder='ディスクリプションを入力してください'
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
                    listImage
                }
                {
                  (images.length < 4) && (
                    <a class="btn btn-new" onClick={handleAddImage}><i class="fa fa-plus" style={{color: '#28a745'}}></i><b>写真追加</b></a>
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
                    <span>登録</span>
                  </button>
                </div>
              </Form>
            </div>
          </Paper>
      </Fragment>
    )
}

export default Item;