import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import NavBar from './nav-bar'

class Portfolio extends Component {
    render () {
        return (
            <div>
            <NavBar/>
            <ListGroup>
                <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
                <ListGroupItem header="Heading 2" href="#">
                    Linked item
                </ListGroupItem>
                <ListGroupItem header="Heading 3" bsStyle="danger">
                    Danger styling
                </ListGroupItem>
            </ListGroup>;
            </div>
        )
    }
}
export default Portfolio