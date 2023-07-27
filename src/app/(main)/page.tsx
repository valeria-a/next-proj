
'use client'

import axios from "axios";
import { ChangeEvent, useState } from "react"

export default function Home() {

  // const [file, setFile] = useState<File>()

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const handleUploadProgress = (progressEvent: any) => {
  //   console.log(progressEvent)
  // }

  // const handleUploadClick = async () => {
  //   console.log(file)
  //   // const fd:FormData = new FormData()
  //   // fd.append('file', file.)
  //   const response = await axios.post(
  //     'https://edulabs-pub1.s3.amazonaws.com/',
  //     {
  //       key: 'kitten-1285341_1280.jpg',
  //       AWSAccessKeyId: 'AKIAZHF7Z4YPUZFU3RAN',
  //       policy: 'eyJleHBpcmF0aW9uIjogIjIwMjMtMDctMjZUMDk6NTI6NDhaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZWR1bGFicy1wdWIxIn0sIHsia2V5IjogImtpdHRlbi0xMjg1MzQxXzEyODAuanBnIn1dfQ==',
  //       signature: 'DyeUbhe9YcPpmwg0mTPVJd7TGlw=',
  //       file: file
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       },
  //       onUploadProgress: handleUploadProgress
  //     }
  //   )
  //   console.log(response)
  // }

  return (
    <div>
      <h3>Home</h3>
      {/* <img src="https://edulabs-pub1.s3.amazonaws.com/cat-2934720_1280.jpg" height={'300px'}/>
      <br />
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleUploadClick}>Upload</button> */}
    </div>
  )
}
