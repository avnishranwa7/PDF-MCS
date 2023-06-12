import styled from 'styled-components';
import React, { useState } from 'react';
import { Viewer, Worker, OpenFile } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useParams } from 'react-router-dom';
import packageJson from"../../package.json";
import { useEffect } from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

import sendIcon from "../assets/sendIcon.svg";

export const ViewPdf = () =>{
    const { name, token } = useParams();
    const [url, setUrl] = useState("");

    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

    const toolbarPluginInstance = toolbarPlugin({
        searchPlugin: {
            keyword: 'PDF',
        },
        selectionModePlugin: {
            selectionMode: SelectionMode.Hand,
        },
    });
    const { Toolbar } = toolbarPluginInstance;

    useEffect(()=>{
        let downloadUrl = "https://firebasestorage.googleapis.com/v0/b/pdf-management-system-278d6.appspot.com/o/pdfs%2F";
        downloadUrl += (name + ".pdf" + "?alt=media&token=" + token);
        setUrl(downloadUrl);
    }, []);
    
    return(
        <>
        {url &&
        <PDFPage>
            <PDF>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                    <Toolbar />
                    <Viewer fileUrl={url} plugins={[toolbarPluginInstance]} />
                </Worker>
            </PDF>
            <CommentSection>
                <Heading>Comments</Heading>
                <Comments>
                    <CommentBox>
                        AAAAAAAAAAAAAAAAAAAAAAAAAA
                    </CommentBox>
                    <CommentBox>
                        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    </CommentBox>
                    <CommentBox>
                        AAAAAAAAA
                    </CommentBox>
                    <CommentBox>
                        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    </CommentBox>
                    <CommentBox>
                        AA
                    </CommentBox>
                    <CommentBox>
                        AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    </CommentBox>
                    <CommentBox>
                        AAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    </CommentBox>
                </Comments>
                <CommentPad>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Type your comment..." />
                    <img src={sendIcon} />
                </CommentPad>
            </CommentSection>
        </PDFPage>
        }
        </>
    )
}

const CommentSection = styled.div`
    border: 2px solid;
    width: 30%;
    height: 80vh;
    display: flex;
    flex-direction: column;
`

const Heading = styled.div`
    text-align: center;
    background-color: #fbf4fa;
`

const Comments = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0.5rem;
    overflow-y: scroll;
`

const CommentPad = styled.div`
    padding: 0.5rem;
    border-top: 2px solid;
    display: flex;

    input{
        margin-right: 0.5rem;
    }

    img{
        cursor: pointer;
    }
`

const CommentBox = styled.div`
    color: white;
    background-color: #7a9ab9;
    border-radius: 10px;
    padding: 0.5rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin-bottom: 1rem;
    max-width: 90%;
    width: fit-content;
`

const PDF = styled.div`
    width: 70%;
    height: 100vh;
    border: 2px solid;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 3rem;
    margin-right: 1rem;
`

const PDFPage = styled.div`
    padding-top: 5rem;
    padding-right: 2rem;
    padding-left: 2rem;
    display: flex;
`