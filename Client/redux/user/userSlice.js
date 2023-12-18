import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentuser:null,
    loading:false,
    error:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        }
        ,signInSuccess:(state,action)=>{
            console.log("in the suces function")
            state.currentuser= action.payload;
            state.loading= false,
            state.error= false
        }
        ,signInFailure:(state,action)=>{
            console.log("in the failure function")
            state.loading = true,
            console.log(action.payload,"askndkasfkak")
            state.error = action.payload.message
            
        }
    }
})

export const {signInFailure,signInStart,signInSuccess} = userSlice.actions;


export default userSlice.reducer