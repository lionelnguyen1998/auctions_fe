import React, { Fragment, useState, useEffect, useRef } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import Textarea from "react-validation/build/textarea";
import auctionApi from '../api/auctionApi';
import UploadService from "../services/FileUploadService";
import { Paper } from '@mui/material'

function EditItem() {
    let navigate = useNavigate();
    const link = (window.location.href).split('/');
    const auctionId = link[5];
    const itemId = link[4];
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
    const [images, setFile] = useState([]);
    const [imagePreview1, setImagePreview1] = useState([]);
    const [selectedFile1, setSelectedFile1] = useState(undefined);
    const [progress1, setProgress1] = useState(0);
    const [currentFiles, setCurrentFiles] = useState(undefined);
    const [imagePreview2, setImagePreview2] = useState([]);
    const [selectedFile2, setSelectedFile2] = useState(undefined);
    const [progress2, setProgress2] = useState(0);
    const [currentFiles2, setCurrentFiles2] = useState(undefined);
    const [imagePreview3, setImagePreview3] = useState([]);
    const [selectedFile3, setSelectedFile3] = useState(undefined);
    const [progress3, setProgress3] = useState(0);
    const [currentFiles3, setCurrentFiles3] = useState(undefined);
    const [imagePreview4, setImagePreview4] = useState([]);
    const [selectedFile4, setSelectedFile4] = useState(undefined);
    const [progress4, setProgress4] = useState(0);
    const [currentFiles4, setCurrentFiles4] = useState(undefined);
    const [auction, setAuction] = useState();
    const [listImage, setListImage] = useState([]);

    useEffect(() => {
        auctionApi.getInfoItem(itemId) 
          .then(res => {
            const item = res.data.data
            setName(item.name);
            setBrandId(item.brand_id);
            setPrice(item.starting_price);
            setDescription(item.description)
            setSeries(item.series);
            setListImage(item.images)
          })
          .catch(e => console.log(e))
    }, [])

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

    const handleEditItem = (e) => {
        e.preventDefault();
        setMessageName("");
        setMessagePrice("");
        setMessageBrand("");
        setMessageDescription("");
        setMessageSeries("")
        auctionApi.editItem(
            itemId,
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
                } else {
                    console.log(response.data.message)
                  const errors = response.data.message.split('&')
                  console.log(errors);
                  setMessageBrand(errors[0].slice(6));
                  setMessageName(errors[1].slice(6));
                  setMessageSeries(errors[2].slice(7))
                  setMessageDescription(errors[3].slice(13));
                  setMessagePrice(errors[4].slice(15));
                }
            }
        )
        .catch(e => console.log(e));
    }

    useEffect(() => {
      return () => {
          imagePreview1 && URL.revokeObjectURL(imagePreview1.preview)
      }
    }, [imagePreview1])

    useEffect(() => {
      return () => {
          imagePreview2 && URL.revokeObjectURL(imagePreview2.preview)
      }
    }, [imagePreview2])

    useEffect(() => {
      return () => {
          imagePreview3 && URL.revokeObjectURL(imagePreview3.preview)
      }
    }, [imagePreview3])

    useEffect(() => {
      return () => {
          imagePreview4 && URL.revokeObjectURL(imagePreview4.preview)
      }
    }, [imagePreview4])

    const selectFile = (event) => {
        setSelectedFile1(event.target.files);
        const file1 = event.target.files[0];
        file1.preview = URL.createObjectURL(file1);
        setImagePreview1(file1)
    };

    const selectFile2 = (event) => {
      setSelectedFile2(event.target.files);
      const file2 = event.target.files[0];
      file2.preview = URL.createObjectURL(file2);
      setImagePreview2(file2)

    };

    const selectFile3 = (event) => {
      setSelectedFile3(event.target.files);
      const file3 = event.target.files[0];
      file3.preview = URL.createObjectURL(file3);
      setImagePreview3(file3)

    };

    const selectFile4 = (event) => {
      setSelectedFile4(event.target.files);
      const file4 = event.target.files[0];
      file4.preview = URL.createObjectURL(file4);
      setImagePreview4(file4)

    };
    const upload = () => {
        let currentFile1 = selectedFile1[0];
        setProgress1(0);
        setCurrentFiles(currentFile1);
        UploadService.upload(currentFile1, (event) => {
            setProgress1(Math.round((100 * event.loaded) / event.total));
            })
            .then((response) => {
                return setFile([...images, response.data[0]]);
            })
            .catch(() => {
              setProgress1(0);
              setCurrentFiles(undefined);
            })
        setSelectedFile1(undefined);
    };

    const upload2 = () => {
      let currentFile2 = selectedFile2[0];
      setProgress2(0);
      setCurrentFiles2(currentFile2);
      UploadService.upload(currentFile2, (event) => {
          setProgress2(Math.round((100 * event.loaded) / event.total));
          })
          .then((response) => {
              return setFile([...images, response.data[0]]);
          })
          .catch(() => {
            setProgress2(0);
            setCurrentFiles2(undefined);
          })
      setSelectedFile2(undefined);
    };
    const upload3 = () => {
      let currentFile3 = selectedFile3[0];
      setProgress3(0);
      setCurrentFiles3(currentFile3);
      UploadService.upload(currentFile3, (event) => {
          setProgress3(Math.round((100 * event.loaded) / event.total));
          })
          .then((response) => {
              return setFile([...images, response.data[0]]);
          })
          .catch(() => {
            setProgress3(0);
            setCurrentFiles3(undefined);
          })
      setSelectedFile3(undefined);
    };
    const upload4 = () => {
      let currentFile4 = selectedFile4[0];
      setProgress4(0);
      setCurrentFiles4(currentFile4);
      UploadService.upload(currentFile4, (event) => {
          setProgress4(Math.round((100 * event.loaded) / event.total));
          })
          .then((response) => {
              return setFile([...images, response.data[0]]);
          })
          .catch(() => {
            setProgress4(0);
            setCurrentFiles4(undefined);
          })
      setSelectedFile4(undefined);
    };

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
                onSubmit={handleEditItem}
                >
                <div className="form-group">
                  <label htmlFor="name"><b>アイテムの名前 </b><i className="fa fa-asterisk" style={{color:"red"}}></i></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
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
                  <Select name='brand_id'
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
                    value={series}
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
                    value={starting_price}
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
                    value={description}
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
                <div className="form-group">
                    <label htmlFor="images"><b>写真 </b></label>
                    {currentFiles && (
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-info progress-bar-striped"
                          role="progressbar"
                          aria-valuenow={progress1}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progress1 + "%" }}
                        >
                          {progress1}%
                        </div>
                      </div>
                    )}
                    <div className="row my-3">
                      <div className="col-8">
                        <label className="btn btn-default p-0">
                          <input type="file" onChange={selectFile} />
                          {
                              <input hidden name="images" value={images}/>
                          }
                        </label>
                      </div>
                      <div className="col-4">
                        <p
                          className="btn btn-success btn-sm"
                          disabled={!selectFile}
                          onClick={upload}
                        >
                          アップ
                        </p>
                      </div>
                    </div>
                    {
                        (imagePreview1) && (
                            <img src={imagePreview1.preview} alt="" width="30%"/>
                        )
                    }
                    {
                        (listImage[0]) && (
                            <img src={listImage[0]} alt="" width="20%"/>
                        )
                    }
                </div>
                <div className="form-group">
                    {currentFiles2 && (
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-info progress-bar-striped"
                          role="progressbar"
                          aria-valuenow={progress2}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progress2 + "%" }}
                        >
                          {progress2}%
                        </div>
                      </div>
                    )}
                    <div className="row my-3">
                      <div className="col-8">
                        <label className="btn btn-default p-0">
                          <input type="file" onChange={selectFile2} />
                          {
                              <input hidden name="images" value={images}/>
                          }
                        </label>
                      </div>
                      <div className="col-4">
                        <p
                          className="btn btn-success btn-sm"
                          disabled={!selectFile2}
                          onClick={upload2}
                        >
                          アップ
                        </p>
                      </div>
                    </div>
                    {
                        (imagePreview2) && (
                            <img src={imagePreview2.preview} alt="" width="30%"/>
                        )
                    }
                    {
                        (listImage[1]) && (
                            <img src={listImage[1]} alt="" width="20%"/>
                        )
                    }
                </div>
                <div className="form-group">
                    {currentFiles3 && (
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-info progress-bar-striped"
                          role="progressbar"
                          aria-valuenow={progress3}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progress3 + "%" }}
                        >
                          {progress3}%
                        </div>
                      </div>
                    )}
                    <div className="row my-3">
                      <div className="col-8">
                        <label className="btn btn-default p-0">
                          <input type="file" onChange={selectFile3} />
                          {
                              <input hidden name="images" value={images}/>
                          }
                        </label>
                      </div>
                      <div className="col-4">
                        <p
                          className="btn btn-success btn-sm"
                          disabled={!selectFile3}
                          onClick={upload3}
                        >
                          アップ
                        </p>
                      </div>
                    </div>
                    {
                        (imagePreview3) && (
                            <img src={imagePreview3.preview} alt="" width="30%"/>
                        )
                    }
                    {
                        (listImage[2]) && (
                            <img src={listImage[2]} alt="" width="20%"/>
                        )
                    }
                </div>

                <div className="form-group">
                    {currentFiles4 && (
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-info progress-bar-striped"
                          role="progressbar"
                          aria-valuenow={progress4}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: progress4 + "%" }}
                        >
                          {progress4}%
                        </div>
                      </div>
                    )}
                    <div className="row my-4">
                        <div className="col-8">
                            <label className="btn btn-default p-0">
                            <input type="file" onChange={selectFile4} />
                            {
                                <input hidden name="images" value={images}/>
                            }
                            </label>
                        </div>
                        <div className="col-4">
                            <p
                            className="btn btn-success btn-sm"
                            disabled={!selectFile4}
                            onClick={upload4}
                            >
                            アップ
                            </p>
                        </div>
                    </div>
                    {
                        (imagePreview4) && (
                            <img src={imagePreview4.preview} alt="" width="30%"/>
                        )
                    }
                    {
                        (listImage[3]) && (
                            <img src={listImage[3]} alt="" width="20%"/>
                        )
                    }
                </div>
                
                <div className="form-group">
                  <button className="site-btn" style={{borderRadius:'15px'}}>
                    <span>登録</span>
                  </button>
                </div>
              </Form>
            </div>
          </Paper>
      </Fragment>
    )
}

export default EditItem;