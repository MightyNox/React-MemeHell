import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './menu.css'

class Menu extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-dark">
                    <div className="navbar-brand">
                        <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="logo" />
                    </div>
                
                
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/">
                                <button className="btn-menu" type="button">
                                    <i className="fas fa-home" />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/counter">
                                <button className="btn-menu-text" type="button">
                                    Counter
                                </button>
                            </Link>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <Link to="/">
                                <button className="btn-menu" type="button">
                                    <i className="fas fa-user-plus" />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <button className="btn-menu" type="button">
                                    <i className="fas fa-sign-in-alt" />
                                </button>
                            </Link>
                        </li>
                    </ul>

                    <div className="dropdown">
                        <button className="btn-menu">
                            <i className="fas fa-bars" />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/">
                                <i className="fas fa-home" />
                            </Link>
                            <Link to="/counter">
                                Counter
                            </Link>
                            <Link to="/">
                                <i className="fas fa-user-plus" />
                            </Link>
                            <Link to="/">
                                <i className="fas fa-sign-in-alt" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default Menu



