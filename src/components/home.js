import React, { Component } from 'react';

import NavBar from './nav-bar'
import Body from './body'

class Home extends Component {
    render () {
        return (
            <div>
                <NavBar/>
                <Body/>
            </div>
        )
    }
}
export default Home


/*
<div>
<Button bsStyle='primary' bsSize='large'>Button from React-Bootstrap</Button>
<RaisedButton label="Button from Material-UI" />
</div>
*/