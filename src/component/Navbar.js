import React,{useEffect, useState} from 'react'
import { ImBarcode,  ImHome3, } from "react-icons/im";
import { FaAirbnb, FaBars, FaBell, FaBlog, FaBriefcase, FaConnectdevelop, FaUserTimes } from "react-icons/fa";
import  {getnotification} from '../Service/Post'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { RiArrowDownSFill } from "react-icons/ri";


const Navbar = () => {
  const [read, setread] = useState([])
  const dispatch = useDispatch()
  const {allnotification} = useSelector((state)=>state.notificationslice)
  const { user, } = useSelector((state)=> state.userslice)
 
  const token = localStorage.token
  const navigate = useNavigate()
 
  useEffect(() => {
    
    setread(allnotification.filter(el => el.isRead === false))
  
    
    
  }, [allnotification]);
  
  useEffect(() => {
      getnotification(dispatch)
    
    
  }, [dispatch])
  useEffect(() => {
    // readnotify()
    console.log(read);
  }, [read])
  
  const readnotify = () =>{
    try {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/read`,{isRead: true},{
        headers:{
          "Authorization":`bearer ${token}`,
          "content-type": "application/json",
          "Accept": "application/json"
        },
      }).then((res)=>{
        console.log(res);
        navigate('/notify')
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className=' light'>
      <div className='container' >
      <div className='top '>
         <div className='d-flex justify-content-around align-items-center logo-nav'>
            <img className='img' src={require('./free-linkedin-logo-icon-2430-thumb_1_-removebg-preview.png')} alt="" />
            <input className='form-control' type="text" placeholder='Search'/>
          </div>
          <div className='d-flex justify-content-between align-items-center icons-nav '>
            <Link to="/app" className='text-center text-decoration-none ico '>
              <button><ImHome3/></button>
              <h1>Home</h1>
            </Link>
            <div  className='text-center ico'>
              <button><FaConnectdevelop/></button>
              <h1>My Network</h1>
            </div>
            <div  className='text-center ico'>
              <button><FaBriefcase/></button>
              <h1>Jobs</h1>
            </div>
            <div className='text-center ico'>
              <button><FaUserTimes/></button>
              <h1>Messaging</h1>
            </div>
            <div className='text-center ico '>
              <button onClick={readnotify} className='ico-count'><FaBell/>
              {read.length > 0 &&
                  <div className="count">{read.length == 0 ? " " : read.length}</div>
              }
              </button>
              <h1>Notifications</h1> 
            </div>
            <div className='text-center ico '>
              <div className='img-profile'>
                <img className='img-fluid' src={user? user.profile_img : require("./images-removebg-preview (1).png")} alt="" />
              </div>
              <div className='me '><span>Me</span><RiArrowDownSFill size={20} /></div>
            </div>
            <hr className='hr' />
            <div className='text-center ico sm-none'>
              <button><FaBars/></button>
              <h1>For Business</h1>
            </div>
          </div>
        </div>
      </div> 
      </div>
    </>
  )
}

export default Navbar