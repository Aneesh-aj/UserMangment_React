import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";

export default function Signup() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            setLoading(false)
            if(data.success === false){
                console.log(
                    "inside the if"
                )
                setError(true)
                return
            }
            setError(false)
            console.log("comming to navigate")
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(true)
        }

    }


    return (
        <div className="p-3 max-w-lg  mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-lg max-auto gap-3 ">
                <input type="text" placeholder="Username"
                    id="username" onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg" />
                <input type="email" placeholder="email"
                    id="email" onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg" />
                <input type="password" placeholder="password"
                    id="password" onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg" />
                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" type="submit" >
                    {loading ? 'Loading...':'Sing up'}</button>
                    <OAuth/>
            </form>
            <div className="flex gap-2 mt-5">
                <p>have an account ?</p>
                <Link to="/sign-in" >
                    <span className="text-blue-500" >Sign in</span>
                </Link>
            </div>
            <p className="text-red-700 mt-5">{error? error || 'Something went wrong':''}</p>
        </div>
    )
}


