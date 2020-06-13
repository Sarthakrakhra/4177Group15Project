import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  commentCard: {
    marginBottom: "2%",
  },
  comments: {
    display: "flex",
    flexDirection: "row",
  },
  commentIcon: {
    flexGrow: 1,
    fontSize: 40,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  commentText: {
    // flexGrow: 2,
    width: "90%",
    marginLeft: "1%",
  },
}));

const CardComment = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.commentCard}>
      <CardContent className={classes.comments}>
        <AccountCircle className={classes.commentIcon} />
        <Typography
          className={classes.commentText}
          variant="body2"
          align="left"
        >
          {props.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComment;
