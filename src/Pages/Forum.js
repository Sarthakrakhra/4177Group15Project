import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import ForumCard from "../Components/ForumCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
  },
}));

const Forum = (props) => {
  const classes = useStyles();
  const forums = [1, 2, 3, 4, 5];
  return (
    <div>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h3" align="left">
          Forums
        </Typography>
        <Container maxWidth="md">
          {forums.map((val, key) => (
            <ForumCard forumId={val} key={key} />
          ))}
        </Container>
      </Container>
    </div>
  );
};

export default Forum;
