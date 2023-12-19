 import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
function Profile(){
        const fileRef = useRef(null)
        const [image,setImage] = useState(undefined)
        console.log("image",image)
    const {currentuser} = useSelector((state)=>state.user)
    return (
        <div className="p-3 max-w-lg mx-auto" >
             <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
             <form action="" className="flex flex-col gap-4" >
                 <input type="file" ref={fileRef} hidden accept="image/*"
                     onChange={(e)=>setImage(e.target.files[0])}
                 />
                 <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" 
                 alt="Picture" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    onClick={()=>fileRef.current.click()}

                    // {
                    //     service firebase.storage {
                    //         match /b/{bucket}/o {
                    //           match /{allPaths=**} {
                    //             allow read, write: if request.resource.size < 2 * 1024 * 1024 &&
                    //              request.resource.contentType.matches('image/.*')
                    //           }
                    //         }
                    //       }
                    // }
                  />
                 <input defaultValue={currentuser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" />
                 <input  defaultValue={currentuser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" />
                 <input defaultValue={currentuser.password} type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" />
                 <button className="bg-slate-700 text-white p-3 rounded-lg touch-pan-up hover:opacity-95 disabled:opacity-80" >Update</button>
             </form>
             <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer"> Delete Account</span>
                <span className="text-red-700 cursor-pointer"> Sign out</span>

             </div>
        </div>
    )
}


export default Profile