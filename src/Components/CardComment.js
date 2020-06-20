import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";
import _ from "lodash";
import { users } from "../frontenddata";

const useStyles = makeStyles((theme) => ({
  commentCard: {
    marginBottom: "2%",
  },
  comments: {
    display: "flex",
    flexDirection: "row",
  },
  iconDiv: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  commentIcon: {
    fontSize: 40,
  },
  commentDiv: {
    width: "90%",
    marginLeft: "1%",
    display: "flex",
    flexDirection: "column",
  },
  date: {
    marginLeft: "1em",
  },
}));

const CardComment = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(_.find(users, (u) => u.userid == props.userId));
  }, [props.userId]);
  const datePosted = props.postDate.toDateString();
  return (
    <Card className={classes.commentCard}>
      <CardContent className={classes.comments}>
        <div className={classes.iconDiv}>
          <AccountCircle className={classes.commentIcon} />
        </div>
        <div className={classes.commentDiv}>
          <Typography align="left" variant="h6">
            {user.username}
            <Typography
              align="left"
              variant="overline"
              className={classes.date}
            >
              {datePosted}
            </Typography>
          </Typography>
          <Typography variant="body2" align="left">
            {props.comment}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComment;
