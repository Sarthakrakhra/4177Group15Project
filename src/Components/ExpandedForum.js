import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Divider,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import { forums, threads as threadData } from "./../frontenddata";
import _ from "lodash";
import ThreadCard from "./ThreadCard";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1em",
  },
  forumHeader: {
    display: "flex",
    justifyContent: "space-between",
    "& a": {
      color: "inherit",
    },
  },
}));
const ExpandedForum = ({ match, history }) => {
  const classes = useStyles();
  const forumId = match.params.forumId;
  const [forum, setForum] = useState({});
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    setForum(_.find(forums, (f) => f.forumid == forumId));
  }, [forumId]);

  useEffect(() => {
    setThreads(_.filter(threadData, (t) => t.forumid === forum.forumid));
  }, [forum]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div>
        <div className={classes.forumHeader}>
          <Typography variant="h3" align="left">
            {forum.forumname}
          </Typography>
          <Link to={`/forums/${forumId}/manage/`}>
            <IconButton aria-label="settings" color="inherit">
              <SettingsIcon></SettingsIcon>
            </IconButton>
          </Link>
        </div>
        <Typography align="left">{forum.forumdescription}</Typography>
      </div>
      <Divider style={{ marginBottom: "1em" }} />
      <div>
        <Grid container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              endIcon={<CreateIcon />}
            >
              Add a new thread
            </Button>
          </Grid>
        </Grid>

        {threads.map((thread, key) => (
          <ThreadCard
            threadId={thread.threadid}
            forumId={thread.forumid}
            title={thread.threadtitle}
            text={thread.threadtext}
            postDate={thread.postdate}
            userId={thread.userid}
            key={key}
          />
        ))}
      </div>
    </Container>
  );
};

export default ExpandedForum;
