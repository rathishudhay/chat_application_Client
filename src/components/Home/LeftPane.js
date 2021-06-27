import React, { useState, useRef, useContext } from 'react'
import './leftpane.css'
import { channelListConstant } from '../../constants/globalConstants'
import { formatDateForChannelList } from '../../services/date'
import Popup from '../Popup/Popup';
import { UserContext } from '../../context/UserContext';

function LeftPane({ currentChannel }) {

  const [channelList, setChannelList] = useState(channelListConstant);
  const [isAddContactPopupClose, setIsAddContactPopupClose] = useState(true);
  const [searchPeopleInput, setSearchPeopleInput] = useState("")
  const addEmailContactInputRef = useRef()
  const originalChannelList = useRef(channelListConstant)
  const { user } = useContext(UserContext);
  console.log(user);
  const onChannelSelected = (channelItem) => {
    if (currentChannel.currentChannelSelected.email !== channelItem.email) {
      console.log("inside if onChannelSelected")
      currentChannel.setCurrentChannelSelected(channelItem)
    }
    else {
      console.log("inside else onChannelSelected")
    }
  }

  const addContactPopupButtonClicked = () => {
    const newChannel = {
      name: "Hacker Joe",
      email: addEmailContactInputRef.current.value,
      onlineStatus: "offline",
      lastMessageTime: new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24 * 3),
      profilePicUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFRUXFxUVFxUVFRgWFxUVFRUXFhUVFRUYHSggGBolGxUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGBAQGi0fHx8tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOAA4AMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQIDBAUGBwj/xABAEAABAwIDBAcFBgUCBwAAAAABAAIRAyEEEjEFQVFhBiJxgZGh8BMyscHRB0JSYnLhFCOCkvEVFjNDU6KywtL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAkEQEBAAICAgIBBQEAAAAAAAAAAQIREiEDMUFRBCJxgZGxE//aAAwDAQACEQMRAD8A+SIRKFpgJoQoCU5SQgcpqKYQCSaEUpQkUKoaaiiVBKU1CU5QSlEqMoJRU0KMoVDlEpIURIFEpIlBKU5UJRKKkShJCCpNRBTlENCScoGhJCoEISlBIFEqMpoAoTSlAJJiSYFydANTyAXe2X0Ze+HVTkb+EXee7Rvffkkmy2RwIWmrs+q1gqOpuDHaOIsefLvX0DBbMo0RNNgBtciXEkw2XOvElV46o17ssGG2vv4yLi/mt8GOb50pL0W1NgtMuoWP/T3O/QToeWnYvNn13aiNyxZpuXaSEghBKUJIUDSTQqBNIJqBoSlCKqRKSERKUSooQOU5UUIGkhCoEShJRTlbdm7MfWMjqsmC4/ADeUsBgw7rvswf9x4DlxPz06/8ZAAbAAsALAAcOC1Izb9Ops/BsojqNvEFxEuPGTFuwWXTD+RPcvJ1tvuZFu8XP7LTgekpjrCO+66Sxzsr01aoY1iJdrp90eMn+1YWO35iZ3EyuDX6TU3Ejr3DWwQLRO/fd3JaKOODhIJ7U5SnGx1H1Bwi/ZeFy9rbNFbrMgVeFoqADSdA61jv0UnYifQ8LrI+tw8LXUvaxwSItoRYg2IIsQRuRK620WCsM7f+IB1vzgC5/UAO8dl+QuboYKYKihQTQogpoJJIlCBygJIVEElEOTlQOEIlJA5QkhFNBSlNEJXYajndBMDUngBrHP6qpbqLclOd77x+UaeOvgqVoqVZiBYCGt3ADT/Kqe4+vXqyzmpzTD1pnS2owH1fda/qy5+JpkaFbW1RwWgUM4sLprZtw2AH3vFb8O94sLjmtjtn7x8PJQLIG61tCpIuz9tz+Si6r60+Cge34eaqLuz9kRfh8RlMzz71XtGgGultmuuANx+83uPkQqc3itGbNScN7euOzR3lf+lRWNNJCKkmFEKSATSlJQSlCSFRnTUU5QOUwVFCgnKFFMIGhCEVOjTzODeO/gN58Lrp4ggmwsLQNAAIAjgIWbZ7YBed/VHH8xHkPFWGvr/lajNUml6hZ6mvDnKVXFzrKxVqsmylqyNxtedLHsO/4KZx5pmWwfH5rntrGIuoPcTqm14uy/a5doInxnhM+pUG4on1+644lXUqx3pyTi6czcg/HVSYwbh3qmg2eKmWOFwqgrU43WUqD4IJ0mCI1adRHYVX7dws4dXTh5IwpGbLuNie20qKrqsykt4GP3SCnWMwd/uu/U0x8IVaipIlIFNASnKSEQ5QlKcqjPKUpIREkSkmgkCmoSmCopypBRWnBNElziGtaJLjxOgjed4HJBqe2G5dYED4k95JPeigIPu+KpqbZY21OnP5n3PhoPBVf7irboHctbiardXwTHzMt7D8QstfZbBoSe2FAdJa/Ef2hWN6T1PvMpntaPmE3DWTFUhmg8VV7XiPJdJ3SCdaNL+xvxhD9rYcw7+H628ZiGzxsVF7+nOGJaLZB2ptph14hbRtShMnCM/uf/8AS1s29Q0/hwOYLvqnR39MVKjFs0etFpDo0M9l9eanU2thna0nDscfFZvZUHe5Wc08HCR5KoqqyTa3LzCVRuhgrV/Cu/K4fiYcw7xuUDTsWkQd3r1uUXarEul2b8Qa7vu13mJ71Uri3qH8p8nQD55fFUqBhEpSlmQTlChmRmQTQoynKClJKU1QSnKSEQ0ApJoJSqMTVnq7h5nefl3K0FZH6lStRFCEKNBCEIBCEIBCEIBCEILKVdzTLXEHkYXVwe1QYbVHLMPg4bx2X7dFxkK7Sx6B1PK/KTLXCzhoWu0d2fRYHCDB7O8KrCYuIY4nLePyk6kcuIWzFMuDxHna/fY96JpnQgoRAAnCQTzIGkiUpQUpJJoujBTlQRKGliQUZRKJpNZqrYKvBQWZrC53b0J0yoUnsIJBEEWI5qKjYQhe4+zfYAxDi91MPIMNBEgRq6N5WM85hN1vx+O55ajxNOmXGACTwAldbZ3RvEVjDWEc3W8l9wp9D6gEiiOyzfjAC27P2BRbetWDSCQ6nSI6ptGao4dug7157+Rl8R6p+NjPd2+XYL7NLB1bEBvFrQJ8Sse3uguQZ8O4vA1a7XuIX2jFO2Sw5CA8m16lQkTzzQO5Z8X0MewGrgHiqw39lUIDuxj7A9jo5krMz8m9726/8fFx1ZZv5r82V8O5hhzS08CFUvrHSDD0axdTrsNGs2xDgWkHmCvmO0sN7Oo5nA+S9Hj8vPp5PN4L42VCELq4BbcLiJb7M7rt85HmT/lYlJjoMoN6RU6tMtiQQCARIsQRIg77KCrBKJUkigJRKUJqilCEllo0k2ibC66eE2cBBqH+mfiVUtc6nTLjDQSeAut9HY1U6gN/UfkFuqY32EDIMp4CFs/jWOGYTB00v5rUjNtYqexWjVxcfAeV/NW4exyhsboED/KHY7g0nvb9VTWxLyfdaO0mfIK9I5u22AOad5me6I+a5i3bVqEuEmYHCIkm0LCsX26T0kxpJAGpsv0P9kOC9hhw1rJcbl3y8ZXxLongPa1gYs2OyTv7l9g2Z0tbgRlzABxtGsDq28F4/Pn3I934uHVv39ve9IK2IZTLmUnu/QMxH9IknuBXzz/a2MrOdWbhaxc9wLi97KTS3KAP5dRwdIy8B7xmbZehtL7V2BhDCS6NY3rxGM+1HFmQ18SIn5rnx3fmvRjnwmupf5r0e0uhG0Kbc4woqReKNRhcO5xbPdKqwnTLGYSGHMI/5VZhpu7g4Aled2F9p2Loul1bOPwn6r2bPtaw9dnssVhxUa6zgQ1wjmCrcZPuNzy5ZXXWU/r/AFl6Qbfw21qJpuYKeKY0mm/mL+zne12kHSZ1C+QbYuGuIg6eWh8vNe26Q9HxSJxeCcamFBDiJJqYfjnBu6mNzrxodJPlul0NcA0QHxUIOrXwQ4fpJOYHgQuni3v7efz64XrWnnUIQvU+eEwkhB6TD7YDabWOGbqtEESIAA+SlSw1OtcMdT5g9XwO7shYdk4amQHPDnGdACRbs1XoG4qmLQWdrSPMrpO/bnevTkYjYlVvuw8fls7+0/Ilc17SDBBB4EQfAr2VGs0jquB7DPkjENp1BFRocNJ3jsOvmlxTbxZclK7O0thloL6RL272/eaP/YefbquKCstK00ldhWS7kLn5efzWWm/A0AAT9/xyjh67FpwWND5aQJXPo4z2b76Heo4zqPFRhs7hpO9a9M6dGvSzNLD2j5FcrB1jTcWO0mD9QuoysHCeN9VzdoMB6w1GqtSfTZvU8/NY8M7M0XuLc+StZ5FDTnY50vPh4LOp1DJJ4kldPo7s41qgMdVtyfgFzyykm664zd1HothURQpSdSJPeDPfuXG2jjDUqFxPIcgNy6W36wb1QvOB0yV5sJv9VerLLU4xZWqLEblWVDYqqV3xmnDK7WMpyrThXC4WejUIK7GEfIuplbDHVX7N2tiG0jSD7EOAN8zQ8ZXhpB91wNwZGhiVDFbOLqIIFx8R+y1YGg0OXo6WBBpkNE7xdefPPjenrxnPHVfMULqbewPs6kgdV0kcjvC5a9eN3Nx4cseN1QhCFUdvZFU5Mo4m8di6bYZclc7AsyNHHXsWatXL3BrVv1HP3XXGI9obCRzv3q/ORYGTwPwB+viqqEMEDh8f8J4dsuk+uCqN2DqiJzT8iN0biIXH23gQZq09PvtG7844c/FS25tDL1Rc/BX4Glkoy43IkzG8aeCVY801pJgamy21Ghgy955lPY9MFxO8C3aqdou/mOHEA+QWGr70tawVGwTfUfRZKNSJpv0/8XcQo4bEFh5LRtCiCPas0OvIoHgqpBLCdNFe5sgg+vBcttSCCuix03VlSxlwjodHFaqr4BPLzWfGU4OYaH4qGIfYcxPcio4DBvrVG0qYl7yGtHMr6b/pLcFhwwe9EudxO9fMMNXdTe17HFrmkOaRqCDIK9ntXpf/ABNJssyviHXtO+Bw3rzebHK616enw5Yze/bz+1apc4lYMy0VnrI9wW8J0zlSe5VAocUl0ckg5bMNXhYVNjlLNrLp6PC4qYXqthYwG3kvnlHEQtQ2s5glpg7uXNefPxcunow8vF1enmLpuqBjLuHvxoDuHM8eC8oQnKa74YzGajhllyu0FowbATJ3KghW0zC0zWvFYi1uxadm0gxud2pv2Dd4rkudJW/G1/urW2dfC8YgudK3HEezpy73joOCx7NpgDM7QX7TuCxbQxpe5XbOt08J/MrDPpM28guptrFgNyDf671h2T1Aaz9NG8zvjksTqpqPk8VPhr5RFQtIIWp9RtbU5Xjjo4c+BSwtJrwWOOU6grPiMK6mbi24jQ96io4iiWmHCD8eY4p4fEFnMHUHQjmraGMtlcMzeBVtXCU3DMx2Xk64HeLhD92erQBGZmm9u9v1CeFfaEm0XNIO78QuO4rotdAgQIg2EagCfEO8USstYwL79Fjc6VdiSSZKzlKshFSpvhQQoq51RVEpIQCEIQCEIQOUEpIQNMFRUmoJBXDDEiyrYFqp1D90cu0lEqNPAunjBEjQ8dFXRpmo+OfqVto7RIMO93TS5O93G+qdTENhz26m3rmtaTdQ2niYAptNh6n1yVWDwQgPqe7qG6F30HNZGPvJE8txPNbqjywS8y918v4Rz58tyh6Z8bVc4xuFgBoByU8JQi6ze2KubmOv+fXzRWd5utuCxL2gzdm+bju4qLtpO3NYP6QqXvqVL9Z3YPog1PpUn+6ch4at+oRhqD2OggFh1OrSOfD4rIMO/wDA7wI81ca2UQD63ojXioZTytEAuvvnU3Kysxp08O/Vp5GPIKmpWJgKgptZGurVB3W9W7VmKGnwQ5vhxUVEpJlJAIQhAIQhAIQhAIQhAKymFWtDIAk/uez6oNVFjYufrPAc/XNWVMSGaRmgiNQwbxzcYvwiFz6lUn5DgqpRNJklx5lbKGHDj7MkixIi/W9Ss2E1lW06sVAVSrq1D2IlvWJ+/Hu8gNx5+C55kneSe8krayqSfRHYQtTqgAkOFMaENp9ae3h3om2ehhcvWqHLyN3H+n6q5uPvlosubTq4/RU56O/M/wDUYHl9VI4t4H8oBrd+UX795VFtXEU6ZgNbPBoHm4yfBU/6hVfZsgct3aU6FbPdzGdsXU6uLA6jRDRcxvOqCrFYlwGTMXH7x3dgCwSh5lAWWgkU3lRQMFMOUUIGUkIQCEIQCEIQCEIQCEIQMIJSQgE0kILKZhMOvKrBU2vsQgtpaStdBzcwzDMDIIO+RHd3LnserzV05KpY3f6Uwyc7hygGOWt0YfZ7ZlleDzb+6Ta/n6+vio4nB5zmYetvHHiQeKrL/9k="
    }
    setChannelList([...channelList, newChannel])
    setIsAddContactPopupClose(true)
  }

  const searchPeopleInputChanged = (e) => {
    setSearchPeopleInput(e.target.value);
    setChannelList((prevList) => {
      return originalChannelList.current.filter((channelItem) => {
        return channelItem.name.includes(e.target.value) || channelItem.email.includes(e.target.value)
      })

    })
  }

  return (
    <div className="chatRightbarContent">
      {console.log("img url:" + user.imgUrl)}
      <img src={user.imageUrl} className="userImg" />
      <div className="username">{user.name}</div>
      <div className="email">{user.email}</div>
      <div className="searchContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="search people"
          value={searchPeopleInput}
          onChange={(e) => { searchPeopleInputChanged(e) }}
        />
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
      <div onClick={() => { setIsAddContactPopupClose(false) }} className="addContact">+</div>
      {!isAddContactPopupClose && <Popup heading="Add Contact" setClose={setIsAddContactPopupClose} >
        <div className="enterEmailAddContactText">Enter email to add to your contact</div>
        <div className="emailInputAndBtnContainer">
          <input ref={addEmailContactInputRef} type="text" className="emailInput" />
          <button onClick={addContactPopupButtonClicked} className="addContactPopupBtn">Add Contact</button>
        </div>
      </Popup>}
      {/* <div className="bottomContainer">
        <div className="userEmail">rathishudhay@gmail.com</div>
        <div className="addContact">+</div>
      </div> */}
    </div>
  )
}

export default LeftPane
