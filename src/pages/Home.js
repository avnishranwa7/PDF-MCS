import styled from "styled-components"
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled } from '@mui/material/styles';

import fileIcon from "../assets/fileIcon.svg";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () =>{
    const [pdfs, setPdfs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState("");

    const listRef = ref(storage, 'pdfs');
    const navigate = useNavigate();

    // Display max 20 files from firebase storage
    // useEffect(()=>{
    //     list(listRef, { maxResults: 20 })
    //     .then((res) => {
    //         res.items.forEach((itemRef) => {
    //             const fileName = itemRef.name;
    //             const downloadUrl = getDownloadURL(itemRef);
    //             downloadUrl.then((url)=>{
    //                 setPdfs(pdfs => [...pdfs, {"name": fileName.substring(0, fileName.length-4), "url": url}]);
    //             })
    //         });
    //     }).catch((error) => {
    //         // Uh-oh, an error occurred!
    //     });
    // }, [])

    const handleOpen = (name, token) =>{
        navigate('/pdf/'+name+'/'+token);
    }

    const handleSearchChange = (e)=>{
        setSearchQuery(e.target.value);
    }

    const handleKeyPress = (e)=>{
        if(e.key==='Enter'){
            HandleFormSubmit();
        }
    }

    const extractTokenFromUrl = (url) =>{
        const regex = /token=([^&]+)/;
        const match = String(url).match(regex);
        if (match && match.length >= 2) {
            return match[1];
        }
        return "";
    }

    const HandleFormSubmit = ()=>{
        try{
            setPdfs([]);
            if(searchQuery===""){
                throw "Seach query cannot be empty";
            }
            if(searchQuery.replace(/\s/g, "").length<3){
                throw "Search query must contain atleast 3 characters"
            }
            listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    const fileName = itemRef.name;
                    if(fileName.toLowerCase().includes(searchQuery.toLowerCase())){
                        const downloadUrl = getDownloadURL(itemRef);
                        const urlToken = extractTokenFromUrl(downloadUrl);
                        setToken(urlToken);
                        downloadUrl.then((url)=>{
                            setPdfs(pdfs => [...pdfs, {"name": fileName.substring(0, fileName.length-4), "url": url}]);
                        })
                    }
                });
            })
        }catch(error){
            console.log(error);
        }
    }

    return(
        <HomePage>
            <div class="d-flex">
                <input
                class="form-control me-2"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyUp={handleKeyPress}
                />
                <button class="btn btn-outline-success" onClick={HandleFormSubmit}>
                    Search
                </button>
            </div>
            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    pdfs?.map((pdf, index)=>(
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <Item onClick={(e)=>handleOpen(pdf.name, extractTokenFromUrl(pdf.url))}>
                                <img src={fileIcon} />
                                {pdf.name}
                            </Item>
                        </Grid>
                    ))
                }
            </Grid>
        </HomePage>
    )
}

const HomePage = styled.div`
    padding: 5rem;

    img{
        margin-bottom: 0.5rem;
    }

    .d-flex{
        margin-bottom: 1rem;
    }
`

const Item = experimentalStyled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "12rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
    overflow: "hidden",
    cursor: "pointer"
}));