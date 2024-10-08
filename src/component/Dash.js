import React, {useEffect} from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getlike } from '../Service/Post'
import {Gettinguser, Gettingsuccessful, Gettingfailed} from "../Redux/Userslice"

const Dash = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    let token = localStorage.token
   useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/dashboard`,{
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((res)=>{ 
        navigate('/app')
        // if (!res.data.status) {
        //     navigate("/login")
        // }
    }).catch((err)=>{
        console.log(err);
        localStorage.removeItem("token")
        navigate("/login")
    })
   }, [])
   
   
  return (
    <div>
      <div>
         <Navbar/>
         <Dashboard/>
      </div>
    </div>
  )
}

export default Dash