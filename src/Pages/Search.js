import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";
import ForumCard from "./../Components/ForumCard";
import { makeStyles } from "@material-ui/core/styles";

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

const Search = (props) => {
  const classes = useStyles();
  const { searchQuery } = props.location.state;
  const searchResults = [1, 2, 3, 4, 5];
  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <div className={classes.pageTitle}>
          <Typography
            className={classes.searchQueryLabel}
            variant="h3"
            align="left"
          >
            Search results for:
          </Typography>
          <Typography className={classes.searchQuery} variant="h3">
            {searchQuery}
          </Typography>
        </div>
        <Typography variant="h6" align="left">
          Found {searchResults.length} discussion forums
        </Typography>
        <Divider />
        <Container maxWidth="md">
          {searchResults.map((val, key) => (
            <ForumCard key={key} />
          ))}
        </Container>
      </Container>
    </div>
  );
};

export default Search;
