//Author: Sally Keating | B00739692

import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import React, {useState} from "react";
import axios from 'axios';

//Creates constant which can be used in other classes. (reduces redundant code)
const MediaUpload =() => {
    const [uploadedMedia, setMedia] = useState();
    const [confirmationMessage, setCM] = useState();
    const [confirm, setConfirmed] = useState({});

    //called when a file is uploaded
    const onChange = e => {
        setMedia(e.target.file);
    }

    //Called when form is submitted
    const onPost = async e => {
        e.preventDefault();
        var uploaded = new FormData;
        uploaded.append('file', uploadedMedia);

        console.log(uploadedMedia);

        try {
            //posts the uploaded media
            const send = await axios.post('https://a4-4177-g15.herokuapp.com/upload', uploaded, {
                headers:{
                    'Content-Type': 'multipart'
                }
            });

            const {mediaTitle, filePath} = send.data;
            setConfirmed({mediaTitle, filePath});
            setCM('File was successfully uploaded.');
            console.log('it worked! File is uploaded');

        }catch(error){
            console.log('error occured in file upload ' + error);
        }
    }

    return(
        <div>
            <form onSubmit={onPost}>
                <input type='file' className='custom-file-input' id='uploadedFile' onChange={onChange}/>
                <IconButton type='submit'><PublishIcon/></IconButton>
            </form>
            {confirmationMessage ? <div>
                <p>{confirmationMessage}</p>
            </div>
            : null
            }
        </div>
    );
};

export default MediaUpload;
