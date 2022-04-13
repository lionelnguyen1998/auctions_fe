import React, { Fragment, useState, useEffect, useRef } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import auctionApi from '../api/auctionApi';
import UploadService from "../services/FileUploadService";

function Item() {
    let navigate = useNavigate();
    const link = window.location.href;
    const lengthLink = link.length;
    const auctionId = link.slice(lengthLink-2);

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
    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [previewImages, setPreviewImages] = useState([])
    const progressInfosRef = useRef(null)
    

    useEffect(() => {
        ;(async () => {
            try {
                const response = await auctionApi.getListBrand()
                setBrand(response.data.data)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [])

    const handleCreateItem = (e) => {
        e.preventDefault();
        setMessageName("");
        setMessagePrice("");
        setMessageBrand("");
        setMessageDescription("");
        setMessageSeries("")
        auctionApi.createItem(
            auctionId,
            name,
            brandId,
            starting_price,
            description,
            series,
            images
        ).then(
          () => {
            navigate("/");
          },
          (error) => {
            const errors = error.response.data.errors
            setMessageName(errors.name);
            setMessagePrice(errors.starting_price);
            setMessageBrand(errors.brandId);
            setMessageDescription(errors.description)
            setMessageSeries(errors.series)
          }
        );
    }

    const selectFiles = (event) => {
      setSelectedFiles(event.target.files);
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]))
      }
      setPreviewImages(images);
    };

    const uploadFiles = () => {
      const files = Array.from(selectedFiles);
      let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));
      progressInfosRef.current = {
        val: _progressInfos,
      }
      const uploadPromises = files.map((file, i) => upload(i, file));

      Promise.all(uploadPromises)
        .then(() => {;
        });
    };

    const upload = (idx, file) => {
      return UploadService.upload(file, (event) => {
      })
        .then(res => {
          setImages(res.data)
        })
        .catch(() => {

        });
    };

    return (
        <Fragment>
          <Form 
            className="form-test"
            method="POST"
            onSubmit={handleCreateItem}
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
              <label htmlFor="brand">brand</label>
              <Select name='brand' 
                value={brandId}
                onChange={e => setBrandId(e.target.value)}
              >
                <option value=''>Chọn thương hiệu</option>
                {
                  brands.map(brand => (
                    <option key={brand.brand_id} value={brand.brand_id} onChange={e => setBrand(e.target.value)}>
                        {brand.brand_id} : {brand.name}
                    </option>
                  ))
                }
              </Select>
              {messageBrand && (
                <div className="form-group">
                  <label style={{color:"red"}}>
                    {messageBrand}
                  </label>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="series">series</label>
              <Input
                type="text"
                className="form-control"
                name="series"
                onChange={e => setSeries(e.target.value)}
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
              <label htmlFor="price">price</label>
              <Input
                type="text"
                className="form-control"
                name="price"
                onChange={e => setPrice(e.target.value)}
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
              <label htmlFor="description">Description</label>
              <Input
                type="text"
                className="form-control"
                name="Description"
                onChange={e => setDescription(e.target.value)}
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
                <label htmlFor="images">images</label>
                <div className="row my-3">
                  <div className="col-8">
                    <label className="btn btn-default p-0">
                      <input type="file" multiple onChange={selectFiles} />
                      {
                        images.map((image, index) => (
                          <input hidden key={index} name="images" value={image}/>
                        ))
                      }
                    </label>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-success btn-sm"
                      disabled={!selectedFiles}
                      onClick={uploadFiles}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                {previewImages && (
                  <div>
                    {previewImages.map((img, i) => {
                      return <img className="preview" src={img} alt={"image-" + i}  key={i}/>;
                    })}
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
    )
}

export default Item;