import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    isgettingnotification: false,
    allnotification:[],
    notificationerror:null
}

export const notificationslice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    Gettingnotification:(state)=>{
        state.isgettingnotification = true
        state.allnotification = []
        state.notificationerror = null
    },
    GettingnotificationSuccessful:(state, action)=>{
        state.isgettingnotification = false
        state.allnotification = action.payload
        state.notificationerror = null
    },
    GettingnotificationFailed:(state, action)=>{
        state.isgettingnotification = false
        state.allnotification = []
        state.notificationerror = action.payload
    },
  }
})

export const {Gettingnotification, GettingnotificationFailed, GettingnotificationSuccessful} = notificationslice.actions
export default notificationslice.reducer