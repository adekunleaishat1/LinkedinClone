import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isgetting: false,
    user:{},
    gettingerror:null
}
export const userslice = createSlice({
    name: "user",
    initialState,
    reducers:{
         Gettinguser:(state) =>{
           state.isgetting = true
           state.user = null
           state.gettingerror = null
         },
         Gettingsuccessful: (state, action) =>{
            state.isgetting = false
            state.user = action.payload
            state.gettingerror = null
         },
         Gettingfailed:(state, action) => {
            state.isgetting = false
            state.user = null
            state.gettingerror = action.payload
         }

    }
})

export const {Gettinguser, Gettingsuccessful, Gettingfailed} = userslice.actions
export default userslice.reducer