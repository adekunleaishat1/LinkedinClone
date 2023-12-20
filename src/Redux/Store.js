import { configureStore } from "@reduxjs/toolkit";
import userslice from "./Userslice";
import postslice from "./Postslice";
import  likeslice  from "./Like";
import  commentslice from './Comment'


export default configureStore({
    reducer:{
         userslice,
         postslice,
         likeslice,
         commentslice 
    }
})