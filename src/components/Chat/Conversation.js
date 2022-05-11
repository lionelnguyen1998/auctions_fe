import "./conversation.css";
import React, {useState, useEffect} from 'react';
import chatApi from '../api/chatApi';

export default function Conversation() {
//   const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//   useEffect(() => {
//     const friendId = conversation.members.find((m) => m !== currentUser._id);

//     const getUser = async () => {
//       try {
//         const res = await axios("/users?userId=" + friendId);
//         setUser(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUser();
//   }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src='https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
        alt=""
      />
      <span className="conversationName">Tra Nguyen</span>
    </div>
  );
}