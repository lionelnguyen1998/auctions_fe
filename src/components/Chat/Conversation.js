import React from 'react';
import "./conversation.css";

export default function Conversation({conversation}) {
  const userReceive = conversation.user_receive_info;
  console.log(userReceive)
  return (
    <div className="conversation">
      <div className="chatOnlineImgContainer">
        <img
          className="conversationImg"
          src={userReceive ? userReceive.avatar : `http://img.phebinhvanhoc.com.vn/wp-content/uploads/2021/07/imager_1_2269_700-1.jpg`}
          alt={userReceive ? userReceive.name : ''}
        />
        { 
          userReceive.role === 1 && (
              <div className="chatOnlineBadgeAdminConv"><img className="adminStarConv" src='https://freesvg.org/img/1289679474.png' alt='admin'/></div>
          )
        }
        <span className="conversationName">{userReceive ? userReceive.name : ''}</span>
      </div>
    </div>
  );
}