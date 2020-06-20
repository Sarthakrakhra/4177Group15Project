import React, { useState, useEffect } from "react";
import { Container, makeStyles, Typography, Divider } from "@material-ui/core";
import { forums, threads as threadData } from "./../frontenddata";
import _ from "lodash";
import ThreadCard from "./ThreadCard";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1em",
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
      <Typography variant="h3" align="left">
        {forum.forumname}
      </Typography>
      <Typography align="left">{forum.forumdescription}</Typography>
      <Divider />
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
    </Container>
  );
};

export default ExpandedForum;
