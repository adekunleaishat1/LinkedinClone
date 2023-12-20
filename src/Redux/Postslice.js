import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    isgettingpost: false,
    allpost:[],
    gettingposterror:null
}

export const postslice = createSlice({
    name:"post",
    initialState,
    reducers:{
        Gettingpost: (state) =>{
          state.isgettingpost = true
          state.allpost = []
          state.gettingposterror = null
        },
        GettingpostSuccessful:(state, action)=>{
          state.isgettingpost = false
          state.allpost = action.payload
          state.gettingposterror = null
        },
        GettingpostFailed:(state, action) =>{
          state.isgettingpost = false
          state.allpost = []
          state.gettingposterror = action.payload 
        }
    }
})

export const {Gettingpost, GettingpostFailed, GettingpostSuccessful} = postslice.actions
export default postslice.reducer