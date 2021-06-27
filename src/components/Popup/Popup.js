import React from 'react'
import './popup.css'
function Popup({ heading, setClose, children }) {
  return (
    <div className="background">
      <div className="popupContainer">
        <div className="popupHeaderContainer">
          <div className="popupHeading">
            {heading}
          </div>
          <img onClick={() => { setClose(true) }} className="popupClose" src="./img/close.svg" />
        </div>
        <div className="popupContent">{children}</div>

      </div>
    </div>
  )
}

export default Popup
