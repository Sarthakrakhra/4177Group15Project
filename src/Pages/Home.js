import React from "react";
import ForumCard from "./../Components/ForumCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  const searchResults = [1, 2, 3];
  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Container maxWidth="md">
          {searchResults.map((val, key) => (
            <ForumCard key={key} />
          ))}
        </Container>
      </Container>
    </div>
  );
};

export default Home;
