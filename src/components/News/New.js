import React, {useState, useEffect} from 'react';
import { Paper } from "@mui/material";
import notificationApi from '../api/notificationApi';
import { Link } from 'react-router-dom';
import Paginate from '../Paginate/Paginate.js'
import './index.css';

function New() {
    const [news, setNews] = useState([])
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(4);
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

    const allNews = () => {
        const params = getRequestParams( index, count);
        notificationApi.getNews(params)
            .then((response) => {
                const { news, total} = response.data.data;
                setNews(news);
                console.log(news);
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(allNews, [index, count]);

    function stripHTML(myString) {
        let el = document.createElement("div");
        el.innerHTML = myString;
        return el.textContent || el.innerText || "";
    }
    return (
        <>
            <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h2>ニュース一覧</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        news.map((newInfo, index) => (
                            <div key={index} className="div-news">
                                <h2>{newInfo.title}</h2>
                                {stripHTML(newInfo.content).substr(0, 100) + '...' }<Link to={`/news/${newInfo.new_id}`} className="link-address">もっと見る</Link>
                            
                                <p>{newInfo.user} によって {newInfo.updated_at}
                                    {
                                        newInfo.is_read === 1 && (
                                            <>
                                                <p style={{color: '#7FAD39'}}>見た！</p>
                                            </>
                                        )
                                    }
                                </p>
                            </div>
                        ))
                    }
                    <Paginate 
                        counts={counts}
                        index={index}
                        setPage={setPage}
                        count={count}
                        setPageSize={setPageSize}
                    />
                </section>
            </Paper>
        </>
    )
}

export default New;