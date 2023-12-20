import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isgettinglike:false,
    alllike:[],
    gettinglikeerror: null
}

export const likeslice = createSlice({
  name: "like",
  initialState,
  reducers:{
     Gettinglike: (state) =>{
       state.isgettinglike = true
       state.alllike = []
       state.gettinglikeerror = null
     },
     Gettinglikesuccessful: (state, action) =>{
        state.isgettinglike = false
        state.alllike = action.payload
        state.gettinglikeerror = null
     },
     Gettinglikefailed: (state, action) =>{
        state.isgettinglike = false
        state.alllike = []
        state.gettinglikeerror = action.payload
     }
  }
})

export const {Gettinglike, Gettinglikefailed, Gettinglikesuccessful} = likeslice.actions
export default likeslice.reducer