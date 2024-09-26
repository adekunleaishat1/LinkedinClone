import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { json, useParams } from "react-router-dom";
import { FaAirbnb, FaCamera } from "react-icons/fa";
import { BsEmojiSmile, BsFillCameraVideoFill } from "react-icons/bs";
import { HiPhotograph } from "react-icons/hi";
import { CgCalendarDates } from "react-icons/cg";
import { BiComment, BiLike, BiRepost, BiShare } from "react-icons/bi";
import userEvent from "@testing-library/user-event";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser} from "../Service/Oneuser"
import { getpost } from "../Service/Post";
import { getlike } from "../Service/Post";
import { useDispatch, useSelector } from "react-redux";
import { getcomment } from "../Service/Post";
import { getnotification } from "../Service/Post";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Preloader from "./Preloader";


const Center = () => {
  // const [user, setuser] = useState("");
  const [imagefile, setimagefile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [postId, setpostId] = useState("");
  const [isLiked, setIsLiked] = useState("");
  const [showing, setshowing] = useState(false);
  const [buttIndex, setbuttIndex] = useState(null)
  const [secondinp, setsecondinp] = useState("");
  const dispatch = useDispatch()

  const navigate = useNavigate()

  let token = localStorage.token
  

  const {isgetting, user, gettingerror} = useSelector((state)=> state.userslice)


  const {isgettingpost, allpost, isgettingerror} = useSelector((state)=> state.postslice)


  const {alllike, gettinglikeerror, isgettinglike} = useSelector((state) => state.likeslice)

  const {allcomment, gettingcommenterror, isgettingcomment} = useSelector((state)=> state.commentslice)

  const {allnotification, notificationerror, isgettingnotification} = useSelector((state)=> state.notificationslice)

  

  const load = () =>{
    if (!user) {
      return <Preloader/>
    }else{
      navigate("/app")
    }
  }
  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
 
  }, [user]);

  useEffect(() => {
    
  }, [allpost])

  useEffect(() => {
    
  }, [alllike])

  useEffect(() => {
   
 }, [allcomment])

 useEffect(() => {
   
 }, [allnotification])
  
  
  useEffect(() => {
    getpost(dispatch)
  }, [dispatch]);

  useEffect(() => {
      getUser(dispatch)
  }, [dispatch])

  useEffect(() => {
    try {
      getlike(dispatch);
      navigate("/app");
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
   }, [dispatch, alllike]);

   useEffect(() => {
    getcomment(dispatch) 
   }, [dispatch, allcomment]);

   useEffect(() => {
    getnotification(dispatch) 
   }, [dispatch]);

   
  

   const handlelikechange = (post) =>{
    if (post && post._id) {
      const postliked = post._id
      let isliked = alllike.find((like) => like.postid == postliked );
      if (user && user._id) {
        let likeuser = isliked?.like?.some((like)=> like.userliked == user._id)
        setIsLiked((prevPostLikes) => ({
          ...prevPostLikes,
          [postliked]: `BiLike ${likeuser ? "liked" : "bi"}`,
        }));
      }
    }
   
  }
  useEffect(() => {
    // Check if the user has liked the post and update the color
    allpost.forEach((post) => {
      handlelikechange(post);
    });
  }, [alllike, setIsLiked, user]);



  
 
  useEffect(() => {
 
  }, [isLiked]);

 

  const fileInputRef = useRef(null);
  const chooseimage = () => {
    fileInputRef.current.click();
  };
  const Handleimage = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imagefile = e.target.result;
        // console.log(imageData);
        setimagefile(imagefile);
        console.log(imagefile);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleText = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };
  const makePost = () => {
    console.log(inputValue);
    console.log(imagefile);
    const postdata = {
      content: inputValue,
      image: imagefile
    }
    const token = localStorage.token
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/makepost`,postdata,{
      headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
  }).then((res)=>{
      toast.success(res.data.message)
      navigate('/app')
  }).catch((err)=>{
      console.log(err);
      toast.error(err.message)  
  })
  
  };

  const like = (post, i) => {
      const postliked = post._id
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/like`,{postliked},{
      headers:{
        "Authorization":`bearer ${token}`,
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    }).then((res)=>{
      navigate('/app')
    }).catch((err)=>{
      console.log(err);
    })
  };
 

  const ontype = (i, e) =>{
          setbuttIndex(i)
         if (!secondinp == "") {
            setshowing(true)
         }else{
           setshowing(false)
         }
  }
  const touc = () =>{
    
  }
  const postcomment=(i)=>{
   
    const postcomment = postId
   
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/comment`,{postcomment,secondinp},{
      headers:{
        "Authorization":`bearer ${token}`,
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    }).then((res)=>{
      console.log(res);
      navigate('/app')
    }).catch((err)=>{
      console.log(err);
    })
   
  }

  const comment = (post) => {
    setpostId(post._id == postId ? null : post._id)
  };

  return (
    <>
      <div className="center">
        <div className="w-100 p-3 bg-white mt-3 border rounded">
          <div className="w-25 mx-auto">
            <img
              className="w-100"
              src={require("./AAYQAgSuAAgAAQAAAAAAABlvNp5yzndgSdCsu3q6Pw22qA.png")}
              alt=""
            />
          </div>
          <h1 className="text-dark fs-5 mt-2 text-center ">
            Hi <span className="text-capitalize">{user && user.firstname}</span>, are
            you looking for a job right now?
          </h1>
          <h3 className="text-secondary fs-5 mt-2 text-center">
            Your response is only visible to you.
          </h3>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <button className="btn btn-outline-primary bt">yes</button>
            <button className="btn btn-outline-primary bt">
              No,but i'm open
            </button>
          </div>
        </div>
        <div className="w-100 p-3 bg-white mt-3 border rounded con2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="imgdiv">
              <img
                className="img-fluid h-100 w-100 rounded-circle" 
                src={user &&
                  user.profile_img ||
                  require("./images-removebg-preview (1).png")
                }
                alt=""
              />
            </div>
            <button
              className="inp"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Start a Post
            </button>
            <div
              class="modal fade"
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
              tabindex="-1"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <div className=" col-6 d-flex justify-content-between align-items-center">
                      <div className="imdiv">
                        <img
                          className="img-fluid h-100 w-100"
                          src={user &&
                            user.profile_img ||
                            require("./images-removebg-preview (1).png")
                          }
                          alt=""
                        />
                      </div>
                      <div className="col-9 px-2 py-2">
                        <h1
                          class="modal-title fs-6 text-capitalize"
                          id="exampleModalToggleLabel"
                        >
                          {user && user.firstname} {user && user.lastname}
                        </h1>
                        <p className="text-secondary fs-6">Post to anyone</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <input
                      onChange={handleText}
                      type="text"
                      placeholder="What do you want to talk about?"
                      className="custom-input"
                    />
                    <div className="text-start w-100 p-3">
                      <button className="emoji">
                        <BsEmojiSmile />
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3 p-3">
                      <input
                        className="d-none"
                        type="file"
                        ref={fileInputRef}
                        onChange={Handleimage}
                      />
                      <button onClick={chooseimage} className="emoji">
                        <HiPhotograph />
                      </button>
                      <button className="emoji">
                        <BsFillCameraVideoFill />
                      </button>
                      <button className="emoji">
                        <CgCalendarDates />
                      </button>
                      <button className="emoji">
                        <HiPhotograph />
                      </button>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      onClick={makePost}
                      className="btn btn-primary btn-sm"
                    >
                      post
                    </button>
                    <ToastContainer/>

                    
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="exampleModalToggle2"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel2"
              tabindex="-1"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                      Modal 2
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    Hide this modal and show the first with the button below.
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btn-primary"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                    >
                      Back to first
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 p-2 mt-3 row">
            <div className="col-3 dicon">
              <button className="icon">
                <FaCamera />
              </button>
              <span>Photo</span>
            </div>
            <div className="col-3 dicon">
              <button className="icon">
                <FaCamera />
              </button>
              <span>Video</span>
            </div>
            <div className="col-3 dicon">
              <button className="icon">
                <FaCamera />
              </button>
              <span>Event</span>
            </div>
            <div className="col-3 dicon">
              <button className="icon">
                <FaCamera />
              </button>
              <span>Write article</span>
            </div>
          </div>
        </div>
        <div className="postcontent w-100 bg-white  p-3 mt-3">
          {allpost &&
            allpost.map((post, i) => (
              <>
                <div key={i} className="">
                  <div className=" col-5 d-flex justify-content-between align-items-start  mt-3">
                    <div className="idiv">
                      <img
                        className="img-fluid w-100 h-100 rounded-circle"
                        src={post.user.profile_img || require("./images-removebg-preview (1).png")}
                        alt=""
                      />
                    </div>
                    <div className="w-75 px-2 py-2">
                      <h1 className="text-capitalize fs-6">
                        {post.user.firstname} {post.user.lastname}
                      </h1>
                    </div>
                  </div>
                  <div className="w-100 mt-3">
                    <h1 className="fs-6 p-2 text-start">{post.content}</h1>
                    <div className="w-100">
                      <img className="img-fluid" src={post.image} alt="" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                  <p>
                    {(() => {
                       let singlelike = alllike.find((like) => like.postid === post._id)
                         let postLike = singlelike?.like?.length;
                             return `${postLike} like`;
                           })()}
                     </p>

                     <p>
                    {(() => {
                       let singlelike = allcomment.find((comment) => comment.postid === post._id)
                         let postcomment = singlelike?.comment?.length;
                         
                             return `${postcomment} comment`;
                           })()}
                     </p>
                  </div>
                 

                  <div className="cont-com border-bottom">
                    <div className=" border-top mt-3 cont-com2">
                      <div
                        onClick={() => {
                          like(post , i);
                          handlelikechange(post);
                      }}
                        className="iner-com"
                      >
                        <BiLike
                          className={isLiked[post._id]}
                        />
                        <span>Likes</span>
                      </div>
                      <div onClick={() => comment(post)} className="iner-com">
                        <BiComment className="bi" />
                        <span>Comment</span>
                      </div>
                      <div className="iner-com sm-none">
                        <BiRepost className="bi" />
                        <span>Retweet</span>
                      </div>
                      <div className="iner-com">
                        <BiShare className="bi" />
                        <span>Post</span>
                      </div>
                    </div>
                    {postId == post._id && <div><div className="d-flex justify-content-between align-item-center mt-3 com-disp">
                      <div className="img-com">
                        <img
                          className="img-fluid h-100 w-100 rounded-circle"
                          src={user &&
                            user.profile_img ||
                            require("./images-removebg-preview (1).png")
                          }
                          alt=""
                        />
                      </div>
                     <div className="com-inp2">
                     <div className="com-inp">
                        <input
                        onChange={(e)=>{
                          setsecondinp(e.target.value)
                          ontype(i, e)
                        }}
                        name={buttIndex}
                        onBlur={touc}
                          className=""
                          placeholder="Add a comment..."
                          type="text"
                        />
                        <div className="emoji2">
                          <BsEmojiSmile />
                        </div>
                        <div className="emoji2">
                          <HiPhotograph />
                        </div>
                      </div>
                      {!secondinp == "" ?
                        <div className="post-btn2">
                          <button onClick={()=>postcomment(i)} className=" btn-small btn btn-primary mt-3">Post</button>
                        </div> : null
                      }
                     </div>
                    </div> 
                    <div className="mt-4">
                      {(() => {
                       let singlelike = allcomment.find((comment) => comment.postid === post._id)
                         let postcomment = singlelike?.comment;
                         if (postcomment && postcomment.length > 0) {
                          return (
                            <>
                              {postcomment.map((el, i)=>(
                                <div className="d-flex justify-content-between align-items-start mt-3" key={i}>
                                  <div className="img-com">
                                    <img className="img-fluid h-100 w-100 rounded-circle" src={el.commenteduserprofile} alt="" />
                                  </div>
                                   <div className="comment-div px-3 py-2">
                                   <h1 className="fs-6">{el.commenteduserfirstname} {el.commenteduserlastname}</h1>
                                   <p className="fs-6">{el.comment}</p>
                                   </div>
                                </div>
                              ))

                              }
                            </>
                          )
                         }
                             
                           })()}
                      </div>
                    </div>
                    }
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Center;
