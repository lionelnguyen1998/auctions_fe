import React , {useState, useEffect}from 'react';
import { Paper } from "@mui/material";
import Conversation from "./Conversation.js"
import ChatOnline from "./ChatOnline.js"
import Message from "./Message.js"
import chatApi from '../api/chatApi';
import "./chat.css";
import AuthService from "../services/auth.service";

function Chat() {
    const { default: axiosClient } = require('../api/axiosClient');
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const [newMessage, setNewMessage] = useState('')

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
                    console.log(res.data.data)
                    setMessages(res.data.data)
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
        try {
            axiosClient.post("/chat/message", message)
                .then(res => {
                    console.log(res)
                    setMessages([...messages, res.data.data]);
                })
        } catch (err) {
            console.log(err);
        }
        setNewMessage('')
    }
    return (
        <>
        <Paper style={{padding: "20px", marginBottom: "40px"}} className="container">
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
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
                                    <div className="chatBoxTop">
                                        {
                                            messages.map((m, index) => (
                                                <Message
                                                    key={index}
                                                    message={m}
                                                    own={m.user_send_id === currentUser.user.user_id}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            ) : (
                                <span className="noConversationText">Open a conversation to start a chat.</span>
                            )
                        }
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button className="chatSubmitButton" onClick={handleSubmit}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </Paper>
        </>
    )
}

export default Chat;

// import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Topbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//             {conversations.map((c) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversation conversation={c} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={user._id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }