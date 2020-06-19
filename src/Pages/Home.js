import React from "react";
import ThreadCard from "../Components/ThreadCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { threads } from "./../frontenddata";

const useStyles = makeStyles({
  root: {
    marginTop: "1em",
  },
  pageTitle: {
    display: "flex",
  },
  searchQueryLabel: {
    fontWeight: "lighter",
    marginRight: "10px",
  },
  searchQuery: {
    // fontWeight: "bold",
  },
});

const Home = () => {
  const classes = useStyles();
  console.log(threads);
  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Container maxWidth="md">
          {threads.map((thread, key) => (
            <ThreadCard
              threadId={thread.threadid}
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

export default Home;
