import React, { useState, useEffect } from "react";
import { Container, Typography, makeStyles, Divider } from "@material-ui/core";
import CardComment from "./CardComment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Tooltip from "@material-ui/core/Tooltip";
import { threads, comments } from "./../frontenddata";
import _ from "lodash";
import badWords from "bad-words";

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
const ExpandedThread = ({ match }) => {
  const classes = useStyles();
  const [commentError, setCommentError] = useState(false);
  const [comment, setComment] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [thread, setThread] = useState({});
  let date = new Date();
  const filter = new badWords();

  const addToComments = () => {
    if (!comment || comment.trim() === "") setCommentError(true);
    else {
      const newUserComments = [...userComments];
      const today = new Date();
      newUserComments.push({
        threadid: thread.threadid,
        userid: 1,
        postdate: today,
        commenttext: filter.clean(comment),
      });
      setUserComments(newUserComments);
      setCommentError(false);
      setComment("");
    }
  };

  useEffect(() => {
    setThread(
      _.find(threads, (t) => {
        return t.threadid == match.params.threadId;
      })
    );
  }, []);

  useEffect(() => {
    date = new Date(thread.postDate);
  }, [thread]);

  useEffect(() => {
    setUserComments(_.filter(comments, (c) => c.threadid === thread.threadid));
  }, [thread]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography align="left" variant="h4">
        {thread.threadtitle}
        <Typography className={classes.forumId} variant="caption">
          id:{thread.threadid}
        </Typography>
      </Typography>
      <Typography className={classes.subtitle} align="left" variant="h6">
        {date.toDateString()}
      </Typography>
      <Typography variant="body1" align="left">
        {thread.threadtext}
      </Typography>
      <div className={classes.commentSection}>
        <Typography align="left" variant="h5">
          Comments
        </Typography>
        <Divider style={{ marginBottom: "1em" }} />
        {userComments.map((val, key) => {
          return (
            <CardComment
              key={key}
              comment={val.commenttext}
              postDate={new Date(val.postdate)}
              userId={val.userid}
            />
          );
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

export default ExpandedThread;
