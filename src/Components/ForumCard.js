import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import cardData from "./../CardData";
import CardComment from "./CardComment";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: "1em",
  },
  title: {
    fontWeight: "bold",
  },
});
const ExpandButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[700]),
    backgroundColor: grey[700],
    "&:hover": {
      backgroundColor: grey[900],
    },
    width: "30%",
    float: "right",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}))(Button);
const ForumCard = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h5" align="left">
            Forum title
          </Typography>
          <Typography variant="subtitle1" align="left">
            Some subtitle
          </Typography>
          {cardData.map((val, key) => {
            return <CardComment comment={val} key={key} />;
          })}
          <Link to={`/forum/${props.forumId}`}>
            <ExpandButton variant="contained">Expand</ExpandButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumCard;
