import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img
          className="messageImg"
          src={message.user_send_info.avatar}
          alt={message.user_send_info.name}
        /> */}
        <p className="messageText">{message.content}</p>
      </div>
      {/* <div className="messageBottom" style={{color: '#e6efe6'}}>{format(message.created_at)}</div> */}
    </div>
  );
}