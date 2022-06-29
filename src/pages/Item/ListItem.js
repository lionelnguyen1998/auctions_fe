import React, {useState, useEffect} from 'react';
import { Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import Paginate from '../../components/Paginate/Paginate.js'
import auctionApi from '../../components/api/auctionApi';
import ItemDetail from './ItemDetail.js';

function ListItem({t}) {
    let navigate = useNavigate();
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
    const [infos, setInfos] = useState([])
    const [itemId, setItemId] =useState('')
    const [total, setTotal] =useState('')

    const link = window.location.href;
    const categoryId = link.slice(31);
    const getRequestParams = (index, count) => {
        let params = {};
        if (index) {
          params["index"] = index;
        }
        if (count) {
          params["count"] = count;
        }
        return params;
    };

    const retrieveItems= () => {
        const params = getRequestParams(index, count);
        auctionApi.getListItemOfCategoryBuy(categoryId, params)
            .then((response) => {
                const { info, total} = response.data.data;
                setInfos(info);
                setTotal(total)
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
        };

    useEffect(retrieveItems, [index, count]);

    const handleDetailItem = (id) => {
        setItemId(id)
    }
    return (
        <>
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p onClick={() => navigate(-1)}>{t('features.list')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h2>{t('list_item.list')}</h2>
                                </div>
                            </div>
                        </div>
                        <div>
                            <b style={{color:'#7FAD39'}}>{total} {t('list_item.item')}</b>
                            <div className="row featured__filter">
                                {
                                    infos.map((info) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges" key={info.item.item_id}>
                                            <div className="featured__item">
                                                <div className="featured__item__pic set-bg" data-setbg={info.item.name} >
                                                    <img src={info.item.mainImage}/>
                                                    <ul className="featured__item__pic__hover">
                                                        <li>
                                                            <a onClick={() => handleDetailItem(info.item.item_id)}><i className="fa fa-retweet"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="featured__item__text">
                                                    <h6>{info.item.name}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Paginate 
                                counts={counts}
                                index={index}
                                setPage={setPage}
                                count={count}
                                setPageSize={setPageSize}
                            />
                        </div>
                    </div>
                </section>
        </Paper>
        {
            itemId && (
                <ItemDetail 
                    itemId={itemId}
                    t={t}
                    categoryId={categoryId}
                />
            )
        }
        </>
    )
}

export default ListItem;