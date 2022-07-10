import React from 'react'
import errorImg from "../images/errorpage.webp";
import "./error.css";

function Error() {
  return (
    <div className="error">
        <div className="errorPg">
            <img src={errorImg} alt="" className="errorImg" />
        </div>
    </div>
  )
}

export default Error;