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
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setForum(_.find(forums, (f) => f.forumid == forumId));
  }, [forumId]);

  const handleForumNameChange = (event) => {
    const newForumName = event.target.value;
    const newForumObj = { ...forum };
    newForumObj.forumname = newForumName;
    setForum(newForumObj);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
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
          ></TextField>
          <TextField
            multiline
            variant="outlined"
            onChange={(e) => handleForumDescChange(e)}
            value={forum.forumdescription}
            label="Forum description"
          ></TextField>
          <FormControl component="fieldset">
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
            startIcon={<SaveIcon />}
          >
            Save Settings
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default ManageForum;
