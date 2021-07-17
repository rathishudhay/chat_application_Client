import React from 'react'
import { formatDateForChannelList } from '../../../services/date'
function ChatItem({ chatItemDetails }) {
  return (
    <>
      <div className="chatPeopleSingleItem">
        <div className="chatUserImgWithOnlineStatus">
          <img src={chatItemDetails.profilePicUrl} className="chatPeopleSingleItemThumbnail" />
          <div className={"onlineStatus " + chatItemDetails.onlineStatus}></div>
        </div>
        <div className="chatTextInfoContainer">
          <div className="chatUserAndTimeline">
            <div className="chatUsername">{chatItemDetails.name}</div>
            <div className="chatTimeline">{chatItemDetails.lastMessageTime !== undefined && formatDateForChannelList(chatItemDetails.lastMessageTime)}</div>
          </div>
          <div className="lastChat">{chatItemDetails.lastMessage}</div>
        </div>
      </div>
      <hr className="hr" />
    </>
  )
}

export default ChatItem
