import { useEffect, useState } from "react";
import chatApi from "../api/chatApi";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat, t }) {
    const [users, setUsers] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [query, setQuery] = useState([])

    useEffect(() => {
        chatApi.getAllUsers()
            .then(res => {
                setUsers(res.data.data)
            })
    }, [currentId]);

    useEffect(() => {
        //setOnlineFriends(users.filter((u) => onlineUsers.includes(u.user_id)));
        setOnlineFriends(users)
    }, [users, onlineUsers]);

    const handleClick = (user) => {
        chatApi.createChat(user.user_id)
            .then(res => {
                setCurrentChat(res.data.data)
            })
            .catch(e => console.log(e))
    }
    
    return (
        <>
            <input 
                type="text"
                placeholder={t('search.search')} 
                className="chatMenuInput" 
                onChange={(e) => setQuery(e.target.value)}
            />
            {
                onlineFriends.filter(onlF => 
                onlF.name.toLowerCase().includes(query))
                .map((o, index) => (
                    <div className="chatOnlineFriend" key={index} onClick={() => {handleClick(o)}}>
                        <div className="chatOnlineImgContainer">
                            <img
                                className="chatOnlineImg"
                                src={o ? o.avatar : ''}
                                alt=""
                            />
                            {
                                o.role === 2 ? (
                                    <div className="chatOnlineBadge"></div>
                                ) : (
                                    <div className="chatOnlineBadgeAdmin"><img className="adminStar" src='https://freesvg.org/img/1289679474.png' alt='admin'/></div>
                                )
                            }
                        </div>
                        <span className="chatOnlineName">{o ? o.name : ''}</span>
                    </div>
                ))
            }
        </>
    );
}
