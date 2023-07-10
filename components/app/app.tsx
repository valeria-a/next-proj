"use client"

import { ReactNode, useEffect } from "react";
import { AuthProvider, useAuthDispatch } from "../../context/authContext";
import { ACCESS_TOKEN } from "../../infra/const";
import axios from "axios";
import { USER_DATA_URL } from "../../infra/urls";
import { UserActionType } from "../../types/interfaces";

export default function App({children}:{children: ReactNode}) {

    const authDispatch = useAuthDispatch()

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            //redirect if relevant
        } else {
            const fetchData = async () => {
                try{
                    const response = await axios.get(
                        USER_DATA_URL, 
                        {headers: {Authorization: `Bearer ${token}`}}
                    )
                    authDispatch({type: UserActionType.Login, context: response.data})
                } catch (error) {
                    // redirect
                    console.error(error)
                }
            }
            fetchData()
        }
    }, [])

    return(

        <div>

            <h2>App component</h2>
            {children}

        </div>
    )
}