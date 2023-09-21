import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HiOutlinePhotograph} from "react-icons/hi";
import {BsFillCameraFill  } from "react-icons/bs";
import {BiBookmark} from "react-icons/bi"
import {RiEdit2Fill} from "react-icons/ri";


const Left = () => {
  const [user, setuser] = useState("");
  const [imageData, setimageData] = useState(user.profile_img || './images-removebg-preview (1).png')
  // const [imageSrc, setImageSrc] = useState(user.profile_img || './images-removebg-preview (1).png');

  const route = useParams();
  const id = route.id;
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:3424/users/${id}`)
      .then((res) => {
        console.log(res);
        setuser(res.data);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        // console.log(imageData);
        setimageData(imageData)
        console.log(imageData);
      };

      reader.readAsDataURL(selectedFile);
    }
  };


   const uploadImage= () =>{
    fileInputRef.current.click();
   }
   const postImage= () =>{
    console.log(imageData);
    

    axios.put(`http://localhost:3424/users/${id}`, {
      "firstname": user.firstname,
      "lastname": user.lastname,
      "email": user.email,
      "phonenumber": user.phonenumber,
      "password": user.password,
      "profile_img": imageData,
      "id": user.id
}, {
  headers: {
    "Content-Type": "application/json"
  }
})
  .then((res) => {
    console.log("update successful");
    console.log(res); 
  })
  .catch((err) => {
    console.log(err);
   });

  }

  return (
    <>
      <div className="left">
        <div className="group">
          <div className="diner">
            <div className="iner"> </div>
            <div className="iner2"> </div>
            <div
              type="button"
              className="imgdi"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <img
                className="img-fluid"
                src={user.profile_img ||  require("./images-removebg-preview (1).png")}
                alt=""
              />
            </div>
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                      Profile photo
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="profile-image mt-3 mb-3">
                      <input className="in" type="file" ref={fileInputRef} onChange={handleFileChange} />
                       <img
                className=""
                src={imageData || require("./images-removebg-preview (1).png")}
                alt=""
              /></div>
                  </div>
                  <div class="modal-footer">
                   <div className="row">
                   <div className="col-2">
                      <button className="camera"><RiEdit2Fill/></button>
                      <p>Edit</p>
                    </div>
                    <div onClick={uploadImage} className="col-6">
                     <button className="camera"><BsFillCameraFill/></button>
                      <p>upload photo</p>
                    </div>
                    <div className="col-4">
                    <button className="camera">< HiOutlinePhotograph/></button>
                      <p>Frames</p>
                    </div>
                   </div>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button onClick={postImage} type="button" class="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div className="ade">
           <h1 className="fs-6 text-capitalize">
            {user.firstname} {user.lastname}
          </h1>
          <p className="text-secondary">Frontend Developer</p>
           </div>
          <hr />
          <div className="d-flex justify-content-between px-2 conn">
            <div className="col-10 connect">
              <p className="tex">Connections</p>
              <p className="pb-2 fw-bold">Grow your network</p> 
            </div>
            <p className="text-primary fs-6">20</p>
          </div>
          <div className="d-flex justify-content-between px-2 align-items-center  border-bottom conn2">
           <p className=" tex">Invitations</p>
            <p className="text-primary">2</p>
          </div>
          <p className="access">Access exclusive tools and insight</p>
          <a href="#" className="text-black acces ">Try premium for free</a>
          <div className="text-start px-3 border-top book">
           <button><BiBookmark/></button>
            <span>My items</span>
          </div>
        </div>
        <div className="groups">
          <h1 className="text-primary p-2">Groups</h1>
          <h1 className="text-primary p-2">Events</h1>
          <h1 className="text-primary p-2">Followed Hashtags</h1>
          <hr />
          <h1 className="text-center text-secondary">Discover more</h1>
        </div>
      </div>
    </>
  );
};

export default Left;
