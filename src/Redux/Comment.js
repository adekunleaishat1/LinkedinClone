import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isgettingcomment:false,
    allcomment:[],
    gettingcommenterror: null
}

const commentslice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        Gettingcomment: (state) =>{
           state.isgettingcomment = true
           state.allcomment = []
           state.gettingcommenterror = null
        },
        Gettingcommentsuccessful:(state, action) =>{
            state.isgettingcomment = false
            state.allcomment = action.payload
            state.gettingcommenterror = null
        },
        Gettingcommentfailed:(state, action)  =>{
            state.isgettingcomment = false
            state.allcomment = []
            state.gettingcommenterror = action.payload
        }
    }
})

export const {Gettingcomment, Gettingcommentfailed, Gettingcommentsuccessful} = commentslice.actions
export default commentslice.reducer