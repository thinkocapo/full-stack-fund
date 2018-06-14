import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
// import RaisedButton from 'material-ui/RaisedButton';

const navbarInstance = (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>
				<a href="/">My Site</a>
			</Navbar.Brand>
		</Navbar.Header>
		<Nav>
			<NavItem eventKey={1} href="#">
				<Link to="/about-me">AboutMe</Link>
			</NavItem>
			<NavItem eventKey={2} href="#">
				<Link to="/portfolio">Portfolio</Link>				
			</NavItem>
            <NavItem eventKey={3} href="#">
				<Link to="/links">Links</Link>
			</NavItem>
			<NavDropdown eventKey={4} title="Options" id="basic-nav-dropdown">
				<MenuItem eventKey={4.1}>Action</MenuItem>
				<MenuItem eventKey={4.2}>Another action</MenuItem>
				<MenuItem eventKey={4.3}>Something else here</MenuItem>
				<MenuItem divider />
				<MenuItem eventKey={3.4}>Separated link</MenuItem>
			</NavDropdown>
		</Nav>
	</Navbar>
);
class NavBar extends Component {
    render () {
        return (
            navbarInstance
        )
    }
}
export default NavBar

//<a href="#home">My Site</a>
