import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Menu.css'

class Menu extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-dark">
                    <div className="navbar-brand">
                        <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="logo" />
                    </div>
                
                
                    <div className="navbar-nav">
                        {/* Home */}
                        <Link to="/">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-home" />
                            </button>
                        </Link>
                    </div>
                    <div className="navbar-nav">
                        {/*  */}
                        <Link to="/counter">
                            <button className="btn-menu-text" type="button">
                                Counter
                            </button>
                        </Link>
                    </div>

                    {this.customizeNavBarMenu()}

                    <div className="dropdown">
                        <button className="btn-menu">
                            <i className="fas fa-bars" />
                        </button>
                        <div className="dropdown-content">
                            {/* Home */}
                            <Link to="/">
                                <i className="fas fa-home" />
                            </Link>
                            {/*  */}
                            <Link to="/counter">
                                Counter
                            </Link>
                            {/* Dynamic Links */}
                            {this.customizeDropDownMenu()}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }

    customizeNavBarMenu(){
        if(localStorage.getItem("user")){
            return (
                <div className="nav navbar-nav ml-auto">
                    {/* Logout */}
                    <Link to="/logout">
                        <button className="btn-menu" type="button">
                            <i className="fas fa-sign-out-alt" />
                        </button>
                    </Link>
                </div>
            )
        }else{
            return(
                <React.Fragment>
                    <div className="nav navbar-nav ml-auto">
                        {/* Register */}
                        <Link to="/register">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-user-plus" />
                            </button>
                        </Link>
                    </div>
                    <div className="nav navbar-nav">
                        {/* Login */}
                        <Link to="/login">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-sign-in-alt" />
                            </button>
                        </Link>
                    </div>
                </React.Fragment>
            )
        }
    }

    customizeDropDownMenu(){
        if(localStorage.getItem("user")){
            return(
                <div>
                    {/* Logout */}
                    <Link to="/logout">
                        <i className="fas fa-sign-out-alt" />
                    </Link>
                </div>
            )
        }else{
            return(
                <div>
                    {/* Register */}
                    <Link to="/register">
                        <i className="fas fa-user-plus" />
                    </Link>
                    {/* Login */}
                    <Link to="/login">
                        <i className="fas fa-sign-in-alt" />
                    </Link>
                </div>
            )
        }
    }
}

export default Menu



