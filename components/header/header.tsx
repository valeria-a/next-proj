"use client"

import { useAuth } from "../../context/authContext";

export default function Header() {

    const auth = useAuth()


    return(
        <>
        <h3>My header</h3>
        {
            auth?.user && <p>{auth.user.username}</p>
        }
        </>
    )
}