'use client'

import { ChangeEvent, useRef, useState } from "react"

import axios, { AxiosProgressEvent } from "axios"
import { useAuth, useAuthDispatch } from "../../context/authContext"
import { PROFILE_IMG_PRESIGNED_URL, PROFILE_IMG_UPLOAD_DONE_URL, PROFILE_IMG_URL, USER_DATA_URL } from "../../infra/urls"
import { ACCESS_TOKEN } from "../../infra/const"
import { UserActionType } from "../../types/interfaces"
import { Button, LinearProgress } from "@mui/material"
import { FlashOffRounded } from "@mui/icons-material"



export default function Profile() {

  const auth = useAuth()
  const authDispatch = useAuthDispatch()

  const [selectedFile, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [inFlight, setInFlight] = useState(false)

  const controller = useRef(new AbortController())


  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
    console.log(progressEvent)
    if (progressEvent.progress) {
        setProgress(progressEvent.progress * 100)
    }
  }

  const handleCancelUpload = () => {
    controller.current.abort()
  }

  const handleFileUpload = async () => {
    try {
        controller.current = new AbortController()
        setInFlight(true)

        let response = await axios.post(
            PROFILE_IMG_PRESIGNED_URL,
            {filename: selectedFile?.name}
        )
        const objectName = response.data.fields.key

        response = await axios.post(
            response.data.url,

            {
                // these fields must come FIRST!!!
                ...response.data.fields,
                file: selectedFile
            },

            {headers: {
                "Content-Type": 'multipart/form-data'
            },
            onUploadProgress: handleUploadProgress,
            signal: controller.current.signal
            }
        )
        console.log(response)

        response = await axios.post(
            PROFILE_IMG_UPLOAD_DONE_URL,
            {object_name: objectName}
        )
        authDispatch({
            type: UserActionType.Login,
            context: response.data
        })
    } catch (e) {
        console.error(e)
    } finally {
        setInFlight(false)
        setProgress(0)
    }

  }

//   const handleFileUpload = async () => {
//     const token = localStorage.getItem(ACCESS_TOKEN)
//     let response = await axios.post(
//       PROFILE_IMG_URL,
//       {file: selectedFile},
//       {headers: {
//         // Authorization: `Bearer ${token}`,
//         "Content-Type": 'multipart/form-data'
//       }}
//     )
//     response = await axios.get(
//       USER_DATA_URL, 
//       {headers: {Authorization: `Bearer ${token}`}}
//   )
//     authDispatch({type: UserActionType.Login, context: response.data})
//   }

    return (
      <div>
        <h3>Profile</h3>

        <input 
            type="file" 
            accept="image/*"
            multiple={false}
            onChange={handleFileSelect} 
            disabled={inFlight}/>
        
        <Button 
            variant="contained" 
            onClick={inFlight ? handleCancelUpload : handleFileUpload}>
            {inFlight ? "CANCEL" : "UPLOAD"}
        </Button>
        
        <br />
        {inFlight &&
            <LinearProgress variant="determinate" value={progress} />
        }
      </div>
    )
  }