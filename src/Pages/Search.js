import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";
import ThreadCard from "../Components/ThreadCard";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

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
  const [ searchQuery, setSearchQuery ] = useState(props.location.state.searchQuery);
  const [ searchResult, setSearchResult ] = useState([]);

  //Updating search query var everytime new text is entered in the search bar
  useEffect(() => { 

    setSearchQuery( props.location.state.searchQuery );

  }, [props.location.state] );

  //When search query is updated make a call to the database
  useEffect(() => {

    Axios.post('https://a4-4177-g15.herokuapp.com/search/Search', {
      searchRequest: searchQuery
    })
    .then((response) => {
      setSearchResult( response.data );
      console.log(response.data);
    });  

  }, [searchQuery] );

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
          Found {searchResult.length} discussion forums
        </Typography>
        <Divider />
        <Container maxWidth="md">
          {searchResult.map((thread, key) => (
            <ThreadCard
              threadId={thread.threadid}
              forumId={thread.threadforum}
              title={thread.threadtitle}
              text={thread.threadtext}
              postDate={thread.threaddate}
              userId={thread.threaduser}
              key={key}
            />
          ))}
        </Container>
      </Container>
    </div>
  );
};

export default Search;
