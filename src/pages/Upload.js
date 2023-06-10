import styled from "styled-components";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { Unauthorized } from "./Unauthorized";

import uploadIcon from "../assets/uploadIcon.svg";
import fileIcon from "../assets/fileIcon.svg";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const UploadPage = () =>{
    const [user, setUser] = useState(null);
  
    const auth = getAuth();
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user)=>{
        if(user){
            setUser(user);
            console.log(user.uid);
        }
        else{
            console.log("User is not signed in");
        }
    });

    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const [progresspercent, setProgresspercent] = useState(0);
    const [file, setFile] = useState(null);

    const handleFile = (e) =>{
        e.preventDefault();
        if(e.target.files[0]){
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e) =>{
        if(file){
            setSubmitButtonClicked(true);
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot)=>{
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes)*100;
                setProgresspercent(progress);
            }, (error)=>{
                console.log(error.code);
            }, ()=>{
                setSubmitButtonClicked(false);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setPdfUrl(downloadURL);
                    setProgresspercent("");
                    setFile(null);
                });
            });
        }
    }

    return(
        <>
            {user &&
            <UploadDiv>
                <h1>Upload PDF</h1>
                {!file &&
                    <Form>
                        <label for="file-input">
                            <IconButton>
                                <img src={uploadIcon} />
                            </IconButton>
                        </label>
                        <input id="file-input" type="file" accept="application/pdf" onChange={handleFile} />
                    </Form>
                }
                {file &&
                <Form>
                    {submitButtonClicked && progresspercent!==100 &&
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    }
                    <IconButton>
                        <img src={fileIcon} />
                    </IconButton>
                    {file.name}
                    <button class="btn btn-outline-success" onClick={handleSubmit}>Upload file</button>
                </Form>
            }
            </UploadDiv>
            }

            {!user &&
            <Unauthorized />
            }
        </>
    )
}

const IconButton = styled.div`
    margin-top: 7rem;
    cursor: pointer;
    margin-bottom: 0.5rem;
`

const Form = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    button{
        margin-top: 0.5rem;
    }

    input{
        display: none;
    }
`

const UploadDiv = styled.div`
    padding-top: 7rem;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`




// import { useState } from "react";
// import { storage } from '../firebase';
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// export function UploadPage() {
//   const [imgUrl, setImgUrl] = useState(null);
//   const [progresspercent, setProgresspercent] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const file = e.target[0]?.files[0]
//     if (!file) return;
//     const storageRef = ref(storage, `files/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on("state_changed",
//       (snapshot) => {
//         const progress =
//           Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgresspercent(progress);
//       },
//       (error) => {
//         alert(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setImgUrl(downloadURL)
//         });
//       }
//     );
//   }

//   return (
//     <div style={{paddingTop: "100px"}}>
//       <form onSubmit={handleSubmit} className='form'>
//         <input type='file' />
//         <button type='submit'>Upload</button>
//       </form>
//       {
//         !imgUrl &&
//         <div className='outerbar'>
//           <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
//         </div>
//       }
//       {
//         imgUrl &&
//         <img src={imgUrl} alt='uploaded file' height={200} />
//       }
//     </div>
//   );
// }