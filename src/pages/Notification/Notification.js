import React, {useState, useEffect} from 'react';
import { Paper, Button} from "@mui/material";
import notificationApi from '../../components/api/notificationApi';
import { Link } from 'react-router-dom';
import {typeNotification} from "../../components/constant/index";
import Paginate from '../../components/Paginate/Paginate.js'
import './index.css'

export default function Notification({t}) {
    const [notifications, setNotifications] = useState([])
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(5);
    const [total, setTotal] = useState('');

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

    const allNotifications = () => {
        const params = getRequestParams( index, count);
        notificationApi.getAllNotification(params)
            .then((response) => {
                const { denys, total} = response.data.data;
                setNotifications(denys);
                setTotal(total)
                const totalPage = Math.ceil(total/count)
                setCount(totalPage);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(allNotifications, [index, count]);
  
    return (
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="section-title">
                                <h2>{t('notifications.list')}</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <table id="customers">
                                <tr>
                                    <th>{t('notifications.title')}</th>
                                    <th>{t('notifications.auction')}</th>
                                    <th>{t('notifications.time')}</th>
                                    <th></th>
                                </tr>
                                {
                                    notifications.map((notification, index) => (
                                    <tr key={index} className={`${notification.is_read ? 'isRead' : 'notRead'}`}>
                                        <td style={{width: '35%'}}>
                                            { notification.reason.substr(0, 20) + '...' }
                                        </td>
                                        <td style={{width: '25%'}}>
                                            {notification.title}
                                        </td>
                                        <td style={{width: '20%'}}>
                                            {notification.updated_at}
                                        </td>
                                        <td>
                                            <Button disabled size="small" variant="outlined" style={{marginRight: '20px',  height: '20px'}}>
                                                <b className={`${(typeNotification[notification.type] === 1) ? 'accept' : 'reject'}`} >{t(`notifications.${notification.type}`)}</b>
                                            </Button>
                                            <Link to={`/notifications/${notification.auction_id}`}>
                                                <Button size="small" variant="outlined"style={{ height: '20px', marginRight: '20px'}}>
                                                        <i class="fa fa-eye" aria-hidden="true" style={{color: '#007bff'}}></i>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                    ))
                                }
                            </table>
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
    );
}