import React from 'react';
import {Table, TableHead, TableRow, TableCell, Container, TableBody, Button} from '@material-ui/core';
import '../css/Notifications.css';

/**
 * How to get a react / material UI table set up was retrieved from: https://material-ui.com/components/tables/
 * The code was edited to work with the different fields that are present on the page
 */
function createData(name, from, sent, expire) {
    return { name, from, sent, expire };
  }

function createNotificationData(forum, type, date) {
    return { forum, type, date};
  }

const rows = [
    createData('CSCI 3130', 'Skyler', 'June 13', 'June 27'),
    createData('CSCI 4177', 'Skyler', 'May 30', 'June 13'),
    createData('Homework Help', 'Logan', 'June 1', 'June 15'),
    createData('Learning Center', 'Sally', 'June 8', 'June 22'),
  ];

const notifications = [
    createNotificationData('CSCI 3130', 'Wendy commented on a post you commented on', 'June 13'),
    createNotificationData('CSCI 4177', 'Jake liked your comment', 'May 30'),
    createNotificationData('Homework Help', 'A new post has been created', 'June 1'),
    createNotificationData('Learning Center', 'Jim commented on a post you made', 'June 8'),
  ];

class Notifications extends React.Component {
    render() {
      return (
        <Container maxWidth="md">
            <h3> Invites </h3>
            <Table className="Table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="TableHeader"> Forum </TableCell>
                        <TableCell className="TableHeader" align="center"> From </TableCell>
                        <TableCell className="TableHeader" align="center"> Sent On </TableCell>
                        <TableCell className="TableHeader" align="center"> Expiration </TableCell>
                        <TableCell className="TableHeader" align="center"> Accept/Reject </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => ( 
                        <TableRow key={row.name}>
                            <TableCell> {row.name} </TableCell>
                            <TableCell align="center"> {row.from} </TableCell>
                            <TableCell align="center"> {row.sent} </TableCell>
                            <TableCell align="center"> {row.expire} </TableCell>
                            <TableCell align="center">
                                <Button className="acceptBtn" size="small" variant="contained"> Accept </Button>
                                <Button className="rejectBtn" size="small" variant="contained" color="secondary"> Reject </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <h3> Notifications </h3>
            <Table className="Table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="TableHeader"> Forum </TableCell>
                        <TableCell className="TableHeader" align="left"> Type </TableCell>
                        <TableCell className="TableHeader" align="center"> Recieved On </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map((notifications) => ( 
                        <TableRow key={notifications.forum}>
                            <TableCell> {notifications.forum} </TableCell>
                            <TableCell align="left"> {notifications.type} </TableCell>
                            <TableCell align="center"> {notifications.date} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
      );
    }

  }

  export default Notifications;
