import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { forums } from "./../frontenddata";
import _ from "lodash";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import SaveIcon from "@material-ui/icons/Save";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1em",
  },
  form: {
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    "& > .MuiFormControl-root, .MuiButton-root": {
      marginTop: "1em",
    },
  },
}));

const ManageForum = (props) => {
  const classes = useStyles();
  const forumId = props.match.params.forumId;
  const [forum, setForum] = useState({
    forumname: "",
    forumid: "",
    forumdescription: "",
    privacy: "",
    invite: "",
  });

  const [errors, setErrors] = useState({ 
    forumname: false,
    forumdescription: false,
    privacy: false,
   });

   const [errorsInvite, setErrorsInvite] = useState({ 
    foruminvite: false,
   });

  const [openDialog, setOpenDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  useEffect(() => {
    const foundForum = _.find(forums, (f) => f.forumid == forumId);
    setForum({...foundForum, invite: ""});
  }, [forumId]);

  const handleForumNameChange = (event) => {
    const newForumName = event.target.value;
    const newForumObj = { ...forum };
    newForumObj.forumname = newForumName;
    setForum(newForumObj);
  };

  useEffect(() => {
    if(forum.forumname.trim() === ""){
      setErrors({
        ...errors, 
        forumname: true
      })
    }
    else{
      setErrors({
        ...errors, 
        forumname: false
      })
    }
  }, [forum.forumname]);

  useEffect(() => {
    if(forum.forumdescription.trim() === ""){
      setErrors({
        ...errors, 
        forumdescription: true
      })
    }
    else{
      setErrors({
        ...errors, 
        forumdescription: false
      })
    }
  }, [forum.forumdescription]);

  useEffect(() => {
    if(forum.privacy === ""){
      setErrors({
        ...errors, 
        privacy: true
      })
    }
    else{
      setErrors({
        ...errors, 
        privacy: false
      })
    }
  }, [forum.privacy]);

  useEffect(() => {
    if(forum.invite.trim() === ""){
      setErrorsInvite({
        foruminvite: true
      })
    }
    else{
      setErrorsInvite({
        foruminvite: false
      })
    }

    console.log(forum);
  }, [forum.invite]);

  const handleForumDescChange = (event) => {
    const newForumDesc = event.target.value;
    const newForumObj = { ...forum };
    newForumObj.forumdescription = newForumDesc;
    setForum(newForumObj);
  };

  const handleForumVisibilityChange = (event) => {
    const newForumVisibility = event.target.value;
    const newForumObj = { ...forum };
    newForumObj.privacy = newForumVisibility;
    setForum(newForumObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(await checkAllForumErrors()){
      handleDialogOpen();
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleInviteSubmit = async (event) => {
    event.preventDefault();
    if(await checkAllInviteErrors()){
      handleOk(); 
    }
  };

  const checkAllInviteErrors = async () => {
    for(const errorIndex in errorsInvite){
      if(errorsInvite[errorIndex]){
        return false
      }
    }
    return true;
  }

  const checkAllForumErrors = async () => {
    for(const errorIndex in errors){
      if(errors[errorIndex]){
        return false
      }
    }
    return true;
  }

  const handleOk = () => {
    setOpenInviteDialog(true);
  };

  const handleForumInviteChange = (event) => {
    const newForumInvite = event.target.value;
    const newForumObj = { ...forum };
    newForumObj.invite = newForumInvite;
    setForum(newForumObj);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Dialog
        open={openDialog}
        onClose={handleCancel}
        aria-labelledby="save-settings-title"
        aria-describedby="save-forum-settings"
      >
        <DialogTitle>{"Confirm Forum settings change"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have changed your forum settings, do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Link to={`/forums/${forumId}`} style={{ textDecoration: "none" }}>
            <Button color="primary" autoFocus>
              Save
            </Button>
          </Link>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openInviteDialog}
        onClose={handleOk}
        aria-labelledby="save-settings-title"
        aria-describedby="save-forum-settings"
      >
        <DialogTitle>{"User Invites"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have sent invite to the specified users.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={`/forums/${forumId}`} style={{ textDecoration: "none" }}>
            <Button color="primary" autoFocus>
              Ok
            </Button>
          </Link>
        </DialogActions>
      </Dialog>

      <Typography variant="h3" align="left">
        Manage Forum
      </Typography>
      <Divider />
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            value={forum.forumname}
            onChange={(e) => handleForumNameChange(e)}
            label="Forum name"
            error={errors.forumname}
          ></TextField>
          <TextField
            multiline
            variant="outlined"
            onChange={(e) => handleForumDescChange(e)}
            value={forum.forumdescription}
            label="Forum description"
            error={errors.forumdescription}
          ></TextField>
          <FormControl component="fieldset" error={errors.privacy}>
            <FormLabel align="left" component="legend">
              Forum visibility
            </FormLabel>
            <RadioGroup
              aria-label="forum-visibility"
              name="forumVisibility"
              value={forum.privacy}
              onChange={handleForumVisibilityChange}
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SaveIcon />}
          >
            Save Settings
          </Button>
        </form>
        <br />
        <form onSubmit={handleInviteSubmit} className={classes.form}>
        <TextField
            multiline
            variant="outlined"
            onChange={(e) => handleForumInviteChange(e)}
            label="Enter usernames seperated by a comma"
            error={errorsInvite.foruminvite}>
            </TextField>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<AddCircleOutlineRoundedIcon />}
          >
            Send Invite(s)
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default ManageForum;
