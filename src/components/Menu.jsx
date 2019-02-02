import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'

class Menu extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Meme Hell</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link><Link className='text-white' to='/'>Home</Link></Nav.Link>
                        <Nav.Link><Link className='text-white' to="/counter">Counter</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu