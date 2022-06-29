import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import notificationApi from '../api/notificationApi';
import './index.css'

function Bell({total}) {
    const [notifications, setNotifications] = useState([])
    const [totalNotRead, setTotalNotRead] = useState('')
    const index = 1;
    const isNotRead = 1;
    const count = 4;

    const getRequestParams = (index, count, isNotRead) => {
        let params = {};
        if (index) {
          params["index"] = index;
        }
        if (count) {
          params["count"] = count;
        }
        if (count) {
            params["is_not_read"] = isNotRead;
        }
        return params;
    };

    useEffect(() => {
        const params = getRequestParams( index, count, isNotRead);
        notificationApi.getAllNotification(params)
            .then((res) => {
                setNotifications(res.data.data.denys)
                setTotalNotRead(res.data.data.total_not_read)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [total])
    return (
        <>
        <li className="dropdown">
            <Link to="/notifications">
                <i className="fa fa-bell"></i>
                <span>{totalNotRead}</span>
            </Link>
            <div class="dropdown-content">
                {
                    notifications.map((notification, index) => (
                        <div key={index}>
                            <Link to={`/notifications/${notification.auction_id}`}>{ notification.reason.substr(0, 20) + '...' }</Link>
                        </div>
                    ))
                }
                <Link to="/notifications"><b>お知らせ一覧</b></Link>
            </div>
        </li>
        </>
    )
}

export default Bell;