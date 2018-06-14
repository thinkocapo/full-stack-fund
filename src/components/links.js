import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import NavBar from './nav-bar'

class Links extends Component {
    render () {
        return (
            <div>
            <NavBar/>
            <ul>
                <li>link1</li>
                <li>link2</li>
                <li>link3</li>
            </ul>
            </div>
        )
    }
}
export default Links