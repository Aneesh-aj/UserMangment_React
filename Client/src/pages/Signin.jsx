import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { signInFailure,signInSuccess,signInStart } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
    const [formData, setFormData] = useState({})
    const {loading, error} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
             dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            console.log("its coming");
            const data = await res.json()
            console.log('before data',data)
            dispatch(signInSuccess(data))
            console.log('after data',data)
            console.log("2")
            if(data.success === false){
                console.log('3')
                dispatch(signInFailure(data))
                return
            }
            console.log("4")
              dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log("5")
            dispatch(signInFailure(error))
        }

    }

    return (
        <div className="p-3 max-w-lg  mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-lg max-auto gap-3 ">
                <input type="email" placeholder="email"
                    id="email" onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg" />
                <input type="password" placeholder="password"
                    id="password" onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg" />
                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" type="submit" >
                    {loading ? 'Loading...':'Sing In'}</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Dont have an account ?</p>
                <Link to="/sign-up" >
                    <span className="text-blue-500" >Sign up</span>
                </Link>
            </div>
            {console.log(error ?error.message:'no error message')}
            <p className="text-red-700 mt-5">{error ? error.message || 'Something went wrong' : ""} </p>
        </div>
    )
}


