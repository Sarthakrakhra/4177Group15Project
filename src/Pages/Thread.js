import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import ThreadCard from "../Components/ThreadCard";
import { threads } from "./../frontenddata";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
  },
}));

const Thread = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h3" align="left">
          Threads
        </Typography>
        <Container maxWidth="md">
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
      </Container>
    </div>
  );
};

export default Thread;
