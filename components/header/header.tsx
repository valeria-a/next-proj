"use client"

import { useAuth } from "../../context/authContext";

export default function Header() {

    const auth = useAuth()

    console.log('Rendering header', auth)

    return(
        <>
        <h3>My header</h3>
        {
            auth?.user && 
                <div>
                    <p>{auth.user.username}</p>
                    <img src={auth.user.imgUrl} width={'50px'}/>
                </div>

        }
        </>
    )
}