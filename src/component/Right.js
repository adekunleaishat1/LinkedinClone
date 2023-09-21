import React from "react";
import { BiPlus } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

const Right = () => {
  return (
    <>
      <div className="right">
        <div className="w-100 px-2 mt-3 border rounded bg-white">
          <h1 className="fs-6 fw-bold mt-2 text-start">Add to your feed</h1>
          <div className="col-10 px-3 mt-3 d-flex justify-content-between align-items-center">
            <div className="feedimg">
              <img className="img-fluid rounded-circle" src={require("./images.png")} alt="" />
            </div>
            <div className="mnam">
              <h1 className="fs-6">Adekunle Aishat</h1>
              <p className="fs-6">Software Engineer</p>
            </div>
          </div>
          <button className="fol "><BiPlus/>Follow</button>
        </div>
      </div>
    </>
  );
};

export default Right;
