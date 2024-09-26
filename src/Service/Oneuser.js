import {Gettinguser, Gettingsuccessful, Gettingfailed} from "../Redux/Userslice"

import axios from "axios"
 
const token = localStorage.token


export const getUser = (dispatch) =>{
    try {
        dispatch(Gettinguser())
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/linkedin/getuser`,{
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
      }) .then((res)=>{
        dispatch(Gettingsuccessful(res.data.user))
      }).catch((err)=>{
        // console.log(err);
        dispatch(Gettingfailed(err.message))
      }) 
    } catch (error) {
        //  console.log(error);
         dispatch(Gettingfailed("An error occurred while fetching user data."));
        }
    
}

