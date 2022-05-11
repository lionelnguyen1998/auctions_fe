import React, {useState, useEffect} from 'react';
import { Paper, Button, Pagination} from "@mui/material";
import { Link } from 'react-router-dom';
import notificationApi from '../api/notificationApi';

function New() {
    const [news, setNews] = useState([])
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(3);
    const pageSizes = [3, 5];

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
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    console.log(news)
    useEffect(allNews, [index, count]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <Link to='/notifications'><p>お知らせ一覧</p></Link>
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
                                    <h2>news</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        news.map((newInfo, index) => (
                            <div key={index}>
                                <div>
                                    <h2>{newInfo.title}</h2>
                                </div>
                                <div>
                                    {newInfo.content.substr(0, 100) + '...'}
                                </div>
                            </div>
                        ))
                    }
                    <div>
                            <select className="select-paginate" onChange={handlePageSizeChange} value={count}>
                                {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                                ))}
                            </select>
                            <Pagination
                                style={{float: "right"}}
                                className="my-3"
                                count={counts}
                                page={index}
                                siblingCount={1}
                                boundaryCount={1}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePageChange}
                                color="success"
                            />
                        </div>
                </section>
            </Paper>
        </>
    )
}

export default New;