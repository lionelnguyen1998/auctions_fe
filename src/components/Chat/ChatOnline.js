import { useEffect, useState } from "react";
import chatApi from "../api/chatApi";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [users, setUsers] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

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
            {
                onlineFriends.map((o, index) => (
                    <div className="chatOnlineFriend" key={index} onClick={() => {handleClick(o)}}>
                        <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={o ? o.avatar : ''}
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o ? o.name : ''}</span>
                    </div>
                ))
            }
        </>
    );
}
