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
import _ from "lodash";
import axios from 'axios';

class ThreadCard extends React.Component {
	
	async componentDidMount() {
		const threadId = this.props.threadId;
		try {
			var thread = await axios("https://a4-4177-g15.herokuapp.com/thread/"+threadId);
			if (thread.status != 200) {
				var errormessage = thread.data.message;
				this.setState({ errormessage });
			}	else {
				var threaddata = thread.data;
				this.setState({ threaddata });
			}
		} catch (err) {
			var errormessage = err.response.data.message;
			//var errormessage = err.message;
			this.setState({ errormessage });
		}
	}	
	
	render() {
	
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
	
		const classes = {
			root: {
				marginTop: "1em",
			},
			title: {
				fontWeight: "bold",
			},
			subtitle: {
				marginBottom: "1em",
			},
			cardTitle: {
				display: "flex",
				justifyContent: "space-between",
				"& a": {
				  color: "inherit",
				},
			},
		};
		if (this.state) {
			const { threaddata } = this.state;
			const { errormessage } = this.state;
			if (errormessage) {
				return (<div>{errormessage}</div>);
			}
			if (threaddata) {
				var thread = threaddata.thread;
				var comments = threaddata.comments;
				return (
					<div>
						<Card className={classes.root}>
						  <CardContent>
						    <div className={classes.cardTitle}>
						      <Typography className={classes.title} variant="h5" align="left">
						        {thread.threadtitle}
						      </Typography>
						      <Typography variant="subtitle1" align="right">
						        Forum: <Link to={`/forums/${thread.threadforum}`}>{thread.threadforum}</Link>
						      </Typography>
						    </div>
						    <Typography variant="subtitle2" align="left">
						      {new Date(thread.threaddate).toDateString()}
						    </Typography>
						    <Typography
						      className={classes.subtitle}
						      variant="subtitle1"
						      align="left"
						    >
						      {thread.threadtext}
						    </Typography>
						    {comments.map((val, key) => {
						      return (
						        <CardComment
						          comment={val.commenttext}
						          postDate={new Date(val.commentdate)}
						          userId={val.commentuser}
						          username={val.username}
						          key={key}
						        />
						      );
						    })}
						    <Link to={`/thread/${thread.threadid}`}>
						      <ExpandButton variant="contained">Expand</ExpandButton>
						    </Link>
						  </CardContent>
						</Card>
					</div>
				);
			}
		}
		return (<div>Loading...</div>);
	}
}

/*const useStyles = makeStyles({
  root: {
    marginTop: "1em",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: "1em",
  },
  cardTitle: {
    display: "flex",
    justifyContent: "space-between",
    "& a": {
      color: "inherit",
    },
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
  const [forumName, setForumName] = useState("");

  useEffect(() => {
    setUserComments(_.filter(comments, (c) => c.threadid === props.threadId));
  }, []);

  useEffect(() => {
    const tempForum = _.find(forums, (f) => f.forumid === props.forumId);
    setForumName(tempForum.forumname);
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.cardTitle}>
            <Typography className={classes.title} variant="h5" align="left">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" align="right">
              Forum: <Link to={`/forums/${props.forumId}`}>{forumName}</Link>
            </Typography>
          </div>
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
};*/

export default ThreadCard;
