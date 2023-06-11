import styled from "styled-components"
import { storage } from "../firebase";
import { ref, list, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled } from '@mui/material/styles';

import fileIcon from "../assets/fileIcon.svg";

export const Home = () =>{
    const [pdfs, setPdfs] = useState([]);

    const listRef = ref(storage, 'pdfs');

    // Display max 20 files from firebase storage
    useEffect(()=>{
        list(listRef, { maxResults: 20 })
        .then((res) => {
            res.items.forEach((itemRef) => {
                const fileName = itemRef.name;
                const downloadUrl = getDownloadURL(itemRef);
                downloadUrl.then((url)=>{
                    setPdfs(pdfs => [...pdfs, {"name": fileName.substring(0, fileName.length-4), "url": url}]);
                })
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }, [])

    console.log(pdfs);

    return(
        <HomePage>
            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}  columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    pdfs?.map((pdf, index)=>(
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <Item>
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
}));