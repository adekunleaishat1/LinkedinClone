import {Gettingpost, GettingpostFailed, GettingpostSuccessful}  from "../Redux/Postslice"
import { Gettinglike, Gettinglikefailed, Gettinglikesuccessful } from "../Redux/Like"
import {Gettingcomment, Gettingcommentfailed, Gettingcommentsuccessful} from "../Redux/Comment"
import {Gettingnotification, GettingnotificationFailed, GettingnotificationSuccessful} from '../Redux/Notification'
import axios from "axios"
 
const token = localStorage.token


export const getpost = (dispatch) =>{
    try {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/getpost`,{
   headers:{
     "Authorization":`bearer ${token}`,
     "Content-Type": "application/json",
     "accept": "application/json"
   }
  })
  .then((res)=>{
     console.log(res.data.post);
    dispatch(GettingpostSuccessful(res.data.post))
  }).catch((err)=>{
     dispatch(GettingpostFailed(err.message))
  })
    } catch (error) {
      console.log(error);
    }
  }

  export const getlike = (dispatch) =>{
    try {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/getlike`,{
      headers:{
           "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
      }
    }).then((res)=>{
      dispatch(Gettinglikesuccessful(res.data.alllike))
  
    }).catch((err)=>{
      console.log(err)
      dispatch(Gettinglikefailed(err.message))
    })
    } catch (error) {
      console.log(error);
    }
  }

  export const getcomment = (dispatch) =>{
    try {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/getcomment`,{
      headers:{
           "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
      }
    }).then((res)=>{
      dispatch(Gettingcommentsuccessful(res.data.allcomment))
    }).catch((err)=>{
      console.log(err)
      dispatch(Gettingcommentfailed(err.message))
    })
    } catch (error) {
      console.log(error);
    }
  }
  
  export const getnotification = (dispatch) =>{
    try {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/getnotify`,{
      headers:{
           "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
      }
    }).then((res)=>{
      console.log(res.data.notification);
      dispatch(GettingnotificationSuccessful(res.data.notification))
    }).catch((err)=>{
      console.log(err)
      dispatch(GettingnotificationFailed(err.message))
    })
    } catch (error) {
      console.log(error);
    }
  }