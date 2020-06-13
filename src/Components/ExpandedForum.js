import React, { useState } from "react";
import { Container, Typography, makeStyles, Divider } from "@material-ui/core";
import cardData from "../CardData";
import CardComment from "./CardComment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
  },
  subtitle: {
    fontWeight: "lighter",
  },
  commentSection: {
    marginTop: "1em",
  },
  forumId: {
    marginLeft: "1%",
  },
  enterComment: {
    marginBottom: "1em",
  },
}));
const ExpandedForum = ({ match }) => {
  const classes = useStyles();
  const [commentError, setCommentError] = useState(false);
  const [comment, setComment] = useState("");
  const [userComments, setUserComments] = useState(cardData);
  const addToComments = () => {
    if (!comment || comment.trim() === "") setCommentError(true);
    else {
      const newUserComments = [...userComments];
      newUserComments.push(comment);
      setUserComments(newUserComments);
      setCommentError(false);
      setComment("");
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography align="left" variant="h4">
        Forum title
        <Typography className={classes.forumId} variant="caption">
          id:{match.params.forumId}
        </Typography>
      </Typography>
      <Typography className={classes.subtitle} align="left" variant="h6">
        Some subtitle
      </Typography>
      <Typography variant="body1" align="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
      <div className={classes.commentSection}>
        <Typography align="left" variant="h5">
          Comments
        </Typography>
        <Divider style={{ marginBottom: "1em" }} />
        {userComments.map((val, key) => {
          return <CardComment key={key} comment={val} />;
        })}
      </div>
      <Divider style={{ marginBottom: "1em" }} />
      <FormControl
        className={classes.enterComment}
        variant="outlined"
        fullWidth
      >
        <InputLabel htmlFor="outlined-adornment-comment">
          Enter a comment
        </InputLabel>
        <OutlinedInput
          labelWidth={125}
          multiline
          value={comment}
          error={commentError}
          onChange={(event) => setComment(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Add comment">
                <IconButton
                  aria-label="add-comment"
                  onClick={() => addToComments()}
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>
    </Container>
  );
};

export default ExpandedForum;
