import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Divider,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import _ from "lodash";
import ThreadCard from "../Components/ThreadCard";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { Link } from "react-router-dom";
import axios from 'axios';

class Home extends React.Component {
	
	async componentDidMount() {
		const forumId = 1;
		try {
			var forumdatares;
			try {
				forumdatares = await axios("https://a4-4177-g15.herokuapp.com/forum/"+forumId, {"cookie":sessionStorage.getItem("cookie")});
			} catch (err) {
				forumdatares = await axios("https://a4-4177-g15.herokuapp.com/forum/"+forumId);
			}
			if (forumdatares.status != 200) {
				var errormessage = forumdatares.message;
				this.setState({ errormessage });
			}	else {
				var forumdata = forumdatares.data;
				this.setState({ forumdata });
			}
		} catch (err) {
			var errormessage = err.response.data.message;
			this.setState({ errormessage });
		}
	}	
	
	render() {
		const classes = {
			root: {
				marginTop: "1em",
			},
			forumHeader: {
				display: "flex",
				justifyContent: "space-between",
				"& a": {
				  color: "inherit",
				},
			},
			addThread: {
				textDecoration: "none",
			},
		};
		if (this.state) {
			const { forumdata } = this.state;
			const { errormessage } = this.state;
			if (errormessage) {
				return (<div>{errormessage}</div>);
			}
			if (forumdata) {
				var forum = forumdata.forum;
				var membership = forumdata.membership;
				var threads = forumdata.threads;
				return (
					<Container maxWidth="lg" className={classes.root}>
						<div>
						  <div className={classes.forumHeader}>
						    <Typography variant="h3" align="left">
						      {forum.forumname}
						    </Typography>
						    <Link to={`/forums/${forum.forumid}/manage/`}>
						      <IconButton aria-label="settings" color="inherit">
						        <SettingsIcon></SettingsIcon>
						      </IconButton>
						    </Link>
						  </div>
						  <Typography align="left">{forum.foruminfo}</Typography>
						</div>
						<Divider style={{ marginBottom: "1em" }} />
						<div>
						  <Grid container>
						    <Grid item>
						      <Link
						        to={`/forums/${forum.forumid}/newThread`}
						        className={classes.addThread}
						      >
						        <Button
						          variant="contained"
						          color="primary"
						          endIcon={<AddCommentIcon />}
						        >
						          Add a new thread
						        </Button>
						      </Link>
						    </Grid>
						  </Grid>

						  {threads.map((thread, key) => (
						    <ThreadCard
						      threadId={thread.threadid}
						      forumId={thread.threadforum}
						      title={thread.threadtitle}
						      text={thread.threadtitle}
						      postDate={thread.threaddate}
						      userId={thread.threaduser}
						      key={key}
						    />
						  ))}
						</div>
					</Container>
				);
			}
		}
		return (<div>Loading...</div>);
	}
	
}     

export default Home;
