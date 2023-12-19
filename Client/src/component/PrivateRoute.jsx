import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(){
     const {currentuser} = useSelector((state)=>state.user)
     console.log("the current user",currentuser)
    return(
        currentuser ? <Outlet/> : <Navigate to='/sign-in' />
    )
}