//Author: Sally Keating | B00739692

import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import React, {Component, useState} from "react";
import axios from 'axios';

const MediaUpload =() => {
    const [uploadedMedia, setMedia] = useState();
    const [mediaTitle, setMediaTitle] = useState();
    const[confirm, setConf] = useState({});

    const onChange = e => {
        setMedia(e.target.file);
    }

    const onPush = async e => {
        e.preventDefault();
        const uploaded = new FormData;
        uploaded.append('file', uploadedMedia);

        try {
            const send = await axios.post('/upload', uploaded, {
                headers:{
                    'Content-Type': 'multipart'
                }
            });
            const {mediaTitle, filePath} = send.data;
            setConf({mediaTitle, filePath});

        }catch(error){
            console.log('error occured in file upload' + error);
        }
    }

    return(
        <div>
            <form>
                <input type='file' className='custom-file-input' id='uploadedFile' onChange={onChange}/>
                <IconButton type='submit'><PublishIcon/></IconButton>
            </form>
        </div>
    );
};

    export default MediaUpload;
