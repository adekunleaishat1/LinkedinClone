import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { json, useParams } from "react-router-dom";
import { FaAirbnb, FaCamera } from "react-icons/fa";
import { BsEmojiSmile, BsFillCameraVideoFill } from "react-icons/bs";
import { HiPhotograph } from "react-icons/hi";
import { CgCalendarDates } from "react-icons/cg";
import { BiComment, BiLike, BiRepost, BiShare } from "react-icons/bi";
import userEvent from "@testing-library/user-event";

const Center = () => {
  const [user, setuser] = useState("");
  const [imagefile, setimagefile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [PostData, setPostData] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [liked, setliked] = useState("");
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
  // useEffect(() => {
  //  axios.get(`http://localhost:3424/post/${postId}/liked`)
  //  .then((res)=>{
  //   console.log(res);
  //  }).catch((err)=>{
  //   console.log(err);
  //  })
  // }, [])
  
  useEffect(() => {
    axios
      .get("http://localhost:3424/Post")
      .then((res) => {
        console.log(res.data);
        setPostData(res.data);
        console.log(PostData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

    const postData = {
      text: inputValue,
      image: imagefile,
      user: user,
    };

    // Only send the POST request if the input value is not empty
    if (inputValue.trim() !== "") {
      axios
        .post("http://localhost:3424/Post", postData)
        .then((res) => {
          console.log(res);
          alert("Post successful");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const like = (userId, postId, index) => {
    console.log(index);
    // const like = {};
    const likedarray = PostData[index].liked;
    console.log(likedarray);
    const checkedIndex = likedarray.find((like) => like.user_id === user.id);
    console.log(PostData[index]);
    console.log(checkedIndex);

    if (!checkedIndex) {
      likedarray.push({ user_id: user.id });

      const updatedData = [...PostData];
      updatedData[index].isLiked = true;


      axios
        .put(
          `http://localhost:3424/post/${postId}`,
          {
            text: PostData[index].text,
            image: PostData[index].image,
            user: PostData[index].user,
            liked: PostData[index].liked,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("update successful");
          console.log(res);
          setliked(res.data);
          localStorage.setItem("like", JSON.stringify(liked))
          console.log(liked);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likedarray.splice(checkedIndex, 1);
      console.log("meme");

      const updatedData = [...PostData];
      updatedData[index].isLiked = false;

      axios
      .put(
        `http://localhost:3424/post/${postId}`,
        {
          text: PostData[index].text,
          image: PostData[index].image,
          user: PostData[index].user,
          liked: likedarray,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Update successful");
        console.log(res);
        setliked(res.data);
        // localStorage.setItem("like", liked)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    axios.get(`http://localhost:3424/post/${postId}/`)
    .then((res)=>{
     console.log(res.data);
     setIsLiked(res.data.liked)
     console.log(isLiked);
    }).catch((err)=>{
     console.log(err);
    })
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
          <h1 className="text-dark fs-5 mt-2 ">
            Hi <span className="text-capitalize">{user.firstname}</span>, are
            you looking for a job right now?
          </h1>
          <h3 className="text-secondary fs-5 mt-2">
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
                className="img-fluid border-rounded"
                src={
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
                          className="img-fluid"
                          src={
                            user.profile_img ||
                            require("./images-removebg-preview (1).png")
                          }
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h1
                          class="modal-title fs-5 text-capitalize"
                          id="exampleModalToggleLabel"
                        >
                          {user.firstname} {user.lastname}
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

                    <button
                      class="btn btn-primary"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Open second modal
                    </button>
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
        <div className="postcontent w-100 bg-white p-3 ">
          {PostData &&
            PostData.map((post, i) => (
              <>
                <div key={i}>
                  <div className=" col-5 d-flex justify-content-between align-items-start">
                    <div className="idiv">
                      <img
                        className="img-fluid"
                        src={post.user.profile_img}
                        alt=""
                      />
                    </div>
                    <div className="w-75">
                      <h1 className="text-capitalize fs-5">
                        {post.user.firstname} {post.user.lastname}
                      </h1>
                    </div>
                  </div>
                  <div className="w-100 mt-3">
                    <h1 className="fs-6 p-2 text-start">{post.text}</h1>
                    <div className="w-100">
                      <img className="img-fluid" src={post.image} alt="" />
                    </div>
                  </div>
                  <div className="row p-3 border-top border-bottom mt-3">
                    <div className="col-3">
                      <button
                        onClick={() => like(post.user.id, post.id, i)} 
                        className= {!isLiked? "liked" : "bi"}
                      >
                        <BiLike />
                      </button>

                      <span>Likes</span>
                    </div>
                    <div className="col-3">
                      <button className="bi">
                        <BiComment />
                      </button>
                      <span>Comment</span>
                    </div>
                    <div className="col-3">
                      <button className="bi">
                        <BiRepost />
                      </button>
                      <span>Retweet</span>
                    </div>
                    <div className="col-3">
                      <button className="bi">
                        <BiShare />
                      </button>
                      <span>Post</span>
                    </div>
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
