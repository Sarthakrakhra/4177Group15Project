import React from "react";
import { Container, Typography, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from 'axios';

class Forums extends React.Component {
	
	async componentDidMount() {
		try {
			var forums = await axios("https://a4-4177-g15.herokuapp.com/forum");
			if (forums.status != 200) {
				var errormessage = forums.data.message;
				this.setState({ errormessage });
			}	else {
				var forumsdata = forums.data;
				this.setState({ forumsdata });
			}
		} catch (err) {
			var errormessage = err.response.data.message;
			this.setState({ errormessage });
		}
		if (sessionStorage.getItem("cookie")) {
			try {
				var userforums = await axios.post("https://a4-4177-g15.herokuapp.com/forum/user",{"cookie":sessionStorage.getItem("cookie")});
				if (userforums.status != 200) {
					var usererrormessage = userforums.data.message;
					this.setState({ usererrormessage });
				}	else {
					var userforumsdata = userforums.data;
					this.setState({ userforumsdata });
				}
			} catch (err) {
				var usererrormessage = err.response.data.message;
				this.setState({ usererrormessage });
			}
		}
	}	
	
	render() {
		const classes = {
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
		};
		if (this.state) {
			const { forumsdata } = this.state;
			const { userforumsdata } = this.state;
			const { errormessage } = this.state;
			if (errormessage) {
				return ("Sorry, there was an error getting the list of public forums");
			}
			if (forumsdata && userforumsdata) {
				var forums = forumsdata;
				var userforums = userforumsdata;
				return (
					<div>
						<Container maxWidth="lg" className={classes.root}>
						  <Typography variant="h3" align="left" className={classes.pageTitle}>
						    Forums
						  </Typography>
						  <Divider />
						  <h2>Public Forums</h2>
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
						  <h2>Your Forums</h2>
						  <Grid container>
						    {userforums.map((f) => {
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
			}
			else if (forumsdata) {
				var forums = forumsdata;
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
			}
		}
		return (<div>Loading...</div>);
	}
}

export default Forums;
