import React, {useEffect, useState} from 'react';
import { Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import notificationApi from '../api/notificationApi';

function ReadNew() {
    const link = window.location.href;
    const newId = link.slice(27);
    let navigate = useNavigate();
    const [news, setNews] = useState('')
    const readNew = () => {
        notificationApi.readNews(newId)
            .then((response) => {
                setNews(response.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(readNew, [newId]);
    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <p onClick={() => navigate(-1)}>ニュース一覧</p>
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
                                    <h2>{news.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        <td dangerouslySetInnerHTML={{__html: news.content}} />
                    }
                </section>
                <p style={{float:'right', color:'#7FAD39'}}>{news.user_create_name} によって {news.updated_at}</p>
            </Paper>
        </>
    )
}

export default ReadNew;