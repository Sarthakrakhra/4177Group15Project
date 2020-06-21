import React from 'react';
import {Table, TableHead, TableRow, TableCell, Container, TableBody, Button, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom'
import '../css/Messaging.css';

/**
 * How to get a react / material UI table set up was retrieved from: https://material-ui.com/components/tables/
 * The code was edited to work with the different fields that are present on the page
 */
function createData(name, message) {
    return { name, message };
  }

const rows = [
    createData('Alex', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    createData('Skyler', 'Donec eget sem in quam varius sodales.'),
    createData('Ben', 'Suspendisse nec ante faucibus, tristique lectus quis, varius diam.'),
    createData('Logan', 'Integer sit amet odio sagittis, pellentesque tellus non, aliquet dui.'),
  ];

class Messaging extends React.Component {
    render() {
      return (
        <Container maxWidth="md">

            <Grid
            container
            direction="row"
            justify="flex-end">
                <Button className="NewMessage" size="small" variant="contained"> New Message </Button>
            </Grid>

            <Table className="Table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="TableHeader"> Person </TableCell>
                        <TableCell className="TableHeader" align="right"> Last Message </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => ( 
                        <TableRow key={row.name} component={Link} to={"/ActualMessaging"}>
                            <TableCell> {row.name} </TableCell>
                            <TableCell align="right"> {row.message} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
      );
    }

  }

  export default Messaging;
