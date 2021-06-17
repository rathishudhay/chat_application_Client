import React from 'react'
import './leftpane.css'
function LeftPane() {
  return (
    <div className="chatRightbarContent">
      <img className="userImg" src="/img/user.jpeg" />
      <div className="username">Rathish Kumar</div>
      <div className="email">rathishudhay@gmail.com</div>
      <div className="searchContainer">
        <input className="searchInput" type="text" placeholder="search people" ></input>
        <img className="searchImg" src="/img/search.png" />
      </div>

      <div className="chatPeopleList">
        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
              <div className="onlineStatus"></div>
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>

        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>
        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>
        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>
        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>
        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>
        <div className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src="/img/user.jpeg" className="chatPeopleSingleItemThumbnail" />
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">John Doe</div>
                <div className="chatTimeline">7:25 AM</div>
              </div>
              <div className="lastChat">Can you hold the meeting?</div>
            </div>
          </div>
          <hr className="hr" />
        </div>

        <div className="addContact">+</div>
      </div>

      {/* <div className="bottomContainer">
        <div className="userEmail">rathishudhay@gmail.com</div>
        <div className="addContact">+</div>
      </div> */}
    </div>
  )
}

export default LeftPane
