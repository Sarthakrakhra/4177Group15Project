import React, { useState } from "react";
import { Container, Typography, Divider, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import AddCommentIcon from "@material-ui/icons/AddComment";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from 'axios';

class NewThread extends React.Component {
	
	async componentDidMount() {
		
	}
	
	async handleSubmit() {
		var forumid = document.getElementById("threadid").innerHTML;
		var threadtitle = document.getElementById("newthreadtitle").value;
		var threadtext = document.getElementById("newthreadtext").value;
		if (threadtitle.length < 1 || threadtext.length < 1) {
			alert("Please enter both a title and description for the thread");
			return;
		}
		try {
			var payload = {"threadforum":forumid,"threadtitle":threadtitle,"threadtext":threadtext};
			var postresponse = await axios.post("https://a4-4177-g15.herokuapp.com/thread", payload);
			if (postresponse.status != 201) {
				var errormessage = postresponse.data.message;
				alert(errormessage);
				return;
			}	else {
				var successnotice = postresponse.data.message;
				alert(successnotice);
				document.getElementById("newthreadtitle").value = "";
				document.getElementById("newthreadtext").value = "";
				return;
			}
		} catch (err) {
			var errormessage = err.response.data.message;
			alert(errormessage);
			return;
		}
	}

	render() {
		const classes = {
			root: {
				marginTop: "1em",
			},
			pageTitle: {
				fontWeight: "lighter",
			},
			form: {
				marginTop: "1em",
				display: "flex",
				flexDirection: "column",
				"& > .MuiFormControl-root, .MuiButton-root": {
				  marginTop: "1em",
				},
			},
		};					
		const forumId = this.props.match.params.forumId;
		return (
		  <div id="newthreadcontainer">
		  	<div id="newthreadheader">Create a new thread</div>
		  	<div id="threadid">{forumId}</div>
		  	<textarea id="newthreadtitle" placeholder="Enter Thread Title" />
		  	<textarea id="newthreadtext" placeholder="Enter Thread Text"/>
		  	<button id="newthreadsubmit" onClick={this.handleSubmit}>Post Thread</button>
		  </div>
		);
	}
}

/*const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1em",
  },
  pageTitle: {
    fontWeight: "lighter",
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
const NewThread = ({ match }) => {
  const classes = useStyles();
  const forumId = match.params.forumId;
  const [openDialog, setOpenDialog] = useState(false);
  const [newThread, setNewThread] = useState({
    threadid: 77,
    threadtitle: "",
    threadtext: "",
    visibility: "",
    postdate: "",
    forumid: forumId,
    userid: 4,
  });

  const handleThreadTitleChange = (event) => {
    setNewThread({ ...newThread, threadtitle: event.target.value });
  };

  const handleThreadTextChange = (event) => {
    setNewThread({ ...newThread, threadtext: event.target.value });
  };

  const handleThreadVisibilityChange = (event) => {
    setNewThread({ ...newThread, visibility: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewThread({ ...newThread, postdate: new Date().toString() });
    handleDialogOpen();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Dialog
        open={openDialog}
        onClose={handleCancel}
        aria-labelledby="save-settings-title"
        aria-describedby="save-forum-settings"
      >
        <DialogTitle>{"Confirm new thread"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are creating a new thread, do you wish to continue?
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
      <Typography className={classes.pageTitle} align="left" variant="h3">
        Create new thread
      </Typography>
      <Divider />
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            value={newThread.threadtitle}
            onChange={handleThreadTitleChange}
            label="Forum title"
          ></TextField>
          <TextField
            multiline
            variant="outlined"
            onChange={handleThreadTextChange}
            value={newThread.threadtext}
            label="Thread text"
          ></TextField>
          <FormControl component="fieldset">
            <FormLabel align="left" component="legend">
              Thread visibility
            </FormLabel>
            <RadioGroup
              aria-label="forum-visibility"
              name="forumVisibility"
              value={newThread.visibility}
              onChange={handleThreadVisibilityChange}
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
            endIcon={<AddCommentIcon />}
          >
            Create thread
          </Button>
        </form>
      </Container>
    </Container>
  );
};*/

export default NewThread;
