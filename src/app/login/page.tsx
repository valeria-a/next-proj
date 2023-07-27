"use client"

import { FormEvent, useState } from "react"
import { GOOGLE_AUTH_URL, LOGIN_URL, USER_DATA_URL } from "../../../infra/urls"
import axios, { AxiosResponse } from "axios"
import { useAuth, useAuthDispatch } from "../../../context/authContext"
import {redirect} from 'next/navigation'
import { ACCESS_TOKEN } from "../../../infra/const"
import { UserActionType } from "../../../types/interfaces"
import { GoogleLogin } from "@react-oauth/google"
import { useNotifier } from "../../../context/notifyContext"
import Image from "next/image"


interface ITokens {
    readonly access: string,
    readonly refresh: string
}

export default function Login() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const authDispatch = useAuthDispatch()
    const auth = useAuth()

    const notifier = useNotifier()

    if (auth?.user) {
        redirect('/')
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            let response = await axios.post(LOGIN_URL, {username: email, password})
            // const tokens: {access: string, refresh: string} = response.data;
            const tokens: ITokens = response.data;
            
            localStorage.setItem(ACCESS_TOKEN, tokens.access)

            response = await axios.get(
                USER_DATA_URL, 
                {headers: {Authorization: `Bearer ${tokens.access}`}}
            )
            authDispatch({type: UserActionType.Login, context: response.data})

        } catch (error) {
            console.error(error)
        }

    }

    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Insert email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            
            <input 
                type="password" 
                placeholder="Inert password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>


            <button type="submit">LOGIN</button>
        </form>

        <GoogleLogin
            onSuccess={async credentialResponse => {
                console.log(credentialResponse);

                try {
                    const response = await axios.post(
                            GOOGLE_AUTH_URL, {google_jwt: credentialResponse.credential})
                    authDispatch({type: UserActionType.Login, context: response.data})
                    localStorage.setItem(ACCESS_TOKEN, response.data.access)
                    notifier({'msg': 'You have successfully logged in', 'status': 'success'})
                    
                } catch (error) {

                }
                
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />;

      </div>
    )
  }