import React, {useState, useEffect} from 'react';
import { Paper, Link, Button, Pagination} from "@mui/material";
import notificationApi from '../api/notificationApi';
import {typeNotification} from "../constant/index";
import './index.css'

export default function Notification() {
    const [notifications, setNotifications] = useState([])
    const [index, setPage] = useState(1);
    const [counts, setCount] = useState(1);
    const [count, setPageSize] = useState(5);
    const [total, setTotal] = useState('');
    const pageSizes = [5, 10, 20];

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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };
  
    return (
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="section-title">
                                <h2>notifications 一覧</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <table id="customers">
                            <tr>
                                <th>Title</th>
                                <th>Auctions</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                            {
                                notifications.map((notification, index) => (
                                <tr key={index} className={`${notification.is_read ? 'isRead' : 'notRead'}`}>
                                    <td>
                                        { notification.reason.substr(0, 20) + '...' }
                                    </td>
                                    <td>
                                        {notification.title}
                                    </td>
                                    <td>
                                        {notification.updated_at}
                                    </td>
                                    <td>
                                        <Button disabled size="small" variant="outlined" style={{marginRight: '20px',  height: '20px'}}>
                                            <b className={`${(typeNotification[notification.type] === 1) ? 'accept' : 'reject'}`} >{typeNotification[notification.type]}</b>
                                        </Button>
                                        <a href='/login'>
                                            <Button size="small" variant="outlined"style={{ height: '20px'}}>
                                                    <i class="fa fa-eye" aria-hidden="true" style={{color: '#007bff'}}></i>
                                            </Button>
                                        </a>
                                    </td>
                                </tr>
                                ))
                            }
                            </table>
                        </div>
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
                    </div>
                </div>
            </section>
        </Paper>
    );
}