import React from 'react';
import "./conversation.css";

export default function Conversation({conversation}) {
  const userReceive = conversation.user_receive_info;
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={userReceive ? userReceive.avatar : `http://img.phebinhvanhoc.com.vn/wp-content/uploads/2021/07/imager_1_2269_700-1.jpg`}
        alt={userReceive ? userReceive.name : ''}
      />
      <span className="conversationName">{userReceive ? userReceive.name : ''}</span>
    </div>
  );
}