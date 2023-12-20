import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HiOutlinePhotograph} from "react-icons/hi";
import {BsFillCameraFill  } from "react-icons/bs";
import {BiBookmark} from "react-icons/bi"
import {RiEdit2Fill} from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../Service/Oneuser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Left = () => {
  const {isgetting, user, gettingerror} = useSelector((state)=> state.userslice)

  const token = localStorage.token
  const dispatch = useDispatch()
  const [imageData, setimageData] = useState('./images-removebg-preview (1).png')
  const [image, setimage] = useState("")
  const navigate = useNavigate()
  // const [imageSrc, setImageSrc] = useState(user.profile_img || './images-removebg-preview (1).png');



  useEffect(() => {
    getUser(dispatch)
  }, [])

  useEffect(() => {
    console.log(image);
  }, [image])

  useEffect(() => {
    console.log(user);
  }, [user])

  useEffect(() => {
    
  }, [user])
  
  

  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setimage(e.target.result)
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const close = () =>{
    setimage(null)
  }

  const upload = () =>{
   console.log(image);
   axios.post("http://localhost:5000/linkedin/upload",{image},{
    headers:{
      "Authorization": `bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
   }).then((res)=>{
    toast.success(res.data.message)
    navigate('/app')
   }).catch((err)=>{
    toast.error(err.message)
   })
  }


   const uploadImage= () =>{
    fileInputRef.current.click();
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
                className="img-fluid w-100 h-100"
                src={user ? user.profile_img : require("./images-removebg-preview (1).png")}
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
                      onClick={close}
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="profile-image mt-3 mb-3">
                      <input className="in" type="file" ref={fileInputRef} onChange={handleFileChange} />
                       <img
                className=""
                src={image || (user && user.profile_img)}
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
                      onClick={close}
                    >
                      Close
                    </button>
                    <button onClick={upload} type="button" class="btn btn-primary">
                      Save
                    </button>
                    <ToastContainer/>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div className="ade">
           <h1 className="fs-6 text-capitalize text-center">
            {user && user.firstname} {user && user.lastname}
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
