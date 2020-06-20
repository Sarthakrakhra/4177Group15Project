import React from "react";
import { Container, Typography, Grid, Divider } from "@material-ui/core";
import { forums } from "./../frontenddata";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "1em",
  },
  pageTitle: {
    fontWeight: "lighter",
  },
  gridItem: {
    marginTop: "2%",
    "& a": {
      color: "inherit",
    },
  },
}));
const Forums = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h3" align="left" className={classes.pageTitle}>
          Forums
        </Typography>
        <Divider />
        <Grid container>
          {forums.map((f) => {
            return (
              <Grid
                className={classes.gridItem}
                key={f.forumid}
                item
                xs={12}
                sm={6}
                md={3}
                lg
              >
                <Typography variant="h5">
                  <Link to={`/forums/${f.forumid}`}>{f.forumname}</Link>
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Forums;
