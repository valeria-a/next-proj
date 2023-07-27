"use client"

import { useContext, createContext, useReducer, Dispatch, ReactNode } from "react"
import { IUserData, UserActionType } from "../types/interfaces"
import { GoogleOAuthProvider } from "@react-oauth/google"

const authReducer = (userData: IUserData, action: {type: UserActionType, context: any}) => {
    switch (action.type) {
        case UserActionType.Login:
            const responseData = action.context
            const newData:IUserData = {
                user: {
                    id: responseData.id,
                    firstName: responseData.first_name,
                    lastName: responseData.last_name,
                    email: responseData.email,
                    username: responseData.username,
                    imgUrl: responseData.img_url
                }
            }
            return newData
    }
}

const AuthContext = createContext<IUserData | null>(null)
const AuthDispatchContext = createContext<Dispatch<{ type: UserActionType; context: any; }>>(() => {})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const useAuthDispatch = () => {
    return useContext(AuthDispatchContext)
}

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [auth, authDispatch] = useReducer(authReducer, {user: null})

    return(
        <GoogleOAuthProvider clientId='872794659630-ehu55i6a7fbglef45mjno5pgjv7qeab9.apps.googleusercontent.com'>

        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={authDispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
        </GoogleOAuthProvider>
    )
}