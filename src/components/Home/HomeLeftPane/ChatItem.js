import React from 'react'
import { formatDateForChannelList } from '../../../services/date'
function ChatItem({ chatItemDetails }) {
  return (
    <>

      {/* {console.log("inside chatitem", chatItemDetails, chatItemDetails.messages.slice(-1).pop().content)} */}
      <div className="chatPeopleSingleItem">
        <div className="chatUserImgWithOnlineStatus">
          <img src={chatItemDetails.profilePicUrl} className="chatPeopleSingleItemThumbnail" />
          <div className={"onlineStatus " + chatItemDetails.onlineStatus}></div>
        </div>
        <div className="chatTextInfoContainer">
          <div className="chatUserAndTimeline">
            <div className="chatUsername">{chatItemDetails.name}</div>
            {chatItemDetails.messages && <div className="chatTimeline">{formatDateForChannelList(new Date(chatItemDetails?.messages?.slice(-1)?.pop()?.timestamp))}</div>}
          </div>
          {chatItemDetails.messages && <div className="lastChat">{chatItemDetails?.messages?.slice(-1)?.pop()?.contentType == "text" ? chatItemDetails?.messages?.slice(-1)?.pop()?.content : "sent you " + chatItemDetails?.messages?.slice(-1)?.pop()?.contentType}</div>}
        </div>
      </div>
      <hr className="hr" />
    </>
  )
}
export default ChatItem
