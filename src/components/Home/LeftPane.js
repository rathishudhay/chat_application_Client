import React, { useState } from 'react'
import './leftpane.css'
import { channelListConstant } from '../../constants/globalConstants'
import { formatDateForChannelList } from '../../services/date'
function LeftPane({ currentChannel }) {

  const [channelList, setChannelList] = useState(channelListConstant);

  const onChannelSelected = (channelItem) => {
    if (currentChannel.currentChannelSelected.email !== channelItem.email) {
      console.log("inside if onChannelSelected")
      currentChannel.setCurrentChannelSelected(channelItem)
    }
    else {
      console.log("inside else onChannelSelected")
    }
  }

  return (
    <div className="chatRightbarContent">
      <img className="userImg" src="/img/user.jpeg" />
      <div className="username">Rathish Kumar</div>
      <div className="email">rathishudhay@gmail.com</div>
      <div className="searchContainer">
        <input className="searchInput" type="text" placeholder="search people" ></input>
        <img className="searchImg" src="/img/search.svg" />
      </div>

      <div className="chatPeopleList">
        {channelList.map(channelItem => (<div onClick={() => onChannelSelected(channelItem)} className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src={channelItem.profilePicUrl} className="chatPeopleSingleItemThumbnail" />
              <div className={"onlineStatus " + channelItem.onlineStatus}></div>
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">{channelItem.name}</div>
                <div className="chatTimeline">{formatDateForChannelList(channelItem.lastMessageTime)}</div>
              </div>
              <div className="lastChat">{channelItem.lastMessage}</div>
            </div>
          </div>
          <hr className="hr" />
        </div>))
        }


      </div>
      <div className="addContact">+</div>
      {/* <div className="bottomContainer">
        <div className="userEmail">rathishudhay@gmail.com</div>
        <div className="addContact">+</div>
      </div> */}
    </div>
  )
}

export default LeftPane
