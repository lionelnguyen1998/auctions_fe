import React , {useState, useEffect, useRef}from 'react';
import { Paper } from "@mui/material";
import Conversation from "./Conversation.js"
import ChatOnline from "./ChatOnline.js"
import Message from "./Message.js"
import chatApi from '../api/chatApi';
import "./chat.css";
import AuthService from "../services/auth.service";
import {io} from "socket.io-client"

function Chat() {
    const { default: axiosClient } = require('../api/axiosClient');
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [userInforReceive, setUserInforReceive] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef();
    const currentUser = AuthService.getCurrentUser();
    const scrollRef = useRef();
    const newMessageRef = useRef();
   
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                user_send_id: data.senderId,
                content: data.content,
                created_at: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.user_send_id) &&
        setMessages((prev)=>[...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", currentUser.user.user_id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);
            //currentUser.user.following.filter((f) => users.some((u) => u.userId === f))
        });
    }, [currentUser.user.user_id])

    useEffect(() => {
        chatApi.getChats()
            .then(res => {
                setConversations(res.data.data.chat)
            })
            .catch(e => console.log(e))
    }, [currentUser.user.user_id])

    useEffect(() => {
        if (currentChat) {
            chatApi.getMessages(currentChat.chat_id)
                .then(res => {
                    setMessages(res.data.data)
                })
                .catch(e => console.log(e))
            chatApi.getInfoUserReceived(currentChat.chat_id)
                .then(res => {
                    setUserInforReceive(res.data.data)
                })
                .catch(e => console.log(e))
        }
    }, [currentChat])

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            user_send_id: currentUser.user.user_id,
            content: newMessage,
            chat_id: currentChat.chat_id
        };

        let receiverId;
        if (currentUser.user.user_id === currentChat.user_receive_id) {
            receiverId = currentChat.user_send_id
        } else {
            receiverId = currentChat.user_receive_id
        }
        socket.current.emit("sendMessage", {
            senderId: currentUser.user.user_id,
            receiverId,
            content: newMessage,
        });

        try {
            axiosClient.post("/chat/message", message)
                .then(res => {
                    setMessages([...messages, res.data.data]);
                    setNewMessage("")
                })
        } catch (err) {
            console.log(err);
        }
        newMessageRef.current.focus()
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
        <Paper style={{padding: "20px", marginBottom: "40px"}} className="container">
            <div className="messenger">
                <div className="chatOnlineAuth">
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImgAuth"
                            src={currentUser.user.avatar}
                            alt={currentUser.user.name}
                        />
                        {
                            (currentUser.user.role === 1) ? (
                                <div className="chatOnlineBadgeAuthAdmin">
                                    <img className="adminStarAuth" src='https://freesvg.org/img/1289679474.png' alt='admin'/>
                                </div>
                            ) : (
                                <div className="chatOnlineBadgeAuth"></div>
                            )
                        }
                    </div>
                    <span className="chatOnlineName"><h4 style={{fontWeight:'bold'}}>{currentUser.user.name}</h4></span>
                </div>
                  
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        {
                            conversations.map((c, index) => (
                                <div onClick={() => setCurrentChat(c)}  key={index}>
                                    <Conversation 
                                        conversation={c}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? (
                                <>
                                    <>
                                        <div className="conversationTop">
                                            <img
                                                className="conversationImgTop"
                                                src={userInforReceive.avatar}
                                                alt={userInforReceive.name}
                                            />
                                            {
                                                (userInforReceive.role === 1) && (
                                                    <div className="chatOnlineBadgeBox">
                                                        <img className="adminStarBox" src='https://freesvg.org/img/1289679474.png' alt='admin'/>
                                                    </div>
                                                )
                                            }
                                            <span className="conversationNameTop">{userInforReceive.name}</span>
                                        </div>
                                    </>
                                    <div className="chatBoxTop">
                                        {
                                            messages.map((m, index) => (
                                                <div ref={scrollRef} key={index}>
                                                    <Message
                                                        message={m}
                                                        own={m.user_send_id === currentUser.user.user_id}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            className="chatMessageInput"
                                            placeholder="入力してください..."
                                            ref={newMessageRef}
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <button className="chatSubmitButton" onClick={handleSubmit}>
                                            送信
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <span className="noConversationText">チャットして始めましょう！</span>
                            )
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline 
                            onlineUsers={onlineUsers} 
                            currentId={currentUser.user.user_id} 
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </Paper>
        </>
    )
}

export default Chat;
