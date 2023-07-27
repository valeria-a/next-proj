'use client'

import { ChangeEvent, useState } from "react"
import { useAuth, useAuthDispatch } from "../../../../context/authContext"
import axios from "axios"
import { PROFILE_IMG_URL, USER_DATA_URL } from "../../../../infra/urls"
import { ACCESS_TOKEN } from "../../../../infra/const"
import { UserActionType } from "../../../../types/interfaces"

export default function Profile() {

  const auth = useAuth()
  const authDispatch = useAuthDispatch()

  const [selectedFile, setFile] = useState<File>()

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    let response = await axios.post(
      PROFILE_IMG_URL,
      {file: selectedFile},
      {headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }}
    )
    response = await axios.get(
      USER_DATA_URL, 
      {headers: {Authorization: `Bearer ${token}`}}
  )
    authDispatch({type: UserActionType.Login, context: response.data})
  }

    return (
      <div>
        <h3>Profile</h3>

        <input type="file" onChange={handleFileSelect}/>
        <button onClick={handleFileUpload}>UPLOAD</button>
      </div>
    )
  }