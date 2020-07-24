//Author: Sally Keating | B00739692

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import {DropzoneDialog} from "material-ui-dropzone";
import {Container} from "@material-ui/core";
import React, {Component} from "react";

export default class FileUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            //a list of arrays to store api responses.
            uploadedFile: [],
            open: false
        }
    }

    handleSave(){

    }

    handleClose(){

    }
    render() {
        return (
            <div>
            <IconButton
                aria-label="upload-file"
                // onClick={this.handleOpen.bind(this)}
            >
        <PublishIcon/>
    </IconButton>
    <DropzoneDialog
        // open={this.state.open}
        // onSave={this.handleSave.bind(this)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        // onClose={this.handleClose.bind(this)}
    />
</div>

);
    }
    }