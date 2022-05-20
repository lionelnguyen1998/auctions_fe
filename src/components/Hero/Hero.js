import React, { Fragment, useState, useEffect } from 'react';
import SliderHome from '../Slider/Slider'
import Select from 'react-select';
import auctionApi from '../api/auctionApi';
import { Link } from 'react-router-dom';
import './index.css'
import './SearchBar.css'

const options = [
    { value: '1', label: '値段' },
    { value: '2', label: '始まる時間' },
    { value: '3', label: '終わる時間' },
    { value: '4', label: 'オークション' }
]

function Hero() {
    const [type, setType] = useState()
    const [key, setKey] = useState('')
    const [values, setValues] = useState([])
    const [filterData, setFilterData] = useState([])

    const getParams = (type, key) => {
        let params = {};
        if (type) {
          params["type"] = type;
        }
        if (key) {
          params["key"] = key;
        }
        return params;
    }

    const handleSubmit = () => {
        const params = getParams(type, key)
        auctionApi.search(params) 
            .then(res => {
                if (res.data.code === 1000) {
                    setFilterData(res.data.data.length)
                    setValues(res.data.data)
                }
            })
    }

    useEffect(handleSubmit, [type, key]);
    
    const clearInput = () => {
        setFilterData([]);
        setKey("");
      };
    return (
        <Fragment>
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="hero__categories">
                            <div className="hero__categories__all">
                                <i className="fa fa-bars"></i>
                                <span>全てカテゴリー</span>
                            </div>
                            <ul>
                                <li className="li-hover"><Link to={`/auctionByTypeOfCategory/1`}>電子</Link></li>
                                <li className="li-hover"><Link to={`/auctionByTypeOfCategory/2`}>ファッション</Link></li>
                                <li className="li-hover"><Link to={`/auctionByTypeOfCategory/3`}>健康と着飾る</Link></li>
                                <li className="li-hover"><Link to={`/auctionByTypeOfCategory/4`}>家事</Link></li>
                                <li className="li-hover"><Link to={`/auctionByTypeOfCategory/5`}>他に</Link></li>
                                <li><a>　</a></li>
                                <li><a>　</a></li>
                                <li><a>　</a></li>
                                <li><a>　</a></li>
                                <li><a>　</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="search">
                            <div className="searchInputs">
                                <Select name='search-options'
                                    onChange={e => setType(e.value)}
                                    options={options}
                                    placeholder="検索　　" 
                                />
                                <input type="text" 
                                placeholder="検索" 
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                />
                
                                <div className="searchIcon">
                                    <button type="submit" onSubmit={handleSubmit} className="site-btn">
                                        {filterData.length === 0 ? (
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                        ) : (
                                            <i id="clearBtn" onClick={clearInput} class="fa fa-times" aria-hidden="true"></i>
                                        )}
                                    </button>
                                </div>
                            </div>
                            { 
                                (filterData.length !== 0) && (
                                    <div className="dataResult">
                                        {values.map((value, index) => (
                                            <Link to={`/detail/${value.id}`} className="dataItem" key={index}>
                                                <p>{value.name} </p><p style={{float:'right'}}>{value.key} </p>
                                            </Link>
                                            )
                                        )}
                                    </div>
                                )
                            }
                            <div className="hero__search">
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>1234567890</h5>
                                        <span>８時午前～２２時午後</span>
                                    </div>
                                </div>
                            </div>
                            <SliderHome />
                        </div>       
                        
                    </div>
                </div>
            </div>
        </section>
        </Fragment>
    )
}

export default Hero;