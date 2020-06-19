import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import cardData from "../CardData";
import CardComment from "./CardComment";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { comments } from "./../frontenddata";
import _ from "lodash";

const useStyles = makeStyles({
  root: {
    marginTop: "1em",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: "1em",
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
const ThreadCard = (props) => {
  const classes = useStyles();
  const date = new Date(props.postDate);
  const [userComments, setUserComments] = useState([]);
  useEffect(() => {
    setUserComments(_.filter(comments, (c) => c.threadid === props.threadId));
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h5" align="left">
            {props.title}
          </Typography>
          <Typography variant="subtitle2" align="left">
            {date.toDateString()}
          </Typography>
          <Typography
            className={classes.subtitle}
            variant="subtitle1"
            align="left"
          >
            {props.text}
          </Typography>
          {userComments.map((val, key) => {
            return (
              <CardComment
                comment={val.commenttext}
                postDate={new Date(val.postdate)}
                userId={val.userid}
                key={key}
              />
            );
          })}
          <Link to={`/thread/${props.threadId}`}>
            <ExpandButton variant="contained">Expand</ExpandButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreadCard;
