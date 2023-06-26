import React from "react";
import user from '../spinner/UserSpinner.gif'
import admin from '../spinner/Spinner.gif'

function Spinner(isUser) {
  console.log(isUser,"spinner")
  return (
    <div>
      <div className="relative">
        {" "}
        <div className="absolute  inset-0  flex justify-center items-center z-50">
          <div className=" rounded-full h-20 w-20  ">
          <img src={isUser?admin:user} className="w-50 h-auto" alt="loading" />
            {/* <img src={isUser?user:user} className="w-50 h-auto" alt="loading" /> */}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Spinner;
