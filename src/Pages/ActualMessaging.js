import React from 'react';
import {Container, Card, CardContent, Typography, Grid, TextField, Button} from '@material-ui/core';

class ActualMessaging extends React.Component {
    render() {
      return (
        <Container maxWidth="md">
            <h3> Logan </h3>
          <Card variant="outlined">
                <CardContent>
                    <Card style={{ width: "45%", backgroundColor: "gray", color: "white" }}>
                        <CardContent>
                            <Typography align="left"> Hey </Typography>
                        </CardContent>
                    </Card>
                    <br />
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end">
                        <Card style={{ width: "45%", backgroundColor: "#3f51b5", color: "white" }}>
                            <CardContent>
                                <Typography align="left"> Hey </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <br />
                    <Card style={{ width: "45%", backgroundColor: "gray", color: "white" }}>
                        <CardContent>
                            <Typography align="left"> Want to go to the beach on Tuesday? </Typography>
                        </CardContent>
                    </Card>
                    <br />
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end">
                        <Card style={{ width: "45%", backgroundColor: "#3f51b5", color: "white" }}>
                            <CardContent>
                                <Typography align="left"> Sorry I can't. I have a final that I need to study for. Maybe next week. </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <br />
                    <Card style={{ width: "45%", backgroundColor: "gray", color: "white" }}>
                        <CardContent>
                            <Typography align="left"> Ok no worries, we will see about next week. </Typography>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
            <Grid
            container
            alignItems="center">
                <Grid
                xs={10}
                item={true}>
                    <TextField style={{width: "100%"}} id="standard-basic" label="Enter Message" />
                </Grid>
                <Grid
                xs={2}
                item={true}>
                    <Button variant="contained"> Send </Button>
                </Grid>
            </Grid>
        </Container>
      );
    }

  }

  export default ActualMessaging;
